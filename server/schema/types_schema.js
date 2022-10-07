const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,

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
        name: { type: new GraphQLNonNull(graphql.GraphQLString) },
        age: { type: new GraphQLNonNull(graphql.GraphQLInt) },
        isMarried: { type: graphql.GraphQLBoolean },
        gpa: { type: graphql.GraphQLFloat },

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            //args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                //we resolve with data
                //get and return data from a data source
                let personObj = {
                    //id: {type: GraphQLID},
                    name: "Sam",
                    age: 35,
                    isMarried: true,
                    gpa: 4.0,
                };
                return personObj;
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})