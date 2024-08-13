import React from 'react'

export default function NewListInput({ titleValue, setTitleValue, handleAddList, }) {
  return (
    <header style={{marginBottom: '10px'}}>
        <input
            style={{fontSize: '0.7rem'}}
            value={titleValue} 
            placeholder="Add list..."
            onChange={(e) => {
                setTitleValue(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleAddList(titleValue);
                    setTitleValue('');
                }
            }}        
        />
        <button 
            onClick={() => {
                handleAddList(titleValue);
                setTitleValue('');
            }}
        >
            <i className="fa-solid fa-plus"></i>
        </button>
    </header>
  )
}
