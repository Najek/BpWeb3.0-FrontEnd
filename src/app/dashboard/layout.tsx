"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Drawer, List, ListItem, ListItemText, ListItemButton , AppBar, Toolbar, Typography, Box } from "@mui/material";

const drawerWidth = 240;

const navItems = [
    { label: "Home", href: "/dashboard"},
    { label: "Empleados", href: "/dashboard/empleados"},
    { label: "Usuarios", href: "/dashboard//usuarios"},
];

export default function DashboardLayout({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const pathname = usePathname();

  //Autenticación
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token"): null;
    if(!token) {
      router.push("/login")
    }
  }, [router]);

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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}