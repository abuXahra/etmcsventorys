// eccormece: https://klbtheme.com/djewno/

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/context/ScrollToTop";
import Login from "./pages/auth/login/Login";
import DashboardHome from "./pages/home/DashboardHome";
import SalePage from "./pages/sale/SalePage";
import AddSale from "./pages/sale/Add/AddSale";
import EditSale from "./pages/sale/Edit/EditSale";
import ViewSale from "./pages/sale/view/ViewSale";
import CustomerPage from "./pages/customer/CustomerPage";
import AddCustomer from "./pages/customer/Add/AddCustomer";
import EditCustomer from "./pages/customer/edit/EditCustomer";
import CustomerDetail from "./pages/customer/detail/CustomerDetail";
import PurchasePage from "./pages/purchase/PurchasePage";
import AddPurchase from "./pages/purchase/add/AddPurchase";
import EditPurchase from "./pages/purchase/edit/EditPurchase";
import ViewPurchase from "./pages/purchase/view/ViewPurchase";
import SupplierPage from "./pages/supplier/SupplierPage";
import AddSupplier from "./pages/supplier/add/AddSupplier";
import SupplierDetail from "./pages/supplier/view/ViewSupplier";
import EditSupplier from "./pages/supplier/edit/EditSupplier";
import ProductPage from "./pages/product/ProductPage";
import AddProduct from "./pages/product/add/AddProduct";
import EditProduct from "./pages/product/edit/EditProduct";
import ProductDetail from "./pages/product/view/ProductDetail";
import CategoryPage from "./pages/category/CategoryPage";
import AddCategory from "./pages/category/add/AddCategory";
import EditCategory from "./pages/category/edit/EditCategory";
import CategoryDetail from "./pages/category/view/CategoryDetail";
import PaymentPage from "./pages/payment/PaymentPage";
import AddPayment from "./pages/payment/add/AddPayment";
import EditPayment from "./pages/payment/edit/EditPayment";
import ExpensePage from "./pages/expense/ExpensePage";
import AddExpenses from "./pages/expense/add/AddExpense";
import EditExpenses from "./pages/expense/edit/EditExpense";
import ReportsPage from "./pages/reports/ReportsPage";
import SalesReport from "./pages/reports/sale_report/SalesReport";
import StockReport from "./pages/reports/stock_report/StockReport";
import PurchaseReport from "./pages/reports/purchase_report/PurchaseReport";
import ExpenseReport from "./pages/reports/expense_report/ExpenseReport";
import TaxPage from "./pages/tax/TaxPage";
import AddTax from "./pages/tax/add/AddTax";
import EditTax from "./pages/tax/edit/EditTax";
import UnitsPage from "./pages/units/UnitsPage";
import AddUnits from "./pages/units/add/AddUnits";
import EditUnits from "./pages/units/edit/EditUnits";
import UserPage from "./pages/user/UserPage";
import AddUser from "./pages/user/Add/AddUser";
import UserDetail from "./pages/user/detail/UserDetail";
import EditUser from "./pages/user/edit/EditUser";
import AddCompany from "./pages/company_profile/add_company/AddCompany";
import CompanyDetail from "./pages/company_profile/company_detail/CompanyDetail";
import EditCompany from "./pages/company_profile/edit_company/EditCompany";
import MyCalender from "./pages/MyCalender";
import DashboardLayout from "./pages/home/DashboardLayout";
import AddSaleReturn from "./pages/return/sale_return/add/AddSaleReturn";
import SaleReturnPage from "./pages/return/sale_return/SaleReturnPage";
import SaleReturnView from "./pages/return/sale_return/view/SaleReturnView";
import EditSaleReturn from "./pages/return/sale_return/edit/EditSaleReturn";
import AddPurchaseReturn from "./pages/return/purchase_return/add/AddPurchaseReturn";
import PurchaseReturnsPage from "./pages/return/purchase_return/PurchaseReturnsPage";
import PurchaseReturnView from "./pages/return/purchase_return/view/PurchaseReturnView";
// import TopSellingProds from "./pages/product/top_selling_products/TopSellingProds";
import LowStock from "./pages/product/product_low_stock/LowStock";
import ProtectedRoute from "./components/protected_route/ProtectedRoute";
import { LoaderWrapper } from "./pages/home/Home.style";
import PermissionPage from "./pages/zpermission/Permission";
import AddPermission from "./pages/zpermission/add/AddPermission";
import RequireAddPermissionRoute from "./components/protected_route/RequireAddPermissionRoute";
import NotFound from "./pages/not_found/NotFound";
import Unauthorized from "./pages/unauthorized/UnauthorizedPage";
import RequirePermissionRoute from "./components/protected_route/RequireAddPermissionRoute";
import Register from "./pages/auth/register/Register";
import SalePaymentReport from "./pages/reports/sale_payment_report/salePaymentReport";
import PurchasePaymentReport from "./pages/reports/purchase_payment_report/PurchasePaymentReport";
import ItemsSaleReport from "./pages/reports/item_sale_report/ItemsSaleReport";
import Wastage from "./pages/wastage/Wastage";
import WastageView from "./pages/wastage/view/WastageView";
import AddWastage from "./pages/wastage/add/AddWastage";
import WastageReport from "./pages/reports/wastage_report/WastageReport";
import ItemsDailySaleReport from "./pages/reports/item_daily_sale_report/ItemDailySaleReport";
import PagePreloader from "./components/loader/page_preloader/PagePreloader";
import EditPermission from "./pages/zpermission/edit/EditPermission";
import ExpirationPage from "./pages/product/expiration/Expiration";
import TopSellingProds from "./pages/product/top_selling_products/TopSellingProds";
import AuditLog from "./pages/audit_log/AuditLog";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "Login | EtmcsVentory",
      "/dashboard": "Dashboard | EtmcsVentory",
      "/categories": "Categories | EtmcsVentory",
      "/add-category": "Add Category | EtmcsVentory",
      "/products": "Products | EtmcsVentory",
      "/add-product": "Add Product | EtmcsVentory",
      "/sales": "Sales | EtmcsVentory",
      "/add-sale": "Add Sale | EtmcsVentory",
      "/customers": "Customers | EtmcsVentory",
      "/add-customer": "Add Customer | EtmcsVentory",
      "/purchase": "Purchases | EtmcsVentory",
      "/suppliers": "Suppliers | EtmcsVentory",
      "/payments": "Payments | EtmcsVentory",
      "/expenses": "Expenses | EtmcsVentory",
      "/reports": "Reports | EtmcsVentory",
      "/tax": "Tax | EtmcsVentory",
      "/units": "Units | EtmcsVentory",
      "/users": "Users | EtmcsVentory",
      "/company-profile": "Company Profile | EtmcsVentory",
      "/permission": "Permissions | EtmcsVentory",
      "/not-authorized": "Unauthorized | EtmcsVentory",
      "/not-found": "Page Not Found | EtmcsVentory",
    };

    // Default fallback
    let title = titles[path] || "EtmcsVentory";

    // Handle dynamic routes like /edit-category/:id
    if (path.startsWith("/edit-category"))
      title = "Edit Category | EtmcsVentory";
    else if (path.startsWith("/category-detail"))
      title = "Category Detail | EtmcsVentory";
    else if (path.startsWith("/edit-product"))
      title = "Edit Product | EtmcsVentory";
    else if (path.startsWith("/product-detail"))
      title = "Product Detail | EtmcsVentory";
    else if (path.startsWith("/edit-sale")) title = "Edit Sale | EtmcsVentory";
    else if (path.startsWith("/sale-invoice"))
      title = "Sale Invoice | EtmcsVentory";
    else if (path.startsWith("/edit-customer"))
      title = "Edit Customer | EtmcsVentory";
    else if (path.startsWith("/customers/"))
      title = "Customer Details | EtmcsVentory";
    else if (path.startsWith("/edit-supplier"))
      title = "Edit Supplier | EtmcsVentory";
    else if (path.startsWith("/supplier-detail"))
      title = "Supplier Detail | EtmcsVentory";
    else if (path.startsWith("/edit-purchase"))
      title = "Edit Purchase | EtmcsVentory";
    else if (path.startsWith("/purchase-invoice"))
      title = "Purchase Invoice | EtmcsVentory";
    else if (path.startsWith("/sale-return"))
      title = "Sale Return | EtmcsVentory";
    else if (path.startsWith("/purchase-return"))
      title = "Purchase Return | EtmcsVentory";
    else if (path.startsWith("/edit-user")) title = "Edit User | EtmcsVentory";
    else if (path.startsWith("/users/")) title = "User Details | EtmcsVentory";

    document.title = title;
  }, [location]);
}

function App() {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  // Page titles
  usePageTitle();

  // If still verifying the user, show nothing or a loader
  if (loading) return <PagePreloader text={"Loading"} />;

  // ✅ Check if current page is login
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <ScrollToTop>
      {isAuthPage ? (
        // ✅ Show only login page, no sidebar/header
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/loader" element={<PagePreloader />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" replace /> : <Register />}
          />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        // ✅ Wrap all dashboard pages with layout
        <DashboardLayout>
          <Routes>
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashboardHome />} />}
            />
            {/* CATEGORY */}
            <Route
              path="/categories"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Category"
                      action="canVisit"
                      element={<CategoryPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-category"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Category"
                      action="canAdd"
                      element={<AddCategory />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-category/:categoryId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Category"
                      action="canEdit"
                      element={<EditCategory />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/category-detail/:categoryId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Category"
                      action="canView"
                      element={<CategoryDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* PRODUCT */}
            <Route
              path="/products"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Product"
                      action="canVisit"
                      element={<ProductPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Product"
                      action="canAdd"
                      element={<AddProduct />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-product/:productId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Product"
                      action="canEdit"
                      element={<EditProduct />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/product-detail/:productId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Product"
                      action="canView"
                      element={<ProductDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/low-stock"
              element={<ProtectedRoute element={<LowStock />} />}
            />
            <Route
              path="/top-selling"
              element={<ProtectedRoute element={<TopSellingProds />} />}
            />
            {/* ItemsSaleReport */}

            <Route
              path="/item-sales-report"
              element={<ProtectedRoute element={<ItemsSaleReport />} />}
            />
            {/* SALE */}
            <Route
              path="/sales"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Sale"
                      action="canVisit"
                      element={<SalePage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-sale"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Sale"
                      action="canAdd"
                      element={<AddSale />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-sale/:saleId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Sale"
                      action="canEdit"
                      element={<EditSale />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/sale-invoice/:saleId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Sale"
                      action="canView"
                      element={<ViewSale />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* CUSTOMER */}
            <Route
              path="/customers"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Customer"
                      action="canVisit"
                      element={<CustomerPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-customer"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Customer"
                      action="canAdd"
                      element={<AddCustomer />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/customers/:customerId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Customer"
                      action="canView"
                      element={<CustomerDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-customer/:customerId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Customer"
                      element={<EditCustomer />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* PURCHASE */}
            <Route
              path="/purchase"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Purchase"
                      action="canVisit"
                      element={<PurchasePage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-purchase"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Purchase"
                      action="canAdd"
                      element={<AddPurchase />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-purchase/:purchaseId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Purchase"
                      action="canEdit"
                      element={<EditPurchase />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/purchase-invoice/:purchaseId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Purchase"
                      action="canView"
                      element={<ViewPurchase />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* SUPPLIER */}
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Supplier"
                      action="canVisit"
                      element={<SupplierPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-supplier"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Supplier"
                      action="canAdd"
                      element={<AddSupplier />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/supplier-detail/:supplierId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Supplier"
                      action="canView"
                      element={<SupplierDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-supplier/:supplierId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Supplier"
                      action="canEdit"
                      element={<EditSupplier />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* PAYMENTS */}
            <Route
              path="/payments"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Payment"
                      action="canVisit"
                      element={<PaymentPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-payments"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Payment"
                      action="canAdd"
                      element={<AddPayment />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-payment/:paymentId"
              element={
                <ProtectedRoute
                  element={
                    <RequirePermissionRoute
                      user={user}
                      moduleName="Payment"
                      action="canEdit"
                      element={<EditPayment />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* Expenses */}
            <Route
              path="/expenses"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Expense"
                      element={<ExpensePage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Expense"
                      element={<AddExpenses />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-expense/:expenseId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Expense"
                      element={<EditExpenses />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* REPORTS */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Report"
                      element={<ReportsPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* AUDIT LOG */}
            <Route
              path="/audit-log"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Audit Log"
                      element={<AuditLog />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/expiration"
              element={<ProtectedRoute element={<ExpirationPage />} />}
            />
            <Route
              path="/sales-report"
              element={<ProtectedRoute element={<SalesReport />} />}
            />
            <Route
              path="/sale-payment-report"
              element={<ProtectedRoute element={<SalePaymentReport />} />}
            />
            <Route
              path="/purchase-report"
              element={<ProtectedRoute element={<PurchaseReport />} />}
            />
            <Route
              path="/purchase-payment-report"
              element={<ProtectedRoute element={<PurchasePaymentReport />} />}
            />
            <Route
              path="/stock-report"
              element={<ProtectedRoute element={<StockReport />} />}
            />
            <Route
              path="/expense-report"
              element={<ProtectedRoute element={<ExpenseReport />} />}
            />
            <Route
              path="/daily-report"
              element={<ProtectedRoute element={<ItemsDailySaleReport />} />}
            />
            <Route
              path="/wastage-report"
              element={<ProtectedRoute element={<WastageReport />} />}
            />

            {/* SALE RETURN/REFUND */}
            <Route
              path="/sale-return"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Sale Return"
                      element={<SaleReturnPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-sale-return"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Sale Return"
                      element={<AddSaleReturn />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/sale-return/:returnId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="Sale Return"
                      element={<SaleReturnView />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-return/:returnId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Sale Return"
                      element={<EditSaleReturn />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* PURCHASE RETURN/REFUND */}
            <Route
              path="/purchase-return"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Purchase Return"
                      element={<PurchaseReturnsPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-purchase-return"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Purchase Return"
                      element={<AddPurchaseReturn />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/purchase-return/:returnId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="Purchase Return"
                      element={<PurchaseReturnView />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* WASTAGE */}
            <Route
              path="/wastage"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Wastage"
                      element={<Wastage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-wastage"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Wastage"
                      element={<AddWastage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/wastage-detail/:wastageId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="Wastage"
                      element={<WastageView />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* TAX */}
            <Route
              path="/tax"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Tax"
                      element={<TaxPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/add-tax"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Tax"
                      element={<AddTax />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-tax/:taxId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Tax"
                      element={<EditTax />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* UNITS */}
            <Route
              path="/units"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Unit"
                      element={<UnitsPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-units"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Unit"
                      element={<AddUnits />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-units/:unitId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Unit"
                      element={<EditUnits />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            {/* USERS */}
            <Route
              path="/users"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="User"
                      element={<UserPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-user"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="User"
                      element={<AddUser />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-user/:userId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="User"
                      element={<EditUser />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/users/:userId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="User"
                      element={<UserDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            {/* COMPANY PROFILE */}
            <Route
              path="/add-company"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canAdd"
                      moduleName="Company"
                      element={<AddCompany />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/company-profile"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="Company"
                      element={<CompanyDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/company-profile/:companyId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canView"
                      moduleName="Company"
                      element={<CompanyDetail />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/edit-company/:companyId"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canEdit"
                      moduleName="Company"
                      element={<EditCompany />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />
            <Route
              path="/company-calender"
              element={<ProtectedRoute element={<MyCalender />} />}
            />

            <Route
              path="/permission"
              element={
                <ProtectedRoute
                  element={
                    <RequireAddPermissionRoute
                      user={user}
                      action="canVisit"
                      moduleName="Permission"
                      element={<PermissionPage />}
                      fallback="/not-authorized"
                    />
                  }
                />
              }
            />

            <Route
              path="/add-permission"
              element={<ProtectedRoute element={<AddPermission />} />}
            />

            <Route
              path="/edit-permission/:permissionId"
              element={<ProtectedRoute element={<EditPermission />} />}
            />
            <Route
              path="/not-found"
              element={<ProtectedRoute element={<NotFound />} />}
            />
            <Route
              path="/not-authorized"
              element={<ProtectedRoute element={<Unauthorized />} />}
            />
            {/* unmatch routes */}
            <Route
              path="*"
              element={<ProtectedRoute element={<NotFound />} />}
            />
          </Routes>
        </DashboardLayout>
      )}
    </ScrollToTop>
  );
}
export default App;
