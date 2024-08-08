import { useState } from "react";

export default function TodoInput(props) {
    const {handleAddTodos, todoValue, setTodoValue} = props;

    return (
        <header>
            <input 
                value={todoValue} 
                placeholder="Enter todo..."
                onChange={(e) => {
                    setTodoValue(e.target.value)
                }}
            />
            <button 
                onClick={() => {
                    handleAddTodos(todoValue);
                    setTodoValue('');
                }}
            >
                Add
            </button>
        </header>
    )
}