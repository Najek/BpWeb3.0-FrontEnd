export default function HomePage() {
  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Bienvenido a Buenas Prácticas S.A.S</h1>
      <p className="text-lg text-gray-700 mb-8">
        Página en construcción. Próximamente toda la información pública y servicios.
      </p>
      <a
        href="/login"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
      >
        Ir a Login
      </a>
    </section>
  );
}