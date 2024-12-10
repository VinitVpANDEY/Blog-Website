import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface EditBlogProps {
  blog: { title: string; content: string };
  onSave: (updatedBlog: { title: string; content: string }) => void;
  error: any;
}

const EditBlog: React.FC<EditBlogProps> = ({ blog, onSave, error }) => {
  const { theme } = useTheme(); // Access theme from context
  const [title, setTitle] = useState<string>(blog.title);
  const [content, setContent] = useState<string>(blog.content);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      onSave({ title, content });
    } catch (error) {
      console.error("Failed to save the blog", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen p-6`}
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className={`text-lg font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`${
              theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            } p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600`}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className={`text-lg font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Content
          </label>
          <textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={12}
            className={`${
              theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            } p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600`}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className={`py-2 px-4 rounded-md ${
              saving
                ? "bg-gray-600 dark:bg-gray-700"
                : "bg-blue-600 dark:bg-blue-700"
            } text-white shadow-md hover:${
              saving
                ? "bg-gray-500 dark:bg-gray-600"
                : "bg-blue-500 dark:bg-blue-600"
            } transition-colors`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
