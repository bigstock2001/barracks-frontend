import '../globals.css'

export const metadata = {
  title: 'Content Library - Barracks Media',
  description: 'Discover podcasts, audiobooks, and exclusive military content',
}

export default function ContentLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white" style={{
        backgroundImage: 'url("https://backend.barracksmedia.com/wp-content/uploads/2025/08/Untitled-design-31.png")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}>
        <nav className="sticky top-0 z-50 bg-black bg-opacity-70 px-6 py-4 flex items-center justify-between" style={{ backdropFilter: 'blur(8px)' }}>
          <h1 className="text-2xl font-bold">🎖 Barracks Media</h1>
          <ul className="flex space-x-6 text-lg font-medium">
            <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="/content" className="hover:text-yellow-400 transition-colors">Content</a></li>
            <li><a href="/upload" className="hover:text-yellow-400 transition-colors">Upload</a></li>
            <li><a href="/directory" className="hover:text-yellow-400 transition-colors">Directory</a></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}