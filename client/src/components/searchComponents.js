import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { findCustomersByName } from "../graphql/queries";
import { Link } from "react-router-dom";

const SearchComponent = ({ customerName, action }) => {
  const { loading, error, data } = useQuery(findCustomersByName, {
    variables: { name: customerName }
  });

  if (loading) return "Loading...";
  if (customerName !== undefined && error) return `Error! ${error.message}`;

  return (
    <div className="row">
      <div className="col-md-12">
        {data && data.findCustomersByName && data.findCustomersByName.length ? (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.findCustomersByName.map(
                  ({ id, name, title, contact }, i) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <p>{title}</p>
                        </td>
                        <td>
                          <p>{name}</p>
                        </td>
                        <td>
                          {contact.map((number, index) => {
                            return <span key={index}>0{number}</span>;
                          })}
                        </td>
                        <td>
                          <Link
                            to={{
                              pathname: action,
                              state: {
                                customerId: id,
                                name: name
                              }
                            }}
                          >
                            Go to Action
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        ) : (
          <p>No data!</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
