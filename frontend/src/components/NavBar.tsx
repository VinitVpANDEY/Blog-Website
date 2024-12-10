import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggleButton";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    return (
        <nav className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 shadow-md transition">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                >
                    Home
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-8 items-center">
                    {isAuthenticated ? (
                        <>
                            <ThemeToggle />
                            <Link
                                to="/add/blog"
                                className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition"
                            >
                                Add Blog
                            </Link>
                            <Link
                                to="/user/blogs"
                                className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition"
                            >
                                My Blogs
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-lg font-medium transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signin"
                            className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600 px-4 py-2 rounded-md text-lg font-medium text-white transition"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
