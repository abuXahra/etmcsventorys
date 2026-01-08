import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import axios from "axios";
import { Container } from "../expense_report_table/expenseReportTable";
import { TableWrapper } from "../sale_report_table/saleReportTable.style";

const WastageReportTable = ({ data }) => {
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
    },
     {
       name: 'Title',
       selector: (row) => row.title,
       sortable: true,
     },
    {
      name: "Date",
      selector: (row) => {
        if (!row.wastageDate) return "";
        const date = new Date(row.wastageDate);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
      },
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoiceNo,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
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

export default WastageReportTable;
