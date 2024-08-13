import React from 'react'
import TodoCard from './TodoCard'

export default function TodoList(props) {
    const {todos, editIndex, editingValue, setEditingValue, handleFinishEditing} = props;

    return (
        <ul 
            className='main' 
            style={{marginLeft: '30%'}}
        >
            {todos.map((todo, todoIndex) => {
                    if (todoIndex !== editIndex) {
                        return (
                            <TodoCard {...props} index={todoIndex} key={todoIndex}>
                                <p>{todo}</p>
                            </TodoCard>
                        )
                    } else {
                        return (
                            <TodoCard {...props} index={todoIndex} key={todoIndex}>
                                <input                 
                                    className='cardInput'
                                    value={editingValue}
                                    placeholder="Please write something..."
                                    onChange={(e) => {
                                        setEditingValue(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && editingValue.trim() !== '') {
                                            handleFinishEditing(editingValue, editIndex);
                                        }
                                    }}
                                />
                            </TodoCard>
                        )
                    }

                })}
        </ul>
    )
}
