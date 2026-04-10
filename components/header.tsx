import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-[#FAC1B5]/20 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-start">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/inas-JLJ6buduzGt8x41vQzIlnOz0J2HrXe.png"
            alt="Minas Bakeshop Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
