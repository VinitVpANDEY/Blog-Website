import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface BlogItemProps {
  blog: {
    id: string;
    title: string;
    content: string;
    author_name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  onClick: (id: string) => void; // Click handler for navigation
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, onClick }) => {
  const descriptionPreview = blog.content.slice(0, 150) + "...";
  const { theme } = useTheme(); // Access theme from context

  return (
    <li
      onClick={() => onClick(blog.id)}
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-600 border-transparent dark:border-gray-600"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-700 border-transparent dark:border-gray-400"
      } p-4 m-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-300`}
    >
      <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"} mb-2`}>
        {blog.title}
      </h2>
      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
        {descriptionPreview}
      </p>
      <div className={`flex justify-between text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        <p>
          <strong>Author:</strong> {blog.author_name}
        </p>
        <p>
          <strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>
      <div className={`flex justify-between text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-2`}>
        <p>
          <strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleString()}
        </p>
      </div>
    </li>
  );
};

export default BlogItem;
