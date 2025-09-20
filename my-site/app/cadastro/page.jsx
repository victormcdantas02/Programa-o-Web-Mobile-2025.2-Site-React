"use client";
import { useState } from "react";
import Parse from "... @/lib/parse";

export default function CadastroPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      await user.signUp();
      setMensagem("✅ Usuário cadastrado com sucesso!");
    } catch (err) {
      setMensagem("❌ Erro: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleCadastro}
        className="bg-white shadow-md rounded p-6 w-80"
      >
        <h2 className="text-xl font-bold mb-4">Cadastro</h2>
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
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
        >
          Cadastrar
        </button>
        {mensagem && <p className="mt-3 text-sm">{mensagem}</p>}
      </form>
    </div>
  );
}
