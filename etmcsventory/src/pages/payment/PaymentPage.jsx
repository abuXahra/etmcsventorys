
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import PaymentTable from '../../components/table/payment_table/Payment'
import { PaymentPageContent, PaymentPageWrapper } from './paymentPage.style'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



export default function PaymentPage() {
  
  const token = localStorage.getItem('token');
  const[paymentRecords, setPaymentRecords] = useState([]);
  const [allPaymentRecords, setAllPaymentRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany]= useState('');

           // user Permission
           const {user, permissions} = useContext(UserContext);
           const paymentPermission = permissions?.find(p => p.module === "Payment")
           const effectivePermission =
               user?.role === "admin"
                 ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                 : paymentPermission;
 
                 
// fetch expense handler 
                          useEffect(() => {

                                    const fetchCompany = async () =>{
                                        try {
                                            const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                                                headers: {
                                                                                  Authorization: `Bearer ${token}`
                                                                                }
                                                                          })
                                            setCompany(res.data[0]);
                                            console.log('company:\ln', res.data)
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                    fetchCompany()
                            
                                    const getPayment = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/payment/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setPaymentRecords(res.data)
                                      setAllPaymentRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getPayment();
                          }, [])


           // handle payment delete
          const deletePayment = async (paymentId,  updatedList = null) => {
            
            if (updatedList) {
              setPaymentRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/payment/${paymentId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedPayment = paymentRecords.filter(payment => payment._id !== paymentId);
              setPaymentRecords(updatedPayment);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
const handleSearchQueryOnChange = (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query === '') {
    setPaymentRecords(allPaymentRecords);
  } else {
    const filteredRecords = allPaymentRecords.filter(item => {
      const paymentFor = (item.paymentFor || '').toLowerCase();
      const paymentType = (item.paymentType || '').toLowerCase();
      return (
        paymentFor.includes(query) ||
        paymentType.includes(query) 
      );
    });

    setPaymentRecords(filteredRecords);
  }
};



  const navigate = useNavigate();
  return (
    <PaymentPageWrapper>
        <PageTitle title={'Payments'}/>

      {/* content */}
        {isLoading? <List/> :
        <PaymentPageContent>
          <ListHeader 
            title={'Add Payment'} 
            btnOnClick={()=>navigate('/add-payments')}
            searQuery={'Payment For, Payment Type'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={paymentRecords.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* Payment Table */}
          <PaymentTable 
            data={paymentRecords} 
            onDeletePayment={deletePayment} 
            setIsLoading={setIsLoading}
            paymentPermission={effectivePermission}
            currencySymbol={company?.currencySymbol}
          />
        </PaymentPageContent>
}
    </PaymentPageWrapper>
  )
}




