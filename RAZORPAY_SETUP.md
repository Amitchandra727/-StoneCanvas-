# Razorpay Payment Gateway Setup

This document provides instructions for setting up Razorpay payment integration for StoneCanvas.

## Prerequisites

1. Create a Razorpay account at https://razorpay.com
2. Complete the KYC verification process
3. Generate API keys from the Razorpay dashboard

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Next.js Public Variables (for client-side)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Getting Your Razorpay Credentials

1. Log in to your Razorpay dashboard
2. Navigate to Settings → API Keys
3. You'll see two sets of keys:
   - **Test Mode**: For development and testing
   - **Live Mode**: For production use

4. Copy the Key ID and Key Secret for the appropriate mode

## Development Setup

For development, use the Test Mode credentials:

```env
RAZORPAY_KEY_ID=rzp_test_your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_test_key_id
```

## Production Setup

For production, use the Live Mode credentials:

```env
RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_live_key_id
```

## Security Notes

- **Never commit your `.env.local` file to version control**
- **Never expose your Key Secret on the client-side**
- Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` should be exposed to the client
- The Key Secret should only be used server-side in API routes

## Testing the Integration

1. Add test credentials to your `.env.local` file
2. Restart your development server
3. Go through the checkout flow
4. Use Razorpay test cards for payment:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - OTP: Any OTP (Razorpay will show it on screen)

## API Endpoints

The following API endpoints are available:

- `POST /api/create-order` - Creates a Razorpay order
- `POST /api/verify-payment` - Verifies payment signature

## Webhook Setup (Optional)

For production, set up webhooks to receive payment notifications:

1. In Razorpay dashboard, go to Settings → Webhooks
2. Add a new webhook with your server URL
3. Select events: `payment.captured`, `payment.failed`
4. Implement webhook handler in your backend

## Common Issues

### Payment fails with "Invalid signature"
- Ensure your Key Secret is correct
- Check that the signature verification logic is correct
- Verify the order ID matches

### Razorpay checkout doesn't open
- Ensure the Razorpay script is loaded
- Check browser console for errors
- Verify your Key ID is correct

### Order creation fails
- Check your API credentials
- Ensure the amount is in paise (multiply by 100)
- Verify your Razorpay account is active

## Support

For Razorpay-specific issues, contact:
- Razorpay Support: https://razorpay.com/support/
- Documentation: https://razorpay.com/docs/

## Next Steps

1. Add your Razorpay credentials to `.env.local`
2. Test the payment flow in development
3. Set up webhooks for production
4. Monitor payments in Razorpay dashboard
