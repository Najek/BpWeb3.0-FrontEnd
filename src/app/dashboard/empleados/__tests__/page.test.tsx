import { render, screen, waitFor } from '@testing-library/react';
import EmpleadosPage from '../page';
import axios from 'axios';

jest.mock('axios');

const empleadosMock = [
  {
    id: 1,
    nombres: "Ana",
    apellidos: "García",
    cedula: "12345",
    correo: "ana@prueba.com",
    celular: "5551234",
    direccion: "Calle 1",
    salario: 1500000
  },
];

describe('EmpleadosPage', () => {

  //Definir Token para las pruebas
  beforeEach(() => {
    window.localStorage.setItem('token', 'FAKE_TOKEN');
  });

  //Limpiar los registros y reiniciar mocks e instancias después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  //Test para cada escenario a validar | Mostrar info, token, sin empleado

  it('Muestra la lista de empleados correctamente', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: empleadosMock });

    render(<EmpleadosPage />);

    expect(screen.getByText(/Sección de Empleados/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Ana')).toBeInTheDocument();
      expect(screen.getByText('García')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('ana@prueba.com')).toBeInTheDocument();
      expect(screen.getByText('Calle 1')).toBeInTheDocument();
      expect(screen.getByText('$1500000')).toBeInTheDocument();
    });
  });

  it('Muestra mensaje de error si no hay token', async () => {
    window.localStorage.removeItem('token');
    render(<EmpleadosPage />);
    await waitFor(() => {
      expect(screen.getByText(/No se encontró token de autenticación/i)).toBeInTheDocument();
    });
  });

  it('Muestra mensaje si no hay empleados registrados', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    render(<EmpleadosPage />);
    await waitFor(() => {
      expect(screen.getByText(/No hay empleados registrados/i)).toBeInTheDocument();
    });
  });
});