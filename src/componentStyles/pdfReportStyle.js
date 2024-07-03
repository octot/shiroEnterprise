import { StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    pageStyle: {
        margin: '0',
        height: 'auto',
        width: '100%',
        // border: '1 px solid black'
    },
    logoheaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoheader: {
        margin: '0',
        width: '100%',
    },
    termsOfSalePaymentDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
    },
    termsOfSaleContainer: {
        borderTop: '1 px solid black',
        width: '45%',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        // backgroundColor:'red'
    },
    termsOfSale: {
        width: '90%',
    },
    paymentDetailsContainer: {
        borderTop: '1 px solid black',
        width: '45%',
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        height:'100%'
    },
    paymentDetails: {
        width: '100%',
    },
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
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
        borderColor: 'black',
        marginTop: 10,
        marginLeft: 30,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    tableCell: {
        flex: 1,
        padding: 5,
        borderRightColor: 'black',
        borderRightWidth: 1,
        textAlign: 'center',
        fontSize: '10'
    },
    headerCell: {
        flex: 1,
        padding: 5,
        borderRightColor: 'black',
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
    totalCell: { flex: 2.3 },
    descriptionTotalCell: {
        flex: 11.85
    },
    gstTotalCell: {
        flex: 52.6,
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    gstSubHeader: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        borderRightColor: 'black',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    gstSubHeaderValue: {
        flex: 1,
        borderRightColor: 'black',
        borderRightWidth: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    gstSubHeaderLastValue: {
        borderRightColor: 'black',
        borderRightWidth: 1,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 9,
    },
    gstSubHeaderLast: {
        backgroundColor: '#f0f0f0',
        borderRightColor: 'black',
        borderRightWidth: 1,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 9,
    },
    customerAndShipmentDetails: {
        width: '90%',  // Adjust width as needed
        height: 100,   // Adjust height as needed
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 30,
        marginTop: 50
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    detailSection: {
        fontSize: 10,
        lineHeight: 1,
        marginBottom: 10,
    },
    sectionHeader: {
        fontSize: 14,
        textAlign: 'right',
        marginBottom: 10,
    },
    separator: {
        width: 1,
        backgroundColor: '#000',
        height: 98,
        marginTop: -10
    },
});
export default styles;