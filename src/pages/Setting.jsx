import { useState, useRef } from "react";
import reactIcon from "../assets/react.svg";
import viteIcon from "../assets/vite.svg";
import studyPlannerLogo from "../assets/study-planner-logo.png";

const Setting = () => {
    const restartTasks = () => {
        if (
            window.confirm(
                "Are you sure you want to restart all tasks? This action cannot be undone."
            )
        ) {
            localStorage.removeItem("all-tasks");
        }
    };
    const [userDetails, setUserDetails] = useState(
        JSON.parse(localStorage.getItem("user-details")) || {
            name: "",
            email: "",
            linkedIn: "",
        }
    );

    // Debounce logic
    const debounceTimeout = useRef();

    const updateUserDetail = (fieldValue, fieldName) => {
        setUserDetails((prevDetails) => {
            const updatedDetails = { ...prevDetails, [fieldName]: fieldValue };
            // Debounce localStorage write
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                localStorage.setItem(
                    "user-details",
                    JSON.stringify(updatedDetails)
                );
            }, 1000);
            // 1 second debounce delay
            // Update state immediately for UI responsiveness
            return updatedDetails;
        });
    };

    return (
        <div className="p-8 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="mb-4 text-gray-400 pl-8 pt-2">
                Manage your tasks and application settings here.
            </p>
            <h2 className="text-xl font-semibold mb-4 mt-8">User Details</h2>
            <p className="text-gray-300 pl-8 mb-4">
                Update your user details to personalize your experience.
            </p>

            <div className="mb-4 text-gray-200 pl-8 ">
                <div className="py-2">
                    <label
                        className="font-bold text-gray-400"
                        htmlFor="user-name"
                    >
                        Name:
                    </label>
                    <input
                        id="user-name"
                        type="text"
                        onChange={(e) =>
                            updateUserDetail(e.target.value, "name")
                        }
                        value={userDetails.name}
                        className="border-0 px-2 mx-2 w-10/12 outline-0"
                        placeholder="Set your Name"
                    />
                </div>
                <div className="py-2">
                    <label
                        className="font-bold text-gray-400"
                        htmlFor="user-email"
                    >
                        Emai:
                    </label>
                    <input
                        id="user-email"
                        type="email"
                        onChange={(e) =>
                            updateUserDetail(e.target.value, "email")
                        }
                        value={userDetails.email}
                        className="border-0 px-2 mx-2 w-10/12 outline-0"
                        placeholder="Set your E-mail"
                    />
                </div>
                <div className="py-2">
                    <label
                        className="font-bold text-gray-400"
                        htmlFor="user-linkedin"
                    >
                        LinkedIn:
                    </label>
                    <input
                        id="user-linkedin"
                        type="text"
                        onChange={(e) =>
                            updateUserDetail(e.target.value, "linkedIn")
                        }
                        value={userDetails.linkedIn}
                        className="border-0 px-2 mx-2 w-10/12 outline-0"
                        placeholder="Set your linkedIn"
                    />
                    {userDetails.linkedIn ? (
                        <a
                            href={userDetails.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            View Profile
                        </a>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 mt-8">Restart Tasks</h2>
            <div className="pl-8">
                <button
                    onClick={restartTasks}
                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition-colors duration-300"
                    title="Restart all tasks"
                    aria-label="Restart all tasks"
                >
                    Restart
                </button>
                <p className="mb-4 pl-1 text-gray-400 text-xs italic pt-1">
                    Note: Restarting tasks will clear all your current tasks.
                    Please proceed with caution.
                </p>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-300 pl-8 inline-block">
                    This task management application is designed to help you
                    organize and track your tasks efficiently. It allows you to
                    add, view, and manage tasks with ease using react library.
                </p>
                
                <img
                    src={viteIcon}
                    className="p-2 ml-6 ml-2 inline"
                    alt="Vite"
                />
                <span className="text-xl pl-2">+</span>
                <img
                    src={reactIcon}
                    className="p-2 ml-2 inline"
                    alt="React"
                />
                <span className="text-xl pl-2">+</span>
                <img
                    src={studyPlannerLogo}
                    className="p-2 ml-1 w-16 inline brightness-200"
                    alt="Setting"
                />
            </div>
        </div>
    );
};

export default Setting;
