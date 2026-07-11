// /lib/api.ts
import axios from 'axios';
import { OrdenCompra } from '../types/ordenCompra';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Autenticación (KAN-34): token JWT guardado en localStorage ---
export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
export const setToken = (t: string) => { if (typeof window !== 'undefined') localStorage.setItem('token', t); };
export const clearToken = () => { if (typeof window !== 'undefined') localStorage.removeItem('token'); };

// Adjunta el token a cada petición.
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Ante un 401 (sesión ausente o expirada), redirige al login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined' && error?.response?.status === 401 && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    setToken(response.data.token);
    return response.data;
};
export const logout = () => {
    clearToken();
    if (typeof window !== 'undefined') window.location.href = '/login';
};

export const getOrdenesCompra = async () => {
    const response = await api.get<OrdenCompra[]>('/ordenes');
    return response.data;
};
export const getOrdenCompraById = async (id: string) => {
    const response = await api.get<OrdenCompra>(`/ordenes/${id}`);
    return response.data;
};

export const createOrdenCompra = async (orden: Partial<OrdenCompra>) => {
    const response = await api.post<OrdenCompra>('/ordenes', orden);
    return response.data;
};

export const updateOrdenCompra = async (id: string, orden: Partial<OrdenCompra>) => {
    const response = await api.put<OrdenCompra>(`/ordenes/${id}`, orden);
    return response.data;
};

export const deleteOrdenCompra = async (id: string) => {
    const response = await api.delete<OrdenCompra>(`/ordenes/${id}`);
    return response.data;
};

export default api;
