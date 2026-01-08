


import React, { useContext, useEffect, useState, useRef } from 'react'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import Button from '../../../components/clicks/button/Button'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import TextArea from '../../../components/input/textArea/TextArea'
import { FaTrash } from 'react-icons/fa'
import PageTitle from '../../../components/page_title/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../components/context/UserContext'
import { toast } from 'react-toastify'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import {
  AddSalesContent,
  AddSalesWrapper,
  CustomerInfoWrapper,
  EditSalesContent,
  EditSalesWrapper,
  HrStyled,
  ItemListContent,
  ItemsWrapper,
  SelectItemContent,
  TotalChargesWrapper,
} from './editSale.style'
import {
  AnyItemContainer,
  DropdownItems,
  DropdownWrapper,
  InnerWrapper,
  TableResponsiveWrapper,
  TableStyled,
  TdStyled,
} from '../../purchase/add/addPurchase.style'
import { List } from 'react-content-loader'
import Overlay from '../../../components/overlay/Overlay'

export default function EditSale() {
  const token = localStorage.getItem('token')

  const productDropdownRef = useRef(null)
  const customerDropdownRef = useRef(null)

  const { saleId } = useParams()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const { user } = useContext(UserContext)

  const [itemList, setItemList] = useState([])
  const [productId, setProductId] = useState('')

  const todayDate = new Date().toISOString().split('T')[0]

  const [searchTitle, setSearchTitle] = useState('')
  const [searchTitleError, setSearchTitleError] = useState(false)

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)

  const [quantity, setQuantity] = useState('')
  const [quantityError, setQuantityError] = useState(false)

  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState(false)

  const [tax, setTax] = useState('')
  const [taxError, setTaxError] = useState(false)

  const [taxAmount, setTaxAmount] = useState('')
  const [taxAmountError, setTaxAmountError] = useState(false)

  const [unitCost, setUnitCost] = useState('')
  const [unitCostError, setUnitCostError] = useState(false)

  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)

  // Customer info
  const [saleDate, setSaleDate] = useState(todayDate)
  const [saleDateError, setSaleDateError] = useState(false)

  const [customer, setCustomer] = useState('')
  const [customerNameError, setCustomerNameError] = useState(false)

  const [saleStatus, setSaleStatus] = useState('')
  const [saleStatusError, setSaleStatusError] = useState(false)

  const [walkingCustomerEmail, setWalkingCustomerEmail] = useState('');
  const [walkingCustomerNumber, setWalkingCustomerNumber] = useState('');


  const [saleAmount, setSaleAmount] = useState('')
  const [saleAmountError, setSaleAmountError] = useState(false)

  const [paymentType, setPaymentType] = useState('')
  const [paymentTypeError, setPaymentTypeError] = useState(false)

  const [paymentStatus, setPaymentStatus] = useState('')
  const [paymentStatusError, setPaymentStatusError] = useState(false)

  const [note, setNote] = useState('')

  const [showDropdwon, setShowDropdwon] = useState(false)

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [otherCharges, setOtherCharges] = useState('')
  const [discount, setDiscount] = useState('')
  const [discountValue, setDiscountValue] = useState(null)
  const [shipping, setShipping] = useState('')
  const [grandTotal, setGrandTotal] = useState(0)

  const [products, setProducts] = useState([])

  const [customerItems, setCustomerItems] = useState([])
  const [showCusDropdown, setShowCusDropdown] = useState(false)
  const [customerId, setCustomerId] = useState('')

  const [showPartialField, setShowPartialField] = useState(false)
  const [amountPaid, setAmountPaid] = useState('')
  const [amountPaidError, setAmountPaidError] = useState(false)
  const [dueBalance, setDueBalance] = useState('')

  const [saleCode, setSaleCode] = useState('')

  // show out of stock overlay:
  const [showOutOfStockCard, setShowOutOfStockCard] = useState(false)
  const [showStockCard, setShowStockCard] = useState(false)

  const [prodTitle, setProdTitle] = useState('')
  const [prodStock, setProdStock] = useState('')

  // navigate to add out of stock item purchaseFunc
  const navigateToAddStock = () => {
    navigate('/add-purchase')
    setShowOutOfStockCard(false)
    setShowStockCard(false)
  }

  // close out stock
  const closOutOfStockCard = () => {
    setSearchTitle('')
    setTitle('')
    setQuantity('')
    setPrice('')
    setTax('')
    setTaxAmount('')
    setUnitCost('')
    setAmount('')
    setProductId('')
    setShowOutOfStockCard(false)
    setShowStockCard(false)
  }

  // close above stock quantity
  const closAboveStockCard = () => {
    setShowOutOfStockCard(false)
    setShowStockCard(false)
  }


  // onchange handler
  const handleChange = (type, e) => {
    if (type === 'searchTitle') {
      const v = e.target.value
      setSearchTitle(v)
      setSearchTitleError(false)
      setShowDropdwon(v.trim().length > 0)

      // don't clear the selected title here — leave that to selection
    } else if (type === 'title') {
      setTitle(e.target.value)
      setTitleError(false)
    } else if (type === 'quantity') {
      setQuantity(e.target.value)
      calculateSalePrice(price, tax, e.target.value)
      setQuantityError(false)
    } else if (type === 'price') {
      setPrice(e.target.value)
      calculateSalePrice(e.target.value, tax, quantity)
      setPriceError(false)
    } else if (type === 'tax') {
      setTax(e.target.value)
      calculateSalePrice(price, e.target.value, quantity)
      setTaxError(false)
    } else if (type === 'unit-cost') {
      setUnitCost(e.target.value)
    } else if (type === 'amount') {
      setUnitCost(e.target.value)
    }
    // calculations:
    else if (type === 'otherCharges') {
      setOtherCharges(e.target.value)
    } else if (type === 'discount') {
      setDiscount(e.target.value)
    } else if (type === 'shipping') {
      setShipping(e.target.value)
    }
    // customer info
    else if (type === 'sale-date') {
      setSaleDate(e.target.value)
      setSaleDateError(false)
    } else if (type === 'customer-name') {
      const v = e.target.value
      setCustomer(v)
      setShowCusDropdown(v.trim().length > 0)
      setCustomerNameError(false)
    } else if (type === 'sale-status') {
      setSaleStatus(e.target.value)
      setSaleStatusError(false)
    } else if(type === 'walkInCustomer-email'){
            setWalkingCustomerEmail(e.target.value);
    }else if(type === 'walkInCustomer-number'){
            setWalkingCustomerNumber(e.target.value);
    } else if (type === 'sale-amount') {
      setSaleAmount(e.target.value)
      setSaleAmountError(false)
    } else if (type === 'payment-status') {
      setPaymentStatus(e.target.value)
      setPaymentStatusError(false)

      if (e.target.value === 'partial') {
        setShowPartialField(true)
      } else {
        setShowPartialField(false)
      }

      if (e.target.value === 'unpaid') {
        setPaymentType('N/A')
      } else {
        setPaymentType('')
      }
    } else if (type === 'amount-paid') {
      setAmountPaid(e.target.value)
      setDueBalance((saleAmount - Number(e.target.value)).toFixed(2))
      setAmountPaidError(false)
    } else if (type === 'payment-type') {
      setPaymentType(e.target.value)
      setPaymentTypeError(false)
    } else if (type === 'note') {
      setNote(e.target.value)
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
    { title: 'Select', value: '' },
    { title: 'none', value: 0 },
    { title: 'Tax (5%)', value: 5 },
    { title: 'Vat + Tax (7%)', value: 7 },
  ]

  // SALE status item name
  const saleStatusItem = [
    { title: 'Select', value: '' },
    { title: 'completed', value: 'completed' },
    { title: 'pending', value: 'pending' },
  ]

  // payment
  const paymentTypeItems = [
    { title: 'Select', value: '' },
    { title: 'Card', value: 'Card' },
    { title: 'Cash', value: 'Cash' },
    { title: 'Check', value: 'Check' },
    { title: 'Online', value: 'Online' },
    { title: 'Bank Transfer', value: 'Bank Transfer' },
    { title: 'N/A', value: 'N/A' },
  ]

  const paymentStatusItems = [
    { title: 'Select', value: '' },
    { title: 'unpaid', value: 'unpaid' },
    { title: 'partial', value: 'partial' },
    { title: 'paid', value: 'paid' },
  ]

  const [showWalkingCustomerField, setShowWalkingCustomerField] = useState(false)
  
  useEffect(() => {
    // fetch purchase data
    const getSaleData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(process.env.REACT_APP_URL + '/api/sale/' + saleId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const formattedSaleDate = new Date(res.data.saleDate).toISOString().split('T')[0]
        setSaleCode(res.data.code)
        setSaleDate(formattedSaleDate)
        setCustomer(res.data.customer?.name || '')
        setSaleStatus(res.data.saleStatus)
        setWalkingCustomerEmail(res.data.walkingCustomerEmail)
        setWalkingCustomerNumber(res.data.walkingCustomerNumber)
        setSaleAmount(res.data.saleAmount)
        setPaymentStatus(res.data.paymentStatus)
        setShowPartialField(res.data.paymentStatus === 'partial')
        setPaymentType(res.data.paymentType)
        setAmountPaid(res.data?.amountPaid)
        setDueBalance(res.data?.dueBalance)
        setNote(res.data.note)
        setSubTotal(res.data.subTotal)
        setOtherCharges(res.data.otherCharges)
        setDiscount(res.data.discount)
        setDiscountValue(res.data.discountValue)
        setShipping(res.data.shipping)
        setItemList(res.data.saleItems || [])
        setIsLoading(false)

        res.data.customer?.name === 'Walk in customer' ? setShowWalkingCustomerField(true) : setShowWalkingCustomerField(false)

      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    getSaleData()
  }, [saleId])

  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(e.target)) {
        setShowDropdwon(false)
      }

      if (customerDropdownRef.current && !customerDropdownRef.current.contains(e.target)) {
        setShowCusDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Fetch sale initial
  const [prefix, setPrefix] = useState('')
  const [currencySymbol, setCurrencySymbol] = useState('')

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`)
        const prefixData = res.data[0]?.prefixes?.[0]
        setCurrencySymbol(res.data.currencySymbol)
        if (prefixData) setPrefix(prefixData.sale)
      } catch (error) {
        console.log(error)
        // setIsLoading(false)
      }
    }

    const getProducts = async () => {
      // setIsLoading(true)
      try {
        const res = await axios.get(process.env.REACT_APP_URL + '/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProducts(res.data)
        // setIsLoading(false)
      } catch (err) {
        console.log(err)
        // setIsLoading(false)
      }
    }

    const getCustomers = async () => {
      // setIsLoading(true)
      try {
        const res = await axios.get(process.env.REACT_APP_URL + '/api/customers/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCustomerItems(res.data)
        // setIsLoading(false)
      } catch (err) {
        console.log(err)
        // setIsLoading(false)
      }
    }

    fetchCompany()
    getProducts()
    getCustomers()
  }, [token])

  // for grand total calculation
  useEffect(() => {
    const totalQty = itemList.reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0)
    const subtotal = itemList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

    const charges = parseFloat(otherCharges) || 0
    const disc = parseFloat(discount) || 0
    const ship = parseFloat(shipping) || 0

    const discValue = (disc / 100) * subtotal
    const grand = subtotal + charges + ship - discValue

    setTotalQuantity(totalQty)
    setSubTotal(subtotal.toFixed(2))
    setDiscountValue(discValue.toFixed(2))
    setGrandTotal(grand.toFixed(2))
    setSaleAmount(grand.toFixed(2))
  }, [itemList, otherCharges, discount, shipping])

  // calculating sale price
  const calculateSalePrice = (priceInput, taxInput, quantityInput) => {
    const p = parseFloat(priceInput) || 0
    const t = parseFloat(taxInput) || 0
    const q = parseFloat(quantityInput) || 1

    const taxAmountPerUnit = p * (t / 100)
    const unitPriceWithTax = p + taxAmountPerUnit
    const totalSale = unitPriceWithTax * q
    const totalTaxAmount = taxAmountPerUnit * q

    setTaxAmount(totalTaxAmount.toFixed(2))
    setUnitCost(unitPriceWithTax.toFixed(2))
    setAmount(totalSale.toFixed(2))
  }

  // search dropdown handler
  const dropdownHandler1 = (product) => {
    setProdStock(product.stockQuantity)
    setProdTitle(product.title)

    if (product.stockQuantity === 0) {
      setShowOutOfStockCard(true)
      setShowStockCard(false)
      setShowDropdwon(false)
      return
    }

    // set default quantity to 1 when selecting
    setProductId(product._id)
    setSearchTitle('')
    setTitle(product.title)
    setQuantity()
    setPrice(product.salePrice)
    setTax(product.tax)

    // calculate derived values for qty 1
    calculateSalePrice(product.salePrice, product.tax, 1)

    setShowDropdwon(false)
  }

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


  // search name dropdown handler
  const dropdownCustomerName = (customerObj) => {
    setShowCusDropdown(false)
    setCustomerId(customerObj?._id)
    setCustomer(customerObj?.name || '')

     customer.name === 'Walk in customer' ? setShowWalkingCustomerField(true) : setShowWalkingCustomerField(false)
  }

  // add to array list
  const addToList1 = (e) => {
    e.preventDefault()

    let isValid = true

    if (!title) {
      setTitleError(true)
      isValid = false
    }
    if (!quantity) {
      setQuantityError(true)
      isValid = false
    }
    if (!price) {
      setPriceError(true)
      isValid = false
    }
    if (!isValid) return

    // find the product in products array to get stockQuantity
    const product = products.find((p) => p._id === productId)
    if (product) {
      if (Number(quantity) > product.stockQuantity) {
        setShowStockCard(true)
        setProdTitle(product.title)
        return // stop adding
      }
    }

    const newItem = { productId, title, quantity, price, tax, taxAmount, unitCost, amount }
    setItemList((prevItems) => [...prevItems, newItem])

    // clear inputs after adding
    setSearchTitle('')
    setTitle('')
    setQuantity('')
    setPrice('')
    setTax('')
    setTaxAmount('')
    setUnitCost('')
    setAmount('')
    setProductId('')
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
    const updatedList = itemList.filter((_, i) => i !== index)
    setItemList(updatedList)
  }

  // increment or decrement product quantity in the list
  const updateQuantity = (index, delta) => {
    setItemList((prevList) => {
      return prevList.map((item, i) => {
        if (i === index) {
          const newQty = Math.max(1, parseInt(item.quantity) + delta)
          const price = parseFloat(item.price) || 0
          const taxRate = parseFloat(item.tax) || 0

          const taxAmountPerUnit = price * (taxRate / 100)
          const unitCost = price + taxAmountPerUnit
          const totalTaxAmount = taxAmountPerUnit * newQty
          const totalAmount = unitCost * newQty

          return {
            ...item,
            quantity: newQty,
            taxAmount: totalTaxAmount.toFixed(2),
            unitCost: unitCost.toFixed(2),
            amount: totalAmount.toFixed(2),
          }
        }
        return item
      })
    })
  }

  // submit handler
  const hanldeSumbit = async (e) => {

    e.preventDefault()

    if (itemList.length === 0) {
        toast.error("Please add at least one item to the sale.");
        return;
      }
   setIsBtnLoading(true)
    let isValid = true

    if (!saleDate) {
      setSaleDateError(true)
      isValid = false
    }
    if (!customer) {
      setCustomerNameError(true)
      isValid = false
    }
    if (!saleStatus) {
      setSaleStatusError(true)
      isValid = false
    }
    if (!saleAmount) {
      setSaleAmountError(true)
      isValid = false
    }
    if (!paymentType) {
      setPaymentTypeError(true)
      isValid = false
    }
    if (!paymentStatus) {
      setPaymentStatusError(true)
      isValid = false
    }

    if (paymentStatus === 'partial') {
      if (!amountPaid || parseFloat(amountPaid) <= 0) {
        setAmountPaidError(true)
        isValid = false
      }

          if(amountPaid === saleAmount){
            setShowAmountIsEQualBalance(true);
            setAmountPaidError(true);
            setIsBtnLoading(false)
            isValid = false;
        ;
        }
    if(amountPaid > saleAmount){
        setShowAmountExceedBalance(true);
        setIsBtnLoading(false)
        setAmountPaidError(true);
        isValid = false;
      }


    }

    if (!isValid) return

    const updateSale = {
      saleDate: new Date(saleDate),
      customer: customerId || undefined,
      saleStatus,
      walkingCustomerEmail,
      walkingCustomerNumber,
      saleAmount: Number(saleAmount),
      paymentStatus,
      paymentType,
      amountPaid: Number(amountPaid) || 0,
      dueBalance,
      note,
      subTotal: Number(subTotal),
      otherCharges: Number(otherCharges) || 0,
      discount: Number(discount) || 0,
      discountValue: Number(discountValue) || 0,
      shipping: Number(shipping) || 0,
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
      userId: user?._id,
    }
    try {
      const res = await axios.put(`${process.env.REACT_APP_URL}/api/sale/${saleId}`, updateSale, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate(`/sale-invoice/${saleId}`)
      toast.success('Sale Updated Successfully')
      setIsBtnLoading(false)
    } catch (err) {
                    console.error(err);
                     if (err.response) {
          const msg = err.response.data.message;
    
          // Show toast for stock errors
          if (msg.includes("Not enough stock")) {
             setIsBtnLoading(false);  
            toast.error(msg);
            return;
          }
    
          toast.error(msg || "Something went wrong");}
                    setIsBtnLoading(false);
            }
        
  }

  return (
    <EditSalesWrapper>
      <PageTitle title={`Sale (${saleCode})`} subTitle={'/ Edit'} />
      <>
        {isLoading ? (
          <List />
        ) : (
          <EditSalesContent>
            <ItemsWrapper>
              <SelectItemContent>
                <form>
                  <ItemContainer title={'Select Items'}>
                    <AnyItemContainer flxDirection="column">
                      {/* Wrap input + dropdown in the same ref so clicks inside won't close it */}
                      <div ref={productDropdownRef} style={{ position: 'relative', width: '100%' }}>
                        <Input
                          value={searchTitle}
                          title={'Search name'}
                          onChange={(e) => handleChange('searchTitle', e)}
                          error={searchTitleError}
                          type={'text'}
                          label={'Barcode/Item Code/name'}
                          placeholder={'search...'}
                          requiredSymbol={'*'}
                        />

                        
{showDropdwon && (
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
)}

                      </div>
                    </AnyItemContainer>

                    <AnyItemContainer>
                      <Input
                        value={title}
                        title={'Item Name'}
                        onChange={(e) => handleChange('title', e)}
                        error={titleError}
                        type={'text'}
                        label={'Name'}
                        requiredSymbol={'*'}
                      />

                      <Input
                        value={quantity}
                        title={'Quantity'}
                        onChange={(e) => handleChange('quantity', e)}
                        error={quantityError}
                        type={'text'}
                        label={'Quantity'}
                        requiredSymbol={'*'}
                      />

                      <Input
                        value={price}
                        title={'Price'}
                        onChange={() => {}}
                        error={priceError}
                        type={'text'}
                        label={'Price'}
                        requiredSymbol={'*'}
                        readOnly
                        inputBg={'#c4c4c449'}
                      />

                      <SelectInput
                        options={TaxItem}
                        label={'Tax(%)'}
                        value={tax}
                        error={taxError}
                        requiredSymbol={'*'}
                        title={'Tax'}
                        readOnly
                        onChange={(e) => handleChange('tax', e)}
                      />
                    </AnyItemContainer>

                    <AnyItemContainer>
                      <Input
                        value={taxAmount}
                        title={'Tax Amount'}
                        onChange={() => {}}
                        error={taxAmountError}
                        type={'number'}
                        label={'Tax Amount'}
                        requiredSymbol={'*'}
                        readOnly
                        inputBg={'#c4c4c449'}
                      />
                      <Input
                        value={unitCost}
                        title={'Unit Cost'}
                        onChange={() => {}}
                        type={'number'}
                        label={'Unit Cost'}
                        requiredSymbol={'*'}
                        readOnly
                        inputBg={'#c4c4c449'}
                      />
                      <Input
                        value={amount}
                        title={'Amount'}
                        onChange={() => {}}
                        type={'number'}
                        label={'Amount'}
                        requiredSymbol={'*'}
                        readOnly
                        inputBg={'#c4c4c449'}
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
                        btnOnClick={(e) => addToList(e)}
                      />
                    </ItemButtonWrapper>
                  </ItemContainer>
                </form>
              </SelectItemContent>

              {/* ItemList */}
              <ItemListContent>
                <ItemContainer title={'Item List'}>
                  <TableResponsiveWrapper>
                    {itemList.length > 0 ? (
                      <TableStyled>
                        <thead>
                          <TdStyled>
                            <b>#</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Item Name</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Price</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Qty</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Tax(%)</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Tax Amount</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Unit Cost</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Amount</b>
                          </TdStyled>
                          <TdStyled>
                            <b>Action</b>
                          </TdStyled>
                        </thead>
                        <tbody>
                          {itemList.map((data, i) => (
                            <tr key={i}>
                              <TdStyled>{i + 1}</TdStyled>
                              <TdStyled>{data.title}</TdStyled>
                              <TdStyled>{data.price}</TdStyled>
                              <TdStyled>
                                <button
                                  style={{ borderRadius: '100%', marginRight: '5px', border: 'none', cursor: 'pointer' }}
                                  onClick={() => updateQuantity(i, -1)}
                                  disabled={parseInt(data.quantity) <= 1}
                                >
                                  -
                                </button>
                                {data.quantity}
                                <button
                                  style={{ borderRadius: '100%', marginLeft: '5px', border: 'none', cursor: 'pointer' }}
                                  onClick={() => updateQuantity(i, 1)}
                                >
                                  +
                                </button>
                              </TdStyled>
                              <TdStyled>{data.tax}</TdStyled>
                              <TdStyled>{data.taxAmount}</TdStyled>
                              <TdStyled>{data.unitCost}</TdStyled>
                              <TdStyled>{data.amount}</TdStyled>
                              <TdStyled>
                                <span onClick={() => deleteItem(i)}>
                                  <FaTrash />
                                </span>
                              </TdStyled>
                            </tr>
                          ))}
                        </tbody>
                      </TableStyled>
                    ) : (
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                        }}
                      >
                        <h3>Sale Items</h3>
                        <p>Not Item on the List</p>
                      </div>
                    )}
                  </TableResponsiveWrapper>

                  <HrStyled />

                  {/* Total ChargesSection */}
                  <TotalChargesWrapper>
                    <AnyItemContainer justifyContent={'space-between'}>
                      <InnerWrapper>
                        <span>
                          <b>Total Quantities</b>
                        </span>
                        <span>{totalQuantity}</span>
                      </InnerWrapper>
                      <InnerWrapper>
                        <span>
                          <b>Sub Total</b>
                        </span>
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
                          {Number(subTotal).toLocaleString()}
                        </span>
                      </InnerWrapper>
                    </AnyItemContainer>

                    <AnyItemContainer justifyContent={'space-between'}>
                      <InnerWrapper>
                        <span>
                          <b> Other Charges</b>
                        </span>
                        <span>
                          <Input value={otherCharges} placeholder={'Other Charges'} onChange={(e) => handleChange('otherCharges', e)} type={'text'} />
                        </span>
                      </InnerWrapper>
                      <InnerWrapper>
                        <span>
                          <b> Other Charges</b>
                        </span>
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
                          {otherCharges ? otherCharges : 0}
                        </span>
                      </InnerWrapper>
                    </AnyItemContainer>

                    <AnyItemContainer justifyContent={'space-between'}>
                      <InnerWrapper>
                        <span>
                          <b>Discount</b>
                        </span>
                        <span>
                          <Input value={discount} placeholder={'Discount'} onChange={(e) => handleChange('discount', e)} type={'text'} />
                        </span>
                      </InnerWrapper>
                      <InnerWrapper>
                        <span>
                          <b> Discount {discount && '(' + discount + '%)'}
                          </b>
                        </span>
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
                          {discountValue ? Number(discountValue).toLocaleString() : 0}
                        </span>
                      </InnerWrapper>
                    </AnyItemContainer>

                    <AnyItemContainer justifyContent={'space-between'}>
                      <InnerWrapper>
                        <span>
                          <b>Shipping</b>
                        </span>
                        <span>
                          <Input value={shipping} placeholder={'Shipping'} onChange={(e) => handleChange('shipping', e)} type={'text'} />
                        </span>
                      </InnerWrapper>
                      <InnerWrapper>
                        <span>
                          <b>Shipping</b>
                        </span>
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
                          {shipping ? shipping : 0}
                        </span>
                      </InnerWrapper>
                    </AnyItemContainer>

                    <AnyItemContainer justifyContent={'space-between'}>
                      <InnerWrapper></InnerWrapper>
                      <InnerWrapper>
                        <span>
                          <b> Grand Total</b>
                        </span>
                        <span>
                          <b>
                            <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
                            {grandTotal ? grandTotal : 0}
                          </b>
                        </span>
                      </InnerWrapper>
                    </AnyItemContainer>
                  </TotalChargesWrapper>
                </ItemContainer>
              </ItemListContent>
            </ItemsWrapper>

            {/* Customer info */}
            <CustomerInfoWrapper>
              <form action="" onSubmit={(e) => hanldeSumbit(e)}>
                <ItemContainer title={'Customer Info'}>
                  <div ref={customerDropdownRef} style={{ position: 'relative', width: '100%' }}>
                    <Input
                      value={customer}
                      title={'Customer Name'}
                      onChange={(e) => handleChange('customer-name', e)}
                      error={customerNameError}
                      type={'text'}
                      label={'Customer Name'}
                      placeholder={'search...'}
                      requiredSymbol={'*'}
                    />

                    {showCusDropdown && (
                      <DropdownWrapper topPosition={'70px'} width={'100%'}>
                        {customerItems.filter((c) => customer.length > 0 && c.name.toLowerCase().includes(customer.toLowerCase())).length > 0 ? (
                          customerItems
                            .filter((c) => customer.length > 0 && c.name.toLowerCase().includes(customer.toLowerCase()))
                            .map((data, i) => (
                              <DropdownItems key={i} onClick={() => dropdownCustomerName(data)}>
                                {data.name}
                              </DropdownItems>
                            ))
                        ) : (
                          <DropdownItems>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
                              <span>No such customer </span>
                              <a href="/add-customer">Please click here to add </a>
                            </div>
                          </DropdownItems>
                        )}
                      </DropdownWrapper>
                    )}
                  </div>

                  <Input value={saleDate} title={'Date'} onChange={(e) => handleChange('sale-date', e)} type={'date'} label={'Date'} error={saleDateError} requiredSymbol={'*'} />

                  <SelectInput options={saleStatusItem} label={'Sale Status'} value={saleStatus} error={saleStatusError} requiredSymbol={'*'} title={'Sale Status'} onChange={(e) => handleChange('sale-status', e)} />

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
                  <Input value={saleAmount} title={'Sale Amount'} onChange={(e) => handleChange('sale-amount', e)} type={'text'} label={'Sale Amount'} requiredSymbol={'*'} readOnly inputBg={'#c4c4c449'} error={saleAmountError} />

                  <SelectInput options={paymentStatusItems} label={'Payment Status'} value={paymentStatus} error={paymentStatusError} requiredSymbol={'*'} title={'Payment Status'} onChange={(e) => handleChange('payment-status', e)} />

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {showPartialField && (
                      <Input value={amountPaid} title={'Amount Paid'} onChange={(e) => handleChange('amount-paid', e)} type={'text'} label={'Amount Paid'} requiredSymbol={'*'} placeholder={'0.00'} error={amountPaidError} />
                    )}

                    {showPartialField && (
                      <Input value={dueBalance} title={'Due Balance'} onChange={(e) => handleChange('due-amount', e)} type={'text'} label={'Due Balance'} readOnly inputBg={'#c4c4c449'} />
                    )}
                  </div>

                  <SelectInput options={paymentTypeItems} label={'Payment Type'} value={paymentType} error={paymentTypeError} requiredSymbol={'*'} title={'Payment Type'} onChange={(e) => handleChange('payment-type', e)} />

                  <TextArea label={'Note'} title={'Note'} onChange={(e) => handleChange('note', e)} value={note} />

                  <ItemButtonWrapper btnAlign={'flex-start'}>
                    <Button btnText={isBtnLoading ? <ButtonLoader text={'Updating...'} /> : 'Update Sale'} btnFontSize={'12px'} btnColor={'green'} btnTxtClr={'white'} btnAlign={'flex-end'} />
                  </ItemButtonWrapper>
                </ItemContainer>
              </form>
            </CustomerInfoWrapper>
          </EditSalesContent>
        )}
      </>

      <ToastComponents />

      {showOutOfStockCard && (
        <Overlay contentWidth="30%" overlayButtonClick={navigateToAddStock} closeOverlayOnClick={closOutOfStockCard} btnText1={'Add Purchase'} btnText2={'Cancel'}>
          <p style={{ margin: '40px', textAlign: 'center', fontSize: '14px', lineHeight: '25px' }}>
            <b style={{ textTransform: 'capitalize', fontSize: '20px' }}>{prodTitle}</b>
            <br /> Is currently out of stock <br />please add more purchase
          </p>
        </Overlay>
      )}

      {showStockCard && (
        <Overlay contentWidth="30%" overlayButtonClick={navigateToAddStock} closeOverlayOnClick={closAboveStockCard} btnText1={'Add Purchase'} btnText2={'Cancel'}>
          <p style={{ margin: '40px', textAlign: 'center', fontSize: '14px', lineHeight: '25px' }}>
            <b style={{ textTransform: 'capitalize', fontSize: '20px' }}>{prodTitle}</b>
            <br /> cannot be added. Quantity exceeds stock quantity {prodStock}
            <br />please add more purchase
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
    </EditSalesWrapper>
  )
}
