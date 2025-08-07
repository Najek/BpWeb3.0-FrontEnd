export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-20 bg-white rounded p-8 shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Iniciar Sesión</h2>
      {/* Aquí irá el formulario real de login luego */}
      <form>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Correo electrónico</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Acceder
        </button>
      </form>
    </div>
  );
}