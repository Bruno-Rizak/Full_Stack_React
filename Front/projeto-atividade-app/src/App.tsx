import "./App.css";
import { useState } from "react";

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

  // O tipo React.FormEvent<HTMLFormElement> é utilizado para indicar que o evento está relacionado ao envio de um formulário (<form>), o que é típico em um manipulador de eventos de formulário em React.
  function addAtividade(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // getElementById() é um elemento DOM genérico, ele é "tipado" como um HTMLInputElement com as HTMLInputElement, o que permite acessar a propriedade value desse elemento.
    const atividade = {
      id: Number((document.getElementById("id") as HTMLInputElement)?.value),
      prioridade: (document.getElementById("prioridade") as HTMLInputElement)
        ?.value,
      titulo: (document.getElementById("titulo") as HTMLInputElement)?.value,
      descricao: (document.getElementById("descricao") as HTMLInputElement)
        ?.value,
    };
    setAtividades([...atividades, atividade]);
  }

  function deletarAtividade(id: number) {
    const aitivadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...aitivadesFiltradas]);
  }
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
    <>
      <form className=" mt-3 row g-3" onSubmit={addAtividade}>
        <div className="col-md-6">
          <label className="form-label">Id</label>
          <input
            id="id"
            type="text"
            placeholder="id"
            className="form-control"
            readOnly
            value={
              Math.max.apply(
                Math,
                atividades.map((item) => item.id)
              ) + 1
            }
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select id="prioridade" className="form-select">
            <option defaultValue="0">Selecionar...</option>
            <option value="1">Baixa</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" style={{ padding: "5px" }}>
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Titulo"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" style={{ padding: "5px" }}>
            Descrição
          </label>
          <input
            id="descricao"
            type="text"
            placeholder="descricao"
            className="form-control"
          />
        </div>
        <hr />
        <div className="col-12">
          <button className="btn btn-outline-secondary" type="submit">
            + Atividade
          </button>
        </div>
      </form>
      <div className="mt-3">
        {atividades.map((ativ) => (
          <div
            key={ativ.id}
            className={
              "card mb-3 shadow-sm border-" +
              prioridadeStyle(ativ.prioridade, false)
            }
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  <span className="badge  text-bg-secondary me-2">
                    {ativ.id}
                  </span>
                  - {ativ.titulo}
                </h5>
                <h6>
                  Prioridade:
                  <span
                    className={
                      "ms-1 text-" + prioridadeStyle(ativ.prioridade, false)
                    }
                  >
                    <i
                      className={
                        " me-1 fa-regular fa-" +
                        prioridadeStyle(ativ.prioridade, true)
                      }
                    ></i>
                    {prioridadeLabel(ativ.prioridade)}
                  </span>
                </h6>
              </div>
              <p className="card-body ">
                {ativ.id} - {ativ.descricao}
              </p>
              <div className="d-flex justify-content-end pt-2 m-0 border-top">
                <button className="btn  btn-sm btn-outline-primary me-2">
                  <i className="fas fa-pen me-2"></i>
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deletarAtividade(ativ.id)}
                >
                  <i className="fas fa-trash me-2"></i>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
