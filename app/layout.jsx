export const metadata = {
  title: 'Barracks Media',
  description: 'Video platform for subscribers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/@mux/mux-player"
          type="module"
          defer
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
