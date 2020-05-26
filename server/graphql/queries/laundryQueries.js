const graphql = require("graphql");
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

const Laundry = require("../../models/laundry");

const { LaundryCustomers } = require("../graphqlTypes/laundryType");

const LaundryQueries = {
  getAllLaundry: {
    type: new GraphQLList(LaundryCustomers),
    resolve(parent, args) {
      //code to retrieve
    }
  },
  getLaundryDate: {
    type: new GraphQLList(LaundryCustomers),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
      //code to get the date we are searching from
      const { fromDate, endDate } = args;
      const laundry = Laundry.find({
        date: { $gte: fromDate, $lt: endDate }
      });
      return laundry;
    }
  },
  customersLaundry: {
    type: new GraphQLList(LaundryCustomers),
    args: {
      customerId: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const { customerId } = args;
      const customerLaundry = await Laundry.find({
        customerId: customerId
      }).sort({ date: 1 });
      return customerLaundry;
    }
  },
  getLaundryCollectedOrNot: {
    type: new GraphQLList(LaundryCustomers),
    args: {
      clothesCollected: { type: GraphQLBoolean }
    },
    async resolve(parent, args) {
      const { clothesCollected } = args;
      const customersLaundry = await Laundry.find({
        clothesCollected: clothesCollected
      }).sort({ date: 1 });
      return customersLaundry;
    }
  },
  getLaundryCollectedOrNotByDate: {
    type: new GraphQLList(LaundryCustomers),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
      clothesCollected: { type: GraphQLBoolean }
    },
    async resolve(parent, args) {
      //code to get the date we are searching from
      const { fromDate, endDate, clothesCollected } = args;
      const laundry = Laundry.find({
        clothesCollected: clothesCollected,
        date: { $gte: new Date(fromDate), $lt: new Date(endDate) }
      });
      return laundry;
    }
  }
};

module.exports = LaundryQueries;
