const Todo = ({todo, completeTodo, removeTodo}) => {
    return(
        <div className={`todo ${todo.isCompleted ? 'completed' : ''}`} key={todo.id}>
            <div className="content">
                <p className={todo.isCompleted ? 'completed-text' : ''}>{todo.text}</p>
                <p className="categoria">Categoria = {todo.category}</p>
                {/* Mostra a data se existir */}
                {todo.date && (
                    <p className="date">Data: {new Date(todo.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                )}
            </div>
            <div className="actions">
                <button 
                    className={`complete ${todo.isCompleted ? 'undo' : ''}`}
                    onClick={() => completeTodo && completeTodo(todo.id)}
                >
                    {todo.isCompleted ? 'Desmarcar' : 'Completar'}
                </button>
                <button 
                    className="remove"
                    onClick={() => removeTodo && removeTodo(todo.id)}
                >
                    Fechar tarefa
                </button>
            </div>
        </div>
    )
};

export default Todo