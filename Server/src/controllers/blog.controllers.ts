import Blog from "../models/blog.js";

export const getBlog = async (parent: any, args: any, context: any, info: any) => {
    console.log(context);
    console.log(info);
    console.log(parent);
    const token = context.headers.authorization;
    if (!token) {
        throw new Error("Authentication token is required");
    }

    const blog = await Blog.find();
    return blog;
}

export const getBlogById = async (_: any, args: any) => {
    const { id } = args;
    const blog = await Blog.findById(id);
    return blog;
}

export const getBlogByIdPopulate = async (id: string) => {
    const blog = await Blog.findById(id);
    return blog;
}
