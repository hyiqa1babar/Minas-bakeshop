-- Additional SQL setup for Admin Dashboard

-- 1. Create Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- e.g. ORD-1001
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  order_type TEXT NOT NULL, -- 'custom', 'product'
  items JSONB NOT NULL, -- Storing cart details or custom requirements
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Delivered', 'Cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public to place orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public to insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Allow admins (Authenticated users in Supabase Auth) to read and update orders
CREATE POLICY "Allow admins to read orders" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow admins to update orders" ON orders FOR UPDATE TO authenticated USING (true);


-- 2. Upgrade Product Policies for Admin Capabilities
-- By default, products was read-only for public. We activate modifications for authenticated users!
CREATE POLICY "Allow admins to insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow admins to delete products" ON products FOR DELETE TO authenticated USING (true);

-- 3. Upgrade Category Policies 
CREATE POLICY "Allow admins to insert categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to update categories" ON categories FOR UPDATE TO authenticated USING (true);

-- 4. Upgrade Add Ons, Sizes, Flavours
CREATE POLICY "Allow admins to insert add_ons" ON add_ons FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to update add_ons" ON add_ons FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow admins to delete add_ons" ON add_ons FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow admins to insert sizes" ON product_sizes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to update sizes" ON product_sizes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow admins to delete sizes" ON product_sizes FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow admins to insert flavours" ON flavours FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow admins to delete flavours" ON flavours FOR DELETE TO authenticated USING (true);

-- 5. Upgrade Reviews Policies
CREATE POLICY "Allow admins to update reviews" ON reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow admins to delete reviews" ON reviews FOR DELETE TO authenticated USING (true);

-- 6. Storage Bucket Upgrade
CREATE POLICY "Allow admins to update product-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Allow admins to delete product-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');
