import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogAPI } from "../services/api";
import EditBlog from "../components/Blog/EditBlog";

interface Blog {
  title: string;
  content: string;
}

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({ title: "", content: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null); // Clear previous error
      try {
        const response = await blogAPI.getBlog(id!); // Ensure id is non-null
        setBlog({
          title: response.data.blog.title,
          content: response.data.blog.content,
        });
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch the blog.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (updatedBlog: { title: string; content: string }) => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      await blogAPI.updateBlog(id!, updatedBlog);
      navigate(`/blog/${id}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update the blog.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div>
      <EditBlog blog={blog} onSave={handleUpdate}  error={error} />
    </div>
  );
};

export default EditBlogPage;
