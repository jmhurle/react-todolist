import React from 'react'

export default function ({ activeTitleValue, changeActiveTitle }) {

  return (
    <header className='titleInput'>
        <input 
            value={activeTitleValue}
            placeholder="Set list title"
            onChange={(e) => {
                changeActiveTitle(e.target.value)
            }}    
        />
    </header>
)}
