"use client";
import { logout } from "@/lib/api";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="mt-6 text-sm text-white/70 hover:text-white border border-white/20 rounded-md py-2"
    >
      Cerrar sesión
    </button>
  );
}
