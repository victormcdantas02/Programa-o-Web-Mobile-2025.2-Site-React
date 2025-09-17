"use client";

import { useState } from "react";


import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";


export default function Page() {
  const [todos, settodos] = useState([
  /* definir os todos em states, como se fosse um variável
  vamos armazenar os estados inicias
  é como se fosse uma chamada de api, como se tivesse pegando os dados
  do banco de dados
  Dessa forma, já conseguimos ter alguma coisa para manipular
  As variáveis não rendenrizam componentes quando são atualizadas
   */

  //lista de objetos já definidos
  {
    id: 1,
    text: "Criar uma funcialidade x no sistema",
    category: "Trabalho",
    isCompleted: false,
  }, {
  id: 2,
    text: "Ir para a acaddemia",
    category: "Pessoal",
    isCompleted: false,

  }, {
  id: 3,
    text: "Estudar React",
    category: "Estudos",
    isCompleted: false,
  }])

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      //aqui é para receber o id do backend
      id: Math.floor(Math.random() * 100000), 
      text,
      category,
      isCompleted: false,
    },] //recebe os Todo(s) já existentes por spread e adiciona um novo objeto
    settodos(newTodos);

    //essa função precisa ser passada como propriedade para o formulário
  }

  return (
   <div className="app">
    <h1>Lista de Tarefas</h1>
    <div className="todo-list">
      {todos.map((todo) => (
      <Todo key={todo.id} todo={todo}/>
      ))} {/* a propriedade todo, tem o valor todo que é um objeto */}
    </div>
    {/* vai percorrer o array de objetos e exibiar cada um dos to-dos aqui */}
    <TodoForm addTodo={addTodo}/> 
    
   </div>
 
  )
}
