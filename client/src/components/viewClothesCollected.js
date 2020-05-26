import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AllLaundry, FilterLaundryByDate } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const ViewClothesCollected = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");
  const [collected, setCollected] = useState(false);

  const [laundryState, setLaundryState] = useState([]);
  const allResult = useQuery(AllLaundry, {
    variables: { clothesCollected: collected }
  });

  useEffect(() => {
    if (allResult.data) {
      setLaundryState(allResult.data.getLaundryCollectedOrNot);
      setDataViewing(
        `viewing all data for laundry ${
          collected ? "colected" : "not collected"
        }`
      );
    }
    //set the results here
  }, [collected, allResult.data]);

  const [getFilterDate, filterResult] = useLazyQuery(FilterLaundryByDate);

  const upDateStart = date => {
    setStartDate(date);
  };

  const upDateEnd = date => {
    setEndDate(date);
  };

  useEffect(() => {
    if (filterResult.data) {
      console.log(filterResult.data);
      setLaundryState(filterResult.data.getLaundryCollectedOrNotByDate);
      setDataViewing(
        `viewing data from ${moment(startDate).format(
          "dddd, MMMM Do YYYY"
        )} to ${moment(endDate).format("dddd, MMMM Do YYYY")} of laundry ${
          collected ? "collected" : "not collected"
        } `
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
        clothesCollected: collected
      }
    });
  };

  const handleClothState = e => {
    const value = e.target.value;
    if (value === "select") return;
    const clothValue = value == "1" ? true : false;
    setCollected(clothValue);
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
        <div className="row">
          <div className="col-md-4">
            <select onChange={handleClothState} className="form-control">
              <option value="select">select</option>
              <option value="1">clothes collected</option>
              <option value="0">clothes yet to be collected</option>
            </select>
          </div>
        </div>
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
          {laundryState && laundryState.length > 0 ? (
            <div className="row">
              <div className="offset-1 col-md-10">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Clothes Description</th>
                      <th scope="col">Number</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laundryState.map(
                      (
                        {
                          clothes,
                          number,
                          date,
                          amount,
                          clothesCollected,
                          _id,
                          customer: { name, contact }
                        },
                        index
                      ) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{1 + index}</th>
                            <td>
                              <p>{name.toUpperCase()}</p>
                            </td>

                            <td>{clothes}</td>
                            <td>{number}</td>
                            <td>{moment(date).format("dddd, MMMM Do YYYY")}</td>
                            <td>{amount}</td>
                            <td>
                              {clothesCollected ? (
                                <p className="text-success">Yes</p>
                              ) : (
                                <p className="text-info">No</p>
                              )}
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
                            {SumTotal(laundryState, "amount")}
                          </b>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewClothesCollected;
