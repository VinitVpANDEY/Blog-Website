import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogAPI } from "../services/api";
import EditBlog from "../components/Blog/EditBlog";
import { useTheme } from "../context/ThemeContext"; // Assuming you have a ThemeContext for managing theme

interface Blog {
  title: string;
  content: string;
}

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({ title: "", content: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();  // Get the current theme (light/dark)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null); // Clear previous error
      try {
        const response = await blogAPI.getBlog(id!); // Ensure id is non-null
        setBlog({
          title: response.data.blog.title,
          content: response.data.blog.content,
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch the blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (updatedBlog: { title: string; content: string }) => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      await blogAPI.updateBlog(id!, updatedBlog);
      navigate(`/blog/${id}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update the blog.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Edit Blog
      </h1>
      {error && (
        <p className={`text-red-500 ${theme === "dark" ? "text-red-400" : ""} mb-4`}>
          {error}
        </p>
      )}
      <EditBlog
        blog={blog}
        onSave={handleUpdate}
        error={error}
      />
    </div>
  );
};

export default EditBlogPage;
