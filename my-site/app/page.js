"use client";
import { useState } from "react";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import Calendar from "../components/Calendar";

export default function Page() {

  const [todos, settodos] = useState([
    {
      id: 1,
      text: "Reunião de Equipe",
      category: "Trabalho",
      isCompleted: false,
      date: "2025-10-15",
    },
    {
      id: 2,
      text: "Dermatologista",
      category: "Saúde",
      isCompleted: false,
      date: "2025-10-15",
    },
    {
      id: 3,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
      date: "2025-10-16",
    },
    {
      id: 4,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
      date: "2025-10-17",
    }
  ]);

  const [activeView, setActiveView] = useState('todos');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 15));
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = (text, category, date) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 100000),
      text: text.trim(),
      category,
      isCompleted: false,
      date: date,
    }];
    settodos(newTodos);

    console.log(`Tarefa "${text}" criada para ${new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}`);
  }

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
}
