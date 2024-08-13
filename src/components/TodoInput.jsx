import { useState } from "react";

export default function TodoInput(props) {
    const {handleAddTodos, todoValue, setTodoValue} = props;

    return (
        <header style={{marginLeft: '30%'}}>
            <input 
                value={todoValue} 
                placeholder="Add item..."
                onChange={(e) => {
                    setTodoValue(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTodos(todoValue);
                        setTodoValue('');
                    }
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