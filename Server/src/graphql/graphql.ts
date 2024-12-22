import { ApolloServer } from "@apollo/server"
import { schema } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";

export const connectGraphql = (port: number,envMode:string) => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        nodeEnv: envMode
    })

    return server;
}