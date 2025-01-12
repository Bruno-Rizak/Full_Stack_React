import "./App.css";
import { useEffect, useState } from "react";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";

const initialState = [
  {
    id: 1,
    prioridade: "1",
    titulo: "Descrição da atividade 1",
    descricao: "Descrição da atividade 1",
  },
  {
    id: 2,
    prioridade: "2",
    titulo: "Descrição da atividade 2",
    descricao: "Descrição da atividade 2",
  },
  {
    id: 3,
    prioridade: "3",
    titulo: "Descrição da atividade 3",
    descricao: "Descrição da atividade 3",
  },
];
function App() {
  const [atividades, setAtividades] = useState(initialState);
  const [atividade, setAtividade] = useState<{ id: number }>({ id: 0 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (atividades.length <= 0) {
      setIndex(1);
    } else {
      setIndex(Math.max(...atividades.map((item) => item.id)) + 1);
    }
  }, [atividades]);

  // O tipo React.FormEvent<HTMLFormElement> é utilizado para indicar que o evento está relacionado ao envio de um formulário (<form>), o que é típico em um manipulador de eventos de formulário em React.
  function addAtividade(ativ: {
    id: number;
    prioridade: string;
    titulo: string;
    descricao: string;
  }) {
    setAtividades([...atividades, { ...ativ, id: index }]);
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 });
  }

  function atualizarAtividade(ativ: {
    id: number;
    prioridade: string;
    titulo: string;
    descricao: string;
  }) {
    setAtividades(
      atividades.map((item) => (item.id === ativ.id ? ativ : item))
    );
    setAtividade({ id: 0 });
  }

  function deletarAtividade(id: number) {
    const aitivadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...aitivadesFiltradas]);
  }

  function pegarAtividade(id: number) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atualizarAtividade={atualizarAtividade}
        ativSelecionada={atividade}
        atividades={atividades}
      />
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />
    </>
  );
}

export default App;
