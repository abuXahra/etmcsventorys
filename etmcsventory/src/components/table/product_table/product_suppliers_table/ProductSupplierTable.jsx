
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Container, TableWrapper } from "../../sale_table/sale.style";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";

const ProductSupplierTable = ({ data }) => {
  const token = localStorage.getItem("token");

  // Fetch currency symbol
  const [currencySymbol, setCurrencySymbol] = useState("");
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.length > 0) {
          setCurrencySymbol(res.data[0].currencySymbol || "");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompany();
  }, [token]);

  // Compute totals row
  const totalsRow = useMemo(() => {
    if (!data || data.length === 0) return null;

    let totalQuantity = 0;
    let totalUnitPrice = 0;
    let totalAmount = 0;

    data.forEach((row) => {
      totalQuantity += row.quantity ?? 0;
      totalUnitPrice += row.unitPrice ?? 0;
      totalAmount += row.amount ?? 0;
    });

    return {
      isTotal: true,
      supplier: "Total",
      quantity: totalQuantity,
      unitPrice: totalUnitPrice,
      amount: totalAmount,
    };
  }, [data]);

  // Append totals row
  const tableData = useMemo(() => {
    if (!totalsRow) return data || [];
    return [...data, totalsRow];
  }, [data, totalsRow]);

  const columns = [
    {
      name: "Date",
      sortable: true,
      cell: (row) =>
        row.isTotal
          ? " "
          : row.lastPurchaseDate
          ? new Date(row.lastPurchaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : " ",
    },
    {
      name: "Supplier",
      cell: (row) => (row.isTotal ? <strong>Total</strong> : row.supplier ?? "-"),
      width: '28%',
    },
    {
  name: "Quantity",
  cell: (row) =>
    row.isTotal ? <strong>{row.quantity}</strong> : row.quantity ?? 0,
},

{
  name: "Unit Price",
  cell: (row) =>
    row.isTotal ? (
      <strong>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
        {(row.unitPrice ?? 0).toLocaleString()}
      </strong>
    ) : (
      <span>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
        {(row.unitPrice ?? 0).toLocaleString()}
      </span>
    ),
  sortable: true,
},

{
  name: "Amount",
  cell: (row) =>
    row.isTotal ? (
      <strong>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
        {(row.amount ?? 0).toLocaleString()}
      </strong>
    ) : (
      <span>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
        {(row.amount ?? 0).toLocaleString()}
      </span>
    ),
  sortable: true,
},
  ];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          responsive
          customStyles={customStyles}
          noHeader
          highlightOnHover
        />
      </TableWrapper>
    </Container>
  );
};

export default ProductSupplierTable;