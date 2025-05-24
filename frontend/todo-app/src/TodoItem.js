import React from 'react';

// TodoItem component: Renders a single to-do item.
// Props:
// - todo: An object representing the to-do item (e.g., { id: 1, text: 'My task', completed: false }).
// - toggleTodo: Function passed from App.js (via TodoList) to handle toggling this item's completion status.
// - deleteTodo: Function passed from App.js (via TodoList) to handle deleting this item.
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    // Apply a 'line-through' text decoration if the todo is completed.
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {/* Checkbox to toggle the completion status of the todo. */}
      <input
        type="checkbox"
        checked={todo.completed} // The checkbox's checked state is bound to the todo's 'completed' status.
        // When the checkbox is clicked, call the 'toggleTodo' function with the todo's id and current completed status.
        onChange={() => toggleTodo(todo.id, todo.completed)}
      />
      {/* Display the text of the to-do item. */}
      {todo.text}
      {/* Delete button: When clicked, call the 'deleteTodo' function with the todo's id. */}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
