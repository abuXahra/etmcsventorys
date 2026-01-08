
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import ProductTable from '../../../components/table/product_table/Product'
import axios from 'axios'
import { List } from 'react-content-loader'
import { TopSellingProdsContent, TopSellingProdsWrapper } from './topSellingProds.style'
import TopSellingPageTable from '../../../components/table/product_table/top_selling_prod/TopSellingPageTable'


export default function TopSellingProds() {

   const [products, setProducts] = useState([]);
   const [allProducts, setAllProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [company, setCompany] = useState('') 
   const token = localStorage.getItem('token');

   // fetch handler 
          useEffect(() => {

                   const fetchCompany = async () =>{
                          try {
                              const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                                          setCompany(res.data[0]);
                              console.log('company:\ln', res.data)
                          } catch (error) {
                              console.log(error)
                          }
                      }
                    fetchCompany()
                    
             const getProducts = async () => { 
             setIsLoading(true)  
             try {
                                 const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                                  })
                                 const sortedData = res.data.sort((a, b) => b.saleQuantity - a.saleQuantity);
                                 setProducts(sortedData)
                                 setIsLoading(false)
                 console.log(res.data)
             } catch (err) {
                 console.log(err)
                 setIsLoading(false)
                 }
               }
               
             getProducts();
             
           }, [])
       
   

        
                // handle search query
                const handleSearchQueryOnChange = (e) => {
                  let query = e.target.value;
                  //  if query is empty, reset to all record
                  if(query === ''){
                    setProducts(allProducts);
                  }else{
                    // Filter records based on query
                    const filterRecords = allProducts.filter(item =>
                      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    );
                    setProducts(filterRecords)
                  }
                }
                    
           
  
  const navigate = useNavigate();
  return (
    <TopSellingProdsWrapper>
        <PageTitle title={'Top Selling Items'}/>

        {/* content */}
           {isLoading? <List/> :
        <TopSellingProdsContent>
          <ListHeader 
            title={'Add Product Purchase'} 
            btnOnClick={()=>navigate('/add-purchase')}
            searQuery={'Name'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={products.length}
          />
          
          {/* Product Table */}
            <TopSellingPageTable 
                data={products}
                currencySymbol={company?.currencySymbol}
            />
        </TopSellingProdsContent>
} 
    </TopSellingProdsWrapper>
  )
}




