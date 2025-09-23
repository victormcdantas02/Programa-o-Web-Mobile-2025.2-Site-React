"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Todo from "../components/Todo.js";
import TodoForm from "../components/TodoForm.js";
import Calendar from "../components/Calendar.js";
import Parse from "... @/lib/parse";
import Endereco from "../components/Endereco.js"

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (!currentUser) return router.push("/login");
    setUser(currentUser);
    fetchTodos(currentUser);
  }, []);

  const fetchTodos = async (currentUser) => {
    setLoading(true);
    try {
      const query = new Parse.Query("Todo");
      query.equalTo("user", currentUser);
      query.ascending("data");
      const results = await query.find();

      setTodos(results.map(todo => {
        const parseDate = todo.get("data");
        return {
          id: todo.id,
          text: todo.get("text"),
          category: todo.get("category"),
          isCompleted: todo.get("isCompleted"),
          data: parseDate
            ? new Date(parseDate.getFullYear(), parseDate.getMonth(), parseDate.getDate())
            : null,
        };
      }));
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text, category, data) => {
    if (!user) return;

    try {
      const TodoObj = new Parse.Object("Todo");
      TodoObj.set("text", text.trim());
      TodoObj.set("category", category);
      TodoObj.set("isCompleted", false);
      TodoObj.set("data", data);
      TodoObj.set("user", user);

      const savedTodo = await TodoObj.save();

      setTodos(prev => [...prev, { id: savedTodo.id, text, category, isCompleted: false, data }]);
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  const completeTodo = async (id) => {
    try {
      const query = new Parse.Query("Todo");
      const todo = await query.get(id);
      todo.set("isCompleted", !todo.get("isCompleted"));
      const updated = await todo.save();
      setTodos(prev => prev.map(t => t.id === id ? { ...t, isCompleted: updated.get("isCompleted") } : t));
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const removeTodo = async (id) => {
    try {
      const query = new Parse.Query("Todo");
      const todo = await query.get(id);
      await todo.destroy();
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Erro ao remover tarefa:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">📅 Suas Tarefas</h2>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
      <Endereco/>
      <TodoForm onAddTodo={addTodo} />

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {todos.length === 0 ? (
              <p>Nenhuma tarefa cadastrada.</p>
            ) : (
              todos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onComplete={completeTodo}
                  onRemove={removeTodo}
                />
              ))
            )}
          </div>

          <div>
            <Calendar
              todos={todos}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}