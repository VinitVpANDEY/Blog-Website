import React from "react";

interface Comment {
  content: string;
  createdAt: Date;
  author: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li
              key={index}
              className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <p className="text-white">{comment.content}</p>
              <p className="text-sm text-gray-400">
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
