const Setting = () => {
  const restartTasks = () => {
    if (window.confirm("Are you sure you want to restart all tasks? This action cannot be undone.")) {
      localStorage.removeItem("all-tasks");
    }
  }
  return (
    <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <p className="mb-4 text-gray-200">
        This page allows you to manage your task settings.
      </p>
      <button
        onClick={restartTasks}
        className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition-colors duration-300"
        title="Restart all tasks"
        aria-label="Restart all tasks"
        >
          Restart
        </button>
      <p className="mb-4 text-gray-400 text-sm">
        Note: Restarting tasks will clear all your current tasks. Please proceed with caution.
      </p>
      <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-300">
            This task management application is designed to help you organize and track your tasks efficiently.
            It allows you to add, view, and manage tasks with ease.
          </p>
      </div>
    </div>
  );
};

export default Setting;