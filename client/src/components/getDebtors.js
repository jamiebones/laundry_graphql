import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Get_Debtors } from "../graphql/queries";
import { Link } from "react-router-dom";

import { FindAmount, FormatMoney, FindNegativemount } from "../module/utility";
import { _ } from "underscore";

const GetDebtors = () => {
  const [dataViewing, setDataViewing] = useState("");
  const [debtors, setDebtors] = useState([]);

  const allResult = useQuery(Get_Debtors);
  let totalAmount = 0;

  useEffect(() => {
    if (allResult.data) {
      setDebtors(allResult.data.debtors);
      setDataViewing("viewing all data");
    }
  }, [allResult.data]);

  if (allResult.loading) return <p>Loading ...</p>;
  if (allResult.error) return <p>Error: {allResult.error.message}</p>;

  return (
    <div className="row">
      <div className="col-md-12">
        <p className="lead">Laundry debtors Details </p>
        <p>{dataViewing}</p>
        <div>
          {debtors && debtors.length > 0 ? (
            <div>
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Debts</th>
                      <th scope="col">View Payment</th>
                      <th scope="col">View Clothes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debtors.map(
                      (
                        {
                          paymentMade,
                          customerId,
                          laundryAmount,
                          customer: { name, title },
                        },
                        index
                      ) => {
                        totalAmount += FindAmount(laundryAmount, paymentMade);
                        return (
                          <tr key={customerId}>
                            <th scope="row">{1 + index}</th>
                            <td>
                              <p>
                                {" "}
                                {title} {name.toUpperCase()}
                              </p>
                            </td>
                            <td>
                              <p>
                                {FindNegativemount(laundryAmount, paymentMade)}
                              </p>
                            </td>
                            <td>
                              <p>
                                <Link
                                  to={{
                                    pathname: "/view_laundry",
                                    state: {
                                      customerId,
                                      name,
                                    },
                                  }}
                                >
                                  View Laundry
                                </Link>
                              </p>
                            </td>

                            <td>
                              <p>
                                <Link
                                  to={{
                                    pathname: "/view_payment",
                                    state: {
                                      customerId,
                                      name,
                                    },
                                  }}
                                >
                                  View Payment
                                </Link>
                              </p>
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
                            {FormatMoney(totalAmount)}
                          </b>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <p>No debtors made yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetDebtors;
