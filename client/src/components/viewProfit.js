import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { All_Time_Profit, Profit_By_Date } from "../graphql/queries";
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

const ViewProfit = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [income, setIncome] = useState(null);

  const allResult = useQuery(All_Time_Profit);

  const [getFilterDate, filterResult] = useLazyQuery(Profit_By_Date);

  const upDateStart = (date) => {
    setStartDate(date);
  };

  const upDateEnd = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    if (allResult.data) {
      setIncome(allResult.data.getProfitofAllTime);
      setDataViewing("viewing all data");
    }
  }, [allResult.data]);

  useEffect(() => {
    if (filterResult.data) {
      setIncome(filterResult.data.getProfitByDate);
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

  if (allResult.loading) return <p>Loading ...</p>;
  if (allResult.error) return <p>Error: {allResult.error.message}</p>;

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <ProfitStyles>
      <div>
        <p className="lead">Laundry income Details </p>
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
          <div className="col-sm-12 col-md-6 offset-md-3">
            {!_.isEmpty(income) ? (
              <div className="profitDiv">
                <div className="row">
                  <div className="col sm-6 col-md-6">
                    <div>
                      <p>Income : </p>

                      <p>Expense :</p>
                      <hr className="hideMe" />
                      <p className="profit">Profit : </p>
                    </div>
                  </div>

                  <div className="details">
                    <div className="col-sm-6 col-md-6">
                      <p>&#8358;{income && FormatMoney(income.income)}</p>
                      <p>&#8358;{income && FormatMoney(income.expense)}</p>

                      <hr />

                      <p className="profitAmount">
                        &#8358;
                        {FormatMoney(+income.income - +income.expense)}
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

export default ViewProfit;
