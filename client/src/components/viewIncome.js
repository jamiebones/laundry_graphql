import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AllIncome, Income_By_Date } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal, } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const ViewIncome = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [income, setIncome] = useState([]);

  const allResult = useQuery(AllIncome);

  const [getFilterDate, filterResult] = useLazyQuery(Income_By_Date);

  const upDateStart = date => {
    setStartDate(date);
  };

  const upDateEnd = date => {
    setEndDate(date);
  };

  useEffect(() => {
    if (allResult.data) {
      setIncome(allResult.data.getTotalIncome);
      setDataViewing("viewing all data");
    }
  }, [allResult.data]);

  useEffect(() => {
    if (filterResult.data) {
      setIncome(filterResult.data.getIncomeByMonth);
      setDataViewing(
        `viewing data from ${moment(startDate).format(
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
        <p className="lead">Laundry income Details </p>
        <p>{dataViewing}</p>
        <div>
          {income && income.length > 0 ? (
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
                      <th scope="col">Customer</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {income.map(({ date, amount, customer }, index) => {
                      const obj = customer[0];

                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>
                            <p>
                              {obj && obj.title} {obj && obj.name}
                              <br />
                              {obj &&
                                obj.contact &&
                                obj.contact.length &&
                                obj.contact.map((number, index) => {
                                  return <span key={index}>0{number}</span>;
                                })}
                            </p>
                          </td>
                          <td>
                            <p>{amount}</p>
                          </td>
                          <td>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                          </td>
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
                            {SumTotal(income, "amount")}
                          </b>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <p>No income made yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewIncome;
