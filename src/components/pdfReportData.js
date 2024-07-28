import { React, useState } from 'react';
import { Image, PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
import logoheader from '../images/logoheader.jpg'
import paymentDetails from '../images/paymentDetails.jpg'
import termsOfSale from '../images/termsOfSale.jpg'
import styles from '../componentStyles/pdfReportStyle'
import { pdf } from '@react-pdf/renderer';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
const PdfReportData = ({ items, customerDetails, date,
  shipmentDetails, gstTotalValues, billNo }) => {
  const URl = 'https://shiroenterprise.onrender.com/api'
  // const URl='http://localhost:3001/api'
  const StyledButton = styled(Button)({
    backgroundColor: '#4caf50',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#45a049',
    },
    padding: '10px 20px',
    fontSize: '16px',
    margin: '20px 0',
    textAlign: 'center  '
  });
  // const [isGenerating, setIsGenerating] = useState(false);
  function itemsToParts(items, itemSize) {
    let itemsTotalArray = []
    for (let i = 0; i < items.length; i += itemSize) {
      let itemsSubArray = items.slice(i, i + itemSize)
      itemsTotalArray.push(itemsSubArray)
    }
    return itemsTotalArray
  }
  const itemsInPiecesList = itemsToParts(items, 10)
  const customerInfo = [
    { label: 'Customer Name', value: customerDetails.customerName },
    { label: 'Address', value: customerDetails.address },
    { label: 'Customer GST', value: customerDetails.customerGst },
    { label: 'Phone Number', value: customerDetails.phoneNumber },
    { label: 'Date', value: date }
  ];
  const shipmentInfo = [
    { label: 'Customer Name', value: shipmentDetails.customerName },
    { label: 'Address', value: shipmentDetails.address },
    { label: 'Customer GST', value: shipmentDetails.customerGst },
    { label: 'Phone Number', value: shipmentDetails.phoneNumber },
    { label: 'Date', value: date }
  ];
  const gstList = ['CGST', 'SGST', 'IGST'];
  const gstTotalList = ['cgstTotal', 'sgstTotal', 'igstTotal'];
  const gstTotalFInalListMap = [
    {
      columnName: 'GST TOTAL', columnValue: 'gstTotalSum'
    },
    {
      columnName: 'RATE TOTAL', columnValue: 'rateTotal'
    },
    {
      columnName: 'Roundoff', columnValue: 'roundOff'
    },
    {
      columnName: 'Invoice Total', columnValue: 'invoiceTotalInr'
    },
  ];
  const gstCellContainerValueMap = [
    { key: 'cgstRate', value: 'cgstAmount' },
    { key: 'sgstRate', value: 'sgstAmount' },
    { key: 'igstRate', value: 'igstAmount' },
  ]
  const combinedDataOfCustShipItemBill = {
    items: items, customerDetails: customerDetails, date: date,
    shipmentDetails: shipmentDetails, gstTotalValues: gstTotalValues, billNo: billNo
  }

  const setCustShipItemBillDetails = async () => {
    try {
      const custShipItemBillDetailsData = await fetch(`${URl}/setCustShipItemBillDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedDataOfCustShipItemBill)
      });
      const data = await custShipItemBillDetailsData.json();
      console.log("custShipItemBillDetailsData ", data)
    } catch (err) {
      console.error("Failed to fetch data from setCustShipItemBillDetails ", err);
    }
  };
  const generateBillNumber = async () => {
    try {
      const responseOfGeneratedBillNumber = await fetch(`${URl}/nextBillNumber`);
      if (!responseOfGeneratedBillNumber.ok) {
        throw new Error("Could not generateBillNumber")
      }
      const generatedBillNumber = await responseOfGeneratedBillNumber.json();
      return generatedBillNumber.billNumber
    }
    catch (error) {
      throw new Error("Failed to fetch data from generateAPI ", error)
    }
  }
  const downloadPdfDocument = async () => {
    try {
      if (!billNo) {
        billNo = await generateBillNumber()
      }
      if (!billNo) {
        throw new Error('Failed to generate bill number');
      }
      const pdfBlob = await pdf(<Document>
        {itemsInPiecesList.map((itemsInPieces, index) => (
          <Page size="A4" style={styles.page}>
            <View style={styles.pageStyle}>
              <View style={styles.logoheaderContainer}>
                <Image src={logoheader} style={styles.logoheader} />
              </View>
              <View>
                <View style={styles.billNoContainer}>
                  <Text>BillNo: {billNo}</Text>
                </View>
              </View>
              <View style={styles.customerAndShipmentDetails}>
                <View style={styles.customerInfoContainer}>
                  <Text style={styles.customerDetailsTitle}>CustomerDetails</Text>
                  {customerInfo.map((info, index) => (
                    <View style={styles.detailSection} key={index}>
                      {info.label == 'Address' ? (
                        <View style={styles.customerAndShipmentDetailsAddress}>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </>
                      )
                      }
                    </View>
                  ))}
                </View>
                <View style={styles.separator} />
                <View style={styles.shipmentInfoContainer}>
                  <Text style={styles.customerDetailsTitle}>ShipmentDetails</Text>
                  {shipmentInfo.map((info, index) => (
                    <View style={styles.detailSection} key={index}>
                      {info.label == 'Address' ? (
                        <View style={styles.customerAndShipmentDetailsAddress}>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </>
                      )
                      }
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.headerCell, styles.slnoCell, styles.boldRobotFont]}>SL No</Text>
                  <Text style={[styles.headerCell, styles.descriptionCell, styles.boldRobotFont]}>Description</Text>
                  <Text style={[styles.headerCell, styles.hsnCodeCell, styles.boldRobotFont]}>HSN Code</Text>
                  <Text style={[styles.headerCell, styles.qtyCell, styles.boldRobotFont]}>Quantity</Text>
                  <Text style={[styles.headerCell, styles.rateCell, styles.boldRobotFont]}>Rate</Text>
                  <Text style={[styles.headerCell, styles.totalCell, styles.boldRobotFont]}>Total</Text>
                  {
                    gstList.map(tax => (
                      <View key={tax} style={styles.gstCellContainer}>
                        <Text style={[styles.gstHeading, styles.boldRobotFont]}>
                          {tax}
                        </Text>
                        <View style={styles.gstCell}>
                          <Text style={[styles.gstSubHeader, styles.boldRobotFont]}>Rate</Text>
                          <Text style={[styles.gstSubHeaderLast, styles.boldRobotFont]}>Amount</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
                {itemsInPieces.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                    <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                    <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                    <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                    <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                    {
                      gstCellContainerValueMap.map((attribute) => (
                        <View style={styles.gstCellContainerValue}>
                          <View style={styles.gstCell}>
                            <Text style={styles.gstSubHeaderValue}>{item[attribute.key]}</Text>
                            <Text style={styles.gstSubHeaderLastValue}>{item[attribute.value]}</Text>
                          </View>
                        </View>
                      ))}
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                  <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                  {gstTotalList.map((gstTotalAttribute) => (
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={[styles.gstSubHeaderValue]}></Text>
                        <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues[gstTotalAttribute]}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                {gstTotalFInalListMap.map((column) => (
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>{column.columnName}</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues[column.columnValue]}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.termsOfSalePaymentDetailsContainer}>
                <View style={styles.termsOfSaleContainer}>
                  <Image src={termsOfSale} style={styles.termsOfSale} />
                </View>
                <View style={styles.paymentDetailsContainer}>
                  <Image src={paymentDetails} style={styles.paymentDetails} />
                </View>
              </View>
            </View>
          </Page>
        ))}
      </Document>).toBlob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url;
      link.download = billNo
      link.click()
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Error generating or downloading PDF:', error);
    }
    try {
      await setCustShipItemBillDetails();
    }
    catch (error) {
      throw new Error('Error from setCustShipItemBillDetails');
    }
  };
  const DownloadPdf = () => {
    return <StyledButton onClick={downloadPdfDocument}>Download PDF</StyledButton>
  }
  return (
    <div>
      <DownloadPdf />
      {/*  
            <h1>Pdf report</h1>
     
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
          {itemsInPiecesList.map((itemsInPieces, index) => (
            <Page size="A4" style={styles.page}>
              <View style={styles.pageStyle}>
                <View style={styles.logoheaderContainer}>
                  <Image src={logoheader} style={styles.logoheader} />
                </View>
                <View>
                  <View style={styles.billNoContainer}>
                    <Text>BillNo: {billNo}</Text>
                  </View>
                </View>
                <View style={styles.customerAndShipmentDetails}>
                  <View style={styles.customerInfoContainer}>
                    <Text style={styles.customerDetailsTitle}>CustomerDetails</Text>
                    {customerInfo.map((info, index) => (
                      <View style={styles.detailSection} key={index}>
                        {info.label == 'Address' ? (
                          <View style={styles.customerAndShipmentDetailsAddress}>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </View>
                        ) : (
                          <>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </>
                        )
                        }
                      </View>
                    ))}
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.shipmentInfoContainer}>
                    <Text style={styles.customerDetailsTitle}>ShipmentDetails</Text>
                    {shipmentInfo.map((info, index) => (
                      <View style={styles.detailSection} key={index}>
                        {info.label == 'Address' ? (
                          <View style={styles.customerAndShipmentDetailsAddress}>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </View>
                        ) : (
                          <>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </>
                        )
                        }
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.headerCell, styles.slnoCell, styles.boldRobotFont]}>SL No</Text>
                    <Text style={[styles.headerCell, styles.descriptionCell, styles.boldRobotFont]}>Description</Text>
                    <Text style={[styles.headerCell, styles.hsnCodeCell, styles.boldRobotFont]}>HSN Code</Text>
                    <Text style={[styles.headerCell, styles.qtyCell, styles.boldRobotFont]}>Quantity</Text>
                    <Text style={[styles.headerCell, styles.rateCell, styles.boldRobotFont]}>Rate</Text>
                    <Text style={[styles.headerCell, styles.totalCell, styles.boldRobotFont]}>Total</Text>
                    {
                      gstList.map(tax => (
                        <View key={tax} style={styles.gstCellContainer}>
                          <Text style={[styles.gstHeading, styles.boldRobotFont]}>
                            {tax}
                          </Text>
                          <View style={styles.gstCell}>
                            <Text style={[styles.gstSubHeader, styles.boldRobotFont]}>Rate</Text>
                            <Text style={[styles.gstSubHeaderLast, styles.boldRobotFont]}>Amount</Text>
                          </View>
                        </View>
                      ))
                    }
                  </View>
                  {itemsInPieces.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                      <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                      <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                      <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                      <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                      <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                      {
                        gstCellContainerValueMap.map((attribute) => (
                          <View style={styles.gstCellContainerValue}>
                            <View style={styles.gstCell}>
                              <Text style={styles.gstSubHeaderValue}>{item[attribute.key]}</Text>
                              <Text style={styles.gstSubHeaderLastValue}>{item[attribute.value]}</Text>
                            </View>
                          </View>
                        ))}
                    </View>
                  ))}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                    {gstTotalList.map((gstTotalAttribute) => (
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={[styles.gstSubHeaderValue]}></Text>
                          <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues[gstTotalAttribute]}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  {gstTotalFInalListMap.map((column) => (
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                      <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>{column.columnName}</Text>
                      <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues[column.columnValue]}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.termsOfSalePaymentDetailsContainer}>
                  <View style={styles.termsOfSaleContainer}>
                    <Image src={termsOfSale} style={styles.termsOfSale} />
                  </View>
                  <View style={styles.paymentDetailsContainer}>
                    <Image src={paymentDetails} style={styles.paymentDetails} />
                  </View>
                </View>
              </View>
            </Page>
          ))}
        </Document>
      </PDFViewer>
       */}
    </div >
  );
};
export default PdfReportData;
