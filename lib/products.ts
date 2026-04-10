import { supabase } from './supabase';

export interface CategoryInfo {
  id: string; // db uses slug
  name: string;
  description: string;
  type: string;
}

export interface CakeProductItem {
  id: string; // db uses slug
  name: string;
  description: string;
  image?: string;
  price?: number;
  hasFlavours?: boolean;
  hasAddOns?: boolean;
  flowersNote?: string;
}

export interface SizeOption {
  label: string;
  value: string;
  price: number;
}

// Helper to get category info
export async function getCategoryInfo(slug: string): Promise<CategoryInfo | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error || !data) return null;
  return { id: data.slug, name: data.name, description: data.description, type: data.type };
}

export async function getProductTypeFromSlug(slug: string): Promise<'cake' | 'dessert' | 'luxury'> {
  const info = await getCategoryInfo(slug);
  return (info?.type as 'cake' | 'dessert' | 'luxury') || 'cake';
}

// Fetch products by category
export async function getCakeProductsByCategory(categorySlug: string): Promise<CakeProductItem[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug);
    
  if (error || !data) return [];
  return data.map(p => ({
    id: p.slug,
    name: p.name,
    description: p.description,
    image: p.image_url,
    price: p.base_price,
    hasFlavours: p.has_flavours,
    hasAddOns: p.has_add_ons,
    flowersNote: p.flowers_note
  }));
}

// Fetch single product
export async function getCakeProduct(categorySlug: string, productSlug: string): Promise<CakeProductItem | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .eq('slug', productSlug)
    .single();
    
  if (error || !data) return null;
  return {
    id: data.slug,
    name: data.name,
    description: data.description,
    image: data.image_url,
    price: data.base_price,
    hasFlavours: data.has_flavours,
    hasAddOns: data.has_add_ons,
    flowersNote: data.flowers_note
  };
}

// Fetch all categories wrapper
export async function getAllCategories(): Promise<CategoryInfo[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  if (error || !data) return [];
  return data.map(c => ({ id: c.slug, name: c.name, description: c.description, type: c.type }));
}

// GLOBAL CAKE SIZES
export async function getCakeSizes(): Promise<SizeOption[]> {
  const { data, error } = await supabase
    .from('product_sizes')
    .select('*')
    .is('product_slug', null); // null means global cake sizes
  if (error || !data) return [];
  return data.map(s => ({ label: s.label, value: s.value, price: s.price }));
}

// SPECIFIC SIZES
export async function getProductSizes(productSlug: string): Promise<SizeOption[]> {
  const { data, error } = await supabase
    .from('product_sizes')
    .select('*')
    .eq('product_slug', productSlug);
  if (error || !data) return [];
  return data.map(s => ({ label: s.label, value: s.value, price: s.price }));
}

export async function getFlavours(): Promise<string[]> {
  const { data, error } = await supabase.from('flavours').select('name');
  if (error || !data) return [];
  return data.map(f => f.name);
}

export async function getAddOns(): Promise<{ id: string; label: string; price: number }[]> {
  const { data, error } = await supabase.from('add_ons').select('*');
  if (error || !data) return [];
  return data.map(a => ({ id: a.slug, label: a.label, price: a.price }));
}

// Hardcoded for UI fallbacks on fast client-rendering blocks before DB loads
// Ideally we transition the whole app to server components, but this keeps the current architecture intact.
export const CAKE_CATEGORIES_STATIC = [
  { id: 'vintage-cakes', name: 'Vintage Cakes' },
  { id: 'wedding-cakes', name: 'Wedding Cakes' },
  { id: 'baby-cakes', name: 'Baby Cakes' },
];
