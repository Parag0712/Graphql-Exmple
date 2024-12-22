import mongoose, { Schema, Document, Model } from "mongoose";

interface IStoriesBlog extends Document {
    title: string;
    content: string;
    // author: mongoose.Types.ObjectId;
    singleImage: string;
    images: string[];
    slug:string;
}

const soldStoriesSchema: Schema<IStoriesBlog> = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        singleImage: [{ type: String }],
        images: [{ type: String }],
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const SoldStories = mongoose.models.SoldStories || mongoose.model("SoldStories", soldStoriesSchema);

export default SoldStories;