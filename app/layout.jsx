import AuthButtons from '../components/AuthButtons';
import './globals.css'

// Services dropdown component
function ServicesDropdown() {
  return (
    <div className="relative group">
      <button className="hover:text-yellow-400 transition-colors flex items-center">
        Services
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute left-0 mt-2 w-56 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          <a
            href="/upload"
            className="block px-4 py-2 text-sm text-white hover:bg-yellow-500 hover:text-black transition-colors"
          >
            🎙️ Podcast Hosting
          </a>
          <a
            href="/upload/manage"
            className="block px-4 py-2 text-sm text-white hover:bg-yellow-500 hover:text-black transition-colors"
          >
            ⚙️ Manage Subscription
          </a>
          <div className="border-t border-gray-600 my-1"></div>
          <a
            href="/directory"
            className="block px-4 py-2 text-sm text-white hover:bg-yellow-500 hover:text-black transition-colors"
          >
            🎤 Guest Directory
          </a>
        </div>
      </div>
    </div>
  );
}

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
            'url("https://backend.barracksmedia.com/wp-content/uploads/2025/08/Untitled-design-31.png")',
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
            <li><ServicesDropdown /></li>
            <li><a href="/apply-podcast" className="hover:text-yellow-400 transition-colors">Apply for Podcast</a></li>
            <li><a href="/messages" className="hover:text-yellow-400 transition-colors">Messages</a></li>
            <li><a href="/blog" className="hover:text-yellow-400 transition-colors">Blog</a></li>
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