const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLID } = graphql;
const Laundry = require("../../models/laundry");
const { LaundryType } = require("../graphqlTypes/laundryType");

const Mutation = {
  addLaundry: {
    type: LaundryType,
    args: {
      clothes: { type: GraphQLString },
      amount: { type: GraphQLString },
      number: { type: GraphQLString },
      date: { type: GraphQLString },
      customerId: { type: GraphQLString },
      clothesCollected: { type: GraphQLBoolean },
    },
    async resolve(parent, args, context) {
      //using mongoose to save the data here
      const { req } = context;
      if (req.isAuth == false) {
        throw new Error("please login");
      }
      try {
        //check if the id is a valid id
        const { customerId, amount, date, clothes, number } = args;
        let newLaundry = await new Laundry({
          customerId,
          amount,
          date,
          clothes,
          number,
          clothesCollected: false,
        });
        return newLaundry.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  markAsCollected: {
    type: LaundryType,
    args: {
      laundryId: { type: GraphQLString },
    },
    async resolve(parent, args) {
      //using mongoose to save the data here
      try {
        //check if the id is a valid id
        const { laundryId } = args;
        console.log(laundryId);
        const laundry = await Laundry.findOneAndUpdate(
          { _id: laundryId },
          {
            clothesCollected: true,
          }
        );
        return laundry;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = Mutation;
