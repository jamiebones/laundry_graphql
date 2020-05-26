/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { saveManyCustomersDetails } from "../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const UploadCustomersData = styled.div`
  .uploadDiv {
    margin-top: 90px;
  }
  .errorDiv {
    p {
      color: red;
    }
  }
  .msg {
    width: 50%;
  }
`;

const UploadCustomersDetails = props => {
  const [uploading, setUploading] = useState(false);
  const [saveCustomers, { data }] = useMutation(saveManyCustomersDetails, {});
  const SheettoArray = sheet => {
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(sheet["!ref"]);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        var nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
        if (typeof nextCell === "undefined") {
          row.push(void 0);
        } else row.push(nextCell.w);
      }
      result.push(row);
    }
    return result;
  };

  const readExcel = (src, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const wb = XLSX.read(fileReader.result, { type: "binary" });
      const workBookName = wb.SheetNames[0];
      const excel = wb.Sheets[workBookName];
      callback(excel);
    };
    fileReader.readAsBinaryString(src.files[0]);
  };

  const callMeBack = excel => {
    const excelData = SheettoArray(excel);
    let customerDetailsArray = [];
    for (let i = 0; i < excelData.length; i++) {
      const rowArray = excelData[i];
      //loop through row data;
      //build customer data here
      //here we build the object
      let customer = {};
      for (let k = 0; k < rowArray.length; k++) {
        if (rowArray[k] !== null && rowArray[1] !== null) {
          //console.log(rowArray[k]);
          switch (k) {
            case 0:
              customer.title = rowArray[k].toUpperCase().trim();
              break;
            case 1:
              customer.name = rowArray[k].toUpperCase().trim();
              break;
            case 2:
              //build contact array here
              let contactArray = rowArray[k] && rowArray[k].split(" ");
              customer.contact = contactArray;
              customerDetailsArray.push(customer);
              break;
          }
        }
      }
      //i should save here abeg
    }
    setUploading(false);
    let stringifiedCustomers = JSON.stringify(customerDetailsArray);
    saveCustomers({
      variables: { customers: stringifiedCustomers }
    });
  };

  const change = e => {
    //self is the context in which the onchange was called
    const src = document.getElementById("input");
    setUploading(true);
    readExcel(src, callMeBack);
  };

  return (
    <UploadCustomersData>
      <div className="row">
        <div className="offset-md-3 md-6">
          <div className="uploadDiv">
            <div className="errorDiv">{<p></p>}</div>
            {uploading ? (
              <p className="text-lead">
                Uploading data to the database please wait............
              </p>
            ) : null}
            <input
              type="file"
              id="input"
              disabled={uploading}
              onChange={change}
            />
          </div>
        </div>
      </div>
    </UploadCustomersData>
  );
};

export default UploadCustomersDetails;
