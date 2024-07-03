import React from 'react';
import { Image, StyleSheet, PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
import logoheader from '../images/logoheader.jpg'
import paymentDetails from '../images/paymentDetails.jpg'
import termsOfSale from '../images/termsOfSale.jpg'
import styles from '../componentStyles/pdfReportStyle'
const PdfReportData = ({ items, customerDetails, date,
  shipmentDetails, gstTotalValues }) => {
  console.log("items from pdf ", items)
  function itemsToParts(items, itemSize) {
    let itemsTotalArray = []
    for (let i = 0; i < items.length; i += itemSize) {
      let itemsSubArray = items.slice(i, i + itemSize)
      itemsTotalArray.push(itemsSubArray)
    }
    return itemsTotalArray
  }
  const itemsInPiecesList = itemsToParts(items, 10)
  console.log("itemsInPieces ", itemsInPiecesList)
  return (
    <div>
      <h1>Pdf report</h1>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
          {itemsInPiecesList.map((itemsInPieces, index) => (
            <Page size="A4" style={styles.page}>
              <View style={styles.pageStyle}>
                <View style={styles.logoheaderContainer}>
                  <Image src={logoheader} style={styles.logoheader} />
                </View>
                <View style={styles.customerAndShipmentDetails}>
                  <View style={styles.column}>
                    <View style={styles.detailSection}>
                      <Text>Customer Name: {customerDetails.customerName}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Address: {customerDetails.address}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Customer GST: {customerDetails.customerGst}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Phone Number: {customerDetails.phoneNumber}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Date: {date}</Text>
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.column}>
                    <View style={styles.detailSection}>
                      <Text>Customer Name: {shipmentDetails.customerName}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Address: {shipmentDetails.address}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Customer GST: {shipmentDetails.customerGst}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Phone Number: {shipmentDetails.phoneNumber}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Date: {date}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.headerCell, styles.slnoCell]}>SL No</Text>
                    <Text style={[styles.headerCell, styles.descriptionCell]}>Description</Text>
                    <Text style={[styles.headerCell, styles.hsnCodeCell]}>HSN Code</Text>
                    <Text style={[styles.headerCell, styles.qtyCell]}>Quantity</Text>
                    <Text style={[styles.headerCell, styles.rateCell]}>Rate</Text>
                    <Text style={[styles.headerCell, styles.totalCell]}>Total</Text>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >CGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >SGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >IGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                  </View>
                  {itemsInPieces.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                      <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                      <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                      <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                      <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                      <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeaderValue}>{item.cgstRate}</Text>
                          <Text style={styles.gstSubHeaderLastValue}>{item.cgstAmount}</Text>
                        </View>
                      </View>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeaderValue}>{item.sgstRate}</Text>
                          <Text style={styles.gstSubHeaderLastValue}>{item.sgstAmount}</Text>
                        </View>
                      </View>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeaderValue}>{item.igstRate}</Text>
                          <Text style={styles.gstSubHeaderLastValue}>{item.igstAmount}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeaderValue}> </Text>
                        <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues.cgstTotal}</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeaderValue}> </Text>
                        <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues.sgstTotal}</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeaderValue}> </Text>
                        <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues.igstTotal}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>GST TOTAL</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.gstTotalSum}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>RATE TOTAL</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.rateTotal}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>Roundoff</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.roundOff}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>Invoice Total INR</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.invoiceTotalInr}</Text>
                  </View>
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
          { /*
          <Page size="A4" style={styles.page}>
            <View style={styles.pageStyle}>
              <View>
                <View style={styles.logoheaderContainer}>
                  <Image src={logoheader} style={styles.logoheader} />
                </View>
                <View style={styles.box}>
                  <View style={styles.column}>
                    <View style={styles.detailSection}>
                      <Text>Customer Name: {customerDetails.customerName}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Address: {customerDetails.address}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Customer GST: {customerDetails.customerGst}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Phone Number: {customerDetails.phoneNumber}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Date: {date}</Text>
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.column}>
                    <View style={styles.detailSection}>
                      <Text>Customer Name: {shipmentDetails.customerName}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Address: {shipmentDetails.address}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Customer GST: {shipmentDetails.customerGst}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Phone Number: {shipmentDetails.phoneNumber}</Text>
                    </View>
                    <View style={styles.detailSection}>
                      <Text>Date: {date}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.headerCell, styles.slnoCell]}>SL No</Text>
                    <Text style={[styles.headerCell, styles.descriptionCell]}>Description</Text>
                    <Text style={[styles.headerCell, styles.hsnCodeCell]}>HSN Code</Text>
                    <Text style={[styles.headerCell, styles.qtyCell]}>Quantity</Text>
                    <Text style={[styles.headerCell, styles.rateCell]}>Rate</Text>
                    <Text style={[styles.headerCell, styles.totalCell]}>Total</Text>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >CGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >SGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainer}>
                      <Text
                        style={styles.gstHeading}
                      >IGST</Text>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}>Rate</Text>
                        <Text style={styles.gstSubHeaderLast}>Amount</Text>
                      </View>
                    </View>
                  </View>
                  {items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                      <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                      <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                      <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                      <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                      <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeaderValue}>{item.cgstRate}</Text>
                          <Text style={styles.gstSubHeaderLastValue}>{item.cgstAmount}</Text>
                        </View>
                      </View>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeader}>{item.sgstRate}</Text>
                          <Text style={styles.gstSubHeaderLast}>{item.sgstAmount}</Text>
                        </View>
                      </View>
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={styles.gstSubHeader}>{item.igstRate}</Text>
                          <Text style={styles.gstSubHeaderLast}>{item.igstAmount}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                    <Text style={[styles.tableCell, styles.hsnCodeCell]}></Text>
                    <Text style={[styles.tableCell, styles.qtyCell]}></Text>
                    <Text style={[styles.tableCell, styles.rateCell]}></Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}></Text>
                        <Text style={styles.gstSubHeaderLast}>{gstTotalValues.cgstTotal}</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}></Text>
                        <Text style={styles.gstSubHeaderLast}>{gstTotalValues.sgstTotal}</Text>
                      </View>
                    </View>
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeader}></Text>
                        <Text style={styles.gstSubHeaderLast}>{gstTotalValues.igstTotal}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>GST TOTAL</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.gstTotalSum}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>RATE TOTAL</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.rateTotal}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>Roundoff</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.roundOff}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>Invoice Total INR</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues.invoiceTotalInr}</Text>
                  </View>
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
            </View>
          </Page>
                  */}
        </Document>
      </PDFViewer>
    </div >
  );
};
export default PdfReportData;
