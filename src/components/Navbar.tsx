import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Buenas Prácticas S.A.S</div>
      <div>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}