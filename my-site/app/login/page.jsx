"use client";
import { useState } from "react";
import Link from "next/link";
import Parse from "... @/lib/parse";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Parse.User.logIn(username, password);
    } catch (err) {
      setMensagem({ texto: "Erro: " + err.message, tipo: "error" });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {mensagem && (
          <div className={`msg-box ${mensagem.tipo === "error" ? "msg-error" : ""}`}>
            {mensagem.texto}
          </div>
        )}

        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">Entrar</button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Ainda não possui conta? <Link href="/cadastro" style={{ color: "#2563eb", fontWeight: "bold" }}>Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
