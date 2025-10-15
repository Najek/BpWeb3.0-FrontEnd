"use client"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try{
      const res = await axios.post(apiUrl+"/api/login", {
        username,
        password,
      });
      //Token | Guardar
      localStorage.setItem("token", res.data.token);
      //Siguiente página
      router.push("/dashboard");
    }catch (err: any){
      setError(
        err.response?.data?.message || "Error de Autenticación"
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white rounded p-8 shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Iniciar Sesión</h2>
      {/* Aquí irá el formulario real de login luego */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Correo electrónico</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError("");
            }}
            className="w-full px-3 py-2 border rounded focus:outline-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}