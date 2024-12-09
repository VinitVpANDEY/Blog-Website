import React, { useState } from "react";

interface EditBlogProps {
    blog: { title: string; content: string };
    onSave: (updatedBlog: { title: string; content: string }) => void;
    error: any;
}

const EditBlog: React.FC<EditBlogProps> = ({ blog, onSave, error }) => {
    const [title, setTitle] = useState<string>(blog.title);
    const [content, setContent] = useState<string>(blog.content);
    const [saving, setSaving] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            onSave({ title, content });
        } catch (error) {
            console.error("Failed to save the blog", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gray-800 text-white p-3 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg">Content</label>
                    <textarea
                        id="description"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={5}
                        className="bg-gray-800 text-white p-3 rounded-md"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={saving}
                        className={`py-2 px-4 rounded-md ${saving ? 'bg-gray-600' : 'bg-blue-600'} text-white`}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
