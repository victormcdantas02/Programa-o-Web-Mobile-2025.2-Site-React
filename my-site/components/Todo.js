
const Todo = ({todo}) =>{
    

  
    return(
        <div className="todo" key={todo.id}>
            <div className="content">
                <p>{todo.text}</p>
                <p className="Categoria">Categoria = {todo.category}</p></div>
             <div>
                <button className="complete">Completar</button>
                <button className="remove">Fechar tarefa</button>
             </div>
            </div>
    )
};
  export default Todo