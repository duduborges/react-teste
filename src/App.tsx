import "./assets/App.css"
import { useState, useEffect } from "react";


export default function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState<string[]>([]);
  const [editTask, SetEditTask] = useState({
    enable: false,
    task: ""
  })
  const [inputL, setInputL] = useState("")
  const [links, setLinks] = useState<string[]>([]);
  const [editLink, SetEditLink] = useState({
    enable: false,
    link: ""
  })

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("Anotações")
    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
    const linksSalvos = localStorage.getItem("Url")
    if (linksSalvos) {
      setLinks(JSON.parse(linksSalvos));
    }
  }, [])



  function handleRegister() {
    if (!input) {
      alert("Invalido! Não tem nada escrito no campo das tarefas.")
      return
    }
    if (editTask.enable) {
      handleSaveEdit();
      return
    }
    if (!inputL) {
      alert("Invalido! Não tem nada escrito no campo dos links.")
      return
    }
    if (editLink.enable) {
      handleSaveEdit();
      return
    }

    setTasks(tarefas => [...tarefas, input]);
    setInput("")
    localStorage.setItem("Anotações", JSON.stringify([...tasks, input]))
    setLinks(caminho => [...caminho, inputL]);
    setInputL("")
    localStorage.setItem("Url", JSON.stringify([...links, inputL]))

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

    const findIndexLink = links.findIndex(link => link === editLink.link)
    const allLinks = [...links];

    allLinks[findIndexLink] = inputL
    setLinks(allLinks)
    SetEditLink({
      enable: false,
      link: ""
    })
    setInputL("")
    localStorage.setItem("Url", JSON.stringify(allLinks))

  }
  function handleDelete(item: string, linkes: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)
    localStorage.setItem("Anotações", JSON.stringify(removeTask))
    const removeLink = links.filter(link => link !== linkes)
    setLinks(removeLink)
    localStorage.setItem("Url", JSON.stringify(removeLink))

  }
  function handleEdit(item: string, linkes: string) {
    setInput(item)
    SetEditTask({
      enable: true,
      task: item
    })
    setInputL(linkes)
    SetEditLink({
      enable: true,
      link: linkes
    })
  }

  return (
    <div>
      <h1>Listinha de tarefas</h1>
      <input
        type="text" id="" placeholder="Digite uma tarefa aqui: " value={input} onChange={
          (e) => setInput(e.target.value)
        } />
      <input
        type="text" id="" placeholder="Digite um link aqui: " value={inputL} onChange={
          (a) => setInputL(a.target.value)
        } /> <br /><br />
      <button onClick={handleRegister}> {editTask.enable ? "Atualizar tarefa" : "Adicionar tarefa"} {editLink.enable ? "Atualizar tarefa" : "Adicionar tarefa"}</button><br /><br />


      {tasks.map((item, index) => (
        <table>
          <h3>{item}</h3>
          
          <button onClick={() => handleEdit(item, linkes)}>Editar</button>


          <button onClick={() => handleDelete(item, links)}>Excluir</button>



        </table>
      ))
      }
    </div >
  );
}
