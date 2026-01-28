import React, { useContext, useEffect, useState, useRef  } from 'react'
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
import axios from 'axios'
import { UserContext } from '../../../components/context/UserContext'
import { toast } from 'react-toastify'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { AddSalesContent, AddSalesWrapper, CustomerInfoWrapper, HrStyled, ItemListContent, ItemsWrapper, SelectItemContent, TotalChargesWrapper } from './addSale.style'
import { AnyItemContainer, DropdownItems, DropdownWrapper, InnerWrapper, TableResponsiveWrapper, TableStyled, TdStyled } from '../../purchase/add/addPurchase.style'
import Overlay from '../../../components/overlay/Overlay'
import { List } from 'react-content-loader'

export default function AddSale() {

// const [productItemList, setProductItemList] = useState(ProductItemList);
const token = localStorage.getItem('token');
    

const productDropdownRef = useRef(null);
const customerDropdownRef = useRef(null);

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

{/* Customer info */}
const [saleDate, setSaleDate] = useState(todayDate);
const [saleDateError, setSaleDateError] = useState(false);

const [customer, setCustomer] = useState('');
const [customerNameError, setCustomerNameError] = useState(false);

const [saleStatus, setSaleStatus] = useState('');
const [saleStatusError, setSaleStatusError] = useState(false);

const [walkingCustomerEmail, setWalkingCustomerEmail] = useState('');
const [walkingCustomerNumber, setWalkingCustomerNumber] = useState('');

const [saleAmount, setSaleAmount] = useState('');
const [saleAmountError, setSaleAmountError] = useState(false);

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

const [customerItems, setCustomerItems] = useState([])
const [showCusDropdown, setShowCusDropdown] = useState(false);
const [customerId, setCustomerId] = useState('');


const [showPartialField, setShowPartialField] = useState(false);
const [amountPaid, setAmountPaid] = useState('')
const [amountPaidError, setAmountPaidError] = useState(false);
const [dueBalance, setDueBalance] = useState('');


// show out of stock overlay:
const [showOutOfStockCard, setShowOutOfStockCard] = useState(false);
const [showStockCard, setShowStockCard] = useState(false);

const [prodTitle, setProdTitle]= useState('');
const [prodStock, setProdStock]= useState('');
const [taxItems, setTaxItems] = useState('')



 const [noOfMonth, setNoOfMonth] = useState('')
 const [noOfMonthError, setNoOfMonthError] = useState(false)
 const [showNoOfMonth, setShowNoOfMonth] = useState(false)
 
 const [startMonth, setStartMonth] = useState('')
 const [startMonthError, setStartMonthError] = useState(false)
 const [showStartMonth, setShowStartMonth] = useState(false)



// navigate to add out of stock item purchaseFunc
const navigateToAddStock = () =>{
     navigate('/add-purchase');
     setShowOutOfStockCard(false)
     setShowStockCard(false)
}

// close out stock 
const closOutOfStockCard = () =>{
        setSearchTitle('');
        setTitle('')
        setQuantity('');
        setPrice('')
        setTax('')
        setTaxAmount('')
        setUnitCost('')
        setAmount('')
        setProductId('')
        setShowOutOfStockCard(false)
        setShowStockCard(false)
}

 // close out stock
  const closAboveStockCard = () => {
    setShowOutOfStockCard(false)
    setShowStockCard(false)
  }





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
        // supply info
        else if(type === 'sale-date'){
            setSaleDate(e.target.value);
            setSaleDateError(false);
        }else if(type === 'customer-name'){

            setCustomer(e.target.value);
            setShowCusDropdown(e.target.value.trim().length > 0);
            setCustomerNameError(false);

        }else if(type === 'sale-status'){
            setSaleStatus(e.target.value);
            setSaleStatusError(false);
        }else if(type === 'walkInCustomer-email'){
            setWalkingCustomerEmail(e.target.value);
        }else if(type === 'walkInCustomer-number'){
            setWalkingCustomerNumber(e.target.value);
        }else if(type === 'sale-amount'){
            setSaleAmount(e.target.value);
            setSaleAmountError(false);
        }else if(type === 'payment-status'){
            setPaymentStatus(e.target.value);
            setPaymentStatusError(false);

            if(e.target.value === 'partial'){
                setShowPartialField(true)

            }else{
                setShowPartialField(false);
            }
            // if(e.target.value === 'unpaid'){
            //     setPaymentType(paymentTypeItems[6].value)
            // }else{
            //     setPaymentType('');
            // }
        } else if (type === 'amount-paid') {
            const val = Number(e.target.value);

            setAmountPaid(e.target.value);

            if (!isNaN(val)) {
                setDueBalance((saleAmount - val).toFixed(2));
            }

            // auto-clear errors if value becomes valid
            if (val > 0 && val < Number(saleAmount)) {
                setAmountPaidError(false);
                setShowAmountExceedBalance(false);
            }
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);

             if(e.target.value === 'ETMCS Deduction'){
                setShowNoOfMonth(true);
                setShowStartMonth(true);

            }else{
                setShowNoOfMonth(false);
                setShowStartMonth(false);
            }                
        }else if(type === 'no-of-months'){
            setNoOfMonth(e.target.value);
            setNoOfMonthError(false);
        }else if(type === 'start-month'){
            setStartMonth(e.target.value);
            setStartMonthError(false);}
            else if(type === 'note'){
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
    // setAmountPaid(0.00)
    setAmountPaid('');               // clear input fully
    setDueBalance('');               // reset due balance
    setShowAmountExceedBalance(false)
    setAmountPaidError(false)
}

// MONTHS FOR THE PAYMENT
const NoOfMonths = [
    {
        title: 'Select',
        value: ''
    },
    {
        title: '1',
        value: 1
    },
    {
        title: '2',
        value: 2
    },
    
    {
        title: '3',
        value: 3
    },

] 



// SALE status item name
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
        title: 'ETMCS Deduction',
        value: 'ETMCS Deduction'
    },
  {
        title: 'Check',
        value: 'Check'
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
        title: 'Online',
        value: 'Online'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
    //   {
    //     title: 'N/A',
    //     value: 'N/A'
    // },
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
    
    const today = new Date();

    // move to next month
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      28
    );

    // format YYYY-MM-DD
    const formattedDate = nextMonth.toISOString().split('T')[0];

    setStartMonth(formattedDate);

    const handleClickOutside = (e) => {
        if (
            productDropdownRef.current &&
            !productDropdownRef.current.contains(e.target)
        ) {
            setShowDropdwon(false);
        }

        if (
            customerDropdownRef.current &&
            !customerDropdownRef.current.contains(e.target)
        ) {
            setShowCusDropdown(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);


  // Fetch sale initial
    const [prefix, setPrefix] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')

useEffect(() => {
 const getAllTax = async () => { 
                        // setIsLoading(true)  
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
                                            
                            //   setIsLoading(false)
            
                              console.log(res.data)
                          } catch (err) {
                              console.log(err)
                            //   setIsLoading(false)
                          }
                  
                      }
        getAllTax()
     const fetchCompany = async() =>{
        //   setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
              
                const prefixData = res.data[0].prefixes?.[0];
                setCurrencySymbol(res.data.currencySymbol)
  
                if (prefixData) {
                    setPrefix(prefixData.sale);
                }
  
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
                // setIsLoading(false);
            }
      
        }
        fetchCompany();
     
            // fetch products data
            const getProducts = async () => { 
                //  setIsLoading(true)  
                 try {
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
                     console.log(res.data)
                     setProducts(res.data)
                    //  setIsLoading(false)
                     
                     console.log(res.data)
                 } catch (err) {
                     console.log(err)
                    //  setIsLoading(false)
                     }
                   }
                 getProducts();
 
            // fetch customer data
            const getCustomers = async () => { 
                //  setIsLoading(true)  
                 try {
            
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/customers/", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
               
                     setCustomerItems(res.data)
                    //  setCustomerItems([
                    //     { title: 'Select', value: '' }, 
                    //     ...res.data.map(customer => ({
                    //         title: customer.name,
                    //         value: customer._id,
                    //     }))
                    // ]);
                    //  setIsLoading(false)
                     
                 } catch (err) {
                     console.log(err)
                    //  setIsLoading(false)
                     }
                   }
                   
                 getCustomers();

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
    // setSleAmountError(false)

}, [price, quantity, tax, itemList, otherCharges, discount, shipping]);




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

// search dropdownd handler
// const dropdownHandler1 = (product) => {
//     if(product.stockQuantity === 0){
//         setProdTitle(product.title)
//         setShowOutOfStockCard(true)
//     }
//     setProdStock(product.stockQuantity)
//     setShowDropdwon(false)
//     setProductId(product._id)
//     setSearchTitle('');
//     setTitle(product.title)
//     setQuantity('1');
//     setPrice(product.salePrice)
//     setTax(product.tax)
//     setTaxAmount()
//     setUnitCost()
//     setAmount()
// }

// search dropdown handler
const dropdownHandler = (product) => {

    setShowDropdwon(false)
    if(product.stockQuantity === 0){
        setProdTitle(product.title);
        setShowOutOfStockCard(true);
        return;
    }

    setProdStock(product.stockQuantity);
    setProductId(product._id);
    setSearchTitle('');
    setTitle(product.title);

    // Default quantity = 1
    const qty = "1";

    setQuantity(qty);
    setPrice(product.salePrice);
    setTax(product.tax);

    // ✅ Use your calculation function HERE
    calculateSalePrice(product.salePrice, product.tax, qty);
};


const [showWalkingCustomerField, setShowWalkingCustomerField] = useState(false)

// search name dropdownd handler
const dropdownCustomerName = (customer) => {
    setShowCusDropdown(false)
    setCustomerId(customer._id)
    setCustomer(customer.name)   
    customer.name === 'Walk in customer' ? setShowWalkingCustomerField(true) : setShowWalkingCustomerField(false)
}

const [showZeroQtyCard, setShowZeroQtyCard] = useState(false)
const [showExcesStockCard, setShowExcesStockCard] = useState(false)
// add to array list
const addToList = (e) => {

    e.preventDefault();

    let isValid = true;

    if (!title) {
        setTitleError(true);
        isValid = false;
    }

    // ====================================
    // ✅ NEW CONDITION — Prevent 0 quantity
    // ====================================
    if (!quantity || Number(quantity) === 0) {
        setQuantityError(true);
        setShowZeroQtyCard(true);  
        setProdTitle("Quantity must be greater than zero.");
        return;   // STOP HERE
    }

    if (!price) {
        setPriceError(true);
        isValid = false;
    }

    if (isValid) {

        // 1. Get the product for stockQuantity check
        const product = products.find(p => p._id === productId);

        if (product) {

            const stockQty = Number(product.stockQuantity);
            const selectedQty = Number(quantity);

            // ================================
            // CONDITION 1 — Out of stock
            // ================================
            if (stockQty <= 0) {
                setShowStockCard(true);
                setProdTitle(product.title);
                return;
            }

            // ================================
            // CONDITION 2 — quantity > stock
            // ================================
            if (selectedQty > stockQty) {
                setShowStockCard(true);
                setProdTitle(product.title);
                return;
            }

            // ================================
            // CONDITION 3 — already added full stock
            // ================================
            const existingItem = itemList.find(item => item.productId === productId);

            if (existingItem) {
                const alreadyAddedQty = Number(existingItem.quantity);

            if (alreadyAddedQty === stockQty) {
                      setShowExcesStockCard(true);
                      setProdTitle(`You have already added all available stock of "${product.title}"`);
                      return;
                  }

                if (alreadyAddedQty + selectedQty > stockQty) {
                    setShowStockCard(true);
                    setProdTitle(`You cannot exceed the available stock of "${product.title}"`);
                    return;
                }
            }
        }

        // Passed all validations — ADD
        const newItem = {
            productId,
            title,
            quantity,
            price,
            tax,
            taxAmount,
            unitCost,
            amount
        };

        setItemList((prevItems) => [...prevItems, newItem]);

        // CLEAR FIELDS
        setSearchTitle('');
        setTitle('');
        setQuantity('');
        setPrice('');
        setTax('');
        setTaxAmount('');
        setUnitCost('');
        setAmount('');
        setProductId('');
    }
};


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

if (itemList.length === 0) {
    toast.error("Please add at least one item to the sale.");
    return;
  }

    let isValid = true;

    if(!saleDate){
        setSaleDateError(true)
        isValid = false;
    }
    if(!customer){
        setCustomerNameError(true)
        isValid = false;
    }
    if(!saleStatus){
        setSaleStatusError(true)
        isValid = false;
    }
        if(!saleAmount){
        setSaleAmountError(true)
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
     
 if (paymentStatus === 'partial') {
  if (!amountPaid || parseFloat(amountPaid) <= 0) {
    setAmountPaidError(true);
    isValid = false;
  }

  const paid = Number(amountPaid)
  const total = Number(saleAmount)

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

 if (paymentType === 'ETMCS Deduction') {
    if(!noOfMonth){
            setNoOfMonthError(true)
            isValid = false;
        }

    if(!startMonth){
            setStartMonthError(true)
            isValid = false;
        }
  }


    if(isValid){
      
    const newSale = {
      saleDate: new Date(saleDate),
    //   customer: customer._id || customer,
      customer: customerId,
      saleStatus,
      walkingCustomerEmail,
      walkingCustomerNumber,
      saleAmount: Number(saleAmount),
      paymentStatus,
      paymentType,
      noOfMonth: Number(noOfMonth) || '',
      startMonth,
      amountPaid: Number(amountPaid),
      dueBalance,
      note,
      subTotal: Number(subTotal),
      otherCharges: Number(otherCharges),
      discount: Number(discount),
      discountValue: Number(discountValue),
      shipping: Number(shipping),
      saleItems:
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
      userId: user?._id
    };
      setIsBtnLoading(true);
      console.log('======new sale data==========\n', newSale)
            // alert('form validated triggered')
            try {
          
              const res = await axios.post(`${process.env.REACT_APP_URL}/api/sale/create`, newSale, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })

              console.log(res.data)
              navigate(`/sale-invoice/${res.data.sale?._id}`);
              
              
                // toast success message
                 toast.success('Sale added Successfully')
                   setIsBtnLoading(false);
                } catch (err) {
                console.error(err);
                 if (err.response) {
      const msg = err.response.data.message;

      // Show toast for stock errors
      if (msg.includes("Not enough stock")) {
        toast.error(msg);
        setIsBtnLoading(false);  
        return;
      }

      toast.error(msg || "Something went wrong");}
                setIsBtnLoading(false);
            }
    }
}

  return (
    <AddSalesWrapper>
                {/* Page title */}
                <PageTitle title={'Sale'} subTitle={'/ Add'}/>
            
     <>
        {isLoading ? (
          <List />
        ) : (
        <AddSalesContent>
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
                                   <h3>Sale Items</h3> 
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

    {/* Customer info */}
        <CustomerInfoWrapper>
            <form action="" onSubmit={(e)=>hanldeSumbit(e)}>
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
                                    <DropdownWrapper topPosition={'90px'} width={"96%"} ref={customerDropdownRef}>
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

                   {showWalkingCustomerField &&
                    <Input 
                                value={walkingCustomerEmail} 
                                title={'Email'}
                                onChange={(e)=>handleChange('walkInCustomer-email', e)} 
                                type={'email'} 
                                label={'Email'} 
                                placeholder={'Optional'}
                                // error={saleDateError}
                            /> 
                        }

                   { showWalkingCustomerField &&
                       <Input 
                                value={walkingCustomerNumber} 
                                title={'Phone Number'}
                                onChange={(e)=>handleChange('walkInCustomer-number', e)} 
                                type={'text'} 
                                label={'Phone Number'} 
                                placeholder={'Optional'}
                                // error={saleDateError}
                            /> }

                </ItemContainer>
                <ItemContainer title={'Payment Info'}>
                    <Input 
                                value={saleAmount} 
                                title={'Sale Amount'}
                                onChange={()=>{}} 
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
                    
        {    showNoOfMonth     &&    
                <SelectInput 
                                                options={NoOfMonths} 
                                                label={'No. of Months'}
                                                value={noOfMonth}
                                                error={noOfMonthError}
                                                requiredSymbol={'*'}
                                                title={'No. of Months'}
                                                onChange={(e)=>handleChange('no-of-months', e)}
                                    />}

           {   showStartMonth &&           <Input 
                                value={startMonth} 
                                title={'Start Month'}
                                onChange={(e)=>handleChange('start-month', e)} 
                                type={'date'} 
                                label={'Date'} 
                                error={startMonthError}
                                requiredSymbol={'*'}
                            /> 
}
                    <TextArea 
                                label={'Note'} 
                                title={'Note'} 
                                onChange={(e) => handleChange('note', e)} 
                                value={note} 
                            />

                    {/* Add to SALE button */}
                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                <Button
                                    btnText={isBtnLoading ? <ButtonLoader text={'Adding...'} /> : 'Add Sale'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                </ItemContainer>
            </form>
        </CustomerInfoWrapper>
        </AddSalesContent>
           )}
      </>
        {/* Toast messages */}
        <ToastComponents/>

        {showOutOfStockCard && (
              <Overlay
                contentWidth="30%"
                overlayButtonClick={navigateToAddStock}
                closeOverlayOnClick={closOutOfStockCard}
                btnText1={'Add Purchase'}
                btnText2={'Cancel'}
              >
                <p style={{ margin: "40px", textAlign: "center", fontSize: "14px", lineHeight: "25px" }}>
                  <b style={{textTransform: "capitalize", fontSize:"20px"}}>{prodTitle}</b><br/> Is currently out of stock <br/>please add more purchase
                </p>
              </Overlay>
            )}


        {showStockCard && (
              <Overlay
                contentWidth="30%"
                overlayButtonClick={navigateToAddStock}
                closeOverlayOnClick={closAboveStockCard}
                btnText1={'Add Purchase'}
                btnText2={'Cancel'}
              >
                <p style={{ margin: "40px", textAlign: "center", fontSize: "14px", lineHeight: "25px" }}>
                  <b style={{textTransform: "capitalize", fontSize:"20px"}}>{prodTitle}</b><br/> cannot be added. Quantity exceeds stock quantity <b>{prodStock}</b><br/>Please add more purchase
                </p>
              </Overlay>
            )}


    {showZeroQtyCard && (
              <Overlay
                contentWidth="30%"
                overlayButtonClick={()=>setShowZeroQtyCard(false)}
                closeOverlayOnClick={()=>setShowZeroQtyCard(false)}
                btnText1={'Ok'}
                btnText2={'Cancel'}
              >
                <p style={{ margin: "40px", textAlign: "center", fontSize: "14px", lineHeight: "25px" }}>
                  <b style={{textTransform: "capitalize", fontSize:"20px"}}>{prodTitle}</b><br/> cannot be added. Quantity is below stock quantity <b>{prodStock}</b><br/>Please add valid quantity to continue
                </p>
              </Overlay>
            )}

    {showExcesStockCard && (
        <Overlay contentWidth="30%" 
            overlayButtonClick={navigateToAddStock} 
            closeOverlayOnClick={()=>setShowExcesStockCard(false)} 
            btnText1={'Add Purchase'} btnText2={'Cancel'}>
          <p style={{ margin: '40px', textAlign: 'center', fontSize: '14px', lineHeight: '25px' }}>
            <b style={{ textTransform: 'capitalize', fontSize: '20px' }}>{prodTitle}</b>
            <br />please add more purchase
          </p>
        </Overlay>
      )}


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
    </AddSalesWrapper>
  )
}
