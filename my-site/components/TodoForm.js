import { useState } from 'react'

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState(() => {
        // Data padrão é hoje
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!value.trim()) {
            window.alert("Por favor, digite o título da tarefa")
            return
        }
        if (!category) {
            window.alert("Por favor, escolha uma categoria")
            return
        }
        if (!selectedDate) {
            window.alert("Por favor, selecione uma data")
            return
        }

        // Função para adicionar o todo com data
        addTodo(value.trim(), category, selectedDate);
        
        // Reseta os campos
        setValue("")
        setCategory("")
        // Mantém a data como hoje para próxima tarefa
        setSelectedDate(new Date().toISOString().split('T')[0]);
        
        console.log('Tarefa criada:', { value, category, selectedDate })
    };
   
    return(
        <div className="todo-form">
            <h2>Criar tarefa:</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Digite o título da tarefa"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                >
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
                    min={new Date().toISOString().split('T')[0]} // Não permite datas passadas
                />
                
                <button type="submit">Criar tarefa</button>
            </form>
        </div>
    )
}