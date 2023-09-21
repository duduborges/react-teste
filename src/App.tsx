
import { useState, useEffect } from "react";


export default function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([]);
  const [editTask, SetEditTask] = useState({
    enable: false,
    task: ""
  })

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("Anotações")
    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, [])



  function handleRegister() {
    if (!input) {
      alert("Invalido! Não tem nada escrito no campo.")
      return
    }
    if (editTask.enable) {
      handleSaveEdit();
      return
    }

    setTasks(tarefas => [...tarefas, input]);
    setInput("")
    localStorage.setItem("Anotações", JSON.stringify([...tasks, input]))

  }
  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input
    setTasks(allTasks)
    SetEditTask({
      enable: false,
      task: ""
    })
    setInput("")
    localStorage.setItem("Anotações", JSON.stringify(allTasks))

  }
  function handleDelete(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
    localStorage.setItem("Anotações", JSON.stringify(removeTask))

  }
  function handleEdit(item: string) {
    setInput(item)
    SetEditTask({
      enable: true,
      task: item
    })
  }

  return (
    <div>
      <h1>Listinha de tarefas</h1>
      <input
        type="text" id="" placeholder="Digite uma tarefa aqui: " value={input} onChange={
          (e) => setInput(e.target.value)
        } /> <br /><br />
      <button onClick={handleRegister}> {editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button><br /><br />


      {tasks.map((item, index) => (
        <section>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <span>
            {item}
          </span>

          <button onClick={() => handleDelete(item)}>
            Excluir
          </button>
        </section>
      ))}
    </div>
  );
}
