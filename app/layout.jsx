import AuthButtons from '../components/AuthButtons';
import './globals.css'

export const metadata = {
  title: 'Barracks Media - Creator Platform',
  description: 'Join the elite creator program and start earning with profit sharing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/@mux/mux-player@2.7.0"
          type="module"
        ></script>
      </head>
      <body
        style={{
          backgroundImage:
            'url("https://backend.barracksmedia.com/wp-content/uploads/2025/08/Untitled-design-22.png")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
        className="min-h-screen text-white"
      >
        <nav
          className="sticky top-0 z-50 bg-black bg-opacity-70 px-6 py-4 flex items-center justify-between"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <h1 className="text-2xl font-bold">🎖 Barracks Media</h1>
          <ul className="flex space-x-6 text-lg font-medium">
            <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="/content" className="hover:text-yellow-400 transition-colors">Content</a></li>
            <li><a href="/upload" className="hover:text-yellow-400 transition-colors">Upload</a></li>
            <li><a href="/upload/manage" className="hover:text-yellow-400 transition-colors">Manage</a></li>
            <li><a href="/blog" className="hover:text-yellow-400 transition-colors">Blog</a></li>
            <li><a href="/account" className="hover:text-yellow-400 transition-colors">Account</a></li>
          </ul>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <AuthButtons />
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  )
}