import React, {useState} from 'react';
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import "./ToDoList.css"

function ToDoList({setIsSubmitted, textUsername}) {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text) {
            alert("Enter a valid to do");
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

    const exit = (event) => {
        event.preventDefault()
        setIsSubmitted(false);
    }

    return (
        <div>
            <p>Welcome {textUsername}</p>
            <ToDoForm onSubmit = {addTodo}/>
            <ToDo todos = {todos} completeTodo={completeTodo} removeTodo = {removeTodo} updateTodo = {updateTodo}/>
            <div>{todos.length === 0 ? "To Do List is empty" : ""}</div>
            <button className={"exit-button"} onClick={exit}> {"Exit"} </button>
        </div>
    );
}

export default ToDoList;