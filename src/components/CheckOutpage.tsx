

//   "use client";
// import React, { useEffect, useState } from 'react';
// import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';

// const CheckoutPage = ({ amount }: { amount: number }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string>();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [couponCode, setCouponCode] = useState("");
//   const [showAmount, setShowAmount] = useState(amount); // State to show amount
//   const [discountAmount, setDiscountAmount] = useState<number | null>(null); // State to store discount

//   const initializeStripe = async () => {
//     console.log("Initializing Stripe with coupon code:", couponCode);
//     console.log("Received amount:", amount); // Debugging log
//     const formData = { amount, coupon_code: couponCode }; // Include coupon code in request
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_payment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       // Log the entire response before checking if it's ok
//       console.log('Response from server:', response);

//       if (!response.ok) {
//         console.error('Failed to create payment intent:', await response.text());
//         setError('Failed to apply coupon. Please try again.');
//         return;
//       }

//       // Parse the response JSON
//       const responseData = await response.json();
//       console.log('Response data received:', responseData); // Log the parsed response data

//       const { clientSecret, discount_amount, final_amount } = responseData;
//       console.log("Client secret received:", clientSecret);
//       console.log("Discount amount received:", discount_amount); // Debugging log
//       console.log("Final amount received:", final_amount);

//       // Update state with the received data
//       setClientSecret(clientSecret);
//       setDiscountAmount(discount_amount);
//       if (final_amount !== undefined) {
//         setShowAmount(final_amount);
//       }

//       // Display success message
//       setError("Coupon added successfully");
//     } catch (error) {
//       console.error('Error initializing Stripe:', error);
//       setError('Unable to initialize payment. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (amount > 0) {
//       initializeStripe();
//     }
//   }, [amount]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);
//     const { error: submitError } = await elements.submit();

//     if (submitError) {
//       setError(submitError.message || 'Form submission error');
//       setLoading(false);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `${window.location.origin}/payment-success`,
//       },
//     });

//     if (error) {
//       setError(error.message || 'An unexpected error occurred.');
//     } else {
//       setError(undefined);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <h1>Amount: ${amount}</h1> {/* Assuming the initial amount is in cents */}
//       {discountAmount !== null && (
//         <div>
//           <h2>Discount: ${discountAmount}</h2> {/* Assuming discountAmount is in cents */}
//           <h2>Final Amount: ${amount-discountAmount}</h2> {/* Assuming showAmount is in cents */}
//           <p style={{ color: 'green' }}>Coupon added successfully</p>
//         </div>
//       )}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         <label htmlFor="coupon">Coupon Code:</label>
//         <input
//           type="text"
//           id="coupon"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           placeholder="Enter coupon code"
//         />
//         <button type="button" onClick={initializeStripe}>
//           Apply Coupon
//         </button>
//       </div>
//       {clientSecret && elements && (
//         <form onSubmit={handleSubmit}>
//           <AddressElement options={{ mode: 'billing' }} />
//           <PaymentElement />
//           <button type="submit" disabled={loading || !stripe || !elements}>
//             {loading ? 'Processing...' : 'Submit Payment'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;







"use client"

import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, DollarSign } from 'lucide-react'
import {getFirebaseIdToken} from "@/service/AuthHelper";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [finalAmount, setFinalAmount] = useState(amount)
  const [discountAmount, setDiscountAmount] = useState<number | null>(null)

  const initializeStripe = async (couponToApply: string = "") => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    const formData = { amount, coupon_code: couponToApply }
    try {
      const idToken = await getFirebaseIdToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken,

        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const { clientSecret, discount_amount, final_amount } = await response.json()

      setClientSecret(clientSecret)
      setDiscountAmount(discount_amount)
      setFinalAmount(final_amount)

      if (discount_amount > 0) {
        setSuccess("Coupon applied successfully")
      }
    } catch (error) {
      console.error('Error initializing Stripe:', error)
      setError(error instanceof Error ? error.message : 'Unable to initialize payment. Please try again.')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (amount > 0) {
      initializeStripe()
    }
  }, [amount])

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      initializeStripe(couponCode)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
      
    }

    setLoading(true)
    setError(null)

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setError(submitError.message || 'Form submission error')
      setLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setError(error.message || 'An unexpected error occurred.')
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="text-2xl">Checkout</CardTitle>
        <CardDescription className="text-blue-100">Complete your purchase securely</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <span className="text-lg font-medium text-gray-700">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600">${finalAmount.toFixed(2)}</span>
        </div>
        {discountAmount !== null && discountAmount > 0 && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Discount Applied</AlertTitle>
            <AlertDescription className="text-green-700">
              <div>Discount: ${discountAmount.toFixed(2)}</div>
              <div className="font-semibold">You save: ${(amount - finalAmount).toFixed(2)}</div>
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="bg-blue-50 border-blue-200">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800">{success}</AlertTitle>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="coupon" className="text-gray-700">Coupon Code</Label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-grow"
            />
            <Button onClick={handleApplyCoupon} disabled={loading || !couponCode.trim()} className="bg-blue-600 hover:bg-blue-700">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Apply'}
            </Button>
          </div>
        </div>
        {clientSecret && elements && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-700">Billing Address</Label>
              <AddressElement options={{ mode: 'billing' }} />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Payment Details</Label>
              <PaymentElement />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading || !stripe || !elements}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <DollarSign className="h-5 w-5 mr-2" />}
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}