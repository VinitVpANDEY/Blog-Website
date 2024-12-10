import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogAPI } from "../services/api";
import UserBlogItem from "../components/Blog/UserBlogItem";
import { useTheme } from "../context/ThemeContext";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author_name: string;
}

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogAPI.getUsersBlog();
      setBlogs(response.data.blogs);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await blogAPI.deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete the blog.");
    }
  };

  const handleViewBlog = (id: string) => {
    navigate(`/blog/${id}`);
  };

  const handleEditBlog = (id: string) => {
    navigate(`/blog/${id}/edit`);
  };

  if (loading) {
    return <div className="text-center text-white">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>My Blogs</h1>
      {blogs.length === 0 ? (
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>You have not written any blogs yet.</p>
      ) : (
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <UserBlogItem
              key={blog.id}
              blog={blog}
              onDelete={handleDelete}
              onEdit={handleEditBlog}
              onView={handleViewBlog}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBlogsPage;
