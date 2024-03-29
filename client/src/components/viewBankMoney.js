import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { BankMoney_By_Date, All_Time_BankMoney } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const ViewBankMoney = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [bankMoney, setBankMoney] = useState([]);

  const allResult = useQuery(All_Time_BankMoney);

  const [getFilterDate, filterResult] = useLazyQuery(BankMoney_By_Date);

  const upDateStart = date => {
    setStartDate(date);
  };

  const upDateEnd = date => {
    setEndDate(date);
  };

  useEffect(() => {
    if (allResult.data) {
      setBankMoney(allResult.data.getTotalBankMoney);
      setDataViewing("viewing all money paid to the bank");
    }
  }, [allResult.data]);

  useEffect(() => {
    if (filterResult.data) {
      setBankMoney(filterResult.data.getMoneyInBankByMonth);
      setDataViewing(
        `viewing money paid in the bank from ${moment(startDate).format(
          "dddd, MMMM Do YYYY"
        )} to ${moment(endDate).format("dddd, MMMM Do YYYY")}`
      );
    }
  }, [filterResult.data]);

  const submitHandler = async () => {
    //submit function
    //lets query the sucker then
    await getFilterDate({
      variables: {
        fromDate: startDate,
        endDate: endDate
      }
    });
  };

  if (allResult.loading) return <p>Loading ...</p>;
  if (allResult.error) return <p>Error: {allResult.error.message}</p>;

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <div>
      <div>
        <h4 className="lead">Money Paid To The Bank </h4>
        <p>{dataViewing}</p>
        <div>
          {bankMoney && bankMoney.length > 0 ? (
            <div>
              <div className="float-right">
                <FilterDate
                  upDateStart={upDateStart}
                  upDateEnd={upDateEnd}
                  submitHandler={submitHandler}
                />
              </div>
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankMoney.map(({ date, amount }, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                          </td>
                          <td>{amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td scope="col"></td>
                      <td scope="col">
                        <p>
                          <b>Total:</b>
                        </p>
                      </td>
                      <td scope="col">
                        <p className="pull-right">
                          <b>
                            &#8358;
                            {SumTotal(bankMoney, "amount")}
                          </b>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <p>No bank payment made yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBankMoney;
