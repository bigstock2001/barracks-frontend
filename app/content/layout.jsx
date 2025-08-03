export const metadata = {
  title: 'Content Page',
  description: 'On-demand video content from Barracks Media',
};

export default function ContentLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  );
}
