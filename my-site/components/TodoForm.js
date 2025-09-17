import { useState} from 'react'

const TodoForm = ( {addTodo}) => {
      const [value, setValue]= useState("")
      const [category, setCategory] = useState("");
      const handleSubmit = (e) => {
        e.preventDefault()
        if (!value || !category) {
            window.alert("Complete os campos necessários")
            return 
        } 
        //função para adicionar o todo
        // limpar os campos

        addTodo(value, category);

        //Reseta os campos
        setValue("")
        setCategory("")
        console.log(value, category)
        
    };
    
    return(
        <div className="todo-form">
            <h2>Criar tarefa:</h2>
            <form onSubmit={handleSubmit}> {/* evento que dispara a função */}
                <input type="text" placehoder="Digite o título" onChange={(e) => setValue(e.target.value)}/>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>

                    <option value="">Escolha uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                    <option value="Saúde">Saúde</option>
                </select>
                <button type="submit">Criar tarefa</button>
            </form>
        </div>
    )
}

export default TodoForm 

