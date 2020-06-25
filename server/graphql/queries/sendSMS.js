const graphql = require("graphql");
const { GraphQLString, GraphQLList } = graphql;
const axios = require("axios").default;
const { SMSType } = require("../graphqlTypes/smsType");
const Customer = require("../../models/customer");
const {
  allCustomers,
  alldebtorCustomers,
  debtorsOwingMoreThan5K,
  customersNotWashedForAWhile,
  payingCustomers,
} = require("./customerTypeQueries");
const dotenv = require("dotenv");
dotenv.config();

const capitalizeFirstLetter = (word) => {
  if (word && word.length > 0) {
    let capWord = word[0].toUpperCase();
    capWord = capWord + word.substr(1);
    return capWord;
  }
};

const smsQueries = {
  sendMessage: {
    type: new GraphQLList(SMSType),
    args: {
      message: { type: GraphQLString },
      customerType: { type: GraphQLString },
      returnType: { type: GraphQLString },
    },
    async resolve(parent, args, context ) {
      const { req } = context;
      if (req.isAuth == false) {
        throw new Error("please login");
      }
      const { message, customerType, returnType } = args;

      let returnObj;
      switch (customerType) {
        case "1":
          const customers = await allCustomers();
          returnObj = _sendCustomMessage({
            message: message,
            customerArray: customers,
            endingMessage: false,
          });
          break;
        case "2":
          const customersOwing = await alldebtorCustomers();
          returnObj = _sendCustomMessage({
            message: message,
            customerArray: customersOwing,
            endingMessage: true,
          });
          break;
        case "3":
          const custOwingMoreThan5k = await debtorsOwingMoreThan5K();
          returnObj = _sendCustomMessage({
            message: message,
            customerArray: custOwingMoreThan5k,
            endingMessage: true,
          });
          break;
        case "4":
          const custNotWashedForAWhile = await customersNotWashedForAWhile();
          returnObj = _sendCustomMessage({
            message: message,
            customerArray: custNotWashedForAWhile,
            endingMessage: false,
          });
          break;
        case "5":
          const payingCust = await payingCustomers();
          returnObj = _sendCustomMessage({
            message: message,
            customerArray: payingCust,
            endingMessage: false,
          });
          break;

        default:
          break;
      }

      if (returnType == "1") {
        //1 is message sent
        const sendArrayApi = returnObj.sendArray;
        //loop through and send
        let counter = 0;
        for (let i = 0; i < sendArrayApi.length; i++) {
          const api = sendArrayApi[i];
          console.log(`api is ${api}`);
          await axios.post(api);
          counter++;
        }
        return [{ msg: counter.toString() }];
      } else {
        //2 is the message sample
        const arrayMessage = returnObj.messageArray;
        console.log(arrayMessage);
        return arrayMessage;
      }
    },
  },
};

const _sendCustomMessage = ({ message, customerArray, endingMessage }) => {
  let msgArray = [];
  let sendArray = [];
  let api;
  let apiUrl = process.env.sms_api;
  const token = process.env.api_token;
  const from = "Eco-Slyvan Laundry";
  for (let i = 0; i < customerArray.length; i++) {
    let customer = customerArray[i];
    const name = customer.name && customer.name.split(" ")[0];
    const title = customer.title;
    const contact = (customer.contact && customer.contact[0]) || 0;
    if (contact == 0) continue;
    let msg = `Hello ${title} ${
      name && capitalizeFirstLetter(name)
    }, ${message}`;
    if (endingMessage) {
      //append how much they are owing here
      const laundry = customer.laundryAmount;
      const payment = customer.paymentMade;
      const balance = laundry - payment;
      msg += ` balance: ${balance}`;
    }
    api = `${apiUrl}?api_token=${token}&from=${from}&to=${contact}&body=${msg}&dnd=4`;
    let obj = {
      msg,
    };
    msgArray.push(obj);
    sendArray.push(api);
  }
  return { messageArray: msgArray, sendArray: sendArray };
};

module.exports = smsQueries;
