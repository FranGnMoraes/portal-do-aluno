// Começamos da tela pronta da aula passada: Header + a lista de redações.
// Hoje vamos deixá-la INTERATIVA, em 5 passos (siga os slides).

// TODO (passo 1): importe o useState do React.
import { useState } from "react";
import Header from "./components/Header.jsx";
import RedacaoCard from "./components/RedacaoCard.jsx";
import { REDACOES } from "./dados.js";
import "./estilo.css";

export default function App() {
  // TODO (passo 1): crie o estado da busca (texto digitado).
   const [busca, setBusca] = useState("");

  // TODO (passo 4): crie o estado do filtro por status ("todas" | "corrigida" | "em_correcao").
   const [filtro, setFiltro] = useState("todas");

  // TODO (passos 3 e 4): monte a lista visível a partir dos estados.
  //  - passo 3: manter só as redações cujo tema contém a busca
  //  - passo 4: e que combinam com o filtro de status
  
  const visiveis = REDACOES
      .filter((r) => filtro === "todas" || r.status === filtro)
      .filter((r) => r.tema.toLowerCase().includes(busca.toLowerCase()));
  
  return (
    <div className="pagina">
      <Header />

      
      <input className="busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por tema…" />

      <div className="filtros">
        <button
          className={filtro === "todas" ? "chip ativo" : "chip"}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={filtro === "corrigida" ? "chip ativo" : "chip"}
          onClick={() => setFiltro("corrigida")}
        >
          Corrigidas
        </button>
        <button
          className={filtro === "em_correcao" ? "chip ativo" : "chip"}
          onClick={() => setFiltro("em_correcao")}
        >
          Em correção
        </button>
      </div>

    <p className="contagem">{visiveis.length} redação(ões)</p>
                          
      {visiveis.length === 0 ? (
        <p className="vazio">Nenhuma redação encontrada.</p>
      ) : (
       visiveis.map((r) => <RedacaoCard key={r.id} redacao={r} />)
      )}
    </div>

 );
}
