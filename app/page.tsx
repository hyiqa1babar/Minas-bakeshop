import HeroSlider from '@/components/hero-slider'
import CategoryCarousel from '@/components/category-carousel'
import ReviewsSection from '@/components/reviews-section'
import Footer from '@/components/footer'

export const metadata = {
  title: "Mina's Bakeshop - Crafting Sweetness Since 2024",
  description:
    'Minas Bakeshop creates beautiful, custom cakes for weddings, celebrations, and special moments. Explore our collection of elegant vintage, baby, floral, and luxury gift cakes.',
}

// Product data for carousels - each item links to its own product detail page
const weddingProducts = [
  { id: 'w1', name: 'Elegant White Pearl', category: 'WEDDING', accentColor: '#C59FBE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%201-Gzh3voS2x4IOyNayA75ewMpxgs1D9f.jpeg', productLink: '/shop/wedding-cakes/elegant-white-pearl' },
  { id: 'w2', name: 'Rose Garden Romance', category: 'WEDDING', accentColor: '#C59FBE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20%20Cake%202-rfC1MHHldanXnpXD8WQeeQ5YoteYiC.jpeg', productLink: '/shop/wedding-cakes/rose-garden-romance' },
  { id: 'w3', name: 'Golden Anniversary', category: 'WEDDING', accentColor: '#C59FBE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%203-oGxeaqtftrLo84UJLkrSPCG8ToS0Gy.jpeg', productLink: '/shop/wedding-cakes/golden-anniversary' },
  { id: 'w4', name: 'Blush & Gold', category: 'WEDDING', accentColor: '#C59FBE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%204-5Aq2nyCNAUVjfIMHd9Ax1GyDm37kak.jpeg', productLink: '/shop/wedding-cakes/blush-and-gold' },
  { id: 'w5', name: 'Enchanted Garden', category: 'WEDDING', accentColor: '#C59FBE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wedding%20Cake%205-5tZM5mqJDQmSMUFdGLSYoLFsRGILj3.jpeg', productLink: '/shop/wedding-cakes/enchanted-garden' },
]

const valentineProducts = [
  { id: 'v1', name: 'Love In Bloom', category: 'VALENTINE', accentColor: '#F283AE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%201-cmkdZkpFbHP3RZvwt4Ldhjrkm1PYux.jpeg', productLink: '/shop/valentines-day-cakes/love-in-bloom' },
  { id: 'v2', name: 'Romantic Red Velvet', category: 'VALENTINE', accentColor: '#F283AE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%202-HJ2Zc97xRwqxW8HMTv7QcPIDH5707O.jpeg', productLink: '/shop/valentines-day-cakes/romantic-red-velvet' },
  { id: 'v3', name: 'Sweetheart Delight', category: 'VALENTINE', accentColor: '#F283AE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%203-x2qeYtaiYVGexoVnwGvW0TyErL8rXs.jpeg', productLink: '/shop/valentines-day-cakes/sweetheart-delight' },
  { id: 'v4', name: "Cupid's Choice", category: 'VALENTINE', accentColor: '#F283AE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%204-lzlna8Frr2ICkqICvAbkxv1WaYvUTR.jpeg', productLink: '/shop/valentines-day-cakes/cupids-choice' },
  { id: 'v5', name: 'Eternal Love', category: 'VALENTINE', accentColor: '#F283AE', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Valentine%27s%20Day%20Cake%205-RQRXuuu9hhmHLiT2UOegkYtMNotXBH.jpeg', productLink: '/shop/valentines-day-cakes/eternal-love' },
]

const bentoProducts = [
  { id: 'b1', name: '2 Cupcake Bento Box', category: 'BENTO', accentColor: '#98B8B9', price: 2300, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20cupcake%20bento%20box-fWxWmPFyDFVAEPEBxDv6wPaflWj4go.jpeg', productLink: '/shop/2-cupcake-bento-box' },
  { id: 'b2', name: '5 Cupcake Bento Box', category: 'BENTO', accentColor: '#98B8B9', price: 2700, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5%20cupcake%20bento%20box-UYvAPUxL1ApXgLwYgHGswJsEDRifVp.jpeg', productLink: '/shop/5-cupcake-bento-box' },
  { id: 'b3', name: 'Bento & Flower Box', category: 'BENTO', accentColor: '#98B8B9', price: 2600, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bento%20%26%20Flower%20Box%20-aztnvj6PuI7TX3X8T6ehAJaO42mgex.jpeg', productLink: '/shop/bento-flower-box' },
]

export default function Home() {
  return (
    <>
      {/* Hero Slider - 4 slides: Vintage, Baby, Fresh Flower, Luxury Gifting */}
      <section>
        <HeroSlider />
      </section>

      {/* Wedding Cakes Carousel */}
      <section className="bg-[#F0E8DF]/20">
        <CategoryCarousel
          title="Wedding Cakes"
          products={weddingProducts}
          viewAllLink="/shop/wedding-cakes"
          accentColor="#C59FBE"
        />
      </section>

      {/* Valentine's Day Cakes Carousel */}
      <section>
        <CategoryCarousel
          title="Valentine's Day Cakes"
          products={valentineProducts}
          viewAllLink="/shop/valentines-day-cakes"
          accentColor="#F283AE"
        />
      </section>

      {/* Bento & Flower Box Carousel (from Luxury Gifting) */}
      <section className="bg-[#98B8B9]/10">
        <CategoryCarousel
          title="Luxury Gifting"
          products={bentoProducts}
          viewAllLink="/shop/luxury-gifting"
          accentColor="#98B8B9"
        />
      </section>

      {/* Customer Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </>
  )
}
