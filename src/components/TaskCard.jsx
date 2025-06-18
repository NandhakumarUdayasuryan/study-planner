import { AlertContext } from "../contexts/alertContext";
import { useContext } from "react";

function TaskCard({ allTasks, setAllTasks, tasks, title }) {
    const { setAlertMessage } = useContext(AlertContext);
    const updateField = (fieldValue, fieldName, affectedTask) => {
        let updatedField = {};
        const updatedTasks = allTasks.map((task) => {
            if (task.id === affectedTask.id) {
                updatedField[fieldName] = fieldValue;
                return {
                    ...task,
                    ...updatedField,
                    updatedDate: new Date().toISOString(),
                };
            }
            return task;
        });
        localStorage.setItem("all-tasks", JSON.stringify(updatedTasks));
        setAllTasks(updatedTasks);
        setAlertMessage({message:`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} of (${affectedTask.task}) updated successfully!`, type: "success"});
    };

    const deleteTask = (affectedTask) => {
        if (
            window.confirm(
                "Are you sure you want to delete this task? This action cannot be undone."
            )
        ) {
            const updatedTasks = allTasks.filter((task) => task.id !== affectedTask.id);
            localStorage.setItem("all-tasks", JSON.stringify(updatedTasks));
            setAllTasks(updatedTasks);
            setAlertMessage({message:`Task(${affectedTask.task}) deleted successfully!`, type: "error"});
        }
    };

    if (!tasks || tasks.length === 0) {
        return (
            <div className="mb-8">
                <h3 className="text-xl font-extrabold uppercase">{title}</h3>
                <p className="text-gray-500 pl-5 py-1">No tasks available.</p>
            </div>
        );
    }
    return (
        <div className="mb-8">
            <h3 className="text-xl font-extrabold uppercase">{title}</h3>
            {/* Placeholder for upcoming tasks */}
            <ul className="list-disc pl-5">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="py-1 flex justify-between items-center"
                    >
                        <div className="text-gray-200">
                            <span className="">
                                {`${task.task} (Due: ${new Date(
                                    task.dueDate
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                        )`}
                            </span>
                        </div>
                        <div className="ml-2 text-gray-400">
                            <span className="mr-3 text-gray-400">
                                <span>Priority: </span>
                                <select
                                    value={task.priority}
                                    onChange={(e) =>
                                        updateField(
                                            e.target.value,
                                            "priority",
                                            task
                                        )
                                    }
                                    className="ml-2 bg-gray-600 text-gray-100 rounded px-1 py-1 cursor-pointer hover:opacity-85"
                                    title="Update Task Priority"
                                    aria-label="Update Task Priority"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </span>
                            <span>Status: </span>
                            <select
                                value={task.status}
                                onChange={(e) =>
                                    updateField(
                                        e.target.value,
                                        "status",
                                        task
                                    )
                                }
                                className="ml-2 bg-gray-600 text-gray-100 rounded px-1 py-1 cursor-pointer hover:opacity-85"
                                title="Update Task Status"
                                aria-label="Update Task Status"
                            >
                                <option value="Complete">Complete</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                            <button
                                className="ml-3 bg-pink-900 text-gray-200 px-2 py-1 rounded hover:opacity-90 cursor-pointer"
                                onClick={() => deleteTask(task)}
                                title="Delete Task"
                                aria-label="Delete Task"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import PropTypes from "prop-types";

TaskCard.propTypes = {
    allTasks: PropTypes.array.isRequired,
    setAllTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default TaskCard;
