
import React, { useContext, useEffect, useState } from 'react'
// import PageTitle from '../../../components/page_title/PageTitle'
// import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'
// import { SaleReturnPageContent, SaleReturnPageWrapper } from './saleReturnPage.style'
import SaleReturnTable from '../../../components/table/sale_table/sale_return_table/SaleReturnTable'
import { SaleReturnPageContent, SaleReturnPageWrapper } from './saleReturnPage.style'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { UserContext } from '../../../components/context/UserContext'
// 



export default function SaleReturnPage() {
  
  const token = localStorage.getItem('token');
    
     const[saleReturnRecords, setSaleReturnRecords] = useState([]);
     const [allSaleReturnRecords, setAllSaleReturnRecords] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

     
          // user Permission
          const {user, permissions} = useContext(UserContext);
          const saleReturnPermission = permissions?.find(p => p.module === "Sale Return")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : saleReturnPermission;

       
     // fetch expense handler 
                          useEffect(() => {
                              const getSale = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/saleReturn/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })                                     
                                      setSaleReturnRecords(res.data)
                                      setAllSaleReturnRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getSale();
                          }, [])



           // handle sale return delete
          const deleteSaleReturn = async (returnId,  updatedList = null) => {
            
            if (updatedList) {
              setSaleReturnRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/saleReturn/${returnId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedSale = saleReturnRecords.filter(saleReturn => saleReturn._id !== returnId);
              setSaleReturnRecords(updatedSale);
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
                setSaleReturnRecords(allSaleReturnRecords);
              }else{
                // Filter records based on query
                const filterRecords = allSaleReturnRecords.filter(item =>
                  item.customer?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())||
                  item.code?.toLowerCase().includes(query)
                );
                setSaleReturnRecords(filterRecords)
              }
            }


  const navigate = useNavigate();
  return (
    <SaleReturnPageWrapper>
        <PageTitle title={'Sale Return'}/>

        {/* content */}
      {isLoading? <List/> :
        <SaleReturnPageContent>
          <ListHeader 
            title={'Add Return'} 
            btnOnClick={()=>navigate('/add-sale-return')}
            searQuery={'Customer or code'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={saleReturnRecords.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Sales Return Table */}
            <SaleReturnTable 
              data={saleReturnRecords}
              onDeleteSale={deleteSaleReturn}
              saleReturnPermission={effectivePermission}
            />
        </SaleReturnPageContent>

      }
    </SaleReturnPageWrapper>
  )
}




