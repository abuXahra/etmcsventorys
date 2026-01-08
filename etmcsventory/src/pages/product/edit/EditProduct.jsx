

import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../../components/page_title/PageTitle';
import ItemContainer from '../../../components/item_container/ItemContainer';
import Input from '../../../components/input/Input';
import SelectInput from '../../../components/input/selectInput/SelectInput';
import TextArea from '../../../components/input/textArea/TextArea';
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style';
import Button from '../../../components/clicks/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyItemContainer } from '../../sale/Add/addSale.style';
import { FaLocationDot } from 'react-icons/fa6';
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader';
import { AiFillPicture } from 'react-icons/ai';
import { EditProductWrapper, EditProductContent, ImageWrapper, InputPicture, NameAndFileInput } from './EditProduct.style';
import axios from 'axios';
import { UserContext } from '../../../components/context/UserContext';
import { toast } from 'react-toastify';
import productPicture from '../../../images/product_placeholder.jpg'
import { List } from 'react-content-loader';

export default function AddProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {productId} = useParams();
  const {user} = useContext(UserContext);
  const [showPicture, setShowPicture] = useState(true);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [unit, setUnit] = useState('');
  const [unitError, setUnitError] = useState(false);
  const [tax, setTax] = useState('');
  const [taxError, setTaxError] = useState(false);
  const [taxType, setTaxType] = useState('');
  const [taxTypeError, setTaxTypeError] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantityAlert, setQuantityAlert] = useState('');
  const [alertQntError, setAlertQntError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [file, setFile] = useState('');
  const [fileError, setFileError] = useState(false);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchasePriceError, setPurchasePriceError] = useState(false);
  const [profitMargin, setProfitMargin] = useState('');
  const [profitMarginError, setProfitMarginError] = useState(false);
  const [salesPrice, setSalesPrice] = useState('');
  const [salesPriceError, setSalesPriceError] = useState(false);
  


  const [categoryItem, setCategoryItem] = useState([]);

  const [unitItem, setUnitItem] = useState([]);

  const [taxItem, setTaxItem] = useState([]);
  
  const token = localStorage.getItem('token');



  const taxTypeItem = [
    { title: 'Select', value: '' },
    { title: 'Inclusive', value: 'Inclusive' },
    { title: 'Non Inclusive', value: 'Non Inclusive' }
  ];


  useEffect(()=>{

              const fetchProducts = async() =>{
                    setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/products/${productId}`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          } );
                       
                        console.log(res.data);
                        const formattedSaleDate = new Date(res.data.expirationDate).toISOString().split('T')[0]
                        setTitle(res.data.title);
                        setVideoUrl(res.data.videoUrl);
                        setCategory(res.data.category?._id);
                        setUnit(res.data.unit?._id);
                        setTax(res.data.tax);
                        setTaxType(res.data.taxType);
                        setExpirationDate(formattedSaleDate);
                        setQuantityAlert(res.data.quantityAlert);
                        setDescription(res.data.description);
                        setFile(res.data.imgUrl);
                        setPrice(res.data.price);
                        setPurchasePrice(res.data.purchasePrice);
                        setProfitMargin(res.data.profitMargin);
                        setSalesPrice(res.data.salePrice);
                        setIsLoading(false);
    
                    } catch (error) {
                        console.log(error)
                        setIsLoading(false);
                    }
            
                }    

    // fetch cat
    const fetCategoryItem = async() => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_URL}/api/category`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          } );
         setCategoryItem([
          { title: 'Select', value: '' }, 
          ...res.data.map(cat => ({
            title: cat.title,
            value: cat._id
          }))
         ]);
      } catch (error) {
        console.log(error.message)
      }
    };

        // fetch unit
    const fetchUnitItem = async() => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_URL}/api/units`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          } );
         setUnitItem([
          { title: 'Select', value: '' }, 
             ...res.data.map(unit => ({
              title: unit.title,
              value: unit._id
            }))
         ]);
      } catch (error) {
        console.log(error.message)
      }
    };

            // fetch tax
    const fetchTaxItem = async() => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_URL}/api/tax`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          });
         setTaxItem([
          { title: 'Select', value: '' }, 
          ...res.data.map(tax => ({
            title: tax.name,
            value: tax.taxPercentage
          }))
    ]);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchProducts();
    fetCategoryItem();
    fetchUnitItem();
    fetchTaxItem();
  }, [productId])


  const calculatePurchasePrice = (price, tax) => {
    const p = parseFloat(price) || 0;
    const t = parseFloat(tax) || 0;
    const result = p + (p * t / 100);
    setPurchasePrice(result.toFixed(2));
    if (profitMargin && taxType) {
      calculateSellingPrice(result, profitMargin, taxType, tax);
    }
  };

  const calculateSellingPrice = (purchasePrice, profitMargin, taxType, tax) => {
    const base = parseFloat(purchasePrice) || 0;
    const margin = parseFloat(profitMargin) || 0;
    let selling;
    if (taxType === 'Inclusive') {
      selling = base + (base * margin / 100);
    } else {
      const priceWithoutTax = base / (1 + (tax / 100));
      selling = priceWithoutTax + (priceWithoutTax * margin / 100);
    }
    setSalesPrice(selling.toFixed(2));
  };

  const handleChange = (type, e) => {

    if (type === 'title') {
      setTitle(e.target.value); 
      setTitleError(false)
    }else if (type === 'video') {
      setVideoUrl(e.target.value); 
    }
    else if (type === 'category') {
      setCategory(e.target.value); 
      setCategoryError(false)
    }
    else if (type === 'unit') {
      setUnit(e.target.value); 
      setUnitError(false)
    }
    else if (type === 'expirationDate') {
      setExpirationDate(e.target.value); 
    }
    else if (type === 'alertQnt') {
      setQuantityAlert(e.target.value); 
      setAlertQntError(false)
    }
    else if (type === 'description') {
      setDescription(e.target.value); 
      setDescriptionError(false);
    }
    else if (type === 'file') {
      setFile(e.target.files[0]);
      setShowPicture(false);
    }
    else if (type === 'price') {
      setPrice(e.target.value);
      calculatePurchasePrice(e.target.value, tax);
      setPriceError(false);
    }
    else if (type === 'tax') {
      setTax(e.target.value);
      calculatePurchasePrice(price, e.target.value);
      setTaxError(false);
    }
    else if (type === 'tax-type') {
      setTaxType(e.target.value);
      calculateSellingPrice(purchasePrice, profitMargin, e.target.value, tax);
      setTaxTypeError(false);
    }
    else if (type === 'profit-margin') {
      setProfitMargin(e.target.value);
      calculateSellingPrice(purchasePrice, e.target.value, taxType, tax);
      setProfitMarginError(false);
    }
    else if (type === 'salePrice') {
      setSalesPrice(e.target.value);
      setSalesPriceError(false);
    }
  };


  // Fetch expense initial
      const [productInitial, setProductInitial] = useState('')
      useEffect(()=>{
        const fetchCompany = async() =>{
          setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`,{
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          });
              
                const prefix = res.data[0].prefixes?.[0];
  
                if (prefix) {
                    setProductInitial(prefix.product);
                }
  
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
      
        }
        fetchCompany();
      },[])


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Submit handler triggered')
    let valid = true;
    
    if (!title) {
      setTitleError(true);  
      valid = false;
    }
    if (!category) {
      setCategoryError(true); 
      valid = false;
    }
    if (!unit) {
      setUnitError(true); 
      valid = false;
    }
    if (tax === '' || tax === null) {
        setTaxError(true); 
        valid = false;
      }
    if (!taxType){ 
        setTaxTypeError(true); 
        valid = false;
      }
    if (!quantityAlert) {
        setAlertQntError(true); 
        valid = false;
      }
    // if (!file) {
    //     setFileError(true); 
    //     valid = false;
    //   }
    if (!price) {
        setPriceError(true); 
        valid = false;
      }
    if (!purchasePrice) {
        setPurchasePriceError(true); 
        valid = false;
      }
    if (!salesPrice) {
      setSalesPriceError(true); 
      valid = false;
    }
    
    if (valid) {
     console.log('form validated triggered')
      const updateProduct = {
        title: title,
        videoUrl: videoUrl,
        category: category,
        unit: unit,
        expirationDate:  expirationDate,
        quantityAlert: quantityAlert,
        description: description,
        price:  price,
        tax: tax,
        purchasePrice: purchasePrice,
        taxType: taxType,
        profitMargin: profitMargin,
        salePrice: salesPrice,
        userId: user._id,
      }

      console.log(updateProduct)

      if (file) {
          const data = new FormData()
          const filename = file.name
          data.append('img', filename)
          data.append('file', file)
          updateProduct.imgUrl = filename;
          
          // img upload
          try {
              const imgUpload = await axios.post(`${process.env.REACT_APP_URL}/api/upload`, data)
              console.log(imgUpload.data)
              } catch (err) {
                console.log(err)
              }
          }
                  
      setIsBtnLoading(true);

      try {
        const res = await axios.put(`${process.env.REACT_APP_URL}/api/products/${productId}`, updateProduct, {
                            headers: {
                              Authorization: `Bearer ${token}`
                            }
                          } );
        
        navigate('/products');
          // toast success message
           toast.success('Product added Successfully')
      } catch (err) {
        console.error(err);
        setIsBtnLoading(false);
      }
    }
  };

  return (
    <EditProductWrapper>
      <PageTitle title={'Product'} subTitle={'/ Edit'} />
      <>
      {isLoading? <List/> :
      <EditProductContent>
        <form onSubmit={submitHandler}>
          <ItemContainer title={'Edit Product'}>
            <AnyItemContainer justifyContent={'space-between'}>
              <Input 
                value={title} 
                title={'Title'} 
                onChange={(e) => handleChange('title', e)} 
                error={titleError} 
                type={'text'} 
                label={'Title'} 
            />
              <SelectInput 
                    value={category} 
                    onChange={(e) => handleChange('category', e)} 
                    options={categoryItem} 
                    label={'Category'} 
                    error={categoryError}
                    title={'Category'}
                />
              <SelectInput 
                value={unit} 
                onChange={(e) => handleChange('unit', e)} 
                options={unitItem} 
                label={'Units'}
                error={unitError} 
                title={'Unit'}
            />
            </AnyItemContainer>
            <AnyItemContainer justifyContent={'space-between'}>
              <Input 
                value={expirationDate} 
                title={'Expiration Date'} 
                onChange={(e) => handleChange('expirationDate', e)} 
                type={'date'} 
                label={'Expiration Date'} />
              <Input value={quantityAlert} title={'Alert Quantity'} onChange={(e) => handleChange('alertQnt', e)} error={alertQntError} type={'text'} label={'Alert Quantity'} />
                             <Input 
                                value={videoUrl} 
                                title={'Video Url'} 
                                onChange={(e) => handleChange('video', e)} 
                                type={'text'} 
                                label={'Video Url'} 
                            />
            </AnyItemContainer>
            <AnyItemContainer justifyContent={'space-between'}>
              <TextArea 
                label={'Description'} 
                title={'Description'} 
                onChange={(e) => handleChange('description', e)} 
                value={description} 
                // error={descriptionError} 
              />


                        <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture ? (  <ImageWrapper bg={file ? `${process.env.REACT_APP_URL}/images/${file}` : productPicture}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) :      
                         (<>  { 
                            file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                            }
                            </> 
                            )} 
                        </label>
                            <InputPicture onChange={(e)=>handleChange('file', e)} type="file" id="fileInput" />
                         </NameAndFileInput>
            </AnyItemContainer>
          </ItemContainer>

          <ItemContainer title={'Purchase Info'}>
            <AnyItemContainer justifyContent={'space-between'}>
              <Input 
                  value={price} 
                  title={'Price'} 
                  onChange={(e) => handleChange('price', e)} 
                  error={priceError} 
                  type={'number'} 
                  label={'Price'} 
                />
              
              <SelectInput 
                value={tax} 
                onChange={(e) => handleChange('tax', e)} 
                title={'Tax'} 
                options={taxItem} 
                label={'Tax'} 
                error={taxError}
                requiredSymbol={"*"}
                />

              <Input 
                value={purchasePrice} 
                title={'Purchase Price'} 
                type={'number'} 
                label={'Purchase Price'} 
                readOnly 
                onChange={() => {}} 
              />
            </AnyItemContainer>
          </ItemContainer>

          <ItemContainer title={'Sale Info'}>
            <AnyItemContainer justifyContent={'space-between'}>
              <SelectInput 
                    error={taxTypeError} 
                    value={taxType} 
                    title={'Tax Type'} 
                    options={taxTypeItem} 
                    label={'Tax Type'} 
                    onChange={(e) => handleChange('tax-type', e)} 
                />
              <Input value={profitMargin} title={'Profit Margin'} onChange={(e) => handleChange('profit-margin', e)} error={profitMarginError} type={'number'} label={'Profit Margin (%)'} requiredSymbol={'*'} />
              <Input 
                value={salesPrice} 
                title={'Selling Price'} 
                type={'number'} 
                label={'Selling Price'} 
                // readOnly 
                onChange={(e) =>handleChange('salePrice', e)} 
                error={salesPriceError} 
              />
            </AnyItemContainer>
            <ItemButtonWrapper btnAlign={'space-between'}>
              <div>
                <Button
                  title={'Select Items'}
                  btnText={isBtnLoading ? <ButtonLoader text={'Updating...'} /> : 'Update Product'}
                  btnFontSize={'12px'}
                  btnColor={'Green'}
                  btnTxtClr={'white'}
                  btnAlign={'flex-end'}
                  type={'submit'}
                />
              </div>
            </ItemButtonWrapper>
          </ItemContainer>
        </form>
      </EditProductContent>}
      </>

    </EditProductWrapper>
  );
}




 
  