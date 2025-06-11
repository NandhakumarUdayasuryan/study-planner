import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const AddTask = () => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [action, setAction] = useState('');
    
    
    const navigate = useNavigate();

    const addTask = (newTask) => {
        // This function would typically send the new task to your backend or state management
        console.log('Task added:', newTask);
        const allTasks = localStorage.getItem("all-tasks");
        const updatedTasks = allTasks ? [...JSON.parse(allTasks), newTask] : [newTask];
        // Save the updated tasks back to localStorage
        localStorage.setItem("all-tasks", JSON.stringify(updatedTasks));
    };
    const resetTaskForm = () => {
        // For now, we'll just reset the form
        setTask('');
        setDueDate('');
        setPriority('medium');
    };  

    const handleSubmit = (e) => {
        console.log("Form action:", action);
        e.preventDefault(); // prevent page reload
        if (!task || !dueDate) {
            alert('Please fill in all fields');
            return;
        }
        const newTask = {
            task,
            dueDate,
            priority,
            status: 'pending', // Default status for new tasks
            createdDate: new Date().toISOString(), // Store the current date as createdDate
            updatedDate: new Date().toISOString(), // Store the current date as updatedDate
            id: Date.now(), // Unique ID for the task, can be replaced with a better ID generation method
        };
        console.log('New Task Added:', newTask);
        addTask(newTask);
        // Here you would typically send the new task to your backend or state management
        resetTaskForm();
        if (action === "move") {
            // Redirect to another page
            navigate("/");
        } else {
            // Stay on the same page
            console.log("Form submitted, but staying on the same page.");
        }
    };
  return (
    <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
      <h2 className="text-2xl font-bold mb-8">Add New Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-desc" className="block text-sm font-medium text-gray-200">Task</label>
          <input
            id="task-desc"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter task description"
          />
        </div>
        <div>
          <label htmlFor="due-date" className="block text-sm font-medium text-gray-200">Due Date</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-200">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mt-10 border-gray-500 border-t-1 pt-10 flex gap-4">
            <Link to="/">
                <button
                    type="submit"
                    className="w-full whitespace-nowrap bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                    Cancel
                </button>
            </Link>
            <button
                type="submit"
                onClick={() => setAction('move')}
                className="w-full whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                Add Task
            </button>
            <button
                type="submit"
                onClick={() => setAction('stay')}
                className="w-full whitespace-nowrap bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                Add and Continue
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;