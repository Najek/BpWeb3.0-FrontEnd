"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import EmpleadoCreateModal from "./EmpleadoCreateModal";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

type Empleado = {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  correo: string;
  celular: string;
  direccion: string;
  salario: number;
};

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmpelados = async () => {
      setCargando(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token || token == "null" || token === "undefined") {
          setError(
            "No se encontró token de autenticación. Por favor, inicia sesión nuevamente."
          );
          setCargando(false);
          return;
        }
        const res = await axios.get(`${apiURL}/api/empleados`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmpleados(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Error al cargar la información de los empleados registrados."
        );
      } finally {
        setCargando(false);
      }
    };
    fetchEmpelados();
  }, []);

  const handleEmpleadoCreado = (nuevoEmpleado: Empleado) => {
    setEmpleados((prev) => [nuevoEmpleado, ...prev]);
  };

  return (
    <Box>
      <Typography variant="h4" color="secondary" gutterBottom>
        Sección de Empleados
      </Typography>

      {/* Botón para abrir el modal */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Nuevo Empleado
        </Button>
      </Box>

      {/* Modal de creación */}
      <EmpleadoCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleEmpleadoCreado}
      />

      {cargando ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Salario</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay empleados registrados.
                  </TableCell>
                </TableRow>
              ) : (
                empleados.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.nombres}</TableCell>
                    <TableCell>{emp.apellidos}</TableCell>
                    <TableCell>{emp.cedula}</TableCell>
                    <TableCell>{emp.correo}</TableCell>
                    <TableCell>{emp.celular || "-"}</TableCell>
                    <TableCell>{emp.direccion || "-"}</TableCell>
                    <TableCell>
                      {emp.salario !== undefined ? `$${emp.salario}` : "-"}
                    </TableCell>
                    <TableCell>
                      {/* Aquí irán los botones de acción en el futuro */}
                      <Typography variant="body2" color="text.secondary">
                        Próximamente...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
