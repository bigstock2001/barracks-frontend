export const metadata = {
  title: 'Barracks Media',
  description: 'Video platform for subscribers',
};

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
            <li><a href="/content">Content</a></li>
            <li><a href="/upload">Upload</a></li>
            <li><a href="/audiobooks">Audiobooks</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/account">Account</a></li>
            <li><a href="/test-api">Test API</a></li>
          </ul>
        </nav>

        <main className="px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
