"use client";
import { useState } from "react";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import Calendar from "../components/Calendar"; // Adicione esta linha

export default function Page() {
  // Seus todos com datas adicionadas
  const [todos, settodos] = useState([
    {
      id: 1,
      text: "Criar uma funcialidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
      date: "2025-10-15", // Adicione esta linha
    }, 
    {
      id: 2,
      text: "Ir para a acaddemia",
      category: "Pessoal",
      isCompleted: false,
      date: "2025-10-16", // Adicione esta linha
    }, 
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
      date: "2025-10-17", // Adicione esta linha
    }
  ]);

  // Adicione estes novos estados
  const [activeView, setActiveView] = useState('todos');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 15));

  // Sua função addTodo modificada
  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 100000),
      text,
      category,
      isCompleted: false,
      date: selectedDate.toISOString().split('T')[0], // Usa data selecionada
    }];
    settodos(newTodos);
  }

  // Adicione estas novas funções
  const completeTodo = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    settodos(newTodos);
  };

  const removeTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    settodos(filteredTodos);
  };

  const getTodosForSelectedDate = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return todos.filter(todo => todo.date === dateString);
  };

  return (
    <div className="app">
      {/* Adicione este menu de navegação */}
      <div className="view-toggle">
        <button 
          className={activeView === 'todos' ? 'active' : ''}
          onClick={() => setActiveView('todos')}
        >
          Lista de Tarefas
        </button>
        <button 
          className={activeView === 'calendario' ? 'active' : ''}
          onClick={() => setActiveView('calendario')}
        >
          Calendário
        </button>
      </div>

      {/* Sua view original - mantém tudo igual */}
      {activeView === 'todos' && (
        <>
          <h1>Lista de Tarefas</h1>
          <div className="todo-list">
            {todos.map((todo) => (
              <Todo 
                key={todo.id} 
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            ))}
          </div>
          <TodoForm addTodo={addTodo}/>
        </>
      )}

      {/* Nova view do calendário */}
      {activeView === 'calendario' && (
        <div className="calendar-container">
          <h1>Agenda</h1>
          <Calendar 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            todos={todos}
          />
          <div className="selected-day-tasks">
            <h3>Tarefas para {selectedDate.toLocaleDateString('pt-BR')}</h3>
            {getTodosForSelectedDate().length > 0 ? (
              getTodosForSelectedDate().map(todo => (
                <Todo 
                  key={todo.id} 
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                />
              ))
            ) : (
              <p>Nenhuma tarefa para este dia</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}