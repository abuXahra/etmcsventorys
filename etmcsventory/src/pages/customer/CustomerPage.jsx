
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import { useNavigate } from 'react-router-dom'
import { CustomerPageContent, CustomerPageWrapper } from './customerPage.style'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import CustomerTable from '../../components/table/customer_table/CustomerTable'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'




// import {DataTable} from 'react-data-table-component'


export default function CustomerPage() {


  
  const [customer, setCustomer] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token')
  
  // user Permission
  const {permissions, user} = useContext(UserContext);
  const customerPermission = permissions?.find(p => p.module === "Customer")
  const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : customerPermission;
        
    
   // fetch customer handler 
       useEffect(() => {
          const getCustomer = async () => { 
          setIsLoading(true)  
          try {
              const res = await axios.get(process.env.REACT_APP_URL + "/api/customers", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
              setCustomer(res.data)
              setAllCustomer(res.data);
              setIsLoading(false)
              
              console.log(res.data)
          } catch (err) {
              console.log(err)
              setIsLoading(false)
              }
            }
            
          getCustomer();
          
        }, [])
    
               // handle customer delete
              const deleteCustomer = async (customerId,  updatedList = null) => {
                
                if (updatedList) {
                  setCustomer(updatedList);
                  return { success: true };
                }
                
                try {
                  await axios.delete(`${process.env.REACT_APP_URL}/api/customers/${customerId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                  const updatedCustomer = customer.filter(customer => customer._id !== customerId);
                  setCustomer(updatedCustomer);
                  return { success: true };
                } catch (error) {
                  return { success: false, message: error.message };
                }
              };
            
    
                // handle search query
                const handleSearchQueryOnChange = (e) => {
                  let query = e.target.value;
                  //  if query is empty, reset to all record
                  if(query === ''){
                    setCustomer(allCustomer);
                  }else{
                    // Filter records based on query
                    const filterRecords = allCustomer.filter(item =>
                      item.username.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    );
                    setCustomer(filterRecords)
                  }
                }
      
  
  const navigate = useNavigate();
  return (
    <CustomerPageWrapper>
        <PageTitle title={'Customer'}/>

         {/* content */}
        {isLoading? <List/> :
        <CustomerPageContent>
          <ListHeader 
            title={'Add Customer'} 
            btnOnClick={()=>navigate('/add-customer')}
            searQuery={'Name'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={customer.length}
            permission={effectivePermission?.canAdd}
          />
          
          {/* Sales Table */}
            <CustomerTable 
              data={customer} 
              onDeleteCus={deleteCustomer} 
              customerPermission={effectivePermission} 
            />
        </CustomerPageContent>

}
    </CustomerPageWrapper>
  )
}




