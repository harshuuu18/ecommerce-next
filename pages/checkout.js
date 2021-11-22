/** @format */

import Button from "@material-ui/core/Button";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import validator from "validator";

export default function LoginModal({ styles }) {
  const StyleRef = useRef();
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const canMakePaymentCache = "canMakePaymentCache";
  const [otp, setOtp] = useState("");
  const [gOtp, setGOtp] = useState();
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState([]);
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const {
    cart,
    time,
    payment,
    comment,
    voucher,
    amount,
    userid,
    username,
    mobile,
    address,
    totalitems,
    delivered,
    date,
    vendors,
  } = order;

  useEffect(() => {
    var Order = JSON.parse(localStorage.getItem("temperory-cart"));
    var User = JSON.parse(localStorage.getItem("user"));
    setOrder(Order);
    if (User) {
      setUser(User);
    }
  }, []);

  const CheckOut = async () => {
    if (!order) {
      return toast.error("You Cart is empty", options);
    }

    try {
      toast.info("Placing Your Order", options);
      console.log(order);
      const response = await fetch(`/api/auth/checkOut`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(order),
      });

      const Data = await response.json();
      if (Data.message) {
        toast.success("Order placed successfully", options);
        localStorage.removeItem("temperory-cart");
        localStorage.removeItem("items");
        router.push("/account");
      } else {
        toast.error(Data.error, options);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onBuyClicked = () => {
    if (!window.PaymentRequest) {
      return console.log("Web payments are not supported in this browser.");
    }

    let formValue = {
      pa: "merchant-vpa@xxx", // Admin address or business virtual payment address (VPA).
      pn: "Merchant Name", // Admin name or business name.
      tr: "1234ABCD", // your custom transaction reference ID
      url: "http://url/of/the/order/in/your/website",
      mc: "1234", // your merchant category code
      tn: "Purchase in Merchant",
      gstBrkUp: "GST:16.90|CGST:08.45|SGST:08.45", // GST value break up
      invoiceNo: "BillRef123", // your invoice number
      invoiceDate: "2019-06-11T13:21:50+05:30", // your invoice date and time
      gstIn: "29ABCDE1234F2Z5", // your GSTIN
    };

    const supportedInstruments = [
      {
        supportedMethods: ["https://pwp-server.appspot.com/pay-dev"],
        data: formValue,
      },
      {
        supportedMethods: ["https://tez.google.com/pay"],
        data: formValue,
      },
    ];

    const details = {
      total: {
        label: "Total",
        amount: {
          currency: "INR",
          value: amount,
        },
      },
      displayItems: [
        {
          label: "Original amount",
          amount: {
            currency: "INR",
            value: amount,
          },
        },
      ],
    };

    const options = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true,
    };

    let request = null;
    try {
      request = new PaymentRequest(supportedInstruments, details, options);
    } catch (e) {
      return console.log("Payment Request Error: " + e.message);
    }
    if (!request) {
      return console.log("Web payments are not supported in this browser.");
    }

    var canMakePaymentPromise = checkCanMakePayment(request);
    canMakePaymentPromise
      .then((result) => {
        showPaymentUI(request, result);
      })
      .catch((err) => {
        console.log("Error calling checkCanMakePayment: " + err);
      });
  };

  /**
   * Checks whether can make a payment with Tez on this device. It checks the
   * session storage cache first and uses the cached information if it exists.
   * Otherwise, it calls canMakePayment method from the Payment Request object and
   * returns the result. The result is also stored in the session storage cache
   * for future use.
   *
   * @private
   * @param {PaymentRequest} request The payment request object.
   * @return {Promise} a promise containing the result of whether can make payment.
   */
  function checkCanMakePayment(request) {
    // Checks canMakePayment cache, and use the cache result if it exists.
    if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
      return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
    }

    // If canMakePayment() isn't available, default to assuming that the method is
    // supported.
    var canMakePaymentPromise = Promise.resolve(true);

    // Feature detect canMakePayment().
    if (request.canMakePayment) {
      canMakePaymentPromise = request.canMakePayment();
    }

    return canMakePaymentPromise
      .then((result) => {
        // Store the result in cache for future usage.
        sessionStorage[canMakePaymentCache] = result;
        return result;
      })
      .catch((err) => {
        console.log("Error calling canMakePayment: " + err);
      });
  }

  /**
   * Show the payment request UI.
   *
   * @private
   * @param {PaymentRequest} request The payment request object.
   * @param {Promise} canMakePayment The promise for whether can make payment.
   */
  function showPaymentUI(request, canMakePayment) {
    // Redirect to play store if can't make payment.
    if (!canMakePayment) {
      return redirectToPlayStore();
    }

    // Set payment timeout.
    let paymentTimeout = window.setTimeout(function () {
      window.clearTimeout(paymentTimeout);
      request
        .abort()
        .then(function () {
          console.log("Payment timed out after 20 minutes.");
        })
        .catch(function () {
          console.log("Unable to abort, user is in the process of paying.");
        });
    }, 20 * 60 * 1000); /* 20 minutes */

    request
      .show()
      .then(function (instrument) {
        window.clearTimeout(paymentTimeout);
        processResponse(instrument); // Handle response from browser.
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  /**
   * Process the response from browser.
   *
   * @private
   * @param {PaymentResponse} instrument The payment instrument that was authed.
   */
  function processResponse(instrument) {
    var instrumentString = instrumentToJsonString(instrument);
    console.log(instrumentString);

    fetch("/buy", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: instrumentString,
      credentials: "include",
    })
      .then(function (buyResult) {
        if (buyResult.ok) {
          return buyResult.json();
        }
        console.log("Error sending instrument to server.");
      })
      .then(function (buyResultJson) {
        completePayment(
          instrument,
          buyResultJson.status,
          buyResultJson.message
        );
      })
      .catch(function (err) {
        console.log("Unable to process payment. " + err);
      });
  }

  /**
   * Notify browser that the instrument authorization has completed.
   *
   * @private
   * @param {PaymentResponse} instrument The payment instrument that was authed.
   * @param {string} result Whether the auth was successful. Should be either
   * 'success' or 'fail'.
   * @param {string} msg The message to log in console.
   */
  function completePayment(instrument, result, msg) {
    instrument
      .complete(result)
      .then(function () {
        console.log("Payment completes.");
        console.log(msg);
        document.getElementById("inputSection").style.display = "none";
        document.getElementById("outputSection").style.display = "block";
        document.getElementById("response").innerHTML = JSON.stringify(
          instrument,
          undefined,
          2
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  /** Redirect to PlayStore. */
  function redirectToPlayStore() {
    if (confirm("Tez not installed, go to play store and install?")) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user.alpha";
    }
  }

  /**
   * Converts the shipping address into a JSON string.
   *
   * @private
   * @param {PaymentAddress} address The address to convert.
   * @return {string} The string representation of the address.
   */
  function addressToJsonString(address) {
    var addressDictionary = address.toJSON
      ? address.toJSON()
      : {
          recipient: address.recipient,
          organization: address.organization,
          addressLine: address.addressLine,
          dependentLocality: address.dependentLocality,
          city: address.city,
          region: address.region,
          postalCode: address.postalCode,
          sortingCode: address.sortingCode,
          country: address.country,
          phone: address.phone,
        };
    return JSON.stringify(addressDictionary, undefined, 2);
  }

  /**
   * Converts the payment instrument into a JSON string.
   *
   * @private
   * @param {PaymentResponse} instrument The instrument to convert.
   * @return {string} The string representation of the instrument.
   */
  function instrumentToJsonString(instrument) {
    // PaymentResponse is an interface, JSON.stringify works only on dictionaries.
    var instrumentDictionary = {
      methodName: instrument.methodName,
      details: instrument.details,
      shippingAddress: addressToJsonString(instrument.shippingAddress),
      shippingOption: instrument.shippingOption,
      payerName: instrument.payerName,
      payerPhone: instrument.payerPhone,
      payerEmail: instrument.payerEmail,
    };
    return JSON.stringify(instrumentDictionary, undefined, 2);
  }

  /**
   * Update order details with shipping information.
   *
   * @private
   * @param {PaymentDetails} details The details for payment.
   
   * @param {function} callback The callback to invoke.
   */

  return (
    <div className="modal" style={styles}>
      <form className="login-div" style={{ height: "80%" }}>
        <Button
          id="login-back"
          onClick={(e) => {
            router.back();
          }}
        >
          X
        </Button>

        <div className="login-heading">
          <h2>Welcome to Ecommerce</h2>
          <h5>Login with Email & Mobile </h5>
        </div>

        <div className="checkout-detail">
          <span>
            <img src="/bag512.png" alt="" width="15px" />
            Total Item: {totalitems}
          </span>

          <span>
            <img src="/rupee.png" alt="" width="15px" />
            Total price: {amount}
          </span>
        </div>

        <div className="checkout-detail">
          <span>
            <img src="/user512.png" alt="" width="15px" />
            {user.name}
          </span>

          <span>
            <img src="/user512.png" alt="" width="15px" />
            {user.email}
          </span>

          <span>
            <img src="/home512.png" alt="" width="15px" />
            {address ? address.street : ""}, {"  "}
            {address ? address.city : ""},{address ? address.state : ""},
            {address ? address.pin : ""}
          </span>
        </div>

        <div className="checkout-detail">
          <span>
            <img src="/flash512.png" alt="" width="15px" />
            Note: {comment}
          </span>

          <span>
            <img src="/flash512.png" alt="" width="15px" />
            Discount: {voucher}
          </span>
        </div>

        <div className="checkout-detail">
          <span>
            <img src="/rupee.png" alt="" width="15px" />
            Payment Status: {payment}
          </span>
        </div>

        <br />
        <Button id="login-button-v" onClick={() => onBuyClicked()}>
          Confirm Payment
        </Button>
        <br />
        <Button id="login-button" onClick={() => CheckOut()}>
          Order
        </Button>
      </form>
      <div id="outputSection" style={{ display: "none" }}>
        <pre id="response"></pre>
      </div>
    </div>
  );
}
