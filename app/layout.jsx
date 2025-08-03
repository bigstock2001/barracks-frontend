export const metadata = {
  title: 'Barracks Media',
  description: 'Video platform for subscribers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
