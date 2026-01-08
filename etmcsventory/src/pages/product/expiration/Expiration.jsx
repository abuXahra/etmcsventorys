import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ExpirationContent, ExpirationWrapper } from "./expiration.style";
import { List } from "react-content-loader";
import PageTitle from "../../../components/page_title/PageTitle";
import ListHeader from "../../../components/page_title/list_header/ListHeader";
import ExpirationTable from "../../../components/table/product_table/expiration_table/ExpirationTable";
import { UserContext } from "../../../components/context/UserContext";
import SelectInput from "../../../components/input/selectInput/SelectInput";

export default function ExpirationPage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [expirationFilter, setExpirationFilter] = useState("all");

  const token = localStorage.getItem("token");

  // permissions
  const { user, permissions } = useContext(UserContext);
  const productPermission = permissions?.find(p => p.module === "Product");
  const effectivePermission =
    user?.role === "admin"
      ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
      : productPermission;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const companyRes = await axios.get(
          `${process.env.REACT_APP_URL}/api/company`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompany(companyRes.data[0]);

        const prodRes = await axios.get(
          `${process.env.REACT_APP_URL}/api/products`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // sort by expiration (earliest → latest)
        const sorted = prodRes.data
          .filter(p => p.expirationDate)
          .sort(
            (a, b) =>
              new Date(a.expirationDate) - new Date(b.expirationDate)
          );

        setProducts(sorted);
        setAllProducts(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // search
  const handleSearchQueryOnChange = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) return setProducts(allProducts);

    setProducts(
      allProducts.filter(p =>
        p.title.toLowerCase().includes(query)
      )
    );
  };

  // ===============================
  // ⏳ EXPIRATION FILTER LOGIC
  // ===============================
  const filterByExpiration = (value) => {
    const today = new Date();

    const oneMonth = new Date();
    const threeMonths = new Date();
    const sixMonths = new Date();

    oneMonth.setMonth(today.getMonth() + 1);
    threeMonths.setMonth(today.getMonth() + 3);
    sixMonths.setMonth(today.getMonth() + 6);

    let filtered = [...allProducts];

    if (value === "expired") {
      filtered = filtered.filter(
        p => new Date(p.expirationDate) < today
      );
    }

    if (value === "1 month") {
      filtered = filtered.filter(p => {
        const exp = new Date(p.expirationDate);
        return exp >= today && exp <= oneMonth;
      });
    }

    if (value === "3 months") {
      filtered = filtered.filter(p => {
        const exp = new Date(p.expirationDate);
        return exp > oneMonth && exp <= threeMonths;
      });
    }

    if (value === "6 months") {
      filtered = filtered.filter(p => {
        const exp = new Date(p.expirationDate);
        return exp > threeMonths && exp <= sixMonths;
      });
    }

    filtered.sort(
      (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
    );

    setProducts(filtered);
  };

  const expirationDateItems = [
    { title: "All", value: "all" },
    { title: "In 1 month", value: "1 month" },
    { title: "In 3 months", value: "3 months" },
    { title: "In 6 months", value: "6 months" },
    { title: "Expired", value: "expired" },
  ];

  return (
    <ExpirationWrapper>
      <PageTitle title="Expiration" />

      {isLoading ? (
        <List />
      ) : (
        <ExpirationContent>
          <ListHeader
            showIcon={false}
            title=""
            searQuery="Title"
            onChange={handleSearchQueryOnChange}
            type="text"
            dataLength={products.length}
            permission={effectivePermission?.canAdd}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                width: "20%",
                alignSelf: "flex-end",
                marginTop: "20px",
                marginRight: "20px"
              }}
            >
              <SelectInput
                label="Sort by"
                value={expirationFilter}
                onChange={(e) => {
                  setExpirationFilter(e.target.value);
                  filterByExpiration(e.target.value);
                }}
                options={expirationDateItems}
              />
            </span>

            <ExpirationTable
              data={products}
              currencySymbol={company?.currencySymbol}
              productPermission={effectivePermission}
            />
          </div>
        </ExpirationContent>
      )}
    </ExpirationWrapper>
  );
}
