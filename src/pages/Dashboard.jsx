import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
const priorityValue = {
    High: 3,
    Medium: 2,
    Low: 1,
    None: 0,
}
const statusValue = {
    Complete: 4,
    "In Progress": 3,
    Pending: 2,
    "On Hold": 1,
    None: 0,
};

const Dashboard = () => {
    const [allTasks, setAllTasks] = useState([]);
    let [todayTasks, setTodayTasks] = useState([]);
    let [previousTasks, setPreviousTasks] = useState([]);
    let [upcommingTasks, setUpcommingTasks] = useState([]);
    let [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        setAllTasks(JSON.parse(localStorage.getItem("all-tasks")) || []);
    }, []);

    useEffect(() => {
        if (!allTasks || !allTasks.length) {
            setTodayTasks([]);
            setPreviousTasks([]);
            setUpcommingTasks([]);
            setCompletedTasks([]);
            return;
        }

        const todayDate = new Date().toISOString().split("T")[0];
        const today = [];
        const previous = [];
        const upcoming = [];
        const completed = [];

        // Sort by dueDate (asc), then by priority (desc: High to Low) and then status (order: inprogress, pending, on hold, complete)
        const sortedTasks = allTasks.sort((a, b) => {
            if (a.dueDate !== b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (priorityValue[a.priority] !== priorityValue[b.priority]) {
                return priorityValue[b.priority] - priorityValue[a.priority];
            }
            return statusValue[b.status] - statusValue[a.status];
        });
        // Distribute tasks into respective arrays based on their status and dueDate
       

        sortedTasks.forEach((task) => {
            if (task.status === "Complete") {
                completed.push(task);
            } else if (task.dueDate === todayDate) {
                today.push(task);
            } else if (task.dueDate < todayDate) {
                previous.push(task);
            } else if (task.dueDate > todayDate) {
                upcoming.push(task);
            }
        });

        setTodayTasks(today);
        setPreviousTasks(previous);
        setUpcommingTasks(upcoming);
        setCompletedTasks(completed);
    }, [allTasks]);

    if (!allTasks.length) {
        return (
            <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to your Dashboard!
                </h1>
                <p className="mb-4">
                    You currently have no tasks or activities. Start by adding a
                    new task.
                </p>
                <Link
                    to="/add-task"
                    className="bg-green-700 text-sm text-white px-3 py-2 font rounded hover:bg-green-600"
                >
                    + Add Task
                </Link>
            </div>
        );
    }
    return (
        <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
            <div className="flex justify-between items-center text-2xl font-bold mb-4">
                <h1 className="uppercase">Dashboard</h1>
                <Link
                    to="/add-task"
                    className="bg-green-700 text-sm text-white px-4 py-1.5 font rounded hover:opacity-90 align-middle"
                >
                    <span className="text-3xl pr-3 font-light inline-block align-sub">+</span>
                    <span className="inline-block align-baseline">Add Task</span>
                </Link>
            </div>
            <p className="mb-8 pl-6">
                Here you can manage your tasks and study materials.
            </p>
            <TaskCard
                title="Today Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={todayTasks}
                setTasks={setTodayTasks}
            />
            <TaskCard
                title="Previous days Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={previousTasks}
                setTasks={setPreviousTasks}
            />
            <TaskCard
                title="Upcomming days Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={upcommingTasks}
                setTasks={setUpcommingTasks}
            />
            <TaskCard
                title="Completed Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
            />
        </div>
    );
};

export default Dashboard;
