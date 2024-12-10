import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface UserBlogItemProps {
  blog: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author_name: string;
  };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

const UserBlogItem: React.FC<UserBlogItemProps> = ({ blog, onDelete, onEdit, onView }) => {
  const { theme } = useTheme(); // Get the current theme from ThemeContext
  const descriptionPreview = blog.content.slice(0, 150) + "...";

  return (
    <li
      onClick={() => onView(blog.id)}
      className={`${
        theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900"
      } p-4 m-4 rounded-lg shadow-md hover:shadow-lg hover:${
        theme === "dark" ? "bg-gray-700 dark:bg-gray-600" : "bg-gray-300"
      } border border-transparent hover:border-gray-500 dark:hover:border-gray-400 cursor-pointer transition-all duration-300`}
    >
      <h2
        className={`text-xl font-semibold mb-2 ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }`}
      >
        {blog.title}
      </h2>
      <p
        className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        } mb-4`}
      >
        {descriptionPreview}
      </p>
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>
          <strong>Author:</strong> {blog.author_name}
        </p>
        <p>
          <strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
        <p>
          <strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-3 flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(blog.id);
          }}
          className={`${
            theme === "dark" ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
          } text-white px-4 py-2 rounded-md transition-colors`}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(blog.id);
          }}
          className={`${
            theme === "dark" ? "bg-red-700 hover:bg-red-600" : "bg-red-600 hover:bg-red-500"
          } text-white px-4 py-2 rounded-md transition-colors`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default UserBlogItem;
