"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha) {
      window.alert("Preencha e-mail e senha.");
      return;
    }
    console.log({ email, senha });
  }

  return (
    <div className="app">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="todo-form" style={{ paddingBottom: 0 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>E-mail</label>
        <input
          type="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ fontWeight: 600, display: "block", margin: "10px 0 6px" }}>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <button type="submit">Entrar</button>
        </div>
      </form>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <small style={{ opacity: 0.9 }}>
          Ainda não tem conta?{" "}
          <Link href="/cadastro" style={{ textDecoration: "underline" }}>
            realizar cadastro
          </Link>
        </small>
      </div>
    </div>
  );
}
