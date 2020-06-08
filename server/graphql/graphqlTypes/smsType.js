const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const SMSType = new GraphQLObjectType({
  name: "sms",
  fields: () => ({
    msg: { type: GraphQLString },
  }),
});

module.exports = { SMSType };
