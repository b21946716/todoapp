import React, {useState} from 'react';
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";

function ToDoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text) {
            alert("Geçerli bir todo giriniz");
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const removeTodo = id =>{
        const removeArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removeArr);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text){
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    return (
        <div>
            <h1>Yapılacaklar Listesi</h1>
            <ToDoForm onSubmit = {addTodo}/>
            <ToDo todos = {todos} completeTodo={completeTodo} removeTodo = {removeTodo} updateTodo = {updateTodo}/>
            <div>{todos.length === 0 ? "To Do List is empty" : ""}</div>
        </div>
    );
}

export default ToDoList;