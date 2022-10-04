const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,

} = graphql

//Scalar Type
/*
    String = GraphQLString
    int
    Float
    Boolean (true & false 1 or 0)
    ID
    
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a Person Type',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        isMarried: { type: graphql.GraphQLBoolean },
        gpa: { type: graphql.GraphQLFloat },
    })
})



//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {



    }
});


module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})