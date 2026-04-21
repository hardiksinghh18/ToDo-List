# ToDo List Application

A simple, modern ToDo list application built with React and Vite. This application allows users to add, delete, and mark tasks as complete.

## Features

- **Add Tasks**: Quickly add new tasks to your list.
- **Delete Tasks**: Remove tasks you no longer need.
- **Mark as Complete**: Toggle the completion status of tasks.
- **Persisted Data**: Tasks are saved to `localStorage`, so they persist across page refreshes.
- **Responsive Design**: Clean, modern UI that works on different screen sizes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ToDo-List
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

3. Start adding and managing your tasks!

## Project Structure

```
ToDo-List/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx        # Form for adding new tasks
│   │   ├── TodoItem.jsx        # Individual task display
│   │   └── TodoList.jsx        # List container
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
└── vite.config.js              # Vite configuration
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **CSS**: For styling and layout.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.