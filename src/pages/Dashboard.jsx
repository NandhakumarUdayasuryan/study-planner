import { Link } from "react-router-dom";

const Dashboard = () => {
  const allTasks = JSON.parse(localStorage.getItem("all-tasks")) || [];
  const incompletedTasks = allTasks.filter(task => new Date(task.dueDate) > new Date()).map(task => `${task.task} (Due: ${task.dueDate})`) || [];
  // Filter tasks that are due in the future and format them for display
  // const incompletedTasks = allTasks.filter(task => new Date(task.dueDate) > new Date()).map(task => `${task.task} (Due: ${task.dueDate})`) || [];
  // This will give us an array of task descriptions with their due dates 
  if (!incompletedTasks.length) {
    return (
      <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
        <p className="mb-4">You currently have no tasks or activities. Start by adding a new task.</p>
        <Link to="/add-task" className="bg-blue-500 text-sm text-white px-2 py-1 font rounded hover:bg-blue-600">
          + Add Task 
        </Link>
      </div>
    );
  }
  return (
    <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
      <div className="flex justify-between items-center text-2xl font-bold mb-4">
        <h1>Dashboard</h1>
        <Link to="/add-task" className="bg-blue-500 text-sm text-white px-2 py-1 font rounded hover:bg-blue-600">
          + Add Task 
        </Link>
      </div>
      <p className="mb-4">Here you can manage your tasks and study materials.</p>
      {/* Add more dashboard content here */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Incompleted Tasks</h3>
        {/* Placeholder for upcoming tasks */}
        <ul className="list-disc pl-5">
          {incompletedTasks.map((task) => (
            <li key={task.id}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;