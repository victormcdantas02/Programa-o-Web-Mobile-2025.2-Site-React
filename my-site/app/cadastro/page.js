"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Parse from "... @/lib/parse";

export default function CadastroPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const router = useRouter();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      await user.signUp();
      setMensagem({ texto: "Usuário cadastrado com sucesso!", tipo: "success" });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setMensagem({ texto: "Erro: " + err.message, tipo: "error" });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {mensagem && (
          <div className={`msg-box ${mensagem.tipo === "success" ? "msg-success" : "msg-error"}`}>
            {mensagem.texto}
          </div>
        )}
        <h2 className="auth-title">Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <input
            className="auth-input"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">Cadastrar</button>
        </form>
        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Já possui conta? <Link href="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>Faça login</Link>
        </p>
      </div>
    </div>
  );
}