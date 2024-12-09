import React from "react";

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
  const descriptionPreview = blog.content.slice(0, 100) + "...";
  
  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 hover:bg-gray-700 transition-all">
      <div onClick={() => onView(blog.id)} className="cursor-pointer">
        <h2 className="text-xl text-white font-semibold">{blog.title}</h2>
        <p className="text-gray-300">{descriptionPreview}</p>
        <p className="text-sm text-gray-400">
          <strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">
          <strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => onEdit(blog.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default UserBlogItem;
