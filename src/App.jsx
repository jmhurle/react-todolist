import { useState, useEffect } from "react"
import ListsMenu from "./components/ListsMenu";
import ListTitleInput from "./components/ListTitleInput"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({title: "List 01", items: [], completed: []})

  const [titleValue, setTitleValue] = useState('')
  const [itemValue, setItemValue] = useState('')
  const [editingValue, setEditingValue] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  function persistData(newLists) {
    localStorage.setItem('lists', JSON.stringify({ lists: newLists }))
  }

  function handleAddTodos(newItem) {
    const newList = {title: `${activeList.title}`, items: [...activeList.items, newItem], completed: [...activeList.completed]}
    setActiveList(newList)
    const newLists = [newList, ...lists.filter(list => list.title !== newList.title)]
    persistData(newLists)
    setLists(newLists)
  }

  function handleDeleteTodo(index, location) {
    let newList;
    if (location === 'items') {
      const newListItems = activeList.items.filter((todo, todoIndex) => {
        return todoIndex !== index;
      })
      newList = {title: activeList.title, items: newListItems, completed: activeList.completed}
  
    }
    else {
      const newListCompleted = activeList.completed.filter((todo, todoIndex) => {
        return todoIndex !== index;
      })
      newList = {title: `${activeList.title}`, items: activeList.items, completed: newListCompleted}
    }

    setActiveList(newList)
    const newLists = [newList, ...lists.filter(list => list.title !== newList.title)]
    persistData(newLists)
    setLists(newLists)
  }

  function handleEditTodo(index) {
    setEditingValue(activeList.items[index]);
    setEditIndex(index);
  }

  function handleFinishEditing(newValue, index) {
    const newListItems = [...activeList.items];
    newListItems[index] = newValue;
    const newList = {title: `${activeList.title}`, items: newListItems, completed: activeList.completed}

    setActiveList(newList)
    const newLists = [newList, ...lists.filter(list => list.title !== newList.title)]
    persistData(newLists)
    setLists(newLists)

    setEditingValue('');
    setEditIndex(null);
  }

  function changeActiveTitle(newTitle) {
    const prevTitle = activeList.title;
    const newList = {title: newTitle, items: [...activeList.items], completed: [...activeList.completed]};

    const newLists = [newList, ...lists.filter(list => list.title !== prevTitle)];

    setActiveList(newList);
    persistData(newLists);
    setLists(newLists);
  }

  function handleAddList(title) {
    if (lists.some(list => list.title === title)) {
      alert('A list with this name already exists!')
      return
    }

    const listNumbers = lists.map(list => {
      const match = list.title.match(/^List (\d{2})$/);
      return match ? parseInt(match[1], 10) : null;
    }).filter(num => num !== null);

    const nextNumber = listNumbers.length ? Math.max(...listNumbers) + 1 : 1;
    const formattedNumber = nextNumber.toString().padStart(2, '0');
    
    const newListTitle = title ? title : `List ${formattedNumber}`;
    
    const newList = {
      title: newListTitle,
      items: [],
      completed: []
    };

    setActiveList(newList);
    const newLists = [newList, ...lists];
    persistData(newLists);
    setLists(newLists);
  }

  function handleDeleteList(index) {
    const toDeleteTitle = lists[index].title;

    const newLists = [...lists.filter((list, listIndex) => {
      return listIndex !== index;
    })]

    setLists(newLists)
    if (toDeleteTitle === activeList.title) {
      lists.length ? setActiveList(lists[0]) : handleAddList('List 01')
    }

    persistData(newLists)
  }

  function handleCheckItem(index) {
    const item = activeList.items[index];
    const newListItems = activeList.items.filter((todo, todoIndex) => {return todoIndex !== index})
    const newCompleted = [...activeList.completed, item];
    const newList = {
      title: activeList.title,
      items: newListItems,
      completed: newCompleted
    }
    setActiveList(newList)
    const newLists = [newList, ...lists.filter(list => list.title !== prevTitle)];
    persistData(newLists);
    setLists(newLists);
  }

  function handleUncheckItem(index) {
    const item = activeList.completed[index];
    const newCompleted = activeList.completed.filter((todo, todoIndex) => {return todoIndex !== index})
    const newItems = [...activeList.items, item];
    const newList = {
      title: activeList.title,
      items: newItems,
      completed: newCompleted
    }
    setActiveList(newList)
    const newLists = [newList, ...lists.filter(list => list.title !== prevTitle)];
    persistData(newLists);
    setLists(newLists);
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localLists = localStorage.getItem('lists');
    if (!localLists) {
      return
    }
    localLists = JSON.parse(localLists).lists;
    setLists(localLists);
    setActiveList(localLists.length ? localLists[0] : {title: "List 01", items: [], completed: []});
  }, [])

  return (
    <>
      <ListsMenu 
        lists={lists}
        setActiveList={setActiveList}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        handleAddList={handleAddList}
        handleDeleteList={handleDeleteList}
      />
      <ListTitleInput
        activeTitleValue={activeList.title}
        changeActiveTitle={changeActiveTitle}
      />
      <TodoInput 
        todoValue={itemValue} 
        setTodoValue={setItemValue} 
        handleAddTodos={handleAddTodos} 
      />
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleFinishEditing={handleFinishEditing} 
        editIndex={editIndex} 
        editingValue={editingValue} 
        setEditingValue={setEditingValue} 
        handleDeleteTodo={handleDeleteTodo} 
        todos={activeList.items}
        isCompleted={false}
        handleCheckItem={handleCheckItem}
        handleUncheckItem={handleUncheckItem}
      />
      <div style={{marginTop: '60px'}}></div>
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleFinishEditing={handleFinishEditing} 
        editIndex={editIndex} 
        editingValue={editingValue} 
        setEditingValue={setEditingValue} 
        handleDeleteTodo={handleDeleteTodo} 
        todos={activeList.completed}
        isCompleted={true}
        handleCheckItem={handleCheckItem}
        handleUncheckItem={handleUncheckItem}
      />
    </>
  )
}

export default App
