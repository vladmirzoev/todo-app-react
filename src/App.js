import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import CategoryManager from './components/CategoryManager';
import TaskChart from './components/TaskChart';
import './App.css';

export function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos){
        return JSON.parse(savedTodos);
    } else{
        return [];
    }
  });

  const [darkMode, setDarkMode] = useState('');
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };


  const [categories, setCategories] = useState(['Personal', 'Work', 'Shopping', 'Other']);
  

  const addTodo = (text, category, priority, dueDate) => {
    // console.log('Adding todo with due date:', dueDate);
    setTodos([...todos, { id: Date.now(),
      text,
      completed: false,
      category,
      priority,
      dueDate
    }]);
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState('all');
  const [searchItem, setSearchItem] = useState('');

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
    (filter === 'all') ||
    ((filter === 'active') && !todo.completed) ||
    ((filter === 'completed') && todo.completed);

    const matchesSearch = todo.text.toLowerCase().includes(searchItem.toLowerCase());
    return matchesFilter && matchesSearch;
  })

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const reorderTodos = (startIndex, endIndex) => {
    const result = Array.from(todos);
    const [reorderedItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, reorderedItem);

    setTodos(result);
  }
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <input
        type='text'
        placeholder='Search task'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} categories={categories}/>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      <TodoList 
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        reorderTodos={reorderTodos}
    />
      <div>
        <p>{activeTodos} items left</p>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
      <CategoryManager categories={categories} setCategories={setCategories}/>
      {/* <TaskChart todos={todos}/> */}
    </div>
  );
}

// export default App;