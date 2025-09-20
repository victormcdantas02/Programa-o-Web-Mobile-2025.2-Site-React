"use client";
import { useState } from "react";
import Parse from "... @/lib/parse";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Parse.User.logIn(username, password);
      setMensagem(`✅ Bem-vindo, ${user.get("username")}!`);
    } catch (err) {
      setMensagem("❌ Erro: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-6 w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded"
        >
          Entrar
        </button>
        {mensagem && <p className="mt-3 text-sm">{mensagem}</p>}
      </form>
    </div>
  );
}
