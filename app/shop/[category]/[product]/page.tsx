'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import {
  getCakeProduct,
  getCategoryInfo,
  getProductTypeFromSlug,
  getCakeSizes,
  getFlavours,
  getAddOns,
  CategoryInfo,
  CakeProductItem,
  SizeOption
} from '@/lib/products';

// Category accent colors
const categoryColors: Record<string, string> = {
  'vintage-cakes': '#C59FBE',
  'wedding-cakes': '#C59FBE',
  'baby-cakes': '#98B8B9',
  'fresh-flower-cakes': '#F283AE',
  'valentines-day-cakes': '#F283AE',
  'eid-cakes': '#C6C870',
  'mothers-day-cakes': '#F283AE',
  'anniversary-cakes': '#FAC1B5',
  'default': '#F283AE',
};

const CAKE_SHAPES = ['Round', 'Square', 'Heart'];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product: productSlug } = use(params);
  const categorySlug = category.toLowerCase();
  const accentColor = categoryColors[categorySlug] || categoryColors['default'];

  // Data State
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [cakeProduct, setCakeProduct] = useState<CakeProductItem | null>(null);
  const [cakeSizes, setCakeSizes] = useState<SizeOption[]>([]);
  const [flavours, setFlavours] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<{id: string, label: string, price: number}[]>([]);

  // User State
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedShape, setSelectedShape] = useState(CAKE_SHAPES[0]);
  const [selectedFlavour, setSelectedFlavour] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  // Fetch product data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [info, product, sizes, flavs, addons] = await Promise.all([
          getCategoryInfo(categorySlug),
          getCakeProduct(categorySlug, productSlug),
          getCakeSizes(),
          getFlavours(),
          getAddOns()
        ]);
        
        setCategoryInfo(info);
        setCakeProduct(product);
        setCakeSizes(sizes);
        setFlavours(flavs);
        setAddOns(addons);
        
        if (sizes.length > 0) setSelectedSize(sizes[0].value);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categorySlug, productSlug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-12 flex items-center justify-center">
        <div className="text-[#F283AE] font-semibold">Loading product...</div>
      </div>
    );
  }

  if (!cakeProduct || !categoryInfo) {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">Product Not Found</h1>
          <p className="text-[#98898D] mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="px-6 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate pricing
  const sizePrice = cakeSizes.find(s => s.value === selectedSize)?.price || (cakeSizes.length > 0 ? cakeSizes[0].price : 0);
  const addOnsTotal = selectedAddOns.reduce((total, id) => {
    const addOn = addOns.find(a => a.id === id);
    return total + (addOn?.price || 0);
  }, 0);
  const totalPrice = (sizePrice + addOnsTotal) * quantity;

  // WhatsApp order message
  const handleOrderNow = () => {
    const orderDetails = [
      `*New Cake Order - Minas Bakeshop*`,
      ``,
      `*Design:* ${cakeProduct.name}`,
      `*Category:* ${categoryInfo.name}`,
      `*Size:* ${cakeSizes.find(s => s.value === selectedSize)?.label}`,
      `*Shape:* ${selectedShape}`,
      selectedFlavour ? `*Flavour:* ${selectedFlavour}` : '',
      selectedAddOns.length > 0 ? `*Add-ons:* ${selectedAddOns.map(id => addOns.find(a => a.id === id)?.label).join(', ')}` : '',
      message ? `*Message on Cake:* ${message}` : '',
      `*Quantity:* ${quantity}`,
      `*Total:* Rs. ${totalPrice.toLocaleString()}`,
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/923270203490?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-[#FFFBF8]">
      <div className="px-4 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-[#98898D] flex-wrap">
          <Link href="/" className="hover:text-[#F283AE] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/shop/${categorySlug}`} className="hover:text-[#F283AE] transition-colors">{categoryInfo.name}</Link>
          <span>/</span>
          <span className="text-[#2C2C2C] font-medium">{cakeProduct.name}</span>
        </div>
      </div>

      <section className="px-4 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative">
              <div className="sticky top-24">
                <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
                  {cakeProduct.image ? (
                    <img src={cakeProduct.image} alt={cakeProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center"><span className="text-8xl block mb-4">🎂</span><p className="text-[#98898D] text-sm font-medium">Custom Design</p></div>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-md">
                  <p className="text-xs text-[#98898D]">Starting from</p>
                  <p className="text-lg font-bold" style={{ color: accentColor }}>Rs. {cakeSizes.length > 0 ? cakeSizes[0].price.toLocaleString() : '0'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: accentColor }}>{categoryInfo.name}</p>
                <h1 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-3">{cakeProduct.name}</h1>
                <p className="text-[#98898D] text-lg">{cakeProduct.description}</p>
              </div>

              <hr className="border-[#FAC1B5]/30" />

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Select Size *</label>
                <div className="grid grid-cols-2 gap-3">
                  {cakeSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedSize === size.value ? 'border-[#F283AE] bg-[#F283AE]/5 shadow-sm' : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <p className="font-semibold text-[#2C2C2C]">{size.label}</p>
                      <p className="text-sm font-bold" style={{ color: accentColor }}>Rs. {size.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Select Shape *</label>
                <div className="flex flex-wrap gap-3">
                  {CAKE_SHAPES.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        selectedShape === shape ? 'border-[#F283AE] bg-[#F283AE]/5 shadow-sm' : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <span className="font-medium text-[#2C2C2C]">{shape === 'Heart' ? '❤️' : shape === 'Round' ? '⭕' : '⬜'} {shape}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Select Flavour *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {flavours.map((flavour) => (
                    <button
                      key={flavour}
                      onClick={() => setSelectedFlavour(flavour)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedFlavour === flavour ? 'border-[#F283AE] bg-[#F283AE]/5 shadow-sm' : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <p className="font-medium text-[#2C2C2C] text-sm">{flavour}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Message on Cake <span className="text-[#98898D] font-normal">(Optional)</span></label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Sarah!"
                  className="w-full px-4 py-3 border-2 border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Add-ons <span className="text-[#98898D] font-normal">(Optional)</span></label>
                <div className="space-y-2">
                  {addOns.map((addOn) => (
                    <label
                      key={addOn.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddOns.includes(addOn.id) ? 'border-[#F283AE] bg-[#F283AE]/5' : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedAddOns([...selectedAddOns, addOn.id]);
                            else setSelectedAddOns(selectedAddOns.filter(id => id !== addOn.id));
                          }}
                          className="w-5 h-5 rounded accent-[#F283AE]"
                        />
                        <span className="text-sm text-[#2C2C2C]">{addOn.label}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: accentColor }}>Rs. {addOn.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"><Minus size={18} className="text-[#2C2C2C]" /></button>
                  <span className="text-xl font-bold text-[#2C2C2C] w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#F283AE] transition-colors"><Plus size={18} className="text-[#2C2C2C]" /></button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#FAC1B5]/20 shadow-sm space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#98898D]">Cake ({cakeSizes.find(s => s.value === selectedSize)?.label})</span>
                  <span className="text-[#2C2C2C] font-medium">Rs. {sizePrice.toLocaleString()}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#98898D]">Add-ons ({selectedAddOns.length})</span>
                    <span className="text-[#2C2C2C] font-medium">Rs. {addOnsTotal.toLocaleString()}</span>
                  </div>
                )}
                <hr className="border-[#FAC1B5]/30" />
                <div className="flex justify-between items-center">
                  <span className="text-[#2C2C2C] font-semibold">Total</span>
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={handleOrderNow} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-all hover:shadow-lg active:scale-[0.98]"><ShoppingBag size={20} /> Order via WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
