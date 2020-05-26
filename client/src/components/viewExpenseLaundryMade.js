import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { expense_laundry_details } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const ViewExpenseLaundryMade = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [expenseLaundryDetails, setExpenseLaundryDetails] = useState([]);

  const [getFilterDate, filterResult] = useLazyQuery(expense_laundry_details);

  const upDateStart = (date) => {
    setStartDate(date);
  };

  const upDateEnd = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (filterResult.data) {
      setExpenseLaundryDetails(filterResult.data.getExpensesAndLaundryByMonth);
      setDataViewing(
        `viewing data from ${moment(startDate).format(
          "dddd, MMMM Do YYYY"
        )} to ${moment(endDate).format("dddd, MMMM Do YYYY")}`
      );
    }
  }, [filterResult.data]);

  const submitHandler = () => {
    //submit function
    //lets query the sucker then
    getFilterDate({
      variables: {
        fromDate: startDate,
        endDate: endDate,
      },
    });
  };

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <div className="row">
      <div className="col-md-12">
        <p>{dataViewing}</p>
        <div>
          <FilterDate
            upDateStart={upDateStart}
            upDateEnd={upDateEnd}
            submitHandler={submitHandler}
          />
        </div>
      </div>

      <div className="col-md-6">
        {expenseLaundryDetails && expenseLaundryDetails.length > 0 ? (
          <div>
            <p className="lead text-center">Laundry Details </p>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Clothes</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseLaundryDetails[0].laundries.map(
                    ({ date, amount, customer, clothes, number }, index) => {
                      const obj = customer;

                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>
                            <p>
                              {obj && obj.title} {obj && obj.name}
                            </p>
                          </td>

                          <td>
                            <p>
                              {clothes}
                              <br />
                              <span>number: {number}</span>
                            </p>
                          </td>

                          <td>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                          </td>

                          <td>
                            <p>{amount}</p>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope="col"></td>
                    <td scope="col"></td>
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
                          {SumTotal(
                            expenseLaundryDetails[0].laundries,
                            "amount"
                          )}
                        </b>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <p>No laundries yet!</p>
        )}
      </div>

      <div className="col-md-6">
        {expenseLaundryDetails && expenseLaundryDetails.length > 0 ? (
          <div>
            <p className="lead text-center">Expense Details </p>
            <div>
              <table className="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseLaundryDetails[0].expenses.map(
                    ({ date, amount, description }, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>
                            <p>{description}</p>
                          </td>
                          <td>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                          </td>
                          <td>{amount}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope="col"></td>
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
                          {SumTotal(
                            expenseLaundryDetails[0].expenses,
                            "amount"
                          )}
                        </b>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <p>No expense made yet</p>
        )}
      </div>
    </div>
  );
};

export default ViewExpenseLaundryMade;
