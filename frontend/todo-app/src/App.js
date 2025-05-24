import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import TodoList from './TodoList'; // Component to display the list of todos
import './App.css'; // Styles for the App component

// Base URL for the backend API. Helps in managing API endpoints easily.
const API_URL = 'http://localhost:5000/api';

// Main application component.
function App() {
  // State variable to store the list of to-do items. Initialized as an empty array.
  const [todos, setTodos] = useState([]);
  // State variable to store the text of the new to-do item being entered by the user.
  const [newTodoText, setNewTodoText] = useState('');

  // useEffect hook to fetch todos from the API when the component mounts.
  // This mimics the "Read" part of CRUD.
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Make a GET request to the /api/todos endpoint.
        const response = await axios.get(`${API_URL}/todos`);
        // Update the todos state with the data received from the API.
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos(); // Call the fetch function.
  }, []); // The empty dependency array ensures this effect runs only once after initial render.

  // Function to add a new to-do item.
  // This handles the "Create" part of CRUD.
  const addTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    if (!newTodoText.trim()) return; // Ignore if the input is empty or only whitespace.
    try {
      // Make a POST request to /api/todos with the new todo's text.
      const response = await axios.post(`${API_URL}/todos`, { text: newTodoText });
      // Add the new todo (returned by the API) to the local todos state.
      setTodos([...todos, response.data]);
      setNewTodoText(''); // Clear the input field after successful submission.
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to toggle the completion status of a to-do item.
  // This handles the "Update" part of CRUD.
  const toggleTodo = async (id, completed) => {
    try {
      // Make a PUT request to /api/todos/:id to update the completed status.
      const response = await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
      // Update the local todos state:
      // Map through existing todos, if a todo's id matches the updated one, replace it with the API response.
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Function to delete a to-do item.
  // This handles the "Delete" part of CRUD.
  const deleteTodo = async (id) => {
    try {
      // Make a DELETE request to /api/todos/:id.
      await axios.delete(`${API_URL}/todos/${id}`);
      // Update the local todos state:
      // Filter out the todo with the specified id.
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // JSX structure for the App component.
  return (
    <div className="App">
      <h1>My To-Do List</h1>
      {/* Form for adding new to-do items. Calls addTodo on submission. */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoText} // Controlled input: value is tied to newTodoText state.
          onChange={(e) => setNewTodoText(e.target.value)} // Update state on input change.
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      {/* Render the TodoList component, passing down the todos array and handler functions. */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
