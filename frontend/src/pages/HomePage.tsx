import { useEffect, useState } from "react";
import { blogAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/Blog/BlogList";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogAPI.getBlogs();
      setBlogs(response.data.blogs);
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id: string) => {
    if (!isAuthenticated) navigate("/signin");
    else navigate(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">All Blogs</h1>
        <BlogList blogs={blogs} onBlogClick={handleBlogClick} />
      </div>
    </div>
  );
};

export default HomePage;
