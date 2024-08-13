import React from 'react'
import ListCard from './ListCard'
import NewListInput from './NewListInput'

export default function ListsMenu({ lists, setActiveList, titleValue, setTitleValue, handleAddList, handleDeleteList }) {
  return (
    <div style={{position: 'absolute', width: '20%', paddingLeft: '30px', top: '30%'}}>
        <NewListInput 
            titleValue={titleValue}
            setTitleValue={setTitleValue}
            handleAddList={handleAddList}
        />
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
            {lists.map((item, itemIndex) => (
                <ListCard 
                    key={itemIndex}
                    list={item}
                    index={itemIndex}
                    setActiveList={setActiveList}
                    handleDeleteList={handleDeleteList}
                />
            ))}
        </div>
    </div>
  )
}
