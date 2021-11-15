const supportedInstruments = [
    {
      supportedMethods: ['https://tez.google.com/pay'],
      data: {
        pa: 'merchant-vpa@xxx', // Admin address or business virtual payment address (VPA).
        pn: 'Merchant Name', // Admin name or business name.
        tr: '1234ABCD',  // your custom transaction reference ID
        url: 'http://url/of/the/order/in/your/website',
        mc: '1234', // your merchant category code
        tn: 'Purchase in Merchant',
        gstBrkUp: 'GST:16.90|CGST:08.45|SGST:08.45', // GST value break up
        invoiceNo: 'BillRef123', // your invoice number
        invoiceDate: '2019-06-11T13:21:50+05:30', // your invoice date and time
        gstIn: '29ABCDE1234F2Z5', // your GSTIN
      },
    }
  ];


  const details = {
	total: {
	  label: 'Total',
	  amount: {
		currency: 'INR',
		value: '10.01', // sample amount
	  },
	},
	displayItems: [{
	  label: 'Original Amount',
	  amount: {
		currency: 'INR',
		value: '10.01',
	  },
	}],
  };
  

let request = null;
try {
  request = new PaymentRequest(supportedInstruments, details);
} catch (e) {
  console.log('Payment Request Error: ' + e.message);
  return;
}
if (!request) {
  console.log('Web payments are not supported in this browser.');
  return;
}

