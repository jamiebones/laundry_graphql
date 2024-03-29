import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AllExpense, Expense_By_Date } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const ViewExpense = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [filterQuery, setFilterQuery] = useState();
  const [filterAmount, setFilterAmount] = useState();

  const [expense, setExpense] = useState([]);

  const allResult = useQuery(AllExpense);

  const [getFilterDate, filterResult] = useLazyQuery(Expense_By_Date);

  const upDateStart = (date) => {
    setStartDate(date);
  };

  const upDateEnd = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (allResult.data) {
      setExpense(allResult.data.getTotalExpense);
      setDataViewing("viewing all data");
    }
  }, [allResult.data]);

  useEffect(() => {
    if (filterResult.data) {
      setExpense(filterResult.data.getExpenseByMonth);
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
        endDate: endDate,
      },
    });
  };

  useEffect(() => {
    const query = filterQuery;
    if (query && query.length) {
      let totalAmount = 0;
      setFilterAmount(0);
      const tds = document.querySelectorAll("#expense td");
      for (let i = tds.length - 1; i >= 0; i--) {
        const td = tds[i];
        const p = td.textContent;
        if (p.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          td.parentNode.setAttribute("style", "display: `table-row`");
          const amount = td.parentNode.lastElementChild.innerText;
          totalAmount += +amount;
          setFilterAmount(totalAmount);
        } else {
          td.parentNode.setAttribute("style", "display: none");
        }
      }
    }
  }, [filterQuery]);

  const filterTableData = (e) => {
    const filter = e.target.value.trim();
    setFilterQuery(filter);
  };

  if (allResult.loading) return <p>Loading ...</p>;
  if (allResult.error) return <p>Error: {allResult.error.message}</p>;

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <div>
      <div>
        <p className="lead">Laundry expense Details </p>
        <p>{dataViewing}</p>
        <div>
          {expense && expense.length > 0 ? (
            <div>
              <div className="float-right">
                <FilterDate
                  upDateStart={upDateStart}
                  upDateEnd={upDateEnd}
                  submitHandler={submitHandler}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="filter expense data"
                  className="form-control"
                  style={{width: 400+ "px"}}
                  onChange={filterTableData}
                />
                <p>Filter Amount: {filterAmount}</p>
                <table className="table table-striped" id="expense">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Description</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expense.map(({ date, amount, description }, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>
                            <p>{description}</p>
                          </td>
                          <td>
                            <p>{moment(date).format("dddd, MMMM Do YYYY")}</p>
                          </td>
                          <td>
                            <p> {amount}</p>
                          </td>
                        </tr>
                      );
                    })}
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
                            {SumTotal(expense, "amount")}
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
    </div>
  );
};

export default ViewExpense;
