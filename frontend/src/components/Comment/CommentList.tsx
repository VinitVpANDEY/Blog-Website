import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface Comment {
  content: string;
  createdAt: Date;
  author: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const { theme } = useTheme(); // Access theme from context

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"
      } p-4 rounded-lg shadow-md mt-4`}
    >
      {comments.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-300">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-gray-700 dark:bg-gray-800 text-white hover:bg-gray-600 dark:hover:bg-gray-700"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600"
              } p-3 rounded-lg transition-colors`}
            >
              <p>{comment.content}</p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <strong>By:</strong> {comment.author} <br />
                <strong>At:</strong> {new Date(comment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
