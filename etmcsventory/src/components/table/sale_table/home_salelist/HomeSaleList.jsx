

import React, { useState } from 'react';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';
import { ProductItemList } from '../../../../data/productItems';


const HomeSaleList = () => {
  const [data, setData] = useState(ProductItemList) 
  return (
    <HomeSaleListWrapper>
        <TabeReusabComp productData={data} header={'Sale'}/>
    </HomeSaleListWrapper>
  );
};
export default HomeSaleList;
