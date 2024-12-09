import React, { useState } from "react";

interface AddCommentProps {
  onClick: (data: { content: string }) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ onClick }) => {
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
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Write your comment here..."
        className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className={`mt-2 px-4 py-2 rounded-md text-white font-semibold ${
          submitting ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Submitting..." : "Add Comment"}
      </button>
    </form>
  );
};

export default AddComment;
