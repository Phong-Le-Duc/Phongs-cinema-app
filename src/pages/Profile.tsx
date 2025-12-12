import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const [deleteError, setDeleteError] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [personalDropdownOpen, setPersonalDropdownOpen] = useState(false);
    const [emailDropdownOpen, setEmailDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [ticketsDropdownOpen, setTicketsDropdownOpen] = useState(false);
    async function handleDeleteAccount() {
        setDeleteError("");
        setDeleteSuccess("");
        if (!user || !user.email) {
            setDeleteError("User not found.");
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.email}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                setDeleteSuccess("Account deleted successfully.");
                logout();
                navigate("/login");
            } else {
                setDeleteError(data.error || "Failed to delete account.");
            }
        } catch (err) {
            setDeleteError("Server error. Try again later.");
        }
    }

    return (
        <div className="h-auto bg-gray-950 rounded p-8 flex flex-col gap-4">
            {/* Personal Data Dropdown */}
            <div className="relative">
                <button
                    className="flex gap-4 items-center w-full text-left"
                    onClick={() => setPersonalDropdownOpen((open) => !open)}
                >
                    <figure className="p-4 bg-blue-700 rounded">
                        <img className="cursor-pointer" src="src/assets/Activity.png" alt="Personal Data" />
                    </figure>
                    <span className="text-white font-bold cursor-pointer">Personal Data</span>
                    <svg className="w-4 h-4 ml-auto text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {personalDropdownOpen && (
                    <div className="mt-2 w-full bg-white rounded shadow-lg">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Placeholder Option 1</span>
                        </button>
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Placeholder Option 2</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Email & Payment Dropdown */}
            <div className="relative">
                <button
                    className="flex gap-4 items-center w-full text-left"
                    onClick={() => setEmailDropdownOpen((open) => !open)}
                >
                    <figure className="p-4 bg-blue-400 rounded">
                        <img className="cursor-pointer" src="src/assets/user.png" alt="Email and payment" />
                    </figure>
                    <span className="text-white font-bold cursor-pointer">Email & Payment</span>
                    <svg className="w-4 h-4 ml-auto text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {emailDropdownOpen && (
                    <div className="mt-2 w-full bg-white rounded shadow-lg">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Placeholder Option 1</span>
                        </button>
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Placeholder Option 2</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Account button FIRST */}
            <div className="flex flex-col gap-2 mt-4">
                <button className="flex gap-4 items-center" onClick={() => setShowDeleteConfirm(true)} disabled={showDeleteConfirm}>
                    <figure className="p-4 bg-red-700 rounded"><img className="cursor-pointer" src="src/assets/Logout.png" alt="Delete Account" /></figure>
                    <p className="text-white font-bold cursor-pointer">Deactivate Account</p>
                </button>
                {showDeleteConfirm && (
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="text-white">Are you sure you want to delete your account?</p>
                        <div className="flex gap-2 mt-2">
                            <button className="flex gap-4 items-center bg-red-700 p-2 rounded" onClick={handleDeleteAccount}>
                                <p className="text-white">Confirm Delete</p>
                            </button>
                            <button className="flex gap-4 items-center bg-gray-700 p-2 rounded" onClick={() => { setShowDeleteConfirm(false); setDeleteError(""); }}>
                                <p className="text-white">Cancel</p>
                            </button>
                        </div>
                        {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
                        {deleteSuccess && <p className="text-green-500 mt-2">{deleteSuccess}</p>}
                    </div>
                )}
            </div>

            {/* Notification Dropdown */}
            <div className="relative">
                <button
                    className="flex gap-4 items-center w-full text-left"
                    onClick={() => setNotificationDropdownOpen((open) => !open)}
                >
                    <figure className="p-4 bg-blue-400 rounded">
                        <img className="cursor-pointer" src="src/assets/user.png" alt="Notification" />
                    </figure>
                    <span className="text-white font-bold cursor-pointer">Notification</span>
                    <svg className="w-4 h-4 ml-auto text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {notificationDropdownOpen && (
                    <div className="mt-2 w-full bg-white rounded shadow-lg">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Enable Notifications placeholder</span>
                        </button>
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Disable Notifications placeholder</span>
                        </button>
                    </div>
                )}
            </div>


            {/* Tickets Dropdown */}
            <div className="relative">
                <button
                    className="flex gap-4 items-center w-full text-left"
                    onClick={() => setTicketsDropdownOpen((open) => !open)}
                >
                    <figure className="p-4 bg-blue-400 rounded">
                        <img className="cursor-pointer" src="src/assets/user.png" alt="Tickets" />
                    </figure>
                    <span className="text-white font-bold cursor-pointer">Tickets</span>
                    <svg className="w-4 h-4 ml-auto text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {ticketsDropdownOpen && (
                    <div className="mt-2 w-full bg-white rounded shadow-lg">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <span>Tickets placeholder</span>
                        </button>

                    </div>
                )}
            </div>


            {/* Logout button SECOND */}
            <button className="flex gap-4 items-center " onClick={handleLogout}>
                <figure className="p-4 bg-red-700 rounded"><img className="cursor-pointer" src="src/assets/Logout.png" alt="Logout" /></figure>
                <p className="text-white font-bold cursor-pointer">Logout</p>
            </button>

            <div>

                {open && (
                    <div className="bg-white text-black p-4 rounded shadow mt-2">
                        {/* Dropdown content here */}
                        <p>Personal Data Option 1</p>
                        <p>Personal Data Option 2</p>
                    </div>
                )}
                {/* The rest of your content will be pushed down */}
            </div>
        </div>
    );
}