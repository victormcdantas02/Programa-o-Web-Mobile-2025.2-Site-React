"use client";

export default function Todo({ todo, onComplete, onRemove }) {
  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    
    // ✅ CORREÇÃO: Tratar tanto strings quanto objetos Date
    let date;
    if (typeof dateObj === 'string') {
      // Se for string do input date, criar data local
      const [year, month, day] = dateObj.split('-').map(Number);
      date = new Date(year, month - 1, day);
    } else {
      // Se já for objeto Date
      date = new Date(dateObj);
    }
    
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
      <div className="content">
        <p className={todo.isCompleted ? "completed-text" : ""}>{todo.text}</p>
        <p className="categoria">Categoria = {todo.category}</p>
        {todo.data && <p className="date">Data: {formatDate(todo.data)}</p>}
      </div>
      <div className="actions">
        <button
          className={`complete ${todo.isCompleted ? "undo" : ""}`}
          onClick={() => onComplete && onComplete(todo.id)}
        >
          {todo.isCompleted ? "Desfazer" : "Completar"}
        </button>
        <button
          className="remove"
          onClick={() => onRemove && onRemove(todo.id)}
        >
          Fechar tarefa
        </button>
      </div>
    </div>
  );
}