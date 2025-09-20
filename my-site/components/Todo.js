const Todo = ({ todo, completeTodo, removeTodo }) => {
    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className={`todo ${todo.isCompleted ? 'completed' : ''}`} key={todo.id}>
            <div className="content">
                <p className={todo.isCompleted ? 'completed-text' : ''}>{todo.text}</p>
                <p className="categoria">Categoria = {todo.category}</p>
                {todo.date && (
                    <p className="date">Data: {formatDate(todo.date)}</p>
                )}
            </div>
            <div className="actions">
                <button
                    className={`complete ${todo.isCompleted ? 'undo' : ''}`}
                    onClick={() => completeTodo && completeTodo(todo.id)}
                >
                    {todo.isCompleted ? 'Completar' : 'Completar'}
                </button>
                <button
                    className="remove"
                    onClick={() => removeTodo && removeTodo(todo.id)}
                >
                    Fechar tarefa
                </button>
            </div>
        </div>
    );
};