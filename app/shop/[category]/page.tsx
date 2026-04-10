'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { 
  CAKE_CATEGORIES, 
  DESSERT_CATEGORIES, 
  LUXURY_CATEGORIES,
  DESSERTS,
  LUXURY_GIFTING,
  FLAVOURS,
  ADD_ONS,
  CAKE_SIZES,
  getCategoryInfo,
  getProductTypeFromSlug,
  getCakeProductsByCategory,
} from '@/lib/products';

// Color mapping for categories
const categoryColors: Record<string, { accent: string; gradient: string }> = {
  'vintage-cakes': { accent: '#C59FBE', gradient: 'from-[#C59FBE]/10 to-[#FAC1B5]/10' },
  'wedding-cakes': { accent: '#C59FBE', gradient: 'from-[#C59FBE]/10 to-[#FAC1B5]/10' },
  'baby-cakes': { accent: '#98B8B9', gradient: 'from-[#98B8B9]/10 to-[#C6C870]/10' },
  'fresh-flower-cakes': { accent: '#F283AE', gradient: 'from-[#F283AE]/10 to-[#FAC1B5]/10' },
  'valentines-day-cakes': { accent: '#F283AE', gradient: 'from-[#F283AE]/10 to-[#FAC1B5]/10' },
  'eid-cakes': { accent: '#C6C870', gradient: 'from-[#C6C870]/10 to-[#98B8B9]/10' },
  'mothers-day-cakes': { accent: '#F283AE', gradient: 'from-[#F283AE]/10 to-[#FAC1B5]/10' },
  'anniversary-cakes': { accent: '#FAC1B5', gradient: 'from-[#FAC1B5]/10 to-[#C59FBE]/10' },
  'default': { accent: '#F283AE', gradient: 'from-[#F283AE]/10 to-[#FAC1B5]/10' },
};

export default function ShopCategory({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categorySlug = category.toLowerCase();
  const categoryInfo = getCategoryInfo(categorySlug);
  const productType = getProductTypeFromSlug(categorySlug);
  
  // State for desserts/luxury products
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  const colors = categoryColors[categorySlug] || categoryColors['default'];
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">Category Not Found</h1>
          <p className="text-[#98898D] mb-6">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-[#F283AE] font-semibold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Handle dessert products
  if (productType === 'dessert') {
    const dessertKey = categorySlug as keyof typeof DESSERTS;
    const product = DESSERTS[dessertKey];
    
    if (!product) {
      return (
        <div className="min-h-screen pt-24 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">Product Not Found</h1>
            <Link href="/" className="text-[#F283AE] font-semibold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    const currentPrice = product.price || (product.sizes && selectedSize 
      ? product.sizes.find(s => s.value === selectedSize)?.price 
      : product.sizes?.[0]?.price) || 0;
    
    const addOnsTotal = selectedAddOns.reduce((total, id) => {
      const addOn = ADD_ONS.find(a => a.id === id);
      return total + (addOn?.price || 0);
    }, 0);

    const totalPrice = (currentPrice + addOnsTotal) * quantity;

    return (
      <div className="min-h-screen pt-16 md:pt-20">
        {/* Breadcrumb */}
        <div className="px-4 md:px-12 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-[#98898D]">
            <Link href="/" className="hover:text-[#F283AE]">Home</Link>
            <span>/</span>
            <span className="text-[#2C2C2C] font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="px-4 md:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Product Image */}
              <div className="w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAC1B5]/30 to-[#F283AE]/20 flex items-center justify-center shadow-lg">
                <span className="text-8xl">
                  {categorySlug === 'banana-bread' ? '🍞' : 
                   categorySlug === 'brownies' ? '🍫' : 
                   categorySlug === 'cookies' ? '🍪' : '🧁'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#F283AE] mb-2">Desserts</p>
                  <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-3">{product.name}</h1>
                  <p className="text-[#98898D] text-lg">{product.description}</p>
                </div>

                <hr className="border-[#FAC1B5]/30" />

                {/* Size Selection */}
                {product.sizes && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Select Size *</label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setSelectedSize(size.value)}
                          className={`px-6 py-3 rounded-xl border-2 transition-all ${
                            selectedSize === size.value || (!selectedSize && size === product.sizes![0])
                              ? 'border-[#F283AE] bg-[#F283AE]/5'
                              : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                          }`}
                        >
                          <p className="font-semibold text-[#2C2C2C]">{size.label}</p>
                          <p className="text-sm text-[#F283AE] font-bold">Rs. {size.price.toLocaleString()}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fixed price display for banana bread */}
                {product.price && !product.sizes && (
                  <div className="bg-[#F283AE]/5 rounded-xl p-4 border border-[#F283AE]/20">
                    <span className="text-2xl font-bold text-[#F283AE]">Rs. {product.price.toLocaleString()}</span>
                  </div>
                )}

                {/* Flavour Selection */}
                {product.hasFlavours && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Flavour *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FLAVOURS.map((flavour) => (
                        <button
                          key={flavour}
                          onClick={() => setSelectedFlavour(flavour)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${
                            selectedFlavour === flavour
                              ? 'border-[#F283AE] bg-[#F283AE]/5'
                              : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                          }`}
                        >
                          <p className="font-medium text-[#2C2C2C] text-sm">{flavour}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {product.hasAddOns && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Add-ons (Optional)</label>
                    <div className="space-y-2">
                      {ADD_ONS.map((addOn) => (
                        <label
                          key={addOn.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddOns.includes(addOn.id)
                              ? 'border-[#F283AE] bg-[#F283AE]/5'
                              : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAddOns([...selectedAddOns, addOn.id]);
                                } else {
                                  setSelectedAddOns(selectedAddOns.filter(id => id !== addOn.id));
                                }
                              }}
                              className="w-5 h-5 rounded accent-[#F283AE]"
                            />
                            <span className="text-sm text-[#2C2C2C]">{addOn.label}</span>
                          </div>
                          <span className="text-[#F283AE] font-semibold text-sm">Rs. {addOn.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"
                    >
                      <Minus size={18} className="text-[#2C2C2C]" />
                    </button>
                    <span className="text-xl font-bold text-[#2C2C2C] w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"
                    >
                      <Plus size={18} className="text-[#2C2C2C]" />
                    </button>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="bg-white rounded-2xl p-6 border border-[#FAC1B5]/20 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#2C2C2C] font-semibold">Total Price</span>
                    <span className="text-2xl font-bold text-[#F283AE]">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-all hover:shadow-lg active:scale-[0.98]">
                  <ShoppingBag size={20} />
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Handle luxury gifting products
  if (productType === 'luxury') {
    // Aggregate "Luxury Gifting" overview page
    if (categorySlug === 'luxury-gifting') {
      const allLuxury = Object.values(LUXURY_GIFTING);
      return (
        <div className="min-h-screen pt-16 md:pt-20">
          <div className="px-4 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-[#98898D]">
              <Link href="/" className="hover:text-[#F283AE]">Home</Link>
              <span>/</span>
              <span className="text-[#2C2C2C] font-medium">Luxury Gifting</span>
            </div>
          </div>

          <div className={`bg-gradient-to-r from-[#98B8B9]/10 to-[#C6C870]/10 py-12 px-4 md:px-12`}>
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-3">Luxury Gifting</h1>
              <p className="text-lg text-[#98898D]">Premium gift boxes & cupcake bento sets for every special occasion</p>
            </div>
          </div>

          <section className="py-12 md:py-16 px-4 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {allLuxury.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#FAC1B5]/20 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#98B8B9]/20 to-[#C6C870]/10 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      ) : (
                        <span className="text-6xl">🎁</span>
                      )}
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="font-semibold text-[#2C2C2C] mb-1 group-hover:text-[#F283AE] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#98898D] mb-3">{product.description}</p>
                      <p className="text-xl font-bold text-[#F283AE]">Rs. {product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Individual luxury product page
    const luxuryKey = categorySlug as keyof typeof LUXURY_GIFTING;
    const product = LUXURY_GIFTING[luxuryKey];
    
    if (!product) {
      return (
        <div className="min-h-screen pt-24 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">Product Not Found</h1>
            <Link href="/" className="text-[#F283AE] font-semibold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    const addOnsTotal = selectedAddOns.reduce((total, id) => {
      const addOn = ADD_ONS.find(a => a.id === id);
      return total + (addOn?.price || 0);
    }, 0);

    const totalPrice = (product.price + addOnsTotal) * quantity;

    return (
      <div className="min-h-screen pt-16 md:pt-20">
        <div className="px-4 md:px-12 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-[#98898D]">
            <Link href="/" className="hover:text-[#F283AE]">Home</Link>
            <span>/</span>
            <Link href="/shop/luxury-gifting" className="hover:text-[#F283AE]">Luxury Gifting</Link>
            <span>/</span>
            <span className="text-[#2C2C2C] font-medium">{product.name}</span>
          </div>
        </div>

        <section className="px-4 md:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Product Image */}
              <div className="w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#98B8B9]/30 to-[#C6C870]/20 flex items-center justify-center shadow-lg">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-8xl">🎁</span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#98B8B9] mb-2">Luxury Gifting</p>
                  <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-3">{product.name}</h1>
                  <p className="text-[#98898D] text-lg">{product.description}</p>
                  <p className="text-2xl font-bold text-[#F283AE] mt-4">Rs. {product.price.toLocaleString()}</p>
                </div>

                <hr className="border-[#FAC1B5]/30" />

                {/* Flowers Note */}
                {product.flowersNote && (
                  <div className="bg-[#C6C870]/10 p-4 rounded-xl border border-[#C6C870]/30">
                    <p className="text-sm text-[#2C2C2C]">
                      <span className="font-semibold">Note:</span> {product.flowersNote}
                    </p>
                  </div>
                )}

                {/* Flavour Selection */}
                {product.hasFlavours && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Flavour *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FLAVOURS.map((flavour) => (
                        <button
                          key={flavour}
                          onClick={() => setSelectedFlavour(flavour)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${
                            selectedFlavour === flavour
                              ? 'border-[#F283AE] bg-[#F283AE]/5'
                              : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                          }`}
                        >
                          <p className="font-medium text-[#2C2C2C] text-sm">{flavour}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {product.hasAddOns && (
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Add-ons (Optional)</label>
                    <div className="space-y-2">
                      {ADD_ONS.map((addOn) => (
                        <label
                          key={addOn.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddOns.includes(addOn.id)
                              ? 'border-[#F283AE] bg-[#F283AE]/5'
                              : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAddOns([...selectedAddOns, addOn.id]);
                                } else {
                                  setSelectedAddOns(selectedAddOns.filter(id => id !== addOn.id));
                                }
                              }}
                              className="w-5 h-5 rounded accent-[#F283AE]"
                            />
                            <span className="text-sm text-[#2C2C2C]">{addOn.label}</span>
                          </div>
                          <span className="text-[#F283AE] font-semibold text-sm">Rs. {addOn.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"
                    >
                      <Minus size={18} className="text-[#2C2C2C]" />
                    </button>
                    <span className="text-xl font-bold text-[#2C2C2C] w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"
                    >
                      <Plus size={18} className="text-[#2C2C2C]" />
                    </button>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="bg-white rounded-2xl p-6 border border-[#FAC1B5]/20 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#2C2C2C] font-semibold">Total Price</span>
                    <span className="text-2xl font-bold text-[#F283AE]">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-all hover:shadow-lg active:scale-[0.98]">
                  <ShoppingBag size={20} />
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default: Cake category page — shows product grid
  const cakeProducts = getCakeProductsByCategory(categorySlug);

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="px-4 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-[#98898D]">
          <Link href="/" className="hover:text-[#F283AE]">Home</Link>
          <span>/</span>
          <span className="text-[#2C2C2C] font-medium">{categoryInfo.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} py-10 md:py-12 px-4 md:px-12`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-3">{categoryInfo.name}</h1>
          <p className="text-base md:text-lg text-[#98898D]">Browse our beautiful {categoryInfo.name.toLowerCase()} collection</p>
          <p className="text-sm text-[#98898D] mt-2">Starting from <span className="font-bold text-[#F283AE]">Rs. {CAKE_SIZES[0].price.toLocaleString()}</span></p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-10 md:py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {cakeProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {cakeProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${categorySlug}/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#FAC1B5]/20 hover:shadow-lg transition-all"
                >
                  <div
                    className="aspect-square flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-5xl md:text-6xl block mb-2">🎂</span>
                        <p className="text-xs text-[#98898D]">Custom Design</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-5">
                    <h3 className="font-semibold text-[#2C2C2C] text-sm md:text-base mb-1 group-hover:text-[#F283AE] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#98898D] mb-2 md:mb-3 line-clamp-2 hidden sm:block">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm font-bold" style={{ color: colors.accent }}>
                        From Rs. {CAKE_SIZES[0].price.toLocaleString()}
                      </p>
                      <span className="text-xs text-[#F283AE] font-medium hidden sm:inline">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🎂</span>
              <h2 className="text-xl font-serif text-[#2C2C2C] mb-2">Coming Soon</h2>
              <p className="text-[#98898D] mb-6">We&apos;re adding designs to this category. Meanwhile, try our custom order!</p>
              <Link
                href="/customize"
                className="inline-block px-8 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors"
              >
                Create Custom Order
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How to Order */}
      <section className="py-12 px-4 md:px-12 bg-[#F0E8DF]/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#FAC1B5]/20">
            <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">How to Order</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#F283AE] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">Select a Design</h3>
                  <p className="text-sm text-[#98898D]">Choose from our collection or share your own reference image.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C59FBE] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">Pick Size, Flavour & Shape</h3>
                  <p className="text-sm text-[#98898D]">Prices: 1lb Rs. 2,600 · 2lb Rs. 4,200 · 3lb Rs. 6,000 · 4lb Rs. 8,000</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#98B8B9] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-[#2C2C2C]">Place Order</h3>
                  <p className="text-sm text-[#98898D]">Orders must be placed at least 48 hours in advance via WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
