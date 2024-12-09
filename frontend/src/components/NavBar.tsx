import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    return (
        <nav className="bg-gray-700 text-gray-100 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-white hover:text-gray-300"
                >
                    Home
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-6 items-center">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/add/blog"
                                className="text-lg font-medium hover:text-gray-300 transition"
                            >
                                Add Blog
                            </Link>
                            <Link
                                to="/user/blogs"
                                className="text-lg font-medium hover:text-gray-300 transition"
                            >
                                My Blogs
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-600 text-gray-100 hover:bg-gray-500 px-4 py-2 rounded-md text-lg font-medium transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signin"
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-lg font-medium text-white transition"
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
