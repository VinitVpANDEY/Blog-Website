import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../services/api";
import CommentList from "../components/Comment/CommentList";
import AddComment from "../components/Comment/AddComment";

interface Comment {
  content: string;
  createdAt: Date;
  author: string;
}

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<{ id: string; title: string; content: string; author_name: string; createdAt: Date; updatedAt: Date } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        const response = await blogAPI.getBlog(id);
        setBlog(response.data.blog);
      }
    };

    fetchBlog();

    const fetchComment = async () => {
      if (id) {
        const response = await blogAPI.getComments(id);
        setComments(response.data.comments);
      }
    }

    fetchComment();
  }, [id]);

  const addComment = async (data: { content: string }) => {
    if (id) {
      try {
        const response = await blogAPI.addComment(id, data);
        const newComment = response.data.comment; 
        setComments((prevComments) => [newComment, ...prevComments]); 
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-100 mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-4">{blog.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <p><strong>Author:</strong> {blog.author_name}</p>
          <p><strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <p><strong>Updated At:</strong> {new Date(blog.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Comments</h2>
        {/* Add New Comment */}
        <AddComment onClick={addComment} />

        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default BlogPage;
