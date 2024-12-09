import React from "react";
import BlogItem from "./BlogItem";

interface BlogListProps {
    blogs: { id: string, title: string, content: string, author_name: string, createdAt: Date; updatedAt: Date}[];
    onBlogClick: (id: string) => void;  // Handler for blog item clicks
}

const BlogList: React.FC<BlogListProps> = ({blogs, onBlogClick}) => {
    return (
        <ul>
            {blogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} onClick={onBlogClick} />
            ))}
        </ul>
    )
}

export default BlogList;