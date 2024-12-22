import mongoose, { Document, Schema } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
}

const blogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;