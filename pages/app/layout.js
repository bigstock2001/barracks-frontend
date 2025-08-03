export const metadata = {
  title: "Barracks Media",
  description: "On-demand video and audio content platform",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Mux player script */}
        <script
          src="https://cdn.jsdelivr.net/npm/@mux/mux-player"
          type="module"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
