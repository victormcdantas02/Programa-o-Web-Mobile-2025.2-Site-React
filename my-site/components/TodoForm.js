import { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return alert("Por favor, digite o título da tarefa");
    if (!category) return alert("Por favor, escolha uma categoria");
    if (!selectedDate) return alert("Por favor, selecione uma data");

    const [year, month, day] = selectedDate.split("-").map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day));

    onAddTodo(value.trim(), category, dateObj);

    setValue("");
    setCategory("");
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="todo-form">
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título da tarefa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Escolha uma categoria</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Estudos">Estudos</option>
          <option value="Saúde">Saúde</option>
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />

        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
