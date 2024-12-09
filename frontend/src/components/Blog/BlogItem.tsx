import React from "react";

interface BlogItemProps {
  blog: { 
    id: string; 
    title: string; 
    content: string; 
    author_name: string; 
    createdAt: Date; 
    updatedAt: Date;
  };
  onClick: (id: string) => void;  // Click handler for navigation
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, onClick }) => {
  const descriptionPreview = blog.content.slice(0, 150) + "...";

  return (
    <li 
      onClick={() => onClick(blog.id)} 
      className="bg-gray-700 text-gray-100 p-4 m-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-600 border border-transparent hover:border-gray-500 cursor-pointer transition-all duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-200 mb-2">{blog.title}</h2>
      <p className="text-gray-400 mb-4">{descriptionPreview}</p>
      <div className="flex justify-between text-sm text-gray-400">
        <p><strong>Author:</strong> {blog.author_name}</p>
        <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <p><strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleString()}</p>
      </div>
    </li>
  );
};

export default BlogItem;
