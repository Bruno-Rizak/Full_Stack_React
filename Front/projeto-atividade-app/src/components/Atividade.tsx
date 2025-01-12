import React from "react";

interface AtividadeProps {
  ativ: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: string;
  };
  deletarAtividade: (id: number) => void;
  pegarAtividade: (id: number) => void;
}

const Atividade: React.FC<AtividadeProps> = (props) => {
  function prioridadeLabel(param: string) {
    switch (param) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Não informada";
    }
  }
  function prioridadeStyle(param: string, icone: boolean) {
    switch (param) {
      case "1":
        return icone ? "smile" : "success";
      case "2":
        return icone ? "meh" : "darak";
      case "3":
        return icone ? "frown" : "danger";
      default:
        return "Não informada";
    }
  }
  return (
    <div
      className={
        "card mb-3 shadow-sm border-" +
        prioridadeStyle(props.ativ.prioridade, false)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge  text-bg-secondary me-2">
              {props.ativ.id}
            </span>
            - {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={
                "ms-1 text-" + prioridadeStyle(props.ativ.prioridade, false)
              }
            >
              <i
                className={
                  " me-1 fa-regular fa-" +
                  prioridadeStyle(props.ativ.prioridade, true)
                }
              ></i>
              {prioridadeLabel(props.ativ.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-body ">
          {props.ativ.id} - {props.ativ.descricao}
        </p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn  btn-sm btn-outline-primary me-2"
            onClick={() => props.pegarAtividade(props.ativ.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => props.deletarAtividade(props.ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Atividade;
