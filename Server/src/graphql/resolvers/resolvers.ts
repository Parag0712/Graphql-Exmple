import { getUsers, getBlog, getStories, getProperty, getBlogById, getComment, getCommentById, getBlogByIdPopulate, getCommentByBlogId } from '../../datasource/index.js';

let myUser: Array<{ id: number, username: string, email: string, password: string }> = [
    {
        id: 0,
        email: "test@test.com",
        password: "test",
        username: "test"
    }
];

export const resolvers = {
    Mutation: {
        newUser: (parent: any, { username, email, password }: { username: string, email: string, password: string }) => {
            const id = myUser.length;
            myUser.push({ id, username, email, password });
            console.log(myUser);
            return "user created";
        },
        updateUser: (parent: any, { id, username, email, password }: { id: number, username: string, email: string, password: string }) => {
            const userIndex = myUser.findIndex(user => user.id == Number(id));
            console.log(userIndex);
            console.log(id);
            if (userIndex !== -1) {
                myUser[userIndex] = { id, username, email, password };
                return "user updated";
            }
            return "user not found";
        },
        deleteUser: (parent: any, { id }: { id: number }) => {
            const userIndex = myUser.findIndex(user => user.id === Number(id));
            console.log(userIndex);
            console.log(id);
            console.log(userIndex);
            if (userIndex !== -1) {
                myUser.splice(userIndex, 1);
                return "user deleted";
            }
            return "user not found";
        },
    },
    Query: {
        hello: () => 'Hello, World!',
        wow: () => 'Wow, World!',
        users: getUsers,
        blog: getBlog,
        soldStories: getStories,
        property: getProperty,
        blogById: getBlogById,
        comment: getComment,
        commentById: getCommentById,
        demoUser: () => {
            return myUser;
        }
    },
    Comment: {
        blogId: async (comment: { blogId: string }) => await getBlogByIdPopulate(comment.blogId)
    },
    Blog: {
        comments: async (blog: { id: string }) => await getCommentByBlogId(blog.id)
    },
    /*
      FOR VIDEO ATTRIBUTE START FROM NUMBER THATS WHY WE USE 
      Video: (video: any) => {
        return {
          _1080p: video["1080p"],
          _720p: video["720p"],
          _480p: video["480p"],
          _360p: video["360p"]
        }
      }
    */

}