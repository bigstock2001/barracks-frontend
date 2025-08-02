// app/layout.js
export const metadata = {
  title: 'Barracks Media',
  description: 'On-demand video platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Mux Player Script */}
        <script
          async
          src="https://unpkg.com/@mux/mux-player"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
