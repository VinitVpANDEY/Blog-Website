import { useState } from "react";
import { blogAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Assuming you have a ThemeContext for managing theme

const AddBlogPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();  // Get the current theme (light/dark)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await blogAPI.createBlog({ title, content });
      const blogId = response.data.blog.id;
      navigate(`/blog/${blogId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during post creation.");
    } finally {
      setLoading(false);
    }
  };

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
        Add Post
      </h1>
      {error && (
        <p className={`text-red-500 ${theme === "dark" ? "text-red-400" : ""} mb-4`}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`${
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"
            } p-3 rounded-md`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={12}
            className={`${
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900"
            } p-3 rounded-md`}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded-md ${
              loading
                ? "bg-gray-600"
                : theme === "dark"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
