
import React, { useContext, useEffect, useRef, useState } from 'react'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import { ProductItemList } from '../../../data/productItems'
import Button from '../../../components/clicks/button/Button'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import TextArea from '../../../components/input/textArea/TextArea'
import { FaTrash } from 'react-icons/fa'
import PageTitle from '../../../components/page_title/PageTitle'
import { useNavigate } from 'react-router-dom'
import { AddPurchaseContent, AddPurchaseWrapper, AnyItemContainer, DropdownItems, DropdownWrapper, HrStyled, InnerWrapper, ItemListContent, ItemsWrapper, SelectItemContent, SupplierInfoWrapper, TableResponsiveWrapper, TableStyled, TdStyled, TotalChargesWrapper } from './addPurchase.style'
import axios from 'axios'
import { UserContext } from '../../../components/context/UserContext'
import { toast } from 'react-toastify'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import Overlay from '../../../components/overlay/Overlay'

export default function AddPurchase() {
const token = localStorage.getItem('token');
    
// const [productItemList, setProductItemList] = useState(ProductItemList);
const productDropdownRef = useRef(null);
const supplierDropdownRef = useRef(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {user} = useContext(UserContext);

const [itemList, setItemList] = useState([]);
const [productId, setProductId] = useState('');



const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

const [searchTitle, setSearchTitle] = useState('');
const [searchTitleError, setSearchTitleError] = useState(false);

const [title, setTitle] = useState('');
const [titleError, setTitleError] = useState(false);

const [quantity, setQuantity] = useState('');
const [quantityError, setQuantityError] = useState(false);

const [price, setPrice] = useState('');
const [priceError, setPriceError] = useState(false);

const [tax, setTax] = useState('');
const [taxError, setTaxError] = useState(false);

const [taxAmount, setTaxAmount] = useState('');
const [taxAmountError, setTaxAmountError] = useState(false);

const [unitCost, setUnitCost] = useState('');
const [unitCostError, setUnitCostError] = useState(false);

const [amount, setAmount] = useState('');
const [amountError, setAmountError] = useState(false);

{/* Supply info */}
const [purchaseDate, setPurchaseDate] = useState(todayDate);
const [purchaseDateError, setPurchaseDateError] = useState(false);

// const [purchaseQuantity, setPurchaseQuantity] = useState(null)

const [supplier, setSupplier] = useState('');
const [supplierNameError, setSupplierNameError] = useState(false);
console.log(supplier)

const [purchaseStatus, setPurchaseStatus] = useState('');
const [purchaseStatusError, setPurchaseStatusError] = useState(false);

const [reference, setReference] = useState('');

const [purchaseAmount, setPurchaseAmount] = useState('');
const [purchaseAmountError, setPurchaseAmountError] = useState(false);

const [paymentType, setPaymentType] = useState('');
const [paymentTypeError, setPaymentTypeError] = useState(false);

const [paymentStatus, setPaymentStatus] = useState('');
const [paymentStatusError, setPaymentStatusError] = useState(false);

const [note, setNote] = useState('');

const [showDropdwon, setShowDropdwon] = useState(false);

const [totalQuantity, setTotalQuantity] = useState(0);
const [subTotal, setSubTotal] = useState(0);
const [otherCharges, setOtherCharges] = useState('');
const [discount, setDiscount] = useState('');
const [discountValue, setDiscountValue] = useState(null);
const [shipping, setShipping] = useState('');
const [grandTotal, setGrandTotal] = useState(0);


const [products, setProducts] = useState([]);

const [supplierItems, setSupplierItems] = useState([])
const [showSupDropdown, setShowSupDropdown] = useState(false);
const [supplierId, setSupplierId] = useState('');

const [showPartialField, setShowPartialField] = useState(false);
const [amountPaid, setAmountPaid] = useState('')
const [amountPaidError, setAmountPaidError] = useState(false);
const [dueBalance, setDueBalance] = useState('');

const [taxItems, setTaxItems] = useState([]);

// onchange handler
const handleChange = (type, e)=>{
        if (type === 'searchTitle'){
            setSearchTitle(e.target.value);
            setTitle(e.target.value);
            setTitleError(false);
            
            e.target.value.length > 0 ? 
            setShowDropdwon(true):
            setShowDropdwon(false)

                setTitle('')
                setQuantity('');
                setPrice('')
                setTax('')
                setTaxAmount('')
                setUnitCost('')
                setAmount('')
                setProductId('')

        }else if(type === 'quantity'){
            setQuantity(e.target.value);
            calculatePurchasePrice(price, tax, e.target.value);
            setQuantityError(false);
        }else if(type === 'price'){
            setPrice(e.target.value);
            calculatePurchasePrice(e.target.value, tax, quantity);
            setPriceError(false);
        }else if(type === 'tax'){
            setTax(e.target.value);
            calculatePurchasePrice(price, e.target.value, quantity);
            setTaxError(false);
        }else if(type === 'price'){
            setTaxAmount(e.target.value);
        }else if(type === 'unit-cost'){
            setUnitCost(e.target.value);
        }else if(type === 'amount'){
            setUnitCost(e.target.value);
        }
        // calculations:
        else if(type === 'otherCharges'){
            setOtherCharges(e.target.value);
        }else if(type === 'discount'){
            setDiscount(e.target.value);
        }else if(type === 'shipping'){
            setShipping(e.target.value);
        }
        // supply info
        else if(type === 'purchase-date'){
            setPurchaseDate(e.target.value);
            setPurchaseDateError(false);
        }else if(type === 'supply-name'){

            setSupplier(e.target.value);
            setShowSupDropdown(e.target.value.trim().length > 0);
            setSupplierNameError(false);

        }else if(type === 'purchase-status'){
            setPurchaseStatus(e.target.value);
            setPurchaseStatusError(false);
        }else if(type === 'references'){
            setReference(e.target.value);
        }else if(type === 'purchase-amount'){
            setPurchaseAmount(e.target.value);
            setPurchaseAmountError(false);
        }else if(type === 'payment-status'){
            setPaymentStatus(e.target.value);
            setPaymentStatusError(false);

            if(e.target.value === 'partial'){
                setShowPartialField(true)
            }else{
                setShowPartialField(false);
            }

            if(e.target.value === 'unpaid'){
                setPaymentType(paymentTypeItems[6].value)
            }else{
                setPaymentType('');
            }

        } else if (type === 'amount-paid') {
            const val = Number(e.target.value);

            setAmountPaid(e.target.value);

            if (!isNaN(val)) {
                setDueBalance((purchaseAmount - val).toFixed(2));
            }

            // auto-clear errors if value becomes valid
            if (val > 0 && val < Number(purchaseAmount)) {
                setAmountPaidError(false);
                setShowAmountExceedBalance(false);
            }
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
}

  // Amount paid === saleAmount Handler:
const [showAmountIsEQualBalance, setShowAmountIsEQualBalance] = useState(false)

const amountPaidEqlTotalHandler = () =>{
    setPaymentStatus(paymentStatusItems[3].value)
    setShowAmountIsEQualBalance(false)
    setShowPartialField(false)
    setAmountPaidError(false)
}
  // Amount paid > saleAmount Handler:
const [showAmountExceedBalance, setShowAmountExceedBalance] = useState(false)

const amountExceedBalanceHandler = () =>{
    setAmountPaid(0.00)
    setShowAmountExceedBalance(false)
    setAmountPaidError(false)
}



// TextITe
const TaxItem = [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'none',
        value: 0
    },
    {
        title: 'Tax (5%)',
        value: 5
    },
    
    {
        title: 'Vat + Tax (7%)',
        value: 7
    },

] 



// purchase status item name
const purchaseStatusItem =  [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'completed',
        value: 'completed'
    },
    {
        title: 'pending',
        value: 'pending'
    },
]


// payment items
const paymentTypeItems =  [
        {
        title: 'Select',
        value: ''
    },
    {
        title: 'Card',
        value: 'Card'
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Check',
        value: 'Check'
    },
    {
        title: 'Online',
        value: 'Online'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
      {
        title: 'N/A',
        value: 'N/A'
    },
]

const paymentStatusItems = [
     {
        title: 'Select',
        value: ''
    },
    {
        title: 'unpaid',
        value: 'unpaid'
    },  
    {
        title: 'partial',
        value: 'partial'
    },
    {
        title: 'paid',
        value: 'paid'
    },
]



useEffect(() => {
                const handleClickOutside = (e) => {
                    if (
                        productDropdownRef.current &&
                        !productDropdownRef.current.contains(e.target)
                    ) {
                        setShowDropdwon(false);
                    }
            
                    if (
                        supplierDropdownRef.current &&
                        !supplierDropdownRef.current.contains(e.target)
                    ) {
                        setShowSupDropdown(false);
                    }
                };
            
                document.addEventListener("mousedown", handleClickOutside);
            
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            }, []);


  // Fetch expense initial
    const [prefix, setPrefix] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')

useEffect(() => {

     const getAllTax = async () => { 
                        setIsLoading(true)  
                        try {
                              const res = await axios.get(process.env.REACT_APP_URL + "/api/tax/", {
                                                                  headers: {
                                                                    Authorization: `Bearer ${token}`
                                                                  }
                                                            })
                             
                                    // Prepend the 'Select' option
                       setTaxItems([
                                { title: 'Select', value: '' }, 
                                ...res.data.map(tax => ({
                                    title: tax.name,
                                    value: tax.taxPercentage
                                }))])
                                            
                              setIsLoading(false)
            
                              console.log(res.data)
                          } catch (err) {
                              console.log(err)
                              setIsLoading(false)
                          }
                  
                      }
        getAllTax()
     const fetchCompany = async() =>{
          setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
              
                const prefixData = res.data[0].prefixes?.[0];
                setCurrencySymbol(res.data.currencySymbol)
  
                if (prefixData) {
                    setPrefix(prefixData.purchase);
                }
  
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
      
        }
        fetchCompany();
     
            // fetch products data
            const getProducts = async () => { 
                 setIsLoading(true)  
                 try {
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
                     console.log(res.data)
                     setProducts(res.data)
                     setIsLoading(false)
                     
                     console.log(res.data)
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                 getProducts();
 
            // fetch supplier data
            const getSuppliers = async () => { 
                 setIsLoading(true)  
                 try {
            
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/suppliers/", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
               
                     setSupplierItems(res.data)
                    //  setSupplierItems([
                    //     { title: 'Select', value: '' }, 
                    //     ...res.data.map(supplier => ({
                    //         title: supplier.name,
                    //         value: supplier._id,
                    //     }))
                    // ]);
                     setIsLoading(false)
                     
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                   
                 getSuppliers();

// for grand total caulacultion
    const totalQty = itemList.reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0);
    const subtotal = itemList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    const charges = parseFloat(otherCharges) || 0;
    const disc = parseFloat(discount) || 0;
    const ship = parseFloat(shipping) || 0;
    
    const discValue = (disc / 100) * subTotal
    const grand = subtotal + charges + ship - discValue;

    
    setTotalQuantity(totalQty);
    setSubTotal(subtotal.toFixed(2));
    setDiscountValue(discValue.toFixed(2))
    setGrandTotal(grand.toFixed(2));
    // Total Amount
    setPurchaseAmount(grand.toFixed(2));
    // setPurchaseAmountError(false)

}, [price, quantity, tax, itemList, otherCharges, discount, shipping]);




// calculating purchase price
  const calculatePurchasePrice = (priceInput, taxInput, quantityInput) => {
  const p = parseFloat(priceInput) || 0;
  const t = parseFloat(taxInput) || 0;
  const q = parseFloat(quantityInput) || 1;

  const taxAmountPerUnit = p * (t / 100);
  const unitPriceWithTax = p + taxAmountPerUnit;
  const totalPurchase = unitPriceWithTax * q;
  const totalTaxAmount = taxAmountPerUnit * q;

  setTaxAmount(totalTaxAmount.toFixed(2));
  setUnitCost(unitPriceWithTax.toFixed(2));
  setAmount(totalPurchase.toFixed(2)); //Purchase price

};

// search dropdownd handler
const dropdownHandler = (product) => {
    setShowDropdwon(false)
    setProductId(product._id)
    setSearchTitle('');
    setTitle(product.title)
    // setQuantity();
    setPrice(product.price)
    setTax(product.tax)
    setTaxAmount(product.taxAmount)
    setUnitCost(product.unitCost)
    setAmount(product.purchasePrice)
}


// search name dropdownd handler
const dropdownSupplierName = (supplier) => {
    setShowSupDropdown(false)
    setSupplierId(supplier._id)
    setSupplier(supplier.name)    
}



// add to array list
const addToList = (e) =>{

    e.preventDefault();

    let isValid = true;

    if(!title){
        setTitleError(true)
        isValid = false;
    }
    if(!quantity){
        setQuantityError(true)
        isValid = false;
    }
    if(!price){
        setPriceError(true)
        isValid = false;
    }
    if(isValid){
       
        const newItem = {productId, title, quantity, price, tax, taxAmount, unitCost, amount};
        setItemList((prevItems)=>[...prevItems, newItem]);

        console.log(itemList?.productId);

    setSearchTitle('');
    setTitle('')
    setQuantity('');
    setPrice('')
    setTax('')
    setTaxAmount('')
    setUnitCost('')
    setAmount('')
    setProductId('')
    }

}


      // delete item from list
      const deleteItem = (index) => {
        const updatedList =  itemList.filter((_, i) => i !== index);
        setItemList(updatedList)
      }


// increment or decreement product quantity  in the list
 const updateQuantity = (index, delta) => {
  setItemList((prevList) => {
    return prevList.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, parseInt(item.quantity) + delta); // ensures qty doesn't go below 1
        const price = parseFloat(item.price) || 0;
        const taxRate = parseFloat(item.tax) || 0;

        const taxAmountPerUnit = price * (taxRate / 100);
        const unitCost = price + taxAmountPerUnit;
        const totalTaxAmount = taxAmountPerUnit * newQty;
        const totalAmount = unitCost * newQty;

        return {
          ...item,
          quantity: newQty,
          taxAmount: totalTaxAmount.toFixed(2),
          unitCost: unitCost.toFixed(2),
          amount: totalAmount.toFixed(2),
        };
      }
      return item;
    });
  });
};



//submit handler
const hanldeSumbit = async (e) =>{

    e.preventDefault();

    let isValid = true;

    if(!purchaseDate){
        setPurchaseDateError(true)
        isValid = false;
    }
    if(!supplier){
        setSupplierNameError(true)
        isValid = false;
    }
    if(!purchaseStatus){
        setPurchaseStatusError(true)
        isValid = false;
    }
        if(!purchaseAmount){
        setPurchaseAmountError(true)
        isValid = false;
    }
    if(!paymentType){
        setPaymentTypeError(true)
        isValid = false;
    }
    if(!paymentStatus){
        setPaymentStatusError(true)
        isValid = false;
    }

// if (paymentStatus === 'partial') {
//   if (!amountPaid || parseFloat(amountPaid) <= 0) {
//     setAmountPaidError(true);
//     isValid = false;
//   }

//     if(amountPaid === purchaseAmount){
//         setShowAmountIsEQualBalance(true);
//         setAmountPaidError(true);
//         setIsBtnLoading(false)
//         isValid = false;
//     ;
//     }
//  if(amountPaid > purchaseAmount){
//     setShowAmountExceedBalance(true);
//     setIsBtnLoading(false)
//     setAmountPaidError(true);
//     isValid = false;
//    }

// }

 if (paymentStatus === 'partial') {
  if (!amountPaid || parseFloat(amountPaid) <= 0) {
    setAmountPaidError(true);
    isValid = false;
  }

  const paid = Number(amountPaid)
  const total = Number(purchaseAmount)

  if(paid === total){
        setShowAmountIsEQualBalance(true);
        setAmountPaidError(true);
        setIsBtnLoading(false)
        isValid = false;
    ;
    }
 if(paid > total){
    setShowAmountExceedBalance(true);
    setAmountPaidError(true);
    setIsBtnLoading(false)
    isValid = false;
   }
}
    
    if(isValid){
      
      const newPurchase = {
      purchaseDate: new Date(purchaseDate),
    //   supplier: supplier._id || supplier,
      supplier: supplierId,
      purchaseStatus,
      reference,
      purchaseAmount: Number(purchaseAmount),
      paymentStatus,
      paymentType,
      amountPaid: Number(amountPaid),
      dueBalance,
      note,
      subTotal: Number(subTotal),
      otherCharges: Number(otherCharges),
      discount: Number(discount),
      discountValue: Number(discountValue),
      shipping: Number(shipping),
      purchaseItems:
        itemList.length > 0
            ? itemList.map((item) => ({
                productId: item.productId,
                title: item.title,
                quantity: Number(item.quantity),
                price: Number(item.price),
                tax: Number(item.tax),
                taxAmount: Number(item.taxAmount),
                unitCost: Number(item.unitCost),
                amount: Number(item.amount),
            }))
            : [],
      prefix: prefix,
      userId: user._id
    };
      setIsBtnLoading(true);
      console.log('======new purchase data==========\n', newPurchase)
             try {
          
              const res = await axios.post(`${process.env.REACT_APP_URL}/api/purchase/create`, newPurchase, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              
              navigate(`/purchase-invoice/${res.data.newPurchase._id}`);
                // toast success message
                 toast.success('Purchase added Successfully')
                   setIsBtnLoading(false);
                } catch (err) {
                console.error(err);
                setIsBtnLoading(false);
            }
    }
}

  return (
    <AddPurchaseWrapper>
                {/* Page title */}
                <PageTitle title={'Purchase'} subTitle={'/ Add'}/>
        <AddPurchaseContent>
        <ItemsWrapper>
            {/* SelectItem */}
            <SelectItemContent>
                    <form>
                    <ItemContainer title={'Select Items'}> 
                        <AnyItemContainer flxDirection="column">
                             <Input 
                                value={searchTitle} 
                                title={'Search name'}
                                onChange={(e)=>handleChange('searchTitle', e)} 
                                error={searchTitleError} 
                                type={'text'} 
                                label={'Barcode/Item Code/name'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                           { showDropdwon && 
                          
                            <DropdownWrapper topPosition={'70px'} ref={productDropdownRef}>
                                {(() => {
                                  const search = searchTitle.toLowerCase();
                                  const filtered = products?.filter((product) => {
                                    return (
                                      product.title.toLowerCase().includes(search) ||
                                      product.barcode?.toLowerCase().includes(search)
                                    );
                                  });
                            
                                  // If nothing matches → show "product doesn't exist"
                                  if (!filtered || filtered.length === 0) {
                                    return (
                                      <DropdownItems>
                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', padding: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                                          <span>Product doesn’t exist </span>
                                                          <a href="/add-product">Please click here to register it </a>
                                                        </div>
                                      </DropdownItems>
                                    );
                                  }
                            
                                  // Otherwise → show matching items
                                  return filtered.map((data, i) => (
                                    <DropdownItems key={i} onClick={() => dropdownHandler(data)}>
                                      {data.title}
                                    </DropdownItems>
                                  ));
                                })()}
                              </DropdownWrapper>
                        
                        }
                        </AnyItemContainer>
                        <AnyItemContainer>
                            <Input 
                                value={title} 
                                title={'Item Name'}
                                onChange={(e)=>handleChange('title', e)} 
                                error={titleError} 
                                type={'text'} 
                                label={'Name'} 
                                requiredSymbol={'*'}
                            /> 
                             <Input 
                                value={quantity} 
                                title={'Quantity'}
                                onChange={(e)=>handleChange('quantity', e)} 
                                error={quantityError} 
                                type={'text'} 
                                label={'Quantity'} 
                                requiredSymbol={'*'}
                            />                  
                            
                            <Input 
                                value={price} 
                                title={'Price'}
                                onChange={()=>{}} 
                                error={priceError} 
                                type={'text'} 
                                label={'Price'} 
                                requiredSymbol={'*'}
                                readOnly
                                inputBg='#c4c4c449'
                            />                  
                            
                            <SelectInput 
                                options={taxItems} 
                                label={'Tax(%)'}
                                value={tax}
                                error={taxError}
                                requiredSymbol={'*'}
                                title={'Tax'}
                                readOnly 
                                onChange={(e)=>handleChange('tax', e)}
                            />
</AnyItemContainer>
<AnyItemContainer>
                            <Input 
                                value={taxAmount} 
                                title={'Tax Amount'}
                                onChange={()=>{}} 
                                error={taxAmountError} 
                                type={'number'} 
                                label={'Tax Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                            <Input 
                                value={unitCost} 
                                title={'Unit Cost'}
                                onChange={()=>{}} 
                                type={'number'} 
                                label={'Unit Cost'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                            <Input 
                                value={amount} 
                                title={'Amount'}
                                onChange={()=>{}} 
                                type={'number'} 
                                label={'Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                        </AnyItemContainer>    
                            
                    
                        <ItemButtonWrapper btnAlign={'flex-end'}>
                            <Button
                                title={'Select Items'}
                                btnText={'Add to list'}
                                btnFontSize={'12px'}
                                btnColor={'orange'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={addToList}                               
                            />
                        </ItemButtonWrapper>
                    </ItemContainer>              
                        </form>
                </SelectItemContent>
  
                   
            {/* ItemList */}
            <ItemListContent>
                <ItemContainer title={'Item List'}>
                <TableResponsiveWrapper>
               {itemList.length > 0 ?
                <TableStyled>
                    <thead>
                        <TdStyled><b>#</b></TdStyled>
                        <TdStyled><b>Item Name</b></TdStyled>
                        <TdStyled><b>Price</b></TdStyled>
                        <TdStyled><b>Qty</b></TdStyled>
                        <TdStyled><b>Tax(%)</b></TdStyled>
                        <TdStyled><b>Tax Amount</b></TdStyled>
                        <TdStyled><b>Unit Cost</b></TdStyled>
                        <TdStyled><b>Amount</b></TdStyled>
                        <TdStyled><b>Action</b></TdStyled>
                    </thead>
                    <tbody>
                    {/* // {productItemList.length > 0 ? productItemList.map((data, i)=>( */}
               {       itemList.map((data, i)=>( 
                    
                        <tr key={i}>
                            <TdStyled>{i+1}</TdStyled>
                            <TdStyled>{data.title}</TdStyled>
                            <TdStyled>{data.price}</TdStyled>
                            {/* <TdStyled>{data.qty}</TdStyled> */}
                             <TdStyled>
                                <button
                                style={{borderRadius: "100%", marginRight: '5px', border: "none", cursor: 'pointer' }}
                                onClick={() => updateQuantity(i, -1)}
                                disabled={parseInt(data.quantity) <= 1}
                                >-</button>
                                {data.quantity}
                                <button
                                 style={{borderRadius: "100%", marginLeft: '5px', border: "none",  cursor: 'pointer'}}
                                onClick={() => updateQuantity(i, 1)}>+</button>
                            </TdStyled>
                            <TdStyled>{data.tax}</TdStyled>
                            <TdStyled>{data.taxAmount}</TdStyled>
                            <TdStyled>{data.unitCost}</TdStyled>
                            <TdStyled>{data.amount}</TdStyled>
                            {/* <TdStyled>{data.qty + data.price }</TdStyled> */}
                            <TdStyled><span onClick={()=>deleteItem(i)}><FaTrash/></span></TdStyled>
                        </tr>
                    ))}
               
                    </tbody>
                </TableStyled>
                     :(<div style={{
                                    alignItems: "center", 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '20px'
                                }}>
                                   <h3>Purchase Item</h3> 
                                   <p>Not Item on the List</p>
                                </div>)
                }
                </TableResponsiveWrapper>

                <HrStyled />
                
                {/* Total ChargesSection */}
                <TotalChargesWrapper>            
                   {/* Total quantities */}
                    <AnyItemContainer justifyContent={'space-between'}>
                        <InnerWrapper>
                            <span><b>Total Quantities</b></span>
                            <span>{totalQuantity}</span>
                        </InnerWrapper>
                        <InnerWrapper>
                            <span><b>Sub Total</b></span>
                            <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{Number(subTotal).toLocaleString()}</span>
                        </InnerWrapper>
                    </AnyItemContainer>
                   
                   {/* Other Charges */}
                    <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span>
                                    <Input 
                                        value={otherCharges} 
                                        placeholder={'Other Charges'}
                                        onChange={(e)=>handleChange('otherCharges', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{otherCharges? otherCharges: 0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                          {/* Discount */}
                          <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Discount</b></span>
                                <span>
                                    <Input 
                                        value={discount} 
                                        placeholder={'Discount'}
                                        onChange={(e)=>handleChange('discount', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Discount {discount && '('+ discount + '%)'}</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{discountValue? Number(discountValue).toLocaleString():0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                     {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Shipping</b></span>
                                <span>
                                     <Input 
                                        value={shipping} 
                                        placeholder={'Shipping'}
                                        onChange={(e)=>handleChange('shipping', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b>Shipping</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{shipping? shipping: 0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                                         {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                               
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Grand Total</b></span>
                                <span><b><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{grandTotal? grandTotal : 0}</b></span>
                            </InnerWrapper>
                    </AnyItemContainer>
                </TotalChargesWrapper>
                </ItemContainer>       
            </ItemListContent>
        </ItemsWrapper>

    {/* Supply info */}
        <SupplierInfoWrapper>
            <form action="" onSubmit={(e)=>hanldeSumbit(e)}>
                <ItemContainer title={'Supply Info'}>
 
                    <Input 
                                value={supplier} 
                                title={'Supplier Name'}
                                onChange={(e)=>handleChange('supply-name', e)} 
                                error={supplierNameError} 
                                type={'text'} 
                                label={'Supplier Name'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                 

                        {showSupDropdown && (
                                    <DropdownWrapper ref={supplierDropdownRef} topPosition={'90px'} width={"96%"}>
                                        {supplierItems.filter(c =>
                                        supplier.length > 0 &&
                                        c.name.toLowerCase().includes(supplier.toLowerCase())
                                        ).length > 0 ? (
                                        supplierItems
                                            .filter(c => 
                                            supplier.length > 0 &&
                                            c.name.toLowerCase().includes(supplier.toLowerCase())
                                            )
                                            .map((data, i) => (
                                            <DropdownItems key={i} onClick={() => dropdownSupplierName(data)}>
                                                {data.name}
                                            </DropdownItems>
                                            ))
                                        ) : (
                                        <DropdownItems>
                                            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                <span>No such supplier </span>
                                                <a href="/add-supplier">Please click here to add </a>
                                            </div>
                                        
                                        </DropdownItems>
                                        )}
                                    </DropdownWrapper>
                            )}

                   <Input 
                                value={purchaseDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('purchase-date', e)} 
                                type={'date'} 
                                label={'Date'} 
                                error={purchaseDateError}
                                requiredSymbol={'*'}
                            /> 

                    {/* <SelectInput 
                                options={supplierItems} 
                                label={'Supply Name'}
                                value={supplier}
                                error={supplierNameError}
                                requiredSymbol={'*'}
                                title={'Supply Name'}
                                onChange={(e)=>handleChange('supply-name', e)}
                            /> */}

                    <SelectInput 
                                options={purchaseStatusItem} 
                                label={'Purchase Status'}
                                value={purchaseStatus}
                                error={purchaseStatusError}
                                requiredSymbol={'*'}
                                title={'Purchase Status'}
                                onChange={(e)=>handleChange('purchase-status', e)}
                            />

                    <Input 
                                value={reference} 
                                title={'References'}
                                onChange={(e)=>handleChange('references', e)} 
                                type={'text'} 
                                label={'References'} 
                                // error={purchaseDateError}
                            /> 

                </ItemContainer>
                <ItemContainer title={'Payment Info'}>
                    <Input 
                                value={purchaseAmount} 
                                title={'Purchase Amount'}
                                onChange={(e)=>handleChange('purchase-amount', e)} 
                                type={'text'} 
                                label={'Purchase Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                                error={purchaseAmountError}
                            /> 
                    
                      
                    <SelectInput 
                                options={paymentStatusItems} 
                                label={'Payment Status'}
                                value={paymentStatus}
                                error={paymentStatusError}
                                requiredSymbol={'*'}
                                title={'Payment Status'}
                                onChange={(e)=>handleChange('payment-status', e)}
                            />

<div style={{display: "flex", gap: "10px"}}>
                     {showPartialField &&
                    <Input 
                                value={amountPaid} 
                                title={'Amount Paid'}
                                onChange={(e)=>handleChange('amount-paid', e)} 
                                type={'text'} 
                                label={'Amount Paid'} 
                                requiredSymbol={'*'}
                                placeholder={'0.00'}
                                error={amountPaidError}
                     /> }

                {showPartialField &&
                                        <Input 
                                            value={dueBalance} 
                                            title={'Due Balance'}
                                            onChange={(e)=>handleChange('due-amount', e)} 
                                            type={'text'} 
                                            label={'Due Balance'} 
                                            readOnly 
                                            inputBg='#c4c4c449'
                                        /> 
                                        }
                            </div>
                    <SelectInput 
                                options={paymentTypeItems} 
                                label={'Payment Type'}
                                value={paymentType}
                                error={paymentTypeError}
                                requiredSymbol={'*'}
                                title={'Payment Type'}
                                onChange={(e)=>handleChange('payment-type', e)}
                            />
                  
                    <TextArea 
                                label={'Note'} 
                                title={'Note'} 
                                onChange={(e) => handleChange('note', e)} 
                                value={note} 
                            />

                    {/* Add to Purchase button */}
                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                <Button
                                    btnText={isBtnLoading ? <ButtonLoader text={'Adding...'} /> : 'Add Purchase'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                </ItemContainer>
            </form>
        </SupplierInfoWrapper>
        </AddPurchaseContent>
        {/* Toast messages */}
        <ToastComponents/>

        {showAmountIsEQualBalance && (
                <Overlay contentWidth="30%" 
                    overlayButtonClick={amountPaidEqlTotalHandler} 
                    closeOverlayOnClick={()=>setShowAmountIsEQualBalance(false)} 
                    btnText1={'Ok'} btnText2={'Cancel'}>
                  <p style={{ margin: '40px', textAlign: 'center', fontSize: '14px', lineHeight: '25px' }}>
                    <b style={{ textTransform: 'capitalize', fontSize: '20px' }}>Amount Paid</b>
                    <br />is equal to total sale amount, please change the payment status to <strong>paid</strong>
                  </p>
                </Overlay>
              )}
        
          {showAmountExceedBalance && (
                <Overlay contentWidth="30%" 
                    overlayButtonClick={amountExceedBalanceHandler} 
                    closeOverlayOnClick={()=>setShowAmountExceedBalance(false)} 
                    btnText1={'Ok'} btnText2={'Cancel'}>
                  <p style={{ margin: '40px', textAlign: 'center', fontSize: '14px', lineHeight: '25px' }}>
                    <b style={{ textTransform: 'capitalize', fontSize: '20px' }}>Amount Paid</b>
                    <br />cannot be greater than the sale amount,  please enter a valid paid amount.
                  </p>
                </Overlay>
              )}
    </AddPurchaseWrapper>
  )
}
