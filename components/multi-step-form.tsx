'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Upload, Check } from 'lucide-react';

// Exact flavours from requirements
const FLAVOURS = [
  'French Vanilla',
  'Celestial Caramel',
  'Cherry Chocolate Fantasy',
  'Chocolate Amour',
  'Nutella Caramel'
];

// Cake sizes
const CAKE_SIZES = ['1 lb', '2 lb', '3 lb', '4 lb', '5 lb'];

// Cupcake sizes
const CUPCAKE_SIZES = [
  { label: 'Box of 6', value: '6' },
  { label: 'Box of 12', value: '12' },
];

// Cake shapes
const CAKE_SHAPES = ['Heart', 'Round', 'Square'];

// Time slots from requirements (9:00 AM - 9:00 PM)
const TIME_SLOTS = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 9:00 PM',
];

// Add-ons with exact prices from requirements
const ADD_ONS = [
  { id: 'message-card', label: 'Custom Message Card (Printed / Handwritten)', price: 150 },
  { id: 'candles', label: 'Extra Candles (Themed / Plain)', price: 30 },
  { id: 'topper', label: 'Cake Topper (Happy Birthday, Eid, Love)', price: 250 },
  { id: 'balloon', label: 'Helium Balloon', price: 200 },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Customer Details
    name: '',
    phone: '',
    email: '',
    // Step 2: Order Type
    orderType: 'cake' as 'cake' | 'cupcakes',
    // Step 3: Product Details
    flavour: '',
    size: '2 lb',
    cupcakeSize: '6',
    shape: 'Round',
    // Step 4: Customization
    theme: '',
    colorPreferences: '',
    addOns: [] as string[],
    messageOnCake: '',
    referenceImage: null as File | null,
    specialInstructions: '',
    // Step 5: Delivery/Pickup
    deliveryType: 'delivery' as 'delivery' | 'pickup',
    address: '',
    date: '',
    timeSlot: '',
    // Step 6: Confirmation
    termsAccepted: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddOnChange = (addOnId: string) => {
    const newAddOns = formData.addOns.includes(addOnId)
      ? formData.addOns.filter(a => a !== addOnId)
      : [...formData.addOns, addOnId];
    setFormData({ ...formData, addOns: newAddOns });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, referenceImage: file });
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAddOnsTotal = () => {
    return formData.addOns.reduce((total, addOnId) => {
      const addOn = ADD_ONS.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '', phone: '', email: '', orderType: 'cake', flavour: '', size: '2 lb',
      cupcakeSize: '6', shape: 'Round', theme: '', colorPreferences: '', addOns: [],
      messageOnCake: '', referenceImage: null, specialInstructions: '',
      deliveryType: 'delivery', address: '', date: '', timeSlot: '', termsAccepted: false,
    });
    setImagePreview(null);
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 px-6 md:px-12 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#98B8B9] rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif text-[#2C2C2C] mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-[#98898D] mb-8">
            We&apos;ll contact you on WhatsApp within 12 hours for confirmation and payment details.
          </p>
          <div className="bg-[#F0E8DF]/30 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-[#2C2C2C] mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#98898D]">Name:</span> <span className="font-medium">{formData.name}</span></p>
              <p><span className="text-[#98898D]">Phone:</span> <span className="font-medium">{formData.phone}</span></p>
              <p><span className="text-[#98898D]">Order Type:</span> <span className="font-medium capitalize">{formData.orderType}</span></p>
              <p><span className="text-[#98898D]">Flavour:</span> <span className="font-medium">{formData.flavour}</span></p>
              <p><span className="text-[#98898D]">{formData.orderType === 'cake' ? 'Size' : 'Quantity'}:</span> <span className="font-medium">{formData.orderType === 'cake' ? formData.size : `Box of ${formData.cupcakeSize}`}</span></p>
              <p><span className="text-[#98898D]">Delivery Method:</span> <span className="font-medium capitalize">{formData.deliveryType}</span></p>
              <p><span className="text-[#98898D]">Date:</span> <span className="font-medium">{formData.date}</span></p>
              <p><span className="text-[#98898D]">Time:</span> <span className="font-medium">{formData.timeSlot}</span></p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors"
            >
              Place Another Order
            </button>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-[#FAC1B5] text-[#2C2C2C] rounded-full font-semibold hover:bg-[#F0E8DF] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 md:px-12 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-[#F283AE] font-medium mb-2">
            Please read our{' '}
            <Link href="/terms" className="underline hover:text-[#E86FA3]">
              Terms & Conditions
            </Link>{' '}
            before filling out this custom order form.
          </p>
          <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2">Custom Order Form</h1>
          <p className="text-[#98898D]">Step {step} of 6</p>
          
          {/* Progress Bar */}
          <div className="mt-6 h-2 bg-[#F0E8DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F283AE] to-[#C59FBE] transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="mt-4 flex justify-between text-xs text-[#98898D]">
            <span className={step >= 1 ? 'text-[#F283AE] font-medium' : ''}>Details</span>
            <span className={step >= 2 ? 'text-[#F283AE] font-medium' : ''}>Type</span>
            <span className={step >= 3 ? 'text-[#F283AE] font-medium' : ''}>Product</span>
            <span className={step >= 4 ? 'text-[#F283AE] font-medium' : ''}>Custom</span>
            <span className={step >= 5 ? 'text-[#F283AE] font-medium' : ''}>Delivery</span>
            <span className={step >= 6 ? 'text-[#F283AE] font-medium' : ''}>Confirm</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Customer Details</h2>
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="03XX XXXXXXX"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Step 2: Order Type */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Select Product Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.orderType === 'cake'
                      ? 'border-[#F283AE] bg-[#F283AE]/10'
                      : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                  }`}
                >
                  <input
                    type="radio"
                    value="cake"
                    checked={formData.orderType === 'cake'}
                    onChange={(e) => handleInputChange('orderType', e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FAC1B5]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">🎂</span>
                    </div>
                    <p className="font-semibold text-[#2C2C2C]">Cake</p>
                    <p className="text-sm text-[#98898D] mt-1">Custom cakes in various sizes</p>
                  </div>
                </label>
                <label
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.orderType === 'cupcakes'
                      ? 'border-[#F283AE] bg-[#F283AE]/10'
                      : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                  }`}
                >
                  <input
                    type="radio"
                    value="cupcakes"
                    checked={formData.orderType === 'cupcakes'}
                    onChange={(e) => handleInputChange('orderType', e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C59FBE]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">🧁</span>
                    </div>
                    <p className="font-semibold text-[#2C2C2C]">Cupcakes</p>
                    <p className="text-sm text-[#98898D] mt-1">Box of 6 or 12 cupcakes</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Product Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">
                {formData.orderType === 'cake' ? 'Cake' : 'Cupcake'} Details
              </h2>
              
              {/* Flavour */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Flavour *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLAVOURS.map((flavour) => (
                    <label
                      key={flavour}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.flavour === flavour
                          ? 'border-[#F283AE] bg-[#F283AE]/10'
                          : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <input
                        type="radio"
                        value={flavour}
                        checked={formData.flavour === flavour}
                        onChange={(e) => handleInputChange('flavour', e.target.value)}
                        className="hidden"
                      />
                      <p className="font-medium text-[#2C2C2C]">{flavour}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size - Different for Cake vs Cupcakes */}
              {formData.orderType === 'cake' ? (
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Size *</label>
                  <div className="flex flex-wrap gap-3">
                    {CAKE_SIZES.map((size) => (
                      <label
                        key={size}
                        className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.size === size
                            ? 'border-[#F283AE] bg-[#F283AE]/10'
                            : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                        }`}
                      >
                        <input
                          type="radio"
                          value={size}
                          checked={formData.size === size}
                          onChange={(e) => handleInputChange('size', e.target.value)}
                          className="hidden"
                        />
                        <p className="font-semibold text-[#2C2C2C]">{size}</p>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Quantity *</label>
                  <div className="flex flex-wrap gap-3">
                    {CUPCAKE_SIZES.map((size) => (
                      <label
                        key={size.value}
                        className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.cupcakeSize === size.value
                            ? 'border-[#F283AE] bg-[#F283AE]/10'
                            : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                        }`}
                      >
                        <input
                          type="radio"
                          value={size.value}
                          checked={formData.cupcakeSize === size.value}
                          onChange={(e) => handleInputChange('cupcakeSize', e.target.value)}
                          className="hidden"
                        />
                        <p className="font-semibold text-[#2C2C2C]">{size.label}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Shape - Only for Cakes */}
              {formData.orderType === 'cake' && (
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Shape *</label>
                  <div className="flex flex-wrap gap-3">
                    {CAKE_SHAPES.map((shape) => (
                      <label
                        key={shape}
                        className={`px-6 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.shape === shape
                            ? 'border-[#F283AE] bg-[#F283AE]/10'
                            : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                        }`}
                      >
                        <input
                          type="radio"
                          value={shape}
                          checked={formData.shape === shape}
                          onChange={(e) => handleInputChange('shape', e.target.value)}
                          className="hidden"
                        />
                        <p className="font-semibold text-[#2C2C2C]">{shape}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Customization */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Customization Details</h2>
              
              {/* Theme */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Theme</label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  placeholder="e.g., Birthday, Wedding, Baby Shower, Eid"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                />
              </div>

              {/* Color Preferences */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Color Preferences</label>
                <input
                  type="text"
                  value={formData.colorPreferences}
                  onChange={(e) => handleInputChange('colorPreferences', e.target.value)}
                  placeholder="e.g., Pink and white, gold accents"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                />
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Add-ons (Optional)</label>
                <div className="space-y-3">
                  {ADD_ONS.map((addOn) => (
                    <label
                      key={addOn.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.addOns.includes(addOn.id)
                          ? 'border-[#F283AE] bg-[#F283AE]/10'
                          : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formData.addOns.includes(addOn.id)}
                          onChange={() => handleAddOnChange(addOn.id)}
                          className="w-5 h-5 rounded border-[#FAC1B5] accent-[#F283AE]"
                        />
                        <span className="text-[#2C2C2C]">{addOn.label}</span>
                      </div>
                      <span className="text-[#F283AE] font-semibold">Rs. {addOn.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message on Cake/Cupcake */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Message on {formData.orderType === 'cake' ? 'Cake' : 'Cupcake'}
                </label>
                <input
                  type="text"
                  value={formData.messageOnCake}
                  onChange={(e) => handleInputChange('messageOnCake', e.target.value)}
                  placeholder="e.g., Happy Birthday Sarah!"
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                />
              </div>

              {/* Reference Image */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Reference Image</label>
                <div className="border-2 border-dashed border-[#FAC1B5]/30 rounded-xl p-6 text-center hover:border-[#F283AE] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div>
                        <img src={imagePreview} alt="Preview" className="h-40 mx-auto mb-3 rounded-lg object-cover" />
                        <p className="text-sm text-[#98898D]">Click to change image</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="mx-auto text-[#F283AE] mb-3" />
                        <p className="text-[#2C2C2C] font-medium">Click to upload reference image</p>
                        <p className="text-sm text-[#98898D] mt-1">JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Special Instructions</label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any additional details or requests..."
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors resize-none h-24"
                />
              </div>
            </div>
          )}

          {/* Step 5: Delivery/Pickup */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Delivery / Pickup Details</h2>
              
              {/* Delivery Type */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Order Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.deliveryType === 'delivery'
                        ? 'border-[#F283AE] bg-[#F283AE]/10'
                        : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                    }`}
                  >
                    <input
                      type="radio"
                      value="delivery"
                      checked={formData.deliveryType === 'delivery'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                      className="hidden"
                    />
                    <div className="text-center">
                      <p className="text-2xl mb-2">🚚</p>
                      <p className="font-semibold text-[#2C2C2C]">Delivery</p>
                      <p className="text-xs text-[#98898D] mt-1">(Charges Apply)</p>
                    </div>
                  </label>
                  <label
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.deliveryType === 'pickup'
                        ? 'border-[#F283AE] bg-[#F283AE]/10'
                        : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                    }`}
                  >
                    <input
                      type="radio"
                      value="pickup"
                      checked={formData.deliveryType === 'pickup'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                      className="hidden"
                    />
                    <div className="text-center">
                      <p className="text-2xl mb-2">📍</p>
                      <p className="font-semibold text-[#2C2C2C]">Pickup</p>
                      <p className="text-xs text-[#98898D] mt-1">(Free)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Address (only if delivery selected) */}
              {formData.deliveryType === 'delivery' && (
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Delivery Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Complete delivery address"
                    className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors resize-none h-24"
                    required
                  />
                </div>
              )}

              {/* Pickup Location (only if pickup selected) */}
              {formData.deliveryType === 'pickup' && (
                <div className="bg-[#98B8B9]/10 p-5 rounded-xl border border-[#98B8B9]/30">
                  <p className="font-semibold text-[#2C2C2C] mb-1">Pickup Location</p>
                  <p className="text-[#98898D]">Nawab Town, Lahore, Pakistan</p>
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  {formData.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-2 focus:ring-[#F283AE]/20 transition-colors"
                  required
                />
                <p className="text-xs text-[#98898D] mt-2">Orders must be placed at least 48 hours in advance.</p>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">
                  {formData.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Time *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <label
                      key={slot}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        formData.timeSlot === slot
                          ? 'border-[#F283AE] bg-[#F283AE]/10'
                          : 'border-[#FAC1B5]/30 hover:border-[#FAC1B5]'
                      }`}
                    >
                      <input
                        type="radio"
                        value={slot}
                        checked={formData.timeSlot === slot}
                        onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                        className="hidden"
                      />
                      <p className="font-medium text-[#2C2C2C] text-sm">{slot}</p>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Summary & Confirmation */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">Order Summary & Confirmation</h2>
              
              {/* Order Summary */}
              <div className="bg-[#F0E8DF]/30 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#98898D]">Customer</p>
                    <p className="font-semibold text-[#2C2C2C]">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-[#98898D]">Phone</p>
                    <p className="font-semibold text-[#2C2C2C]">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-[#98898D]">Order Type</p>
                    <p className="font-semibold text-[#2C2C2C] capitalize">{formData.orderType}</p>
                  </div>
                  <div>
                    <p className="text-[#98898D]">Flavour</p>
                    <p className="font-semibold text-[#2C2C2C]">{formData.flavour}</p>
                  </div>
                  <div>
                    <p className="text-[#98898D]">{formData.orderType === 'cake' ? 'Size' : 'Quantity'}</p>
                    <p className="font-semibold text-[#2C2C2C]">
                      {formData.orderType === 'cake' ? formData.size : `Box of ${formData.cupcakeSize}`}
                    </p>
                  </div>
                  {formData.orderType === 'cake' && (
                    <div>
                      <p className="text-[#98898D]">Shape</p>
                      <p className="font-semibold text-[#2C2C2C]">{formData.shape}</p>
                    </div>
                  )}
                  {formData.theme && (
                    <div>
                      <p className="text-[#98898D]">Theme</p>
                      <p className="font-semibold text-[#2C2C2C]">{formData.theme}</p>
                    </div>
                  )}
                  {formData.messageOnCake && (
                    <div className="col-span-2">
                      <p className="text-[#98898D]">Message</p>
                      <p className="font-semibold text-[#2C2C2C]">{formData.messageOnCake}</p>
                    </div>
                  )}
                </div>

                {/* Add-ons */}
                {formData.addOns.length > 0 && (
                  <div className="border-t border-[#FAC1B5]/30 pt-4">
                    <p className="text-[#98898D] mb-2">Add-ons</p>
                    <div className="space-y-1">
                      {formData.addOns.map((addOnId) => {
                        const addOn = ADD_ONS.find(a => a.id === addOnId);
                        return addOn ? (
                          <div key={addOnId} className="flex justify-between text-sm">
                            <span className="text-[#2C2C2C]">{addOn.label}</span>
                            <span className="font-semibold text-[#F283AE]">Rs. {addOn.price}</span>
                          </div>
                        ) : null;
                      })}
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#FAC1B5]/20">
                        <span className="text-[#2C2C2C]">Add-ons Total</span>
                        <span className="text-[#F283AE]">Rs. {calculateAddOnsTotal()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Details */}
                <div className="border-t border-[#FAC1B5]/30 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#98898D]">Method</p>
                      <p className="font-semibold text-[#2C2C2C] capitalize">{formData.deliveryType}</p>
                    </div>
                    <div>
                      <p className="text-[#98898D]">Date</p>
                      <p className="font-semibold text-[#2C2C2C]">{formData.date}</p>
                    </div>
                    <div>
                      <p className="text-[#98898D]">Time</p>
                      <p className="font-semibold text-[#2C2C2C]">{formData.timeSlot}</p>
                    </div>
                    {formData.deliveryType === 'delivery' && formData.address && (
                      <div className="col-span-2">
                        <p className="text-[#98898D]">Address</p>
                        <p className="font-semibold text-[#2C2C2C]">{formData.address}</p>
                      </div>
                    )}
                    {formData.deliveryType === 'pickup' && (
                      <div className="col-span-2">
                        <p className="text-[#98898D]">Pickup Location</p>
                        <p className="font-semibold text-[#2C2C2C]">Nawab Town, Lahore</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-[#C59FBE]/10 p-4 rounded-xl border border-[#C59FBE]/30">
                <p className="text-sm text-[#2C2C2C]">
                  <span className="font-semibold">Note:</span> Orders must be placed at least 48 hours in advance. You will receive a WhatsApp confirmation within 12 hours with payment details and final confirmation.
                </p>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-[#FAC1B5]/30 hover:border-[#FAC1B5] transition-colors">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-[#FAC1B5] accent-[#F283AE]"
                  required
                />
                <span className="text-sm text-[#2C2C2C]">
                  I confirm that I have read and agree to the{' '}
                  <Link href="/terms" className="text-[#F283AE] underline hover:text-[#E86FA3]" target="_blank">
                    Terms & Conditions
                  </Link>.
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#FAC1B5] text-[#2C2C2C] rounded-full font-semibold hover:bg-[#F0E8DF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors ml-auto"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.termsAccepted}
                className="ml-auto px-8 py-3 bg-[#F283AE] text-white rounded-full font-semibold hover:bg-[#E86FA3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
