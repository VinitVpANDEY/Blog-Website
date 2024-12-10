import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface AddCommentProps {
  onClick: (data: { content: string }) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onClick }) => {
  const { theme } = useTheme(); // Access theme from context
  const [content, setContent] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      onClick({ content });
      setContent(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Failed to add comment", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        theme === "dark" ? "bg-gray-800 dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"
      } p-4 rounded-lg shadow-md mb-4`}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Write your comment here..."
        className={`w-full p-2 rounded-md border focus:outline-none focus:ring-2 resize-none ${
          theme === "dark"
            ? "bg-gray-700 dark:bg-gray-800 text-white dark:text-gray-100 border-gray-600 dark:border-gray-500"
            : "bg-gray-200 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-400"
        }`}
      />
      <button
        type="submit"
        disabled={submitting}
        className={`mt-2 px-4 py-2 rounded-md font-semibold ${
          submitting
            ? theme === "dark"
              ? "bg-gray-600 dark:bg-gray-700"
              : "bg-gray-400 dark:bg-gray-500"
            : theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {submitting ? "Submitting..." : "Add Comment"}
      </button>
    </form>
  );
};

export default AddComment;
