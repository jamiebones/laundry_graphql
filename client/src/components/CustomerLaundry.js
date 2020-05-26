import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { getCustomersLaundry } from "../graphql/queries";
import { collectClothes } from "../graphql/mutation";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";

const CustomersLaundry = props => {
  const { customerId, name } = props.location.state;
  const { loading, error, data } = useQuery(getCustomersLaundry, {
    variables: { customerId: customerId }
  });
  const [markAsCollected] = useMutation(collectClothes, {
    refetchQueries: [
      {
        query: getCustomersLaundry,
        variables: { customerId: customerId }
      }
    ]
  });

  const handleCollectClothes = async (e, id) => {
    e.preventDefault();
    const confirmMark = window.confirm(
      `Are you sure the cloth has been collected. This action can not be reversed`
    );

    if (!confirmMark) return;
    try {
      await markAsCollected({
        variables: { laundryId: id }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!loading ? (
        <div>
          <p className="lead">Laundry Details for : {name}</p>

          {!error ? (
            <div>
              {data.customersLaundry.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Clothes Description</th>
                      <th scope="col">Number</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Clothes Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.customersLaundry.length > 0 &&
                      data.customersLaundry.map(
                        (
                          {
                            clothes,
                            number,
                            date,
                            amount,
                            clothesCollected,
                            id
                          },
                          index
                        ) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{1 + index}</th>
                              <td>
                                {moment(date).format("dddd, MMMM Do YYYY")}
                              </td>
                              <td>{clothes}</td>
                              <td>{number}</td>
                              <td>{amount}</td>
                              <td>
                                {clothesCollected ? (
                                  <p className="text-success">Yes</p>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={e => handleCollectClothes(e, id)}
                                  >
                                    mark as collected
                                  </button>
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
                              data &&
                                data.customersLaundry.length > 0 &&
                                data.customersLaundry,
                              "amount"
                            )}
                          </b>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p>No laundry done yet</p>
              )}
            </div>
          ) : (
            <p>There was an error: {error.message}</p>
          )}
        </div>
      ) : (
        <p>Loading.........</p>
      )}
    </div>
  );
};

export default CustomersLaundry;
