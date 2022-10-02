const graphql = require('graphql');
var _ = require('lodash')

//Dummy Data
var usersData = [
    { id: '1', name: 'Thompson', age: 42, profession: 'PhD Journalism' },
    { id: '13', name: 'Alvarez', age: 38, profession: 'Chef' },
    { id: '311', name: 'Errup', age: 27, profession: 'Influencer' },
    { id: '19', name: 'Runner', age: 25, profession: 'Entrepreneur' },
    { id: '150', name: 'Williams', age: 58, profession: 'Professor' },
];

var hobbiesData = [
    { id: '1', title: 'Musician', description: 'Writer, composer and songwriter', userId: '13' },
    { id: '2', title: 'Biking Enthusiast', description: 'Mountain biking / Off-road trail riding', userId: '19' },
    { id: '3', title: 'Mechanic', description: 'Motorcycle maintenance', userId: '311' },
    { id: '4', title: 'Gardening', description: 'Growing and maintaining a garden for leisure and sustenance', userId: '150' },
    { id: '5', title: 'Programming', description: 'Improving life through computers', userId: '1' }
];

var postsData = [
    { id: '1', comment: 'Sourcing Key Components', userId: '1' },
    { id: '2', comment: 'Top MTB Trails in Tennessee', userId: '150' },
    { id: '3', comment: '10 Seed Banks You Should Be Buying From', userId: '19' },
    { id: '4', comment: 'Programming Interview Preparation', userId: '311' },
    { id: '5', comment: 'The Tastes of Aubrac: Book Review', userId: '13' },
]




const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,

} = graphql

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new graphql.GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, { userId: parent.id })
            }
        },

        hobbies: {
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, { userId: parent.id })
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }


    })
});

//Post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },

            resolve(parent, args) {

                //we resolve with data
                //get and return data from a data source

                return _.find(usersData, { id: args.id })
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData;
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                //return data for our hobby
                return _.find(hobbiesData, { id: args.id })
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData;
            }
        },

        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                //return data (post data)
                return _.find(postsData, { id: args.id })
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postsData;
            }
        },


    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateUser: {
            type: UserType,
            args: {
                //  id: {type: GraphQLID}
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                }
                return user;
            }
        },
        //todo: CreatePost mutation
        CreatePost: {
            type: PostType,
            args: {
                //    id: { type: GraphQLID },
                comment: { type: GraphQLString },
                userId: { type: GraphQLID },
            },

            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post;
            }
        },
        //todo: CreateHobby mutation
        CreateHobby: {
            type: HobbyType,
            args: {
                //  id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userID: { type: GraphQLID },
            },

            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userID,
                }
                return hobby;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})






