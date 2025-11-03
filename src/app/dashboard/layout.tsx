"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Drawer, List, ListItem, ListItemText, ListItemButton , AppBar, Toolbar, Typography, Box, CircularProgress } from "@mui/material";

const drawerWidth = 240;

const navItems = [
    { label: "Home", href: "/dashboard"},
    { label: "Empleados", href: "/dashboard/empleados"},
    { label: "Usuarios", href: "/dashboard//usuarios"},
];

// Función para obtener el tiempo de expiración del token JWT
function getTokenExpiration(token: string): number | null {
  try {
    // El JWT tiene la forma xxx.yyy.zzz
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null; // Convertir a ms
  } catch (e) {
    return null;
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const pathname = usePathname();

  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    const exp = getTokenExpiration(token);
    if (!exp || Date.now() > exp) {
      // Token expirado
      localStorage.removeItem("token"); // Limpia el token expirado
      router.push("/login");
      return;
    }

    setCheckingSession(false);

    // Validación periódica cada 1 minuto
    const interval = setInterval(() => {
      const latestToken = localStorage.getItem("token");
      const latestExp = latestToken ? getTokenExpiration(latestToken) : null;
      if (!latestToken || !latestExp || Date.now() > latestExp) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, [router]);

  if (checkingSession) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname === item.href}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}