export const schema = `#graphql
   type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean!
   }
   type SoldStories {
      title: String!
      content: String!
      singleImage: [String]
      images: [String]
      slug: String!
   }
   type Property {
      propertyId: String!
      title: String!
      price: String!
      sold: Boolean!
      slider: Boolean!
      featured: Boolean
      hotOffer: Boolean
      sale: Boolean
      address: Address!
      mortgage: Mortgage
      areaSize: String
      gmapLink: String
      yearBuilt: String
      propertyType: String
      propertyDocuments: [PropertyDocument]
      singleImage: [String]
      images: [String]
      mapImage: [String]
      description: String
      slug: String!
      additionalDetails: [AdditionalDetail]
   }

   type Address {
      fullAddress: String!
      city: String!
      state: String!
      zipOrPostalCode: String!
      country: String!
   }
   type Comment {
      _id: ID!
      name: String!
      email: String!
      content: String!
      blogId: Blog!
   }

   type Mortgage {
      totalAmount: String
      downPayment: String
      interestRate: String
      loanYears: String
      propertyTax: String
      insurance: String
      pmi: String
   }

   type PropertyDocument {
      name: String
      url: String
   }

   type AdditionalDetail {
      key: String
      value: String
   }
   
   type Blog {
      _id: ID!
      title: String!
      content: String!
      slug: String!
      imageUrl: String
      comments: [Comment]
   }
   type Mutation {
      newUser(username: String!, email: String!, password: String!): String
      updateUser(id: ID!, username: String!, email: String!): String
      deleteUser(id: ID!): String
      loginUser(email: String!, password: String!): String
   }

   type Query {
      hello: String
      wow: String
      users: [User]
      blog: [Blog]
      soldStories: [SoldStories]
      property: [Property]
      blogById(id: ID!): Blog
      comment: [Comment]
      commentById(id: ID!): Comment
      demoUser: [DemoUser]
   }

   type DemoUser{
      id:String
      username: String
      email: String
      password: String
   }
`

/*-
   IF YOU ATTRIBUTE START FROM NUMBER 
   type Video {
      _id: ID!
      title: String!
      description: String!
      url: String!
      _1080p: String
      _720p: String
      _480p: String
      _360p: String
   }

   // HER 1080P START FROM NUMBER THATS WHY WE USE _
   type Query {
      video: [Video]
   }

*/