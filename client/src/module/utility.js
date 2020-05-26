import { _ } from "underscore";

const RemoveBracket = word => {
  //this also removes the trailing 00
  //too lazy to rename function
  const wordArray = word.split(".");
  return wordArray[0].replace(/,/g, "");
};

const FormatMoney = (
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

const SumTotal = (array, key) => {
  let sum = array.reduce((total, item) => {
    const value = item[key] && item[key].trim();
    if (!_.isEmpty(value)) {
      //strip remove ,
      const money = RemoveBracket(item && item[key]);
      return total + parseFloat(money);
    }
    return total;
  }, 0);

  return FormatMoney(parseFloat(sum).toFixed(2));
};

const FindNegativemount = (laundry, payment) => {
  const pay = +laundry - +payment;
  if (pay.toString().includes("-")) {
    return "Payment made exceeds laundry items, check items recorded";
  } else {
    return FormatMoney(pay);
  }
};

const FindAmount = (laundry, payment) => {
  const pay = +laundry - +payment;
  if (pay.toString().includes("-")) {
    return 0;
  } else {
    return pay;
  }
};

export { RemoveBracket, SumTotal, FormatMoney, FindNegativemount, FindAmount };
