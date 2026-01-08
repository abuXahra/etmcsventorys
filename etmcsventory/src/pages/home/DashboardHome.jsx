import React, { useContext, useEffect, useState } from 'react'
import { AuthorContainer, ChartContainer, ChartContent, ChartWrapper, Container, CustomerListContent, CustomerListWrapper, DateTimeWrapper, GreetingCard, GreetingWrapper, HomeWrapper, PostItems, PostItemWrapper, ProductContainer, ProfileDp, RecentPostWrapper, SpaceBtnContainer, TopCard, TopCardContent, TopCardContentWrapper, TopCardIcon, TopCardIconB, TotalPostContainer, UserContainer, UserWrapper } from './Home.style'
import {MdOutlineAdd, MdOutlineDateRange} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
// import { TopCardItemList } from '../../../data/TopcardItems'
import PurchaseSale from '../../components/chart/purchase_sale/PurchaseSale'
import QuickLinks from '../../components/quick_links/QuickLinks'
import AlertContent from '../../components/table/alert_content_table/AlertContent'
import HomePurchaseList from '../../components/table/purchase_table/home_purchase_list/HomePurchaseList'
import HomeSaleList from '../../components/table/sale_table/home_salelist/HomeSaleList'
import { UserContext } from '../../components/context/UserContext'
import { ArrowWrapper, ItemDetails } from '../reports/reportsPage.style'
import { FaChartPie, FaLongArrowAltRight, FaPeopleCarry, FaRecycle } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { PiInvoiceBold } from 'react-icons/pi'
import { IoBagSharp, IoPricetagsSharp } from 'react-icons/io5'
import { HiMiniReceiptRefund } from 'react-icons/hi2'
import axios from 'axios'
import { List } from 'react-content-loader';
import MyBarChart from '../../components/chart/Barchart'
import MyPieChart from '../../components/chart/pie-chat/MyPieChart'
import SaleChart from '../../components/chart/sale-chart/SaleChart'
import TopSelling from '../../components/table/product_table/top_selling_prod/TopSelling'
import ExpirationTable from '../../components/table/product_table/expiration_table/ExpirationTable'
import HomeExpComponent from '../../components/table/product_table/expiration_table/home_expiration/HomeExpComp'






// import axios from 'axios'


function DashboardHome() {
  const token = localStorage.getItem("token");
  const {user, loading} = useContext(UserContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [saleInvoice, setSaleInvoice] = useState(null);
  const [saleOutstanding, setSaleOutstanding] = useState(null);
  const [supplier, setSupplier] = useState([]);
  const [purchaseInvoice, setPurchaseInvoice] = useState(null);
  const [purchaseOutstanding, setPurchaseOutstanding] = useState(null);
  const [totalWastageAmount, setTotalWastageAmount] = useState(null);
  const [totalStockAmount, setTotalStockAmount] = useState(null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [paymentCount, setPaymentCount] = useState(null);
  const [expenses, setExpenses] = useState(null);
  
  const [companyData, setCompanyData] = useState('')

  const [isLoading, setIsLoading] = useState(false);

    const fetchCompany = async() =>{
                      // setIsLoading(true)
                        try {
                            const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                                headers: {
                                                                  Authorization: `Bearer ${token}`
                                                                }
                                                          })
                            setCompanyData(res.data[0])
                            // setIsLoading(false);
                        } catch (error) {
                            console.log(error);
                            // setIsLoading(false);
                        }
                  
                    }
           

                    


  // saleInvoice
  const fetchSaleInvoice = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/sale/total-sale' , {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setSaleInvoice(res.data.totalSaleAmount);
        // setSaleInvoice(res.data.totalAmountPaid);
      } catch (error) {
        console.log(error)
      }
    }


    // sale outStaning
  const fetchSaleOutstanding = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/sale/outstanding-sale' , {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setSaleOutstanding(res.data.totalOutstanding);
      } catch (error) {
        console.log(error)
      }
    }

        // sale outstaning
  const fetchTotalWastageAmount = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/wastage/total-waste' , {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setTotalWastageAmount(res.data.totalWastageAmount);
      } catch (error) {
        console.log(error)
      }
    }
 
  // Purchase Invoice
  const fetchPurchaseInvoice = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/purchase/total-purchase', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setPurchaseInvoice(res.data.totalPurchaseAmount);
      } catch (error) {
        console.log(error)
      }
    }

 


     // Purchase Outstanding
  const fetchPurchaseOutstanding = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/purchase/outstanding-purchase', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setPurchaseOutstanding(res.data.totalOutstanding);
      } catch (error) {
        console.log(error)
      }
    }

  
// Payment
      const fetchPayment = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/payment/total-payable', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setPaymentCount(res.data?.totalPayableAmount)
        console.log('.... Total Payment: \n', res.data.totalPayableAmount)
      } catch (error) {
        console.log(error)
      }
    }

    
  const fetchExpenses = async () =>{
      setIsLoading(true)
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/expense/expense-total', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setExpenses(res.data.totalExpenseAmount);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    
      // tota tock amount
  const fetchTotalStockAmount = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/products/stock-amount' , {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setTotalStockAmount(res.data.totalStockAmount);
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=>{
      fetchCompany();
      fetchPayment();
      fetchSaleInvoice();
      fetchSaleOutstanding();
      fetchPurchaseInvoice();
      fetchPurchaseOutstanding();
      fetchTotalWastageAmount();
      fetchExpenses();
      fetchTotalStockAmount();

    }, []);
    
  
    const overAllProfit = 
    (saleInvoice + totalStockAmount ) - (purchaseInvoice + expenses + totalWastageAmount )
    
  const TopCardItemList = [
    {
      title: "Sales Invoice",
      count: saleInvoice?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <PiInvoiceBold />,
      bg: "#16a34a",
      url: "/sales",
       currency: companyData,
    },
    {
      title: "Purchase Invoice",
      count: purchaseInvoice?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <PiInvoiceBold />,
      bg: "#2563eb",
      url: "/purchase",
      currency: companyData,
    },
      {
      title: "Expenses",
      count: expenses?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <FaChartPie />,
      bg: "#ef4444",
      url: "/expenses",
       currency: companyData,
    },
      {
      title: "In Stock",
      count: totalStockAmount?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <HiMiniReceiptRefund />,
      // bg: "#f59e0b",
      bg: "purple",
      url: "/sale-return",
      currency: companyData,
    },
    {
      title: "Sale Outstanding",
      count: saleOutstanding?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <IoIosPeople />,
      bg: "#16a34a",
      url: "/customers",
      currency: companyData,
    },
    {
      title: "Purchase Outstanding",
      count: purchaseOutstanding?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <FaPeopleCarry />,
      bg: "#2563eb",
      url: "/suppliers",
      currency: companyData,
    },
    {
      title: "Wastage",
      count: totalWastageAmount?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <FaRecycle />,
      bg: "#ef4444",
      url: "/wastage",
      currency: companyData,
    },
  
    {
      title: "Net Profit",
      count: overAllProfit?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <IoPricetagsSharp />,
      bg: "purple",
      url: "",
         currency: companyData,
    },
  ];
  

  // title: "Wastage Report",
  //     icon: <FaRecycle />,
  //     bg: "purple",


  const data = [
    {
      id: 1,
      date: '02-01-2021',
      code: 'SA1001',
      name: 'Walk-in Customer',
      status: 'Received',
      grandTotal: '$300',
      paymentStatus: 'Paid',
    },    {
      id: 2,
      date: '02-01-2022',
      code: 'SA1002',
      name: 'Yusuf Abdulazeez',
      status: 'Pending',
      grandTotal: '$500',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      date: '02-01-2024',
      code: 'SA1008',
      name: 'Helen Nwaosu',
      status: 'Received',
      grandTotal: '$700',
      paymentStatus: 'Paid',
    },
  ];

  
  return (
    <HomeWrapper>
        {/* <video src={flightVide} autoPlay loop muted></video> */}
        <GreetingWrapper>
          <GreetingCard>
            {user && <h1>Welcome</h1>}         
            <h4 style={{textTransform: "capitalize"}}>{user && user?.username}</h4>
            <span style={{textTransform: "capitalize"}}>{user && user?.role}</span>
          </GreetingCard>

          <DateTimeWrapper>
            <span><MdOutlineDateRange /></span>
            <span>Today: {new Date().toDateString()}</span>
          </DateTimeWrapper>
        </GreetingWrapper>

    {/* Quick links */}
      <QuickLinks/>
      <TopCardContent>
  
                 <TopCardContentWrapper>
            {
              TopCardItemList
              .map((item, i)=>(
                     <TopCard bg={item.bg}>
                          <TopCardIcon>
                            {item.icon}
                          </TopCardIcon>
                          <h2><span><span dangerouslySetInnerHTML={{ __html: item.currency?.currencySymbol }}/>{item.count}</span></h2>
                          <p>{item.title}</p>
                        <ItemDetails onClick={()=> navigate(`${item.url}`)}>
                            <ArrowWrapper>
                                <FaLongArrowAltRight/>
                            </ArrowWrapper>
                        </ItemDetails>
                      </TopCard>
              ))
            }   
        </TopCardContentWrapper>   
      </TopCardContent>

        {/* Charts */}
      <Container>
          <PurchaseSale/>
          <SaleChart/>
      </Container>

      <Container>
        <TopSelling  header={"Top Selling Products"}/>
      </Container> 

      <Container>
        <AlertContent/>
        <HomePurchaseList/>
      </Container>
            <Container>
               <HomeExpComponent header={"Product Expiration"}/>     
            </Container>


    </HomeWrapper>
  )
}

export default DashboardHome


// https://demos.creative-tim.com/purity-ui-dashboard-pro/?_ga=2.54610219.1863943687.1726404927-1621573859.1726404927#/admin/dashboard/default





