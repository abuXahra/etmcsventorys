
import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { PurchasePageContent, PurchasePageWrapper } from './purchasePage.style'
import PurchaseTable from '../../components/table/purchase_table/Purchase'
import axios from 'axios'
import { List } from 'react-content-loader'
import { UserContext } from '../../components/context/UserContext'



export default function PurchasePage() {
const token = localStorage.getItem('token');
    
   const[purchaseRecords, setPurchaseRecords] = useState([]);
   const [allPurchaseRecords, setAllPurchaseRecords] = useState([]);
   const [isLoading, setIsLoading] = useState(false);


          // user Permission
          const {user, permissions} = useContext(UserContext);
          const purchasePermission = permissions?.find(p => p.module === "Purchase")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : purchasePermission;

     
 // fetch expense handler 
                          useEffect(() => {
                              const getPurchase = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/purchase/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setPurchaseRecords(res.data)
                                      setAllPurchaseRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getPurchase();
                          }, [])



           // handle purchase delete
          const deletePurchase = async (purchaseId,  updatedList = null) => {
            
            if (updatedList) {
              setPurchaseRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedPurchase = purchaseRecords.filter(purchase => purchase._id !== purchaseId);
              setPurchaseRecords(updatedPurchase);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
            const handleSearchQueryOnChange = (e) => {
  const query = e.target.value.trim().toLowerCase(); // normalize query

  if (query === '') {
    setPurchaseRecords(allPurchaseRecords);
  } else {
    const filteredRecords = allPurchaseRecords.filter(item => {
      const supplierName = item.supplier?.name?.toLowerCase() || '';
      const purchaseCode = item.code?.toLowerCase() || ''; // use correct field name

      return (
        supplierName.includes(query) ||
        purchaseCode.includes(query)
      );
    });

    setPurchaseRecords(filteredRecords);
  }
};



  const navigate = useNavigate();
  return (
    <PurchasePageWrapper>
        <PageTitle title={'Purchase'}/>

          {/* content */}
        {isLoading? <List/> :
        <PurchasePageContent>
          <ListHeader 
            title={'Purchase'} 
            btnOnClick={()=>navigate('/add-purchase')}
            searQuery={'Supplier or Invoice Code'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={purchaseRecords.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Purchase Table */}
            <PurchaseTable 
                data={purchaseRecords} 
                onDeletePurchase={deletePurchase} 
                setIsLoading={setIsLoading}
                purchasePermission={effectivePermission}
            />
        </PurchasePageContent>

        } 
    </PurchasePageWrapper>
  )
}




