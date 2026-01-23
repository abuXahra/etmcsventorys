
import React, { useContext, useEffect, useState } from 'react'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
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
import { AddWastageContent, AddWastageWrapper, AnyItemContainer, DropdownItems, DropdownWrapper, HrStyled, InnerWrapper, ItemListContent, ItemsWrapper, SelectItemContent, SupplierInfoWrapper, TableResponsiveWrapper, TableStyled, TdStyled, TotalChargesWrapper } from './addWastage.style'
import { List } from 'react-content-loader'

export default function AddWastage() {

    // const [productItemList, setProductItemList] = useState(ProductItemList);
const token = localStorage.getItem('token');
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const { user } = useContext(UserContext);

    const [itemList, setItemList] = useState([]);
    const [itemWastageList, setItemWastageList] = useState([]);
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

    {/* Supply info */ }
    const [purchaseDate, setPurchaseDate] = useState(todayDate);
    const [purchaseDateError, setPurchaseDateError] = useState(false);

    const [wastageDate, setWastageDate] = useState(todayDate);
    const [returnDateError, setReturnDateError] = useState(false);
    
    
    const [supplier, setSupplier] = useState('');
    const [supplierNameError, setSupplierNameError] = useState(false);
    
    const [wastageAmount, setWastageAmount] = useState('');
    const [returnAmountError, setReturnAmountError] = useState(false);
    
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [purchaseAmountError, setPurchaseAmountError] = useState(false);

    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState();

    const [purchaseStatus, setPurchaseStatus] = useState('');
    const [purchaseStatusError, setPurchaseStatusError] = useState(false);

    const [reference, setReference] = useState('');

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

    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceNoSearch, setInvoiceNoSearch] = useState('');
    const [invoiceNoError, setInvoiceNoError] = useState(false);
    
    const [allPurchases, setAllPurchases] = useState([]); // all sales
    const [purchase, setPurchase] = useState('');
    const [showReturnComponents, setShowReturnComponents] = useState(false);
    
    // Refund 
    const [refundTotal, setRefundTotal] = useState('')
    const [refundQuantity, setRefundQuantity] = useState('')

    // onchange handler
    const handleChange = (type, e) => {
        if (type === 'searchTitle') {
            setSearchTitle(e.target.value);
            setTitle(e.target.value);
            setTitleError(false);

            e.target.value.length > 0 ?
                setShowDropdwon(true) :
                setShowDropdwon(false)

            setTitle('')
            setQuantity('');
            setPrice('')
            setTax('')
            setTaxAmount('')
            setUnitCost('')
            setAmount('')
            setProductId('')

        } else if (type === 'quantity') {
            setQuantity(e.target.value);
            calculatePurchasePrice(price, tax, e.target.value);
            setQuantityError(false);
        } else if (type === 'price') {
            setPrice(e.target.value);
            calculatePurchasePrice(e.target.value, tax, quantity);
            setPriceError(false);
        } else if (type === 'tax') {
            setTax(e.target.value);
            calculatePurchasePrice(price, e.target.value, quantity);
            setTaxError(false);
        } else if (type === 'price') {
            setTaxAmount(e.target.value);
        } else if (type === 'unit-cost') {
            setUnitCost(e.target.value);
        } else if (type === 'amount') {
            setUnitCost(e.target.value);
        }
        // calculations:
        else if (type === 'otherCharges') {
            setOtherCharges(e.target.value);
        } else if (type === 'discount') {
            setDiscount(e.target.value);
        } else if (type === 'shipping') {
            setShipping(e.target.value);
        }
        // supply info
        else if (type === 'purchase-date') {
            setPurchaseDate(e.target.value);
            setPurchaseDateError(false);
        }else if(type === 'return-date'){
            setWastageDate(e.target.value);
            setReturnDateError(false);
        } else if (type === 'supply-name') {

            setSupplier(e.target.value);
            setShowSupDropdown(e.target.value.trim().length > 0);
            setSupplierNameError(false);

        }else if(type === 'invoiceNo'){
            setInvoiceNo(e.target.value);
            setInvoiceNoSearch(e.target.value);
            setInvoiceNoError(false);
        } else if (type === 'references') {
            setReference(e.target.value);
        } else if (type === 'purchase-status') {
            setPurchaseStatus(e.target.value);
            setPurchaseStatusError(false);
        } else if (type === 'purchase-amount') {
            setPurchaseAmount(e.target.value);
            setPurchaseAmountError(false);
        } else if (type === 'payment-status') {
            setPaymentStatus(e.target.value);
            setPaymentStatusError(false);

            if (e.target.value === 'partial') {
                setShowPartialField(true)
            } else {
                setShowPartialField(false);
            }

            if (e.target.value === 'unpaid') {
                setPaymentType(paymentTypeItems[6].value)
            } else {
                setPaymentType('');
            }

        } else if (type === 'amount-paid') {
            setAmountPaid(e.target.value);
            setDueBalance(purchaseAmount - Number(e.target.value))
            setAmountPaidError(false);
        } else if (type === 'payment-type') {
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        } else if (type === 'note') {
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



    // purchase status item name
    const purchaseStatusItem = [
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
    const paymentTypeItems = [
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


const handleItemReasonChange = (index, value) => {
    setItemWastageList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, reason: value } : item
      )
    )
  }


 const handleItemWastageDateChange = (index, value) => {
    setItemWastageList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, wastageDate: value } : item
      )
    )
  } 

    // Fetch expense initial
    const [prefix, setPrefix] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')
    const [isLoadingInvoice, setIsLoadingInvoice] = useState(false)
    
    useEffect(() => {

        const fetchCompany = async () => {
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
                    setPrefix(prefixData.wastage);
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
                setIsLoading(false)

            } catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }

        getSuppliers();

                              
                    // fetch products data ==================================================================
                const getPurchases = async () => { 
                         setIsLoading(true)  
                         try {
                             const res = await axios.get(process.env.REACT_APP_URL + "/api/purchase", {
                                                                 headers: {
                                                                   Authorization: `Bearer ${token}`
                                                                 }
                                                           })
                             setAllPurchases(res.data)
                             setIsLoading(false)
                             
                             console.log(res.data)
                         } catch (err) {
                             console.log(err)
                             setIsLoading(false)
                             }
                           }
                 getPurchases();

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
        const match = allPurchases.find((s) => s.code === invoiceNo.toUpperCase()); 
        // assuming sale code is stored as s.code (adjust if different)
        if (match) {
            setPurchase(match);
 
             const formattedPurchaseDate = new Date(match.purchaseDate).toISOString().split('T')[0];
                     setPurchaseDate(formattedPurchaseDate);
                     setSupplier(match.supplier.name) 
                     setPurchaseStatus(match.purchaseStatus)
                     setReference(match.reference)
                     setPurchaseAmount(match.purchaseAmount)
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

                    const itemsWithOriginal = match.purchaseItems.map((item) => ({
                        ...item,
                        originalQty: item.quantity,
                        }));
                        setItemList(itemsWithOriginal);
                    

                    setSupplierId(match.supplier._id)
                    setShowReturnComponents(true)
                    console.log("Matched purchase:", match);
                    setIsLoadingInvoice(false)
        } else {
            setPurchase(null);
            setInvoiceNoSearch('')
            setInvoiceNo('')
             setIsLoadingInvoice(false)
        }
        }
  }


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



    // search name dropdownd handler
    const dropdownSupplierName = (supplier) => {
        setShowSupDropdown(false)
        setSupplierId(supplier._id)
        setSupplier(supplier.name)
    }

 //   delete refund items
const deleteRefundItem = (index) => {
  setItemWastageList((prevReturns) => {
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
    setWastageAmount(total.toFixed(2))

    return updatedReturns;
  });
};

 
// increment or decrement product quantity in the list
  const updateQuantity = (index, delta,) => {
        
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
          setItemWastageList((prevReturns) => {
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
                  reason: '',
                  wastageDate: wastageDate,
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
            setWastageAmount(total.toFixed(2))

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



    //submit handler
    const handleSubmit = async (e) => {

        e.preventDefault();

        let isValid = true;

        if (!purchaseDate) {
            setPurchaseDateError(true)
            isValid = false;
        }
        if (!supplier) {
            setSupplierNameError(true)
            isValid = false;
        }
        if (!invoiceNo) {
            setInvoiceNoError(true);
            isValid = false;
        }
        if (!purchaseStatus) {
            setPurchaseStatusError(true)
            isValid = false;
        }
        if (!purchaseAmount) {
            setPurchaseAmountError(true)
            isValid = false;
        }
        // if (!wastageDate) {
        //     setReturnDateError(true);
        //     isValid = false;
        // }
        if (!wastageAmount) {
            setReturnAmountError(true);
            isValid = false;
        }
        // if (!reason) {
        //     setReasonError(true);
        //     isValid = false;
        // }
        if (!paymentType) {
            setPaymentTypeError(true)
            isValid = false;
        }
        if (!paymentStatus) {
            setPaymentStatusError(true)
            isValid = false;
        }

        if (paymentStatus === 'partial') {
            if (!amountPaid || parseFloat(amountPaid) <= 0) {
                setAmountPaidError(true);
                isValid = false;
            }
        }

         if (itemWastageList.some((item) => !item.wastageDate?.trim())) {
        toast.error('Please provide a date for each wastage item.')
        return
        }

        if (itemWastageList.some((item) => !item.reason?.trim())) {
        toast.error('Please provide a reason for each wastage item.')
        return
        }
        if (isValid) {

            const newWastages =  itemWastageList.map((item) => ({
                            wastageDate: new Date(item.wastageDate) || '',
                            purchaseId: purchase?._id,
                            supplier: supplierId || supplier,
                            invoiceNo,
                            // reason,
                            reason: item.reason || '',
                            userId: user._id,
                            productId: item.productId,
                            title: item.title,
                            quantity: Number(item.quantity),
                            price: Number(item.price),
                            tax: Number(item.tax),
                            taxAmount: Number(item.taxAmount),
                            unitCost: Number(item.unitCost),
                            amount: Number(item.amount),
                        }))           
        
            setIsBtnLoading(true);
            console.log('======new wastage data==========\n', newWastages)
    
            try {

                const res = await axios.post(`${process.env.REACT_APP_URL}/api/wastage/create`, {
                    items: newWastages,
                    prefix: prefix,
                }, {
                                                    headers: {
                                                      Authorization: `Bearer ${token}`
                                                    }
                                              })
                console.log('Response from server:', res.data);
                // toast success message
                toast.success('Wastage added Successfully')
                setIsBtnLoading(false);
                navigate(`/wastage`);
            } catch (err) {
                console.error(err);
                 toast.error("Something went wrong while processing return!");
                setIsBtnLoading(false);
            }
        }
    }

    return (
        <AddWastageWrapper>
            {/* Page title */}
            <PageTitle title={'Wastage'} subTitle={'/ Add'} />
            {/* {isLoading ? <List/> : */}
         <AddWastageContent>
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
                                placeholder={'Purchase Invoice No.'}
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
                                btnOnClick={(e)=>handleCheckInvoice(e)}                               
                            />
                        </ItemButtonWrapper>
                    </ItemContainer>  
                </SelectItemContent>

                    {/* ItemList */}
                     {showReturnComponents &&
                                <ItemListContent>
                                    <ItemContainer title={'Item List'}>
                                    <TableResponsiveWrapper>
                                   {itemList.length > 0 ?
                                   <>
                                   <h3 style={{textAlign: "center"}}>Purchase Items</h3> 
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
                                                    onClick={() => updateQuantity( i, -1,)}
                                                    disabled={parseInt(data.quantity) <= 1}
                                                    >-</button>
                                                    {data.quantity}
                                                    <button
                                                     style={{borderRadius: "100%", marginLeft: '5px', border: "none",  cursor: 'pointer'}}
                                                    onClick={() => updateQuantity( i, 1,)}
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
                                                       <h3>Purchase Return Items</h3> 
                                                       <p>Not Item on the List</p>
                                                    </div>)
                                    }
                                    </TableResponsiveWrapper>
                                        
                                    <HrStyled/>
                                     {/* =========================================Wastage ITEMS ===========================================*/}
                                    <TableResponsiveWrapper>
                                   {itemWastageList.length > 0 ?
                                    <>
                                    <h3 style={{textAlign: "center", marginTop: "30px"}}>Wastage Items</h3> 
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
                                   {       itemWastageList.map((data, i)=>( 
                                        
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
                                                       <h3>Wastage Items</h3> 
                                                       <p>Not Item on the List</p>
                                                    </div>)
                                    }
                                    </TableResponsiveWrapper>
                    
                    {/* ====================================================RETURN ITEMS END ========================================== */}
                                    </ItemContainer>     
                                </ItemListContent>
                                }
                            </ItemsWrapper>
                    
                    
                            

                {/* Supply info */}
               {showReturnComponents && 
                itemWastageList.length > 0 &&
                 <SupplierInfoWrapper>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        
                        <ItemContainer title={'Wastage Reasons'}>
                                      {itemWastageList.map((item, i) => ( 
                                        <div style={{borderBottom: i === itemWastageList.length - 1 ? 'none' : '1px solid #ccc'}}>
                                        <b style={{textTransform: 'Capitalize'}}>{item.title}</b>
                                            <Input 
                                                        label={'Date'}
                                                        title={'Date'}
                                                        onChange={(e) => handleItemWastageDateChange(i, e.target.value)} 
                                                        type={'date'}  
                                                        value={item.wastageDate} 
                                                        // error={returnDateError}
                                                        requiredSymbol={'*'}
                                                    /> 
                                            <TextArea 
                                                            label={`Reason`}
                                                            title={`Reason`}
                                                            placeholder="Enter reason..."
                                                            value={item.reason || ''}
                                                            onChange={(e) => handleItemReasonChange(i, e.target.value)}
                                                            requiredSymbol="*"
                                                    />
                                                    <br/>
                                                </div>))}

                                                    {/* {itemWastageList.length > 0 && (
                                                    <div style={{ marginTop: '10px' }}>
                                                        <h4>Wastage Reasons</h4>
                                                        {itemWastageList.map((item, i) => (
                                                        <div key={i} style={{ marginBottom: '15px' }}>
                                                            <TextArea
                                                            label={`Reason for ${item.title}`}
                                                            title={`Reason for ${item.title}`}
                                                            placeholder="Enter reason..."
                                                            value={item.reason || ''}
                                                            onChange={(e) => handleItemReasonChange(i, e.target.value)}
                                                            requiredSymbol="*"
                                                            />
                                                        </div>
                                                        ))}
                                                    </div>
                                                    )} */}

                        
                                            {/* <TextArea 
                                                        label={'Reason'} 
                                                        title={'Reason'} 
                                                        onChange={(e) => handleChange('reason', e)} 
                                                        value={reason} 
                                                        error={reasonError}
                                                        requiredSymbol={'*'}
                                                    />
                                             */}
                            {/* Add to Purchase Return button */}
                                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                        <Button
                                            btnText={isBtnLoading ? <ButtonLoader text={'Adding...'} /> : 'Add Wastage'}
                                            btnFontSize={'12px'}
                                            btnColor={'green'}
                                            btnTxtClr={'white'}
                                            btnAlign={'flex-end'}
                                            type={"submit"}
                                        />
                                    </ItemButtonWrapper>
                            </ItemContainer>
                    </form>
                </SupplierInfoWrapper>}
            </AddWastageContent>
            {/* } */}
            {/* Toast messages */}
            <ToastComponents />
        </AddWastageWrapper>
    )
}


