import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Balance_Money_Left } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";
import styled from "styled-components";

const ProfitStyles = styled.div`
  span {
    margin: 90px;
  }
  p {
    font-size: 18px;
  }
  span:before {
    content: "";
    border: 2px solid red;
  }

  hr {
    border: 3px solid black;
    min-width: 130%;
  }
  .profit {
    text-align: right;
    font-weight: bold;
  }
  .profitAmount {
    color: green;
    font-weight: bold;
  }

  .profitDiv {
  }
`;

const ViewBalance = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [balance, setBalance] = useState(null);

  const [getFilterDate, filterResult] = useLazyQuery(Balance_Money_Left);

  const upDateStart = (date) => {
    setStartDate(date);
  };

  const upDateEnd = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (filterResult.data) {
      setBalance(filterResult.data.getBalanceMoneyLeft);
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

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <ProfitStyles>
      <div>
        <p className="lead">Laundry Balancing Details </p>
        <p>{dataViewing}</p>

        <div className="row">
          <div className="col-md-12">
            <div className="float-right">
              <FilterDate
                upDateStart={upDateStart}
                upDateEnd={upDateEnd}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-3 col-md-6">
            {!_.isEmpty(balance) ? (
              <div className="profitDiv">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <p>Income : </p>

                      <p>Money Paid To Bank : </p>

                      <p>Expense :</p>
                      <hr className="hideMe" />
                      <p className="profit">Balance : </p>
                    </div>
                  </div>

                  <div className="details">
                    <div className="col-md-6">
                      <p>&#8358;{balance && FormatMoney(balance.income)}</p>
                      <p>&#8358;{balance && FormatMoney(balance.bankMoney)}</p>
                      <p>&#8358;{balance && FormatMoney(balance.expense)}</p>

                      <hr />

                      <p className="profitAmount">
                        &#8358;
                        {FormatMoney(
                          +balance.income -
                            +balance.bankMoney -
                            +balance.expense
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No data yet</p>
            )}
          </div>
        </div>
      </div>
    </ProfitStyles>
  );
};

export default ViewBalance;
