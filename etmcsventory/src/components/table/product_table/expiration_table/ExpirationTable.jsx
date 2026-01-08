import React from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  ActionButton,
  ActionButtons,
  Container,
  TableWrapper,
} from "../Product.style";
import { customStyles } from "../../TableCustomStyle.style";
import prodPlaceHolder from "../../../../images/product_placeholder.jpg";

const ExpirationTable = ({
  data,
  currencySymbol,
  productPermission,
  show = true,
  tbPdn
}) => {
  const navigate = useNavigate();

  // ===============================
  // 🎨 EXPIRATION ROW COLORS
  // ===============================
  const conditionalRowStyles = [
    // 🔴🔴 EXPIRED (DEEP RED)
    {
      when: (row) => new Date(row.expirationDate) < new Date(),
      style: {
        backgroundColor: "#5b0000",
        color: "#ffffff",
      },
    },

    // 🔴 EXPIRING WITHIN 1 MONTH
    {
      when: (row) => {
        const today = new Date();
        const oneMonth = new Date();
        oneMonth.setMonth(today.getMonth() + 1);

        const exp = new Date(row.expirationDate);
        return exp >= today && exp <= oneMonth;
      },
      style: {
        backgroundColor: "#c62828",
        color: "#ffffff",
      },
    },

    // 🟣 EXPIRING WITHIN 3 MONTHS
    {
      when: (row) => {
        const today = new Date();
        const oneMonth = new Date();
        const threeMonths = new Date();

        oneMonth.setMonth(today.getMonth() + 1);
        threeMonths.setMonth(today.getMonth() + 3);

        const exp = new Date(row.expirationDate);
        return exp > oneMonth && exp <= threeMonths;
      },
      style: {
        backgroundColor: "#5e35b1",
        color: "#ffffff",
      },
    },

    // 🟡 EXPIRING WITHIN 6 MONTHS
    {
      when: (row) => {
        const today = new Date();
        const threeMonths = new Date();
        const sixMonths = new Date();

        threeMonths.setMonth(today.getMonth() + 3);
        sixMonths.setMonth(today.getMonth() + 6);

        const exp = new Date(row.expirationDate);
        return exp > threeMonths && exp <= sixMonths;
      },
      style: {
        backgroundColor: "#fff176",
        color: "#000000",
      },
    },

    // ⚫ ABOVE 6 MONTHS
    {
      when: (row) => {
        const today = new Date();
        const sixMonths = new Date();
        sixMonths.setMonth(today.getMonth() + 6);

        return new Date(row.expirationDate) > sixMonths;
      },
      style: {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
    },
  ];

  // ===============================
  // 📊 TABLE COLUMNS
  // ===============================
  const columns = [
    {
      name: "Exp. Date",
      selector: (row) =>
        new Date(row.expirationDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      // width: "10%",
    },
   show && {
      name: "Photo",
      selector: (row) => (
        <img
          src={
            row.imgUrl
              ? `${process.env.REACT_APP_URL}/images/${row.imgUrl}`
              : prodPlaceHolder
          }
          alt={row.title}
          style={{
            width: 20,
            height: 20,
            borderRadius: "10%",
            objectFit: "cover",
          }}
        />
      ),
      width:"8%",
    },
    { name: "Title", width: "20%", selector: (row) => row.title, sortable: true },
   show && { name: "Category", selector: (row) => row.category?.title },
    { name: "Qty",  width: "10%", selector: (row) => row.stockQuantity },
    { name: "Unit", selector: (row) => row.unit?.title },
    {
      name: "Purchase",
      selector: (row) => (
        <span
          dangerouslySetInnerHTML={{
            __html:
              currencySymbol + row.purchasePrice.toLocaleString(),
          }}
        />
      ),
    },
    {
      name: "Sale",
      selector: (row) => (
        <span
          dangerouslySetInnerHTML={{
            __html: currencySymbol + row.salePrice.toLocaleString(),
          }}
        />
      ),
    },
    show && {
      name: "Actions",
      cell: (row) => (
        <ActionButtons>
          {productPermission?.canView && (
            <ActionButton
              clr="green"
              onClick={() =>
                navigate(`/product-detail/${row._id}`)
              }
            >
              <FaEye />
            </ActionButton>
          )}
          {productPermission?.canEdit && (
            <ActionButton
              clr="blue"
              onClick={() =>
                navigate(`/edit-product/${row._id}`)
              }
            >
              <FaEdit />
            </ActionButton>
          )}
        </ActionButtons>
      ),
    },
  ].filter(Boolean);

  return (
    <Container>
      <TableWrapper tbPdn={tbPdn}>
        <DataTable
          columns={columns}
          data={data}
          pagination={show}
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
          responsive
        />
      </TableWrapper>
    </Container>
  );
};

export default ExpirationTable;
