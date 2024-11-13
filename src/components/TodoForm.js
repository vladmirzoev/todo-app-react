import React, { useState } from 'react';

function TodoForm({ addTodo, categories }) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('');;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input, category, priority, dueDate || '');
    setInput('');
    setPriority('medium');
    setDueDate('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;