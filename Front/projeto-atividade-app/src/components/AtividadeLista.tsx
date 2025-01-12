import React from "react";
import Atividade from "./Atividade";

interface AtividadeListaProps {
  atividades: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: string;
  }[];
  deletarAtividade: (id: number) => void;
  pegarAtividade: (id: number) => void;
}

const AtividadeLista: React.FC<AtividadeListaProps> = (props) => {
  return (
    <div className="mt-3">
      {props.atividades.map((ativ) => (
        <Atividade
          key={ativ.id}
          ativ={ativ}
          deletarAtividade={props.deletarAtividade}
          pegarAtividade={props.pegarAtividade}
        />
      ))}
    </div>
  );
};

export default AtividadeLista;
