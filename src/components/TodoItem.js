import React, { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [complete, setComplete] = useState(todo.complete);

  const handleEdit = () => {
    editTodo(todo.id, editText, complete);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setComplete(todo.complete)
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateString).toLocaleDateString(undefined, options);

  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  }

  return (
    <div className={`todo-item ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <div className="complete-input">
            <label className="switch">
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => setComplete(toggleTodo(todo.id))}
              />
              <span className="slider round"></span>
            </label>
          </div>
          
          <div className="todo-details">
            <span className="todo-category">{todo.category}</span>
            <span className="todo-priority">{todo.priority}</span>
            <span className={`todo-due-date ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
              Due: {formatDate(todo.dueDate)}
            </span>
            {/* <span className="todo-completed">{todo.completed}</span> */}
          </div>

          <div className='todo-actions'>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
          
        </>
      )}
    </div>
  );
}

export default TodoItem;