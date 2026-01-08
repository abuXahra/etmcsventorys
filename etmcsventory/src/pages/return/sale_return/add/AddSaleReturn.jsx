import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../../components/context/UserContext'
import { toast } from 'react-toastify'
import {FaTrash} from 'react-icons/fa'
import { AddSaleReturnContent, AddSaleReturnWrapper, AnyItemContainer, CustomerInfoWrapper, HrStyled, InnerWrapper, ItemListContent, ItemsWrapper, SelectItemContent, TableStyled, TdStyled, TotalChargesWrapper } from './addSaleReturn.style'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import { DropdownItems, DropdownWrapper, TableResponsiveWrapper } from '../../../purchase/add/addPurchase.style'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import PageTitle from '../../../../components/page_title/PageTitle'
import TextArea from '../../../../components/input/textArea/TextArea'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../../components/toast_message/toast_component/ToastComponents'

export default function AddSaleReturn() {
const token = localStorage.getItem('token');
    
// const [productItemList, setProductItemList] = useState(ProductItemList);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {user} = useContext(UserContext);

const [itemList, setItemList] = useState([]);
const [itemSaleReturnList, setItemSaleReturnList] = useState([]);
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

{/* Customer info */}
const [saleDate, setSaleDate] = useState('');
const [saleDateError, setSaleDateError] = useState(false);

const [returnDate, setReturnDate] = useState(todayDate);
const [returnDateError, setReturnDateError] = useState(false);

const [customer, setCustomer] = useState('');
const [customerNameError, setCustomerNameError] = useState(false);

const [returnAmount, setReturnAmount] = useState('');
const [returnAmountError, setReturnAmountError] = useState(false);

const [saleAmount, setSaleAmount] = useState(); //
const [saleAmountError, setSaleAmountError] = useState();


const [reason, setReason] = useState('');
const [reasonError, setReasonError] = useState();

const [saleStatus, setSaleStatus] = useState(''); //
const [saleStatusError, setSaleStatusError] = useState(false);

const [reference, setReference] = useState(''); //

const [paymentType, setPaymentType] = useState('');

const [paymentTypeError, setPaymentTypeError] = useState(false);

const [paymentStatus, setPaymentStatus] = useState('');
const [paymentStatusError, setPaymentStatusError] = useState(false);

const [note, setNote] = useState(''); //

const [showDropdwon, setShowDropdwon] = useState(false);

const [totalQuantity, setTotalQuantity] = useState(0);
const [subTotal, setSubTotal] = useState(0);
const [otherCharges, setOtherCharges] = useState('');
const [discount, setDiscount] = useState('');
const [discountValue, setDiscountValue] = useState(null);
const [shipping, setShipping] = useState('');
const [grandTotal, setGrandTotal] = useState(0);


const [products, setProducts] = useState([]);

const [customerItems, setCustomerItems] = useState([])
const [showCusDropdown, setShowCusDropdown] = useState(false);
const [customerId, setCustomerId] = useState('');


const [showPartialField, setShowPartialField] = useState(false);
const [amountPaid, setAmountPaid] = useState('')
const [amountPaidError, setAmountPaidError] = useState(false);
const [dueBalance, setDueBalance] = useState('');

const [invoiceNo, setInvoiceNo] = useState('');
const [invoiceNoSearch, setInvoiceNoSearch] = useState('');
const [invoiceNoError, setInvoiceNoError] = useState(false);

const [allSales, setAllSales] = useState([]); // all sales
const [sale, setSale] = useState('');
const [showReturnComponents, setShowReturnComponents] = useState(false);

// Refund 
const [refundTotal, setRefundTotal] = useState('')
const [refundQuantity, setRefundQuantity] = useState('')

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
            calculateSalePrice(price, tax, e.target.value);
            setQuantityError(false);
        }else if(type === 'price'){
            setPrice(e.target.value);
            calculateSalePrice(e.target.value, tax, quantity);
            setPriceError(false);
        }else if(type === 'tax'){
            setTax(e.target.value);
            calculateSalePrice(price, e.target.value, quantity);
            setTaxError(false);
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
        else if(type === 'sale-date'){
            setSaleDate(e.target.value);
            setSaleDateError(false);
        }else if(type === 'return-date'){
            setReturnDate(e.target.value);
            setReturnDateError(false);
        }else if(type === 'customer-name'){

            setCustomer(e.target.value);
            setShowCusDropdown(e.target.value.trim().length > 0);
            setCustomerNameError(false);

        }else if(type === 'invoiceNo'){
            setInvoiceNo(e.target.value);
            setInvoiceNoSearch(e.target.value);
            setInvoiceNoError(false);
        }else if(type === 'references'){
            setReference(e.target.value);
        }else if(type === 'sale-status'){
            setSaleStatus(e.target.value);
            setSaleStatusError(false);
        }else if(type === 'sale-amount'){
            setReturnAmount(e.target.value);
            setReturnAmountError(false);
        }else if(type === 'return-amount'){
            setSaleAmount(e.target.value);
            setSaleAmount(false);
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
        }else if(type === 'amount-paid'){
            setAmountPaid(e.target.value);
            setDueBalance((returnAmount - Number(e.target.value)).toFixed(2))
            setAmountPaidError(false);
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }else if(type === 'reason'){
            setReason(e.target.value);
            setReasonError(false)
        }
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



// refund status item name
const saleStatusItem =  [
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


  // Fetch sale initial
    const [prefix, setPrefix] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false)

useEffect(() => {

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
                    setPrefix(prefixData.saleReturn);
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
 
            // fetch customer data
            const getCustomers = async () => { 
                 setIsLoading(true)  
                 try {
            
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/customers/", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
               
                     setCustomerItems(res.data)
                     setIsLoading(false)
                     
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                   
                 getCustomers();

                      
            // fetch products data ==================================================================
        const getSales = async () => { 
                 setIsLoading(true)  
                 try {
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/sale", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
                     setAllSales(res.data)
                     setIsLoading(false)
                     
                     console.log(res.data)
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
         getSales();

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
    setSaleAmount(grand.toFixed(2));
 

}, [price, quantity, tax, itemList, otherCharges, discount, shipping]);



 // handle invoice check
  const handleCheckInvoice = () => {
    let isValid = true;

    if(!invoiceNoSearch){
        setInvoiceNoError(true)
        isValid = false;
    }

    if(isValid){
        setIsLoadingInvoice(true)
        const match = allSales.find((s) => s.code === invoiceNo.toUpperCase()); 
        // assuming sale code is stored as s.code (adjust if different)
        if (match) {
            setSale(match);
 
             const formattedSaleDate = new Date(match.saleDate).toISOString().split('T')[0];
                     setSaleDate(formattedSaleDate);
                     setCustomer(match.customer.name) 
                     setSaleStatus(match.saleStatus)
                     setReference(match.reference)
                     setSaleAmount(match.saleAmount)
                     setPaymentStatus(match.paymentStatus)
                     setShowPartialField(match.paymentStatus === 'partial');
                     setPaymentType(match.paymentType)
                     setAmountPaid(match.amountPaid)
                     setDueBalance(match.dueBalance)
                     setNote(match.note);
                     setSubTotal(match.subTotal);
                     setOtherCharges(match.otherCharges)
                     setDiscount(match.discount)
                     setDiscountValue(match.discountValue)
                     setShipping(match.shipping)

                    const itemsWithOriginal = match.saleItems.map((item) => ({
                        ...item,
                        originalQty: item.quantity,
                        }));
                        setItemList(itemsWithOriginal);
                    

                    setCustomerId(match.customer._id)
                    setShowReturnComponents(true)
                    console.log("Matched sale:", match);
                    setIsLoadingInvoice(false)
        } else {
            setSale(null);
            setInvoiceNoSearch('')
            setInvoiceNo('')
             setIsLoadingInvoice(false)
        }
        }
  }



// calculating sale price
  const calculateSalePrice = (priceInput, taxInput, quantityInput) => {
  const p = parseFloat(priceInput) || 0;
  const t = parseFloat(taxInput) || 0;
  const q = parseFloat(quantityInput) || 1;

  const taxAmountPerUnit = p * (t / 100);
  const unitPriceWithTax = p + taxAmountPerUnit;
  const totalSale = unitPriceWithTax * q;
  const totalTaxAmount = taxAmountPerUnit * q;

  setTaxAmount(totalTaxAmount.toFixed(2));
  setUnitCost(unitPriceWithTax.toFixed(2));
  setAmount(totalSale.toFixed(2)); //sale price
};

// search dropdown handler
// const dropdownHandler = (product) => {
//     setShowDropdwon(false)
//     setProductId(product._id)
//     setSearchTitle('');
//     setTitle(product.title)
//     setQuantity();
//     setPrice(product.salePrice)
//     setTax(product.tax)
//     setTaxAmount()
//     setUnitCost()
//     setAmount()
// }




// search name dropdownd handler
const dropdownCustomerName = (customer) => {
    setShowCusDropdown(false)
    setCustomerId(customer._id)
    setCustomer(customer.name)    
}

    //   delete refund items
const deleteRefundItem = (index) => {
  setItemSaleReturnList((prevReturns) => {
    const deletedItem = prevReturns[index]; // item being deleted
  
    const updatedReturns = prevReturns.filter((_, i) => i !== index);

    // restore quantity back to itemList
    setItemList((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === deletedItem.productId) {
          const restoredQty = parseInt(item.quantity) + parseInt(deletedItem.quantity);

          const price = parseFloat(item.price) || 0;
          const taxRate = parseFloat(item.tax) || 0;

          const taxAmountPerUnit = price * (taxRate / 100);
          const unitCost = price + taxAmountPerUnit;
          const totalTaxAmount = taxAmountPerUnit * restoredQty;
          const totalAmount = unitCost * restoredQty;

          return {
            ...item,
            quantity: restoredQty,
            taxAmount: totalTaxAmount.toFixed(2),
            unitCost: unitCost.toFixed(2),
            amount: totalAmount.toFixed(2),
          };
        }
        return item;
      })
    );

        // recalc totals
    const totalQty = updatedReturns.reduce(
      (sum, r) => sum + parseFloat(r.quantity || 0),
      0
    );
    const total = updatedReturns.reduce(
      (sum, r) => sum + parseFloat(r.amount || 0),
      0
    );

    setRefundQuantity(totalQty);
    setRefundTotal(total.toFixed(2));
    setReturnAmount(total.toFixed(2))

    return updatedReturns;
  });
};



// increment or decrement product quantity in the list
  const updateQuantity = (index, delta) => {
            
     setItemList((prevList) => {
      return prevList.map((item, i) => {
        if (i === index) {
          const oldQty = parseInt(item.quantity);
          const newQty = Math.max(1, oldQty + delta); // ensures qty doesn't go below 1
          const diff = newQty - oldQty; // positive if increment, negative if decrement

          const price = parseFloat(item.price) || 0;
          const taxRate = parseFloat(item.tax) || 0;

          const taxAmountPerUnit = price * (taxRate / 100);
          const unitCost = price + taxAmountPerUnit;
          const totalTaxAmount = taxAmountPerUnit * newQty;
          const totalAmount = unitCost * newQty;

          // Handle return list update
          setItemSaleReturnList((prevReturns) => {
            const existing = prevReturns.find((r) => r.productId === item.productId);
            let updatedReturns = [...prevReturns];

            if (diff < 0) {
              // Decrement → add to return list
              const reducedQty = Math.abs(diff);
              if (existing) {
                updatedReturns = updatedReturns.map((r) =>
                  r.productId === item.productId
                    ? {
                        ...r,
                        quantity: r.quantity + reducedQty,
                        amount: (unitCost * (r.quantity + reducedQty)).toFixed(2),
                        unitCost: unitCost.toFixed(2),
                        taxAmount: (taxAmountPerUnit * (r.quantity + reducedQty)).toFixed(2),
                      }
                    : r
                );
              } else {
                updatedReturns.push({
                  ...item,
                  quantity: reducedQty,
                  amount: (unitCost * reducedQty).toFixed(2),
                  unitCost: unitCost.toFixed(2),
                  taxAmount: (taxAmountPerUnit * reducedQty).toFixed(2),
                });
              }
            } else if (diff > 0 && existing) {
              // Increment → remove from return list
              const newReturnQty = existing.quantity - diff;
              if (newReturnQty > 0) {
                updatedReturns = updatedReturns.map((r) =>
                  r.productId === item.productId
                    ? {
                        ...r,
                        quantity: newReturnQty,
                        amount: (unitCost * newReturnQty).toFixed(2),
                        unitCost: unitCost.toFixed(2),
                        taxAmount: (taxAmountPerUnit * newReturnQty).toFixed(2),
                      }
                    : r
                );
              } else {
                updatedReturns = updatedReturns.filter((r) => r.productId !== item.productId);
              }
            }
            
            // ✅ update totals AFTER updating the return list
            const totalQty = updatedReturns.reduce(
              (sum, r) => sum + parseFloat(r.quantity || 0),
              0
            );
            const total = updatedReturns.reduce(
              (sum, r) => sum + parseFloat(r.amount || 0),
              0
            );
            setRefundQuantity(totalQty);
            setRefundTotal(total.toFixed(2));
            setReturnAmount(total.toFixed(2))

            return updatedReturns;
          });

          // Update the itemList entry
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


// submit handler
const handleSubmit = async (e) => {
  e.preventDefault();

  let isValid = true;

  if (!saleDate) {
    setSaleDateError(true);
    isValid = false;
  }
  if (!customer) {
    setCustomerNameError(true);
    isValid = false;
  }
  if (!invoiceNo) {
    setInvoiceNoError(true);
    isValid = false;
  }
  if (!saleStatus) {
    setSaleStatusError(true);
    isValid = false;
  }
  if (!saleAmount) {
    setSaleAmountError(true);
    isValid = false;
  }
  if (!returnDate) {
    setReturnDateError(true);
    isValid = false;
  }
  if (!returnAmount) {
    setReturnAmountError(true);
    isValid = false;
  }
  if (!reason) {
    setReasonError(true);
    isValid = false;
  }
  if (!paymentType) {
    setPaymentTypeError(true);
    isValid = false;
  }
  if (!paymentStatus) {
    setPaymentStatusError(true);
    isValid = false;
  }

  if (paymentStatus === "partial") {
    if (!amountPaid || parseFloat(amountPaid) <= 0) {
      setAmountPaidError(true);
      isValid = false;
    }
  }

  if (isValid) {
    // 1️⃣ Sale return payload
    const newSaleReturn = {
      returnDate: new Date(returnDate).toISOString(),
      saleId: sale?._id,
      customer: customerId || customer,
      returnAmount: Number(returnAmount),
      invoiceNo,
      reason,
      paymentStatus,
      paymentType,
      amountPaid: Number(amountPaid),
      dueBalance,
      subTotal: Number(subTotal),
      otherCharges: Number(otherCharges),
      discount: Number(discount),
      discountValue: Number(discountValue),
      shipping: Number(shipping),
      returnItems:
        itemSaleReturnList.length > 0
          ? itemSaleReturnList.map((item) => ({
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
      userId: user?._id,
    };

    setIsBtnLoading(true);
    try {
      // Call both APIs
      await axios.post(`${process.env.REACT_APP_URL}/api/saleReturn/create`, newSaleReturn, {
                                          headers: {
                                            Authorization: `Bearer ${token}`
                                          }
                                    })
   
      toast.success("Sale return processed & sale updated successfully!");
      setIsBtnLoading(false);
      navigate(`/sale-return`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while processing return!");
      setIsBtnLoading(false);
    }
  }
};

  return (
    <AddSaleReturnWrapper>
                {/* Page title */}
                <PageTitle title={'Sales Return'} subTitle={'/ Add'}/>
        <AddSaleReturnContent>
        <ItemsWrapper>

        {/* Search Invoice */}
        <SelectItemContent>
         <ItemContainer title={'Search'}> 
                        <AnyItemContainer flxDirection="column">
                             <Input 
                                value={invoiceNoSearch} 
                                title={'Search Invoice'}
                                onChange={(e)=>handleChange('invoiceNo', e)} 
                                error={invoiceNoError} 
                                type={'text'} 
                                label={'Search Invoice'} 
                                placeholder={'Enter Invoice No...'}
                                requiredSymbol={'*'}
                            />  
                          
                        </AnyItemContainer>    
                            
                        <ItemButtonWrapper btnAlign={'flex-start'}>
                            <Button
                                btnText={isLoadingInvoice ? <ButtonLoader text={'Searching...'} /> : 'Search Invoice'}
                                btnFontSize={'12px'}
                                btnColor={'orange'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={handleCheckInvoice}                               
                            />
                        </ItemButtonWrapper>
                    </ItemContainer>  
                </SelectItemContent>

            {/*removed SelectItem component*/}
                   
            {/* ItemList */}
          {showReturnComponents &&
            <ItemListContent>
                <ItemContainer title={'Item List'}>
                <TableResponsiveWrapper>
               {itemList.length > 0 ?
               <>
               <h3 style={{textAlign: "center"}}>Sale Items</h3> 
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
                        {/* <TdStyled><b>Action</b></TdStyled> */}
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
                                onClick={() => updateQuantity(i, 1)}
                                disabled={parseInt(data.quantity) >= parseInt(data.originalQty) }
                                >+</button>
                            </TdStyled>
                            <TdStyled>{data.tax}</TdStyled>
                            <TdStyled>{data.taxAmount}</TdStyled>
                            <TdStyled>{data.unitCost}</TdStyled>
                            <TdStyled>{data.amount}</TdStyled>
                            {/* <TdStyled>{data.qty + data.price }</TdStyled> */}
                            {/* <TdStyled><span onClick={()=>deleteItem(i)}><FaTrash/></span></TdStyled> */}
                        </tr>
                    ))}
               
                    </tbody>
                </TableStyled>
                </>
                     :(<div style={{
                                    alignItems: "center", 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '20px'
                                }}>
                                   <h3>Sale Return Items</h3> 
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

                <HrStyled/>
                 {/* =========================================RETURN ITEMS ===========================================*/}
                <TableResponsiveWrapper>
               {itemSaleReturnList.length > 0 ?
                <>
                <h3 style={{textAlign: "center", marginTop: "30px"}}>Return Items</h3> 
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
               {       itemSaleReturnList.map((data, i)=>( 
                    
                        <tr key={i}>
                            <TdStyled>{i+1}</TdStyled>
                            <TdStyled>{data.title}</TdStyled>
                            <TdStyled>{data.price}</TdStyled>
                            {/* <TdStyled>{data.qty}</TdStyled> */}
                             <TdStyled>
                                {/* <button
                                style={{borderRadius: "100%", marginRight: '5px', border: "none", cursor: 'pointer' }}
                                onClick={() => updateQuantity(i, -1)}
                                disabled={parseInt(data.quantity) <= 1}
                                >-</button> */}
                                {data.quantity}
                                {/* <button
                                 style={{borderRadius: "100%", marginLeft: '5px', border: "none",  cursor: 'pointer'}}
                                onClick={() => updateQuantity(i, 1)}>+</button> */}
                            </TdStyled>
                            <TdStyled>{data.tax}</TdStyled>
                            <TdStyled>{data.taxAmount}</TdStyled>
                            <TdStyled>{data.unitCost}</TdStyled>
                            <TdStyled>{data.amount}</TdStyled>
                            {/* <TdStyled>{data.qty + data.price }</TdStyled> */}
                            <TdStyled><span onClick={()=>deleteRefundItem(i)}><FaTrash/></span></TdStyled>
                        </tr>
                    ))}
               
                    </tbody>
                </TableStyled>
                </>
                     :(<div style={{
                                    alignItems: "center", 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    marginTop: "20px",
                                    gap: "10px",
                                    marginBottom: "20px"
                                }}>
                                   <h3>Return Items</h3> 
                                   <p>Not Item on the List</p>
                                </div>)
                }
                </TableResponsiveWrapper>

{/* ====================================================RETURN ITEMS END ========================================== */}
             {  itemSaleReturnList.length > 0 &&  <HrStyled/>}
                  {/* Total ChargesSection */}
{       itemSaleReturnList.length > 0 &&
         <TotalChargesWrapper>            
                   {/* Total quantities */}
                    <AnyItemContainer justifyContent={'space-between'}>
                        <InnerWrapper>
                            {/* <span><b>Sub Total</b></span>
                            <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{Number(subTotal).toLocaleString()}</span> */}
                        </InnerWrapper>
                          <InnerWrapper>
                            <span><b>Total Quantities</b></span>
                            <span>{refundQuantity}</span>
                        </InnerWrapper>
                    </AnyItemContainer>
                   

                    {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
        
                            <InnerWrapper>
                                <span><b>Total Refund</b></span>
                                <span><b><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{refundTotal? refundTotal : 0}</b></span>
                            </InnerWrapper>                    
                            <InnerWrapper>
                               
                            </InnerWrapper>
                    </AnyItemContainer>
                </TotalChargesWrapper>  
                }
                </ItemContainer>     
            </ItemListContent>
            }
        </ItemsWrapper>


        

    {/* Customer info */}
       {showReturnComponents && <CustomerInfoWrapper>
            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                <ItemContainer title={'Customer Info'}>
                    
                  <Input 
                                value={customer} 
                                title={'Customer Name'}
                                onChange={(e)=>handleChange('customer-name', e)} 
                                error={customerNameError} 
                                type={'text'} 
                                label={'Customer Name'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                           {showCusDropdown && (
                                    <DropdownWrapper topPosition={'80px'} width={"96%"}>
                                        {customerItems.filter(c =>
                                        customer.length > 0 &&
                                        c.name.toLowerCase().includes(customer.toLowerCase())
                                        ).length > 0 ? (
                                        customerItems
                                            .filter(c => 
                                            customer.length > 0 &&
                                            c.name.toLowerCase().includes(customer.toLowerCase())
                                            )
                                            .map((data, i) => (
                                            <DropdownItems key={i} onClick={() => dropdownCustomerName(data)}>
                                                {data.name}
                                            </DropdownItems>
                                            ))
                                        ) : (
                                        <DropdownItems>
                                            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                <span>No such customer </span>
                                                <a href="/add-customer">Please click here to add </a>
                                            </div>
                                        
                                        </DropdownItems>
                                        )}
                                    </DropdownWrapper>
                            )}


                    <Input 
                                value={saleDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('sale-date', e)} 
                                type={'date'} 
                                label={'Date'} 
                                error={saleDateError}
                                requiredSymbol={'*'}
                            /> 


                    <SelectInput 
                                options={saleStatusItem} 
                                label={'Sale Status'}
                                value={saleStatus}
                                error={saleStatusError}
                                requiredSymbol={'*'}
                                title={'Sale Status'}
                                onChange={(e)=>handleChange('sale-status', e)}
                            />


                    <Input 
                                value={reference} 
                                title={'References'}
                                onChange={(e)=>handleChange('references', e)} 
                                type={'text'} 
                                label={'References'} 
                                // error={saleDateError}
                            /> 


                </ItemContainer>
                <ItemContainer title={'Payment Info'}>
               <Input 
                                value={saleAmount} 
                                title={'Sale Amount'}
                                onChange={(e)=>handleChange('sale-amount', e)} 
                                type={'text'} 
                                label={'Sale Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                                error={saleAmountError}
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
                                            onChange={()=>{}} 
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
                </ItemContainer>
             
                <ItemContainer title={'Return Info'}>
                    <Input 
                                value={returnDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('return-date', e)} 
                                type={'date'} 
                                label={'Date'} 
                                error={returnDateError}
                                requiredSymbol={'*'}
                            /> 

                    <Input 
                                value={returnAmount} 
                                title={'Refund Amount'}
                                onChange={()=>{}} 
                                type={'text'} 
                                label={'Refund Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                                error={returnAmountError}
                            /> 
                    <TextArea 
                                label={'Reason'} 
                                title={'Reason'} 
                                onChange={(e) => handleChange('reason', e)} 
                                value={reason} 
                                error={reasonError}
                                requiredSymbol={'*'}
                            />
                    {/* Add to SALE RETURN button */}
                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                <Button
                                    btnText={isBtnLoading ? <ButtonLoader text={'Adding...'} /> : 'Add Return'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                </ItemContainer>
            </form>
        </CustomerInfoWrapper>}
        </AddSaleReturnContent>
        {/* Toast messages */}
        <ToastComponents/>
    </AddSaleReturnWrapper>
  )
}



