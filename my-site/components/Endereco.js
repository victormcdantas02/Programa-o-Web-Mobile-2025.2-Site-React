"use client";
import { useState } from "react";

export default function BuscaCEP() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");

  async function consultar() {
    setErro("");
    setEndereco(null);

    const puro = cep.replace(/\D/g, "");
    if (puro.length !== 8) {
      setErro("CEP inválido (use 8 dígitos).");
      return;
    }

    try {
      const r = await fetch(`https://viacep.com.br/ws/${puro}/json/`);
      const data = await r.json();

      if (data.erro) {
        setErro("CEP não encontrado.");
        return;
      }

      const rua = data.logradouro || "(sem logradouro)";
      const cidade = data.localidade || "";
      const uf = data.uf || "";

      setEndereco({ rua, cidade, uf });
    } catch (e) {
      setErro("Falha ao consultar o CEP.");
    }
  }

  return (
    <div className="bc-cep">
        <h2>Pesquisar endereço:</h2>
      <div className="bc-cep__row">
        <input
          className="bc-cep__input"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP (ex: 01001-000)"
          inputMode="numeric"
          maxLength={9}
        />
        <button className="bc-cep__btn" onClick={consultar}>
          Buscar
        </button>
      </div>

      {erro && <div className="bc-cep__error">{erro}</div>}

      {endereco && (
        <div className="bc-cep__card">
          <div className="bc-cep__card-title">Endereço encontrado</div>

          <div className="bc-cep__grid">
            <span className="bc-cep__label">Rua</span>
            <span className="bc-cep__value">{endereco.rua}</span>

            <span className="bc-cep__label">Cidade</span>
            <span className="bc-cep__value">{endereco.cidade}</span>

            <span className="bc-cep__label">UF</span>
            <span className="bc-cep__value">{endereco.uf}</span>
          </div>
        </div>
      )}
    </div>
  );
}
