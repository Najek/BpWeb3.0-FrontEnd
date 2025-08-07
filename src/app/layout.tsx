import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}