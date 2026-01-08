import axios from "axios";
import { useEffect, useState } from "react";
import { TableReusableHeader, TableReusableWrapper } from "../../../TableReusabComp/tableReusabComp.style";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TopSellingWrapper } from "../../top_selling_prod/topSellingProduct.style";
import ExpirationTable from "../ExpirationTable";
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";



// home page components
export default function HomeExpComponent({header}) {

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
   
   
  
  const navigate = useNavigate();
  return (<TableReusableWrapper>
  
                      <TableReusableHeader>
                                    {header}
                                    <span onClick={()=>navigate('/expiration')}>View All <FaLongArrowAltRight /></span>
                </TableReusableHeader>
           {isLoading ? (
            <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
              <p>Loading</p>
            </div>
          ) : (
      <TopSellingWrapper>
              <ExpirationTable
                         tbPdn={'0px'}
                         show={false}
                         data={products.slice(0, 3)}
                         currencySymbol={company?.currencySymbol}
                         productPermission={effectivePermission}
                    />
      </TopSellingWrapper>
     )}
    </TableReusableWrapper>
  )
}




