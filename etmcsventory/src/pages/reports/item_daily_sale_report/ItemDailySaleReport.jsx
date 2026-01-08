import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnyItemContaineri,
  DateWrapper,
  Logo,
  LogoDateWrapper,
  LogoWrapper,
  ReportHeaderContent,
  ReportHeaderWrapper,
  SalesReportContent,
  SalesReportWrapper,
  SearchReportWrapper,
  SearchResultWrapper,
  AddressWrapper,
  ItemsDailySaleContent,
  ItemsDailySaleReportWrapper
} from './itemDailySaleReport.style'

import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { FaPrint } from 'react-icons/fa'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import Input from '../../../components/input/Input'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import ItemContainer from '../../../components/item_container/ItemContainer'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import CompanyLogo from '../../../images/product_placeholder.jpg'
import axios from 'axios'
import {
  DropdownItems,
  DropdownWrapper
} from '../../purchase/add/addPurchase.style'
import ItemsDailyReportTable from '../../../components/table/report_table/items_daily_report_table/ItemsDailyReportTable'

export default function ItemsDailyReport() {
  const token = localStorage.getItem('token')

  const searchCustomerBy = [
    { title: 'Select', value: '' },
    { title: 'All-Dates', value: 'All-Dates' },
    { title: 'Selected-Dates', value: 'Selected-Dates' }
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingAll, setIsGeneratingAll] = useState(false)
  const [searchBy, setSearchBy] = useState('')
  const [searchError, setSearchError] = useState(false)

  const [fromDate, setFromDate] = useState('')
  const [fromDateError, setFromDateError] = useState(false)

  const [toDate, setToDate] = useState('')
  const [toDateError, setToDateError] = useState(false)

  const [showDateRange, setShowDateRange] = useState(false)

  const [company, setCompany] = useState('')
  const [saleData, setSaleData] = useState([])

  // PRODUCT SEARCH
  const [product, setProduct] = useState('')
  const [productError, setProductError] = useState(false)
  const [productItems, setProductItems] = useState([])
  const [showProdDropdown, setShowProdDropdown] = useState(false)
  const [productId, setProductId] = useState('')

  const [showAllReportButton, setShowAllReportButton] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCompany(res.data[0])
      } catch (error) {
        console.log(error)
      }
    }

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/products/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setProductItems(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSale = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/reports/daily-sale`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setSaleData(res.data.data)
        console.log("sale data ......\n", res.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompany()
    getProducts()
    fetchSale()
  }, [])

  // SELECT FROM DROPDOWN
  const dropdownProductTitle = productItem => {
    setShowProdDropdown(false)
    setProductId(productItem._id)
    setProduct(productItem.title)
  }

  const onChangeHandler = (type, e) => {
    if (type === 'product-title') {
      const value = e.target.value
      setProduct(value)
      setShowProdDropdown(value.length > 0)
      setProductError(false)
    } else if (type === 'search') {
      const value = e.target.value
      setSearchBy(value)
      setSearchError(false)
      setShowDateRange(value === 'Selected-Dates')
    } else if (type === 'from-date') {
      setFromDate(e.target.value)
      setFromDateError(false)
    } else if (type === 'to-date') {
      setToDate(e.target.value)
      setToDateError(false)
    }
  }

  // SUBMIT HANDLER
  const submitHandler = async e => {
    e.preventDefault()

    let isValid = true

    if (!product) {
      setProductError(true)
      isValid = false
    }

    if (!searchBy) {
      setSearchError(true)
      isValid = false
    }

    if (searchBy === 'Selected-Dates') {
      if (!fromDate) {
        setFromDateError(true)
        isValid = false
      }
      if (!toDate) {
        setToDateError(true)
        isValid = false
      }
    }

    if (!isValid) return

    setIsGenerating(true)
    setIsLoading(true)

    try {
      const params = {}

      // SELECT DATE RANGE
      if (searchBy === 'Selected-Dates') {
        params.startDate = fromDate
        params.endDate = toDate
      }

      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/reports/daily-sale`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params
        }
      )

      const allSales = res.data.data

      // NOW WE ONLY FILTER PRODUCT ON THE FRONTEND
      const filtered = allSales.filter(
        sale => sale._id.productId.toString() === productId
      )

      setSaleData(filtered)
      setShowAllReportButton(true)
    } catch (err) {
      console.log(err)
    } finally {
      setIsGenerating(false)
      setIsLoading(false)
    }
  }

  // FETCH ALL REPORTS (RESET)
  const refetchSale = async e => {
    e.preventDefault()
    setSearchBy('')
    setFromDate('')
    setToDate('')
    setProduct('')
    setShowAllReportButton(false)

    setIsGeneratingAll(true)
    setIsLoading(true)

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/reports/daily-sale`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setSaleData(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsGeneratingAll(false)
      setIsLoading(false)
    }
  }

  const navigate = useNavigate()

  return (
    <ItemsDailySaleReportWrapper>
      <PageTitle title='Daily Sales Report' />

      {/* SEARCH REPORT */}
      {productItems.length > 0 && (
        <SearchReportWrapper>
          <form>
            <ItemContainer title='Generate Report'>
              <AnyItemContainer>
                {/* PRODUCT */}
                <Input
                  value={product}
                  title={'Product Title'}
                  onChange={e => onChangeHandler('product-title', e)}
                  error={productError}
                  type={'text'}
                  label={'Product Title'}
                  placeholder={'Search...'}
                  requiredSymbol='*'
                />

                {showProdDropdown && (
                  <DropdownWrapper width={'33%'} topPosition={'50px'}>
                    {productItems
                      .filter(p =>
                        p.title.toLowerCase().includes(product.toLowerCase())
                      )
                      .map((data, i) => (
                        <DropdownItems
                          key={i}
                          onClick={() => dropdownProductTitle(data)}
                        >
                          {data.title}
                        </DropdownItems>
                      ))}
                  </DropdownWrapper>
                )}

                {/* SEARCH TYPE */}
                <SelectInput
                  onChange={e => onChangeHandler('search', e)}
                  error={searchError}
                  options={searchCustomerBy}
                  label={'Search by'}
                  title={'Search by'}
                  value={searchBy}
                  requiredSymbol='*'
                />

                {/* DATE RANGE */}
                {showDateRange && (
                  <>
                    <Input
                      value={fromDate}
                      title={'From Date'}
                      onChange={e => onChangeHandler('from-date', e)}
                      type={'date'}
                      error={fromDateError}
                      label={'From Date'}
                      requiredSymbol='*'
                    />
                    <Input
                      value={toDate}
                      title={'To Date'}
                      onChange={e => onChangeHandler('to-date', e)}
                      type={'date'}
                      error={toDateError}
                      label={'To Date'}
                      requiredSymbol='*'
                    />
                  </>
                )}
              </AnyItemContainer>

              <ItemButtonWrapper btnAlign='flex-start'>
                <Button
                  btnOnClick={submitHandler}
                  btnText={
                    isGenerating ? <ButtonLoader text='Generating...' /> : 'Generate'
                  }
                  btnFontSize='12px'
                  btnColor='Green'
                  btnTxtClr='white'
                />

                {showAllReportButton && (
                  <Button
                    btnOnClick={refetchSale}
                    btnText={
                      isGeneratingAll ? (
                        <ButtonLoader text='Generating...' />
                      ) : (
                        'All Reports'
                      )
                    }
                    btnFontSize='12px'
                    btnColor='#0284c7'
                    btnTxtClr='white'
                  />
                )}
              </ItemButtonWrapper>
            </ItemContainer>
          </form>
        </SearchReportWrapper>
      )}

      {/* REPORT CONTENT */}
      <ItemsDailySaleContent>
        <ListHeader
          title='print'
          btnOnClick={() => {}}
          type={'text'}
          dataLength={saleData.length}
          icon={<FaPrint />}
          inputDisplay={'none'}
        />

        {/* HEADER */}
        <ReportHeaderWrapper>
          <ReportHeaderContent>
            <LogoWrapper>
              <Logo>
                <div>
                  <img
                    src={
                      company
                        ? process.env.REACT_APP_URL + '/images/' + company.companyLogo
                        : CompanyLogo
                    }
                    alt=''
                  />
                </div>
              </Logo>

              {company && (
                <AddressWrapper>
                  <h3>{company.companyName?.toUpperCase()}</h3>
                  <span>
                    <b>Address:</b> {company.address}
                  </span>
                  <span>
                    <b>Phone:</b> {company.phoneNumber}
                  </span>
                  <span>
                    <b>Email:</b> {company.companyEmail}
                  </span>
                </AddressWrapper>
              )}
            </LogoWrapper>

            {/* DATE / INFO */}
            {product && (
              <DateWrapper>
                <h3>SALES REPORT</h3>
                <span>
                  Report for <b style={{ textTransform: 'capitalize' }}> {product}</b>
                </span>

                {searchBy === 'Selected-Dates' ? (
                  <span>
                    {fromDate} <b>To</b> {toDate}
                  </span>
                ) : (
                  <span>
                    <b>{searchBy}</b>
                  </span>
                )}
              </DateWrapper>
            )}
          </ReportHeaderContent>
        </ReportHeaderWrapper>

        <ItemsDailyReportTable
          data={saleData}
          currencySymbol={company?.currencySymbol}
        />
      </ItemsDailySaleContent>
    </ItemsDailySaleReportWrapper>
  )
}
