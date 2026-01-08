
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ProductItemList } from '../../../../../data/productItems';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';


const HomeSaleList = () => {
  

  const [data, setData] = useState(ProductItemList) 

  return (
    <HomeSaleListWrapper>
        <TabeReusabComp productData={data} header={'Sale'}/>
    </HomeSaleListWrapper>
  );
};

export default HomeSaleList;
