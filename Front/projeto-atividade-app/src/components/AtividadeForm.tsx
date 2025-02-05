import { useEffect, useState } from "react";

interface AtividadeFormProps {
  addAtividade: (atividade: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: number;
  }) => void;
  atividades: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: number;
  }[];
  ativSelecionada: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: number;
  };
  atualizarAtividade: (atividade: {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: number;
  }) => void;
  cancelarAtividade: () => void;
}

const atividadeInicial = {
  id: 0,
  titulo: "",
  descricao: "",
  prioridade: 0,
};

const AtividadeForm: React.FC<AtividadeFormProps> = (props) => {
  const [atividade, setAtividade] = useState(AtividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) setAtividade(props.ativSelecionada);
  }, [props.ativSelecionada]);

  const inputTextHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.ativSelecionada.id !== 0) props.atualizarAtividade(atividade);
    else props.addAtividade(atividade);
    setAtividade(atividadeInicial);
  };

  const handleCancelar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    props.cancelarAtividade();

    setAtividade(atividadeInicial);
  };

  function AtividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ""}</h1>
      <form className=" mt-3 row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Titulo</label>
          <input
            name="titulo"
            value={atividade.titulo}
            onChange={inputTextHandler}
            id="titulo"
            type="text"
            placeholder="Titulo"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            name="prioridade"
            value={atividade.prioridade}
            onChange={inputTextHandler}
            id="prioridade"
            className="form-select"
          >
            <option defaultValue="0">Selecionar...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label" style={{ padding: "5px" }}>
            Descrição
          </label>
          <textarea
            name="descricao"
            value={atividade.descricao}
            onChange={inputTextHandler}
            id="descricao"
            placeholder="descricao"
            className="form-control"
          />
        </div>
        <hr />
        <div className="col-12">
          {atividade.id === 0 ? (
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fas fa-plus me-2"></i>
              Atividade
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                <i className="fas fa-plus me-2"></i>
                Salvar
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                <i className="fas fa-plus me-2"></i>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AtividadeForm;
