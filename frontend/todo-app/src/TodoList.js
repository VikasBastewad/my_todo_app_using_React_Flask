import React from 'react';
import TodoItem from './TodoItem'; // Component for rendering individual to-do items.

// TodoList component: Renders a list of to-do items.
// Props:
// - todos: An array of to-do objects to be displayed.
// - toggleTodo: Function passed down from App.js to handle toggling a todo's completion status.
// - deleteTodo: Function passed down from App.js to handle deleting a todo.
function TodoList({ todos, toggleTodo, deleteTodo }) {
  // If there are no todos, display a message.
  if (!todos.length) {
    return <p>No todos yet! Add one above.</p>;
  }

  // Render an unordered list (ul) of TodoItem components.
  return (
    <ul>
      {/* Map over the 'todos' array. For each 'todo' object: */}
      {/* - Create a TodoItem component. */}
      {/* - Pass 'todo.id' as the unique 'key' prop (important for React list rendering). */}
      {/* - Pass the individual 'todo' object as a prop. */}
      {/* - Pass down 'toggleTodo' and 'deleteTodo' functions to each TodoItem. */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
