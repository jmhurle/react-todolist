import React from 'react'

export default function TodoCard(props) {
    const {children, handleDeleteTodo, index, handleEditTodo, isCompleted, handleCheckItem, handleUncheckItem} = props;

    return (
        <li className='todoItem'>
            <input 
                className='check'
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => {
                    if (e.target.checked) {
                        handleCheckItem(index);
                    } else {
                        handleUncheckItem(index);
                    }
                }}
            />
            <span style={{flex: 1, textDecoration: isCompleted ? 'line-through' : 'none' }}>
                {children}
            </span>
            <div className="actionsContainer">
                { !isCompleted && (
                    <button onClick={() => {handleEditTodo(index)}}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                )}
                <button 
                    onClick={() => {
                        isCompleted ? handleDeleteTodo(index, 'completed') : handleDeleteTodo(index, 'items')
                    }}
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </li>
    )
}
