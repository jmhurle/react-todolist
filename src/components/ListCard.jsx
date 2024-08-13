import React from 'react'

export default function ListCard({ list, index, setActiveList, handleDeleteList }) {
    return (
        <div 
            className='list_button'
            style={{display: 'flex', flexDirection: 'row', textAlign: 'left', padding: '10px 25px', margin: '5px 0'}}
            onClick={() => {setActiveList(list)}}
        >
            <p style={{flex: '1'}}>{list.title}</p>
            <button 
                style={{boxShadow: 'none', border: 'none', backgroundColor: 'white'}} 
                onClick={() => {
                    handleDeleteList(index)
                }}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    )
}
