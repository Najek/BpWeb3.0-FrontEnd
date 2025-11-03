import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Util para strings opcionales adaptadas a React Hook Form + Zod
const optionalString = () =>
  z.string().or(z.literal("")).transform((v) => v === "" ? undefined : v).optional();

const empleadoSchema = z.object({
  nombres: z.string().min(2, "Mínimo 2 caracteres"),
  apellidos: z.string().min(2, "Mínimo 2 caracteres"),
  cedula: z.string().min(5, "Cédula inválida"),
  nacimiento: optionalString(),
  sangre: z.string().min(1, "Campo obligatorio"),
  correo: z.string().email("Correo inválido"),
  celular: optionalString(),
  direccion: optionalString(),
  cargo: optionalString(),
  contactoEmergencia: optionalString(),
  numeroEmergencia: optionalString(),
  eps: optionalString(),
  pensiones: optionalString(),
  cesantias: optionalString(),
  arl: optionalString(),
  salario: z
    .union([
      z.string().refine(
        (val) => val === "" || (!isNaN(Number(val)) && Number(val) > 0),
        "Debe ser un número mayor a 0"
      ).transform((v) => v === "" ? undefined : Number(v)),
      z.number(),
      z.undefined()
    ])
    .optional(),
  fechaIngreso: optionalString(),
  fechaTermino: optionalString(),
  fotoUrl: z
    .string()
    .transform((v) => v === "" ? undefined : v)
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "Debe ser una URL válida"
    ),
});

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface EmpleadoCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (empleado: any) => void;
}

export default function EmpleadoCreateModal({
  open,
  onClose,
  onCreated,
}: EmpleadoCreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Usa SIEMPRE el tipo inferido de Zod para useForm, NUNCA uno manual
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(empleadoSchema),
  });

  // Usa SubmitHandler con el tipo inferido
  const onSubmit: SubmitHandler<z.infer<typeof empleadoSchema>> = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${apiURL}/api/empleados`, data, {
        headers: { Authorization: `Bearer ${token}`},
      });
      setSnackbar({ open: true, message: "Empleado creado exitosamente", severity: "success" });
      onCreated(res.data);
      reset();
      onClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Error al crear el empleado. Intenta de nuevo.";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Agregar nuevo empleado</DialogTitle>
        <DialogContent>
          <form id="empleado-form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Campos obligatorios */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Nombres *"
                  fullWidth
                  {...register("nombres")}
                  error={!!errors.nombres}
                  helperText={errors.nombres?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Apellidos *"
                  fullWidth
                  {...register("apellidos")}
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Cédula *"
                  fullWidth
                  {...register("cedula")}
                  error={!!errors.cedula}
                  helperText={errors.cedula?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Correo *"
                  fullWidth
                  {...register("correo")}
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Tipo de Sangre *"
                  fullWidth
                  {...register("sangre")}
                  error={!!errors.sangre}
                  helperText={errors.sangre?.message}
                  disabled={loading}
                />
              </Grid>
              {/* Campos opcionales */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Celular"
                  fullWidth
                  {...register("celular")}
                  error={!!errors.celular}
                  helperText={errors.celular?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Dirección"
                  fullWidth
                  {...register("direccion")}
                  error={!!errors.direccion}
                  helperText={errors.direccion?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Cargo"
                  fullWidth
                  {...register("cargo")}
                  error={!!errors.cargo}
                  helperText={errors.cargo?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Contacto emergencia"
                  fullWidth
                  {...register("contactoEmergencia")}
                  error={!!errors.contactoEmergencia}
                  helperText={errors.contactoEmergencia?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Número emergencia"
                  fullWidth
                  {...register("numeroEmergencia")}
                  error={!!errors.numeroEmergencia}
                  helperText={errors.numeroEmergencia?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="EPS"
                  fullWidth
                  {...register("eps")}
                  error={!!errors.eps}
                  helperText={errors.eps?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Pensiones"
                  fullWidth
                  {...register("pensiones")}
                  error={!!errors.pensiones}
                  helperText={errors.pensiones?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Cesantías"
                  fullWidth
                  {...register("cesantias")}
                  error={!!errors.cesantias}
                  helperText={errors.cesantias?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ARL"
                  fullWidth
                  {...register("arl")}
                  error={!!errors.arl}
                  helperText={errors.arl?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Salario"
                  type="number"
                  fullWidth
                  {...register("salario")}
                  error={!!errors.salario}
                  helperText={errors.salario?.message}
                  disabled={loading}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Fecha ingreso"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaIngreso")}
                  error={!!errors.fechaIngreso}
                  helperText={errors.fechaIngreso?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Fecha término"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaTermino")}
                  error={!!errors.fechaTermino}
                  helperText={errors.fechaTermino?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Foto (URL)"
                  fullWidth
                  {...register("fotoUrl")}
                  error={!!errors.fotoUrl}
                  helperText={errors.fotoUrl?.message}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="empleado-form"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}