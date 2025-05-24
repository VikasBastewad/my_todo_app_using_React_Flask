# Full-Stack To-Do List Application

This project is a full-stack To-Do list web application built with React for the frontend and Python Flask for the backend. It allows users to create, read, update, and delete (CRUD) to-do items.

## Project Structure

The project is organized into two main directories:

-   `frontend/`: Contains the React application.
    -   `todo-app/`: The create-react-app bootstrapped project.
        -   `src/`: Contains the React components (`App.js`, `TodoList.js`, `TodoItem.js`), CSS, etc.
        -   `public/`: Contains the public assets and `index.html`.
        -   `package.json`: Manages frontend dependencies and scripts.
-   `backend/`: Contains the Flask API.
    -   `app.py`: The main Flask application file with API route definitions and logic.
    -   `requirements.txt`: Lists the Python dependencies for the backend.
    -   `venv/` (optional, if created by user): Python virtual environment.

## Features

-   Create new to-do items.
-   View all existing to-do items.
-   Mark to-do items as completed or incomplete.
-   Delete to-do items.
-   Data is persisted in memory on the backend (restarts with initial sample data).

## Technologies Used

### Frontend
-   **React:** A JavaScript library for building user interfaces.
    -   Functional Components and Hooks (`useState`, `useEffect`).
-   **Axios:** A promise-based HTTP client for making API requests from the browser.
-   **HTML & CSS:** For structuring and styling the application.

### Backend
-   **Flask:** A lightweight WSGI web application framework in Python.
-   **Flask-CORS:** A Flask extension for handling Cross-Origin Resource Sharing (CORS), allowing the frontend to communicate with the backend from a different origin (port).
-   **Python:** The programming language used for the backend logic.

## API Endpoints

The backend Flask application exposes the following REST API endpoints. All request and response bodies are in JSON format. The base URL for the API is `/api`.

-   **`GET /api/todos`**
    -   **Description:** Retrieves all to-do items.
    -   **Response (200 OK):** An array of to-do objects.
        ```json
        [
          {"id": 1, "text": "Learn Flask", "completed": true},
          {"id": 2, "text": "Learn React", "completed": false}
        ]
        ```

-   **`POST /api/todos`**
    -   **Description:** Creates a new to-do item.
    -   **Request Body:**
        ```json
        {"text": "Your new todo text"}
        ```
    -   **Response (201 Created):** The newly created to-do object.
        ```json
        {"id": 4, "text": "Your new todo text", "completed": false}
        ```

-   **`PUT /api/todos/<int:id>`**
    -   **Description:** Updates an existing to-do item, typically to change its text or completion status.
    -   **Request Body (can include one or both):**
        ```json
        {"text": "Updated todo text", "completed": true}
        ```
    -   **Response (200 OK):** The updated to-do object.
        ```json
        {"id": 1, "text": "Updated todo text", "completed": true}
        ```
    -   **Response (404 Not Found):** If the to-do item with the given `id` does not exist.
        ```json
        {"error": "Todo not found"}
        ```

-   **`DELETE /api/todos/<int:id>`**
    -   **Description:** Deletes a to-do item.
    -   **Response (200 OK):** A success message.
        ```json
        {"message": "Todo deleted"}
        ```
    -   **Response (404 Not Found):** If the to-do item with the given `id` does not exist.
        ```json
        {"error": "Todo not found"}
        ```

## Setup and Run Instructions

To get this application running locally, you'll need to set up and run both the backend (Flask) and frontend (React) servers.

### Backend Setup (Flask API)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a Python virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```
    (On Windows, you might use `py -m venv venv` or `python3 -m venv venv`)

3.  **Activate the virtual environment:**
    -   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
    -   On Windows (Git Bash or PowerShell):
        ```bash
        source venv/Scripts/activate
        ```
    -   On Windows (Command Prompt):
        ```bash
        venv\Scripts\activate.bat
        ```

4.  **Install dependencies:**
    Make sure your virtual environment is active, then run:
    ```bash
    pip install -r requirements.txt
    ```
    This will install Flask and Flask-CORS.

5.  **Run the Flask development server:**
    ```bash
    flask run
    ```
    (Alternatively, you can use `python app.py`)

    The backend API should now be running on `http://localhost:5000`. You'll see output in your terminal indicating the server is running, typically including `* Running on http://127.0.0.1:5000/`. The initial sample to-do items will be available.

### Frontend Setup (React App)

1.  **Open a new terminal window/tab.** It's important to keep the backend server running in its own terminal.

2.  **Navigate to the frontend application directory:**
    ```bash
    cd frontend/todo-app
    ```

3.  **Install dependencies:**
    If you haven't already, or to ensure all dependencies are up to date:
    ```bash
    npm install
    ```
    (If you prefer yarn: `yarn install`)

4.  **Start the React development server:**
    ```bash
    npm start
    ```
    (If you prefer yarn: `yarn start`)

    This will typically open the React application in your default web browser at `http://localhost:3000`.

### Running Concurrently

-   Ensure both the Flask backend server (usually on `http://localhost:5000`) and the React frontend development server (usually on `http://localhost:3000`) are running in separate terminal windows.
-   The React application is configured to make API requests to `http://localhost:5000/api/...`.
-   Flask-CORS has been enabled on the backend to allow requests from the React development server's origin (`http://localhost:3000`).

Once both are running, open `http://localhost:3000` in your browser to use the To-Do List application. You should see the initial sample to-dos and be able to add, complete, and delete items.
