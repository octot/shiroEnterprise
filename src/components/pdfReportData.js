import React from 'react';
import { StyleSheet, PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
const PdfReportData = ({ items, customerDetails, date,
  shipmentDetails, gstTotalValues }) => {
  console.log("gstTotalValues from pdf ", gstTotalValues)
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      // padding: 20,
      borderWidth: 2,
      borderColor: '#000000',
      borderStyle: 'solid',
      // margin: 2,
    },
    section: {
      
      lineHeight: .5,
      fontSize: 13,
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: '90%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      marginTop: 180,
      marginLeft: 30,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomColor: '#bfbfbf',
      borderBottomWidth: 1,
    },
    tableCell: {
      flex: 1,
      padding: 5,
      borderRightColor: '#bfbfbf',
      borderRightWidth: 1,
      textAlign: 'center',
      fontSize: '10'
    },
    headerCell: {
      flex: 1,
      padding: 5,
      borderRightColor: '#bfbfbf',
      borderRightWidth: 1,
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      fontSize: '10'
    },
    slnoCell: { flex: 1 },
    descriptionCell: { flex: 2.6 },
    hsnCodeCell: { flex: 2 },
    qtyCell: { flex: 2 },
    rateCell: { flex: 2 },
    totalCell: { flex: 2 },
    descriptionTotalCell: { flex: 4.16 },
    gstTotalCell: {
      flex: 51.7,
    },
    gstTotalLabelCell: { flex: 9.7 },
    gstTotalValueCell: { flex: 9.7 },
    gstCellContainer: {
      height: 35,
      flex: 4,
      flexDirection: 'column',
    },
    gstCellContainerValue: {
      height: 21,
      flex: 4,
      flexDirection: 'column',
    },
    gstCell: {
      flexDirection: 'row',
    },
    gstHeading: {
      fontSize: 12,
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: 3,
      borderBottomColor: '#bfbfbf',
      borderBottomWidth: 1,
      borderRightColor: '#bfbfbf',
      borderRightWidth: 1,
    },
    gstSubHeader: {
      backgroundColor: '#f0f0f0',
      flex: 1,
      borderRightColor: '#bfbfbf',
      borderRightWidth: 1,
      padding: 5,
      textAlign: 'center',
      fontSize: 10,
    },
    gstSubHeaderLast: {
      backgroundColor: '#f0f0f0',
      borderRightColor: '#bfbfbf',
      borderRightWidth: 1,
      flex: 1,
      padding: 5,
      textAlign: 'center',
      fontSize: 10, // Adjust the font size here
    },
    termsStyle: {
      textAlign:'left',
      width:'65%',
      border: '1px solid #000',
      padding: '5px',
      margin: '10px 0',
      marginLeft: '26px', // Move it to the left by 10px
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    termItemStyle: {
      fontSize:6,
      display: 'block', // Ensures TEXT tags display like list items
      margin: '5px 0'
    }
  });
  return (
    <div>
      <h1>Pdf report</h1>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
        {/* shipmentDetails */}
          <Page size="A4" style={styles.page}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14 }}>Item Details Table</Text>
            </View>
            <View>
              <View style={styles.section}>
                <Text>Customer Name: {customerDetails.customerName}</Text>
              </View>
              <View style={styles.section}>
                <Text>Address: {customerDetails.address}</Text>
              </View>
              <View style={styles.section}>
                <Text>Customer GST: {customerDetails.customerGst}</Text>
              </View>
              <View style={styles.section}>
                <Text>Phone Number: {customerDetails.phoneNumber}</Text>
              </View>
              <View style={styles.section}>
                <Text>Date: {date}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, textAlign:'right' }}>Shipment  Details</Text>
            </View>
            <View style={{textAlign:'right',marginLeft:'-10'}}>
              <View style={styles.section}>
                <Text>Customer Name: {shipmentDetails.customerName}</Text>
              </View>
              <View style={styles.section}>
                <Text>Address: {shipmentDetails.address}</Text>
              </View>
              <View style={styles.section}>
                <Text>Customer GST: {shipmentDetails.customerGst}</Text>
              </View>
              <View style={styles.section}>
                <Text>Phone Number: {shipmentDetails.phoneNumber}</Text>
              </View>
              <View style={styles.section}>
                <Text>Date: {date}</Text>
              </View>
            </View>




            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={[styles.headerCell, styles.slnoCell]}>SL No</Text>
                <Text style={[styles.headerCell, styles.descriptionCell]}>Description</Text>
                <Text style={[styles.headerCell, styles.hsnCodeCell]}>HSN Code</Text>
                <Text style={[styles.headerCell, styles.qtyCell]}>Quantity</Text>
                <Text style={[styles.headerCell, styles.rateCell]}>Rate</Text>
                <Text style={[styles.headerCell, styles.totalCell]}>Total</Text>
                {/* CGST combined header */}
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
              {/* Table Rows */}
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
                      <Text style={styles.gstSubHeader}>{item.cgstRate}</Text>
                      <Text style={styles.gstSubHeaderLast}>{item.cgstAmount}</Text>
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
              {/* gstTotalValues [cgstTotal, sgstTotal, igstTotal, rateTotal, gstTotalSum,
                 roundOff,invoiceTotalInr] */}
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
              {/* 
               */}
            </View>
            <View style={styles.termsStyle}>
              <Text>TERMS OF SALE</Text>
              <Text style={styles.termItemStyle}>Goods once sold will not be taken back, replaced, or refunded.</Text>
              <Text style={styles.termItemStyle}>Warranty strictly as per the vendor terms only.</Text>
              <Text style={styles.termItemStyle}>There will be no warranty or replacement for physical or external damages caused by the courier service.</Text>
              <Text style={styles.termItemStyle}>After the payment due date, interest @24% per month will be charged on the overdue amount.</Text>
              <Text style={styles.termItemStyle}>Rs.500 will be charged per cheque if it is bounced.</Text>
              <Text style={styles.termItemStyle}>The cheque has to be given within 5 days of purchase.</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default PdfReportData;
