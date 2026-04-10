-- Supabase Massive SQL Migration Script for Minas Bakeshop

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_slug TEXT REFERENCES categories(slug) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  base_price NUMERIC,
  has_flavours BOOLEAN DEFAULT false,
  has_add_ons BOOLEAN DEFAULT false,
  flowers_note TEXT,
  UNIQUE(category_slug, slug)
);

CREATE TABLE product_sizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_slug TEXT, -- NULL for global cake sizes
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  price NUMERIC NOT NULL
);

CREATE TABLE flavours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE add_ons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  price NUMERIC NOT NULL
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE flavours ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_sizes" ON product_sizes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on flavours" ON flavours FOR SELECT USING (true);
CREATE POLICY "Allow public read access on add_ons" ON add_ons FOR SELECT USING (true);
CREATE POLICY "Allow public read access on approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow anonymous users to insert reviews" ON reviews FOR INSERT WITH CHECK (true);

-- 5. Seed Data

INSERT INTO categories (slug, name, description, type) VALUES ('3d-cakes', '3D Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('anniversary-cakes', 'Anniversary Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('baby-cakes', 'Baby Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('bento-cakes', 'Bento Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('classic-cakes', 'Classic Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('dholki-mehndi-cakes', 'Dholki / Mehndi Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('eid-cakes', 'Eid Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('floral-design-cakes', 'Floral Design Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('fondant-cakes', 'Fondant Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('football-themed-cakes', 'Football Themed Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('fresh-flower-cakes', 'Fresh Flower Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('mothers-day-cakes', 'Mother''s Day Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('umrah-hajj-cakes', 'Umrah / Hajj Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('valentines-day-cakes', 'Valentine''s Day Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('vintage-cakes', 'Vintage Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('wedding-cakes', 'Wedding Cakes', NULL, 'cake') ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('wedding-cakes', 'elegant-white-pearl', 'Elegant White Pearl', 'Pristine white elegance for your special day', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%201-Gzh3voS2x4IOyNayA75ewMpxgs1D9f.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('wedding-cakes', 'rose-garden-romance', 'Rose Garden Romance', 'Romantic floral design with delicate roses', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20%20Cake%202-rfC1MHHldanXnpXD8WQeeQ5YoteYiC.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('wedding-cakes', 'golden-anniversary', 'Golden Anniversary', 'Luxurious gold accents for milestone celebrations', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%203-oGxeaqtftrLo84UJLkrSPCG8ToS0Gy.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('wedding-cakes', 'blush-and-gold', 'Blush & Gold', 'Soft blush tones with gold leaf details', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%204-5Aq2nyCNAUVjfIMHd9Ax1GyDm37kak.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('wedding-cakes', 'enchanted-garden', 'Enchanted Garden', 'A fairy-tale cake with trailing florals', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%205-5tZM5mqJDQmSMUFdGLSYoLFsRGILj3.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('valentines-day-cakes', 'love-in-bloom', 'Love In Bloom', 'Floral romance in every layer', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%201-cmkdZkpFbHP3RZvwt4Ldhjrkm1PYux.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('valentines-day-cakes', 'romantic-red-velvet', 'Romantic Red Velvet', 'Rich red velvet with cream cheese frosting', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%202-HJ2Zc97xRwqxW8HMTv7QcPIDH5707O.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('valentines-day-cakes', 'sweetheart-delight', 'Sweetheart Delight', 'Sweet heart-shaped masterpiece', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%203-x2qeYtaiYVGexoVnwGvW0TyErL8rXs.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('valentines-day-cakes', 'cupids-choice', 'Cupid''s Choice', 'Elegant design for the romantic at heart', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%204-lzlna8Frr2ICkqICvAbkxv1WaYvUTR.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('valentines-day-cakes', 'eternal-love', 'Eternal Love', 'Timeless beauty for Valentine celebrations', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%205-RQRXuuu9hhmHLiT2UOegkYtMNotXBH.jpeg', true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('3d-cakes', 'sculpted-character', 'Sculpted Character', '3D character cake, fully customizable', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('3d-cakes', 'themed-sculpture', 'Themed Sculpture', 'Custom 3D themed design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('3d-cakes', 'whimsical-creation', 'Whimsical Creation', 'Fun and creative 3D cake art', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('3d-cakes', 'stacked-wonder', 'Stacked Wonder', 'Multi-tier 3D masterpiece', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('anniversary-cakes', 'golden-years', 'Golden Years', 'Celebrate milestones in style', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('anniversary-cakes', 'silver-elegance', 'Silver Elegance', 'Sophisticated silver-themed design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('anniversary-cakes', 'love-forever', 'Love Forever', 'Romantic anniversary celebration', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('anniversary-cakes', 'milestone-marvel', 'Milestone Marvel', 'Custom anniversary numbers cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('baby-cakes', 'welcome-baby', 'Welcome Baby', 'Soft pastel design for newborns', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('baby-cakes', 'teddy-bear-dream', 'Teddy Bear Dream', 'Adorable teddy bear themed cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('baby-cakes', 'stork-delivery', 'Stork Delivery', 'Classic baby shower design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('baby-cakes', 'little-prince', 'Little Prince', 'Royal themed baby cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('baby-cakes', 'first-birthday-star', 'First Birthday Star', 'Perfect for turning one', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('bento-cakes', 'classic-bento', 'Classic Bento', 'Minimal and elegant bento cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('bento-cakes', 'message-bento', 'Message Bento', 'Bento cake with custom message', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('bento-cakes', 'heart-bento', 'Heart Bento', 'Heart-shaped bento design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('bento-cakes', 'pastel-bento', 'Pastel Bento', 'Soft pastel colored bento cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('classic-cakes', 'vanilla-dream', 'Vanilla Dream', 'Timeless vanilla buttercream beauty', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('classic-cakes', 'chocolate-indulgence', 'Chocolate Indulgence', 'Rich chocolate layered cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('classic-cakes', 'red-velvet-classic', 'Red Velvet Classic', 'Classic red velvet perfection', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('classic-cakes', 'strawberry-shortcake', 'Strawberry Shortcake', 'Fresh strawberry delight', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('dholki-mehndi-cakes', 'mehndi-magic', 'Mehndi Magic', 'Henna-inspired intricate design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('dholki-mehndi-cakes', 'dholki-beats', 'Dholki Beats', 'Vibrant dholki celebration theme', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('dholki-mehndi-cakes', 'bridal-henna', 'Bridal Henna', 'Elegant bridal mehndi design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('dholki-mehndi-cakes', 'colorful-celebration', 'Colorful Celebration', 'Festive and colorful design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('eid-cakes', 'eid-mubarak', 'Eid Mubarak', 'Classic Eid celebration cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('eid-cakes', 'crescent-moon', 'Crescent Moon', 'Elegant crescent and star design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('eid-cakes', 'lantern-glow', 'Lantern Glow', 'Beautiful lantern themed cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('eid-cakes', 'festive-joy', 'Festive Joy', 'Joyful festive celebration design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('floral-design-cakes', 'garden-bloom', 'Garden Bloom', 'Lush garden of buttercream flowers', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('floral-design-cakes', 'pastel-petals', 'Pastel Petals', 'Soft pastel floral arrangement', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('floral-design-cakes', 'wildflower-meadow', 'Wildflower Meadow', 'Natural wildflower design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('floral-design-cakes', 'rose-cascade', 'Rose Cascade', 'Cascading rose design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fondant-cakes', 'smooth-elegance', 'Smooth Elegance', 'Perfectly smooth fondant finish', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fondant-cakes', 'sculpted-fondant', 'Sculpted Fondant', 'Detailed fondant sculpting', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fondant-cakes', 'modern-geometric', 'Modern Geometric', 'Clean geometric fondant design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fondant-cakes', 'ruffled-beauty', 'Ruffled Beauty', 'Beautiful fondant ruffles', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('football-themed-cakes', 'stadium-cake', 'Stadium Cake', 'Football stadium themed design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('football-themed-cakes', 'jersey-cake', 'Jersey Cake', 'Custom team jersey cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('football-themed-cakes', 'football-field', 'Football Field', 'Green field with goalposts', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('football-themed-cakes', 'champions-trophy', 'Champions Trophy', 'Trophy celebration cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fresh-flower-cakes', 'rose-elegance', 'Rose Elegance', 'Fresh roses on buttercream', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fresh-flower-cakes', 'sunflower-sunshine', 'Sunflower Sunshine', 'Bright sunflower arrangement', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fresh-flower-cakes', 'lavender-fields', 'Lavender Fields', 'Fragrant lavender decoration', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('fresh-flower-cakes', 'mixed-bouquet', 'Mixed Bouquet', 'Beautiful mixed flower cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('mothers-day-cakes', 'best-mom', 'Best Mom', 'Special design for the best mom', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('mothers-day-cakes', 'floral-love', 'Floral Love', 'Flowers for our beloved mothers', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('mothers-day-cakes', 'elegant-tribute', 'Elegant Tribute', 'Elegant cake to honor mothers', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('mothers-day-cakes', 'pastel-paradise', 'Pastel Paradise', 'Pastel themed motherly love', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('umrah-hajj-cakes', 'kaaba-design', 'Kaaba Design', 'Beautiful Kaaba themed cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('umrah-hajj-cakes', 'umrah-mubarak', 'Umrah Mubarak', 'Celebrate the sacred journey', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('umrah-hajj-cakes', 'hajj-blessings', 'Hajj Blessings', 'Blessed Hajj celebration cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('umrah-hajj-cakes', 'madinah-theme', 'Madinah Theme', 'Beautiful Madinah themed design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('vintage-cakes', 'retro-charm', 'Retro Charm', 'Vintage-inspired buttercream design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('vintage-cakes', 'antique-rose', 'Antique Rose', 'Old-world rose arrangement', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('vintage-cakes', 'lace-elegance', 'Lace Elegance', 'Delicate lace pattern cake', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, has_flavours, has_add_ons) VALUES ('vintage-cakes', 'vintage-pearl', 'Vintage Pearl', 'Pearl and ribbon vintage design', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO categories (slug, name, description, type) VALUES ('desserts', 'Desserts', 'Delicious homemade desserts', 'dessert') ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, base_price, has_flavours, has_add_ons) VALUES ('desserts', 'banana-bread', 'Banana Bread', 'Freshly baked banana bread with a moist, tender crumb.', 900, false, false) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, base_price, has_flavours, has_add_ons) VALUES ('desserts', 'brownies', 'Brownies', 'Rich, fudgy brownies with a perfect crispy top.', NULL, false, true) ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('brownies', '6 pieces', '6', 1600);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('brownies', '9 pieces', '9', 2400);
INSERT INTO products (category_slug, slug, name, description, base_price, has_flavours, has_add_ons) VALUES ('desserts', 'cookies', 'Cookies', 'Soft and chewy cookies baked fresh to order.', NULL, false, false) ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('cookies', '4 cookies', '4', 850);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('cookies', '6 cookies', '6', 1300);
INSERT INTO products (category_slug, slug, name, description, base_price, has_flavours, has_add_ons) VALUES ('desserts', 'cupcakes', 'Cupcakes', 'Beautifully decorated cupcakes in your choice of flavour.', NULL, true, true) ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('cupcakes', '6 cupcakes', '6', 1600);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES ('cupcakes', '12 cupcakes', '12', 3000);
INSERT INTO categories (slug, name, description, type) VALUES ('luxury-gifting', 'Luxury Gifting', 'Premium gift boxes', 'luxury') ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, base_price, has_flavours, has_add_ons, flowers_note) VALUES ('luxury-gifting', '2-cupcake-bento-box', '2 Cupcake Bento Box', 'Elegant bento box with 2 premium decorated cupcakes.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bento%202%20cupcakes-ObNydCNfi30icsrqG5fJ0DaFjveZfK.jpeg', 2300, true, true, NULL) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, base_price, has_flavours, has_add_ons, flowers_note) VALUES ('luxury-gifting', '5-cupcake-bento-box', '5 Cupcake Bento Box', 'Premium bento box with 5 beautifully decorated cupcakes.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bento%205%20cupcakes-zBsUAp4GRsKbVA2sACl0RrBZmNkhZb.jpeg', 2700, true, true, NULL) ON CONFLICT DO NOTHING;
INSERT INTO products (category_slug, slug, name, description, image_url, base_price, has_flavours, has_add_ons, flowers_note) VALUES ('luxury-gifting', 'bento-flower-box', 'Bento & Flower Box', 'Beautiful bento cake paired with fresh flowers. Flowers selected based on availability.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bento%20Flower%20Box%20-G5Tw02isZu3zxVfJ0fw4KsL7jAkMr2.jpeg', 2600, true, true, 'Flowers will be selected based on availability. No custom flower selection option.') ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_slug, label, value, price) VALUES (NULL, '1 Pound', '1lb', 2600);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES (NULL, '2 Pounds', '2lb', 4200);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES (NULL, '3 Pounds', '3lb', 6000);
INSERT INTO product_sizes (product_slug, label, value, price) VALUES (NULL, '4 Pounds', '4lb', 8000);
INSERT INTO flavours (name) VALUES ('French Vanilla') ON CONFLICT DO NOTHING;
INSERT INTO flavours (name) VALUES ('Celestial Caramel') ON CONFLICT DO NOTHING;
INSERT INTO flavours (name) VALUES ('Cherry Chocolate Fantasy') ON CONFLICT DO NOTHING;
INSERT INTO flavours (name) VALUES ('Chocolate Amour') ON CONFLICT DO NOTHING;
INSERT INTO flavours (name) VALUES ('Nutella Caramel') ON CONFLICT DO NOTHING;
INSERT INTO add_ons (slug, label, price) VALUES ('message-card', 'Custom Message Card (Printed / Handwritten)', 150) ON CONFLICT DO NOTHING;
INSERT INTO add_ons (slug, label, price) VALUES ('candles', 'Extra Candles (Themed / Plain)', 30) ON CONFLICT DO NOTHING;
INSERT INTO add_ons (slug, label, price) VALUES ('topper', 'Cake Topper (Happy Birthday, Eid, Love)', 250) ON CONFLICT DO NOTHING;
INSERT INTO add_ons (slug, label, price) VALUES ('balloon', 'Helium Balloon', 200) ON CONFLICT DO NOTHING;
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Happy Customer', 5, 'Thankyouuu so so so much for making very cutesy boxes and the cake was sooo good. The packaging ufff I Loved ittt!!! And I requested you just 3-4 hours before to add one more deal in it and you happily did without any fuss and extra charges. I LOVE LOVE LOVEDDD ORDERING FROM YOU. I''ll definitely be ordering from you next time inshallah thankyouuu so muchhh', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('First Time Customer', 5, 'The cake was very delicious... its our 1st experience but you made it worth remembered. We will definitely love to order again on next event in sha allah', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Satisfied Customer', 5, 'The cake was amazing and loved how it was exactly like the picture, also the packaging was so cute, would look forward to order more from you', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Cake Lover', 5, 'The cake was sooo good, we ate it up within an hour. Loved everything! Thankyou so much!', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Family Order', 5, 'Hey!! Thank u for the cake it was soooo yummy. My mom and my sisters loved it so much and we were fighting over bites it was so good and my sister was soo happy with it', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Birthday Order', 5, 'Everyone loved the cakee smmm. The cake itself tasted SO GOOD. More than half cake vanished within minutes haha. Loved the cake, the aesthetic and especially the cute little note. 10/10 would deff try again', NOW(), 'approved');
INSERT INTO reviews (name, rating, review_text, created_at, status) VALUES ('Cherry Chocolate Fan', 5, 'Hey! I hope you are doing well. The cake was absolutely amazing, beautiful & cute. The aroma i got just after opening the box ohhhhhh soooo good. I even like the packing. Flavour was great i m glad i went with cherry chocolate fantasy. You actually made cake came out of fantasy world.', NOW(), 'approved');

-- 6. Setup Supabase Storage for Future Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Allow public to read images out of the bucket
CREATE POLICY "Allow public read access on product-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

-- Allow users (or you via dashboard) to insert images into the bucket
CREATE POLICY "Allow public insert on product-images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');
