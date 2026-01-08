
import React, { useContext, useEffect, useState } from 'react'
// import PageTitle from '../../../components/page_title/PageTitle'
// import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'
// import { SaleReturnPageContent, SaleReturnPageWrapper } from './saleReturnPage.style'
import SaleReturnTable from '../../../components/table/sale_table/sale_return_table/SaleReturnTable'

import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { SaleReturnPageContent, SaleReturnPageWrapper } from './purchaseReturnsPage.style'
import PurchaseReturnTable from '../../../components/table/purchase_table/purchase_return_table/PurchaseReturnTable'
import { UserContext } from '../../../components/context/UserContext'




export default function PurchaseReturnsPage() {
  
  const token = localStorage.getItem('token');
    
     const[purchaseReturnRecords, setPurchaseReturnRecords] = useState([]);
     const [allPurchaseReturnRecords, setAllPurchaseReturnRecords] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

          // user Permission
          const {user, permissions} = useContext(UserContext);
          const purchaseReturnPermission = permissions?.find(p => p.module === "Purchase Return")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : purchaseReturnPermission;

       
     // fetch expense handler 
                          useEffect(() => {
                              const getPurchase = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/purchaseReturn/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setPurchaseReturnRecords(res.data)
                                      setAllPurchaseReturnRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getPurchase();
                          }, [])



           // handle Purchase return delete
          const deletePurchaseReturn = async (returnId,  updatedList = null) => {
            
            if (updatedList) {
              setPurchaseReturnRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/purchaseReturn/${returnId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedPurchase = purchaseReturnRecords.filter(purchaseReturn => purchaseReturn._id !== returnId);
              setPurchaseReturnRecords(updatedPurchase);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
            const handleSearchQueryOnChange = (e) => {
              let query = e.target.value.trim().toLowerCase();
              //  if query is empty, reset to all record
              if(query === ''){
                setPurchaseReturnRecords(allPurchaseReturnRecords);
              }else{
                // Filter records based on query
                const filterRecords = allPurchaseReturnRecords.filter(item =>
                  item.supplier?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())||
                  item.code?.toLowerCase().includes(query)
                );
                setPurchaseReturnRecords(filterRecords)
              }
            }


  const navigate = useNavigate();
  return (
    <SaleReturnPageWrapper>
        <PageTitle title={'Purchase Return'}/>

        {/* content */}
      {isLoading? <List/> :
        <SaleReturnPageContent>
          <ListHeader 
            title={'Add Return'} 
            btnOnClick={()=>navigate('/add-purchase-return')}
            searQuery={'Customer or code'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={purchaseReturnRecords.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Purchase Return Table */}
            <PurchaseReturnTable 
              data={purchaseReturnRecords}
              onDeletePurchase={deletePurchaseReturn}
              purchaseReturnPermission={effectivePermission}
            />
        </SaleReturnPageContent>

      }
    </SaleReturnPageWrapper>
  )
}




