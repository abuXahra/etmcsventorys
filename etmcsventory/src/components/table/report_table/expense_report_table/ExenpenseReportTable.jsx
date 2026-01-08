import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "./expenseReportTable";
import axios from "axios";

const ExpenseReportTable = ({ data }) => {
  // Calculate total amount
  const amount = data.reduce((sum, row) => sum + row.amount, 0);


    // fetching currency from db
    const [currencySymbol, setCurrencySymbol] =  useState('');
      useEffect(()=>{
          const fetchAllCompany = async() =>{
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
                  setCurrencySymbol(res.data[0].currencySymbol)
              } catch (error) {
                console.log(error)
              }
          }
          fetchAllCompany();
        },[]);
  

  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      width: "10%",
    },
    {
      name: "Date",
      selector: (row) => {
        if (!row.expenseDate) return "";
        const date = new Date(row.expenseDate);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
      },
      sortable: true,
      width: "10%",
    },
    {
      name: "Expense For",
      selector: (row) => row.expenseFor,
      sortable: true,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
    },
  ];

  // Total row with matching keys
  const mergedRow = {
    code: "",
    expenseDate: "",
    expenseFor: <b>Total</b>,
    amount:  <b><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(amount)}</b>,
    note: "",
  };

  const combinedData = [...data, mergedRow];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={combinedData}
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>
    </Container>
  );
};

export default ExpenseReportTable;
