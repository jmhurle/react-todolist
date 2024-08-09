import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [editingValue, setEditingValue] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    setEditingValue(todos[index]);
    setEditIndex(index);
  }

  function handleFinishEditing(newValue, index) {
    const newTodos = [...todos];
    newTodos[index] = newValue;
    
    persistData(newTodos)
    setTodos(newTodos);
    setEditingValue('');
    setEditIndex(null);
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodo={handleEditTodo} handleFinishEditing={handleFinishEditing} editIndex={editIndex} editingValue={editingValue} setEditingValue={setEditingValue} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App
