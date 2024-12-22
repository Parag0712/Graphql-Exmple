import Comment from "../models/comment.js";

export const getComment = async () => {
    const comment = await Comment.find();
    return comment;
}

export const getCommentById = async (_: any, args: any) => {
    const { id } = args;
    const comment = await Comment.findById(id);
    return comment;
}

export const getCommentByBlogId = async (id: string) => {
    const comment = await Comment.find({
        blogId: id
    });
    return comment;
}
