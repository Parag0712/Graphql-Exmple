import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
    name: string;
    email: string;
    content: string;
    blogId: mongoose.Types.ObjectId; // Reference to the blog post
}

    const commentSchema: Schema<IComment> = new Schema(
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            content: { type: String, required: true },
            blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
        },
        { timestamps: true }
    );

const Comment: Model<IComment> =
    mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;