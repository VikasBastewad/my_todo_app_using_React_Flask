from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
# Enable CORS for all routes, allowing cross-origin requests (e.g., from React frontend)
CORS(app)

# In-memory list to store to-do items.
# This list acts as a simple database for the application.
# Each to-do item is a dictionary with 'id', 'text', and 'completed' keys.
todos = [
    {"id": 1, "text": "Learn Flask", "completed": True},
    {"id": 2, "text": "Learn React", "completed": False},
    {"id": 3, "text": "Build a To-Do App", "completed": False}
]
# Global variable to track the next available ID for new to-do items.
# This ensures that each new item gets a unique ID.
_next_id = 4

# Basic route for testing if the backend is running.
@app.route('/')
def hello():
    return "Hello from Flask Backend!"

# Route for creating a new to-do item.
# Accepts POST requests at /api/todos.
@app.route('/api/todos', methods=['POST'])
def create_todo():
    global _next_id # Use the global _next_id variable
    data = request.get_json() # Get the JSON data from the request body
    
    # Validate that the request contains data and a 'text' field
    if not data or 'text' not in data:
        return jsonify({"error": "Missing text field"}), 400 # Return 400 Bad Request if invalid
    
    # Create the new to-do item dictionary
    new_todo = {
        'id': _next_id,         # Assign the next available ID
        'text': data['text'],   # Get text from request
        'completed': False      # New todos are not completed by default
    }
    todos.append(new_todo) # Add the new item to the in-memory list
    _next_id += 1          # Increment the next ID
    return jsonify(new_todo), 201 # Return the new item and 201 Created status

# Route for retrieving all to-do items.
# Accepts GET requests at /api/todos.
@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos) # Return the current list of all todos

# Route for updating an existing to-do item by its ID.
# Accepts PUT requests at /api/todos/<id>.
@app.route('/api/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    data = request.get_json() # Get the JSON data from the request body
    
    # Find the todo item with the matching ID in the 'todos' list.
    # 'next' returns the first item that matches, or None if not found.
    todo = next((todo for todo in todos if todo['id'] == id), None)
    
    if not todo:
        # If no todo with the given ID is found, return 404 Not Found.
        return jsonify({"error": "Todo not found"}), 404
        
    # Update the todo item's text if 'text' is provided in the request data.
    if 'text' in data:
        todo['text'] = data['text']
    # Update the todo item's completion status if 'completed' is provided.
    if 'completed' in data:
        todo['completed'] = data['completed']
        
    return jsonify(todo) # Return the updated todo item.

# Route for deleting a to-do item by its ID.
# Accepts DELETE requests at /api/todos/<id>.
@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    global todos # Use the global 'todos' list
    
    # Find the todo item with the matching ID.
    todo = next((todo for todo in todos if todo['id'] == id), None)
    
    if not todo:
        # If no todo with the given ID is found, return 404 Not Found.
        return jsonify({"error": "Todo not found"}), 404
        
    # Recreate the 'todos' list, excluding the item to be deleted.
    todos = [t for t in todos if t['id'] != id]
    return jsonify({"message": "Todo deleted"}) # Return a success message.

# Standard Python entry point for running the Flask app.
if __name__ == '__main__':
    # Runs the Flask development server.
    # debug=True enables auto-reloading on code changes and provides a debugger.
    app.run(debug=True)
