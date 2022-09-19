const graphql = require('graphql');
var _ = require('lodash')

//Dummy Data
var usersData = [
    { id: '1', name: 'Thompson', age: 42 },
    { id: '13', name: 'Alvarez', age: 38 },
    { id: '311', name: 'Errup', age: 27 },
    { id: '19', name: 'Runner', age: 25 },
    { id: '150', name: 'Williams', age: 58 },
];







const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql



//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
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
                return _.find(usersData, { id: args.id })

                //we resolve with data
                //get and return data from a data source
            }
        }
    }
});
/*
{
    user(id: "1") {
        name

*/

module.exports = new GraphQLSchema({
    query: RootQuery
})






