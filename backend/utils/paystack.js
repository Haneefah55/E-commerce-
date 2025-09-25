import paystack from 'paystack'

import dotenv from 'dotenv'


dotenv.config()



const paystackClient = paystack(process.env.PAYSTACK_SECRET_KEY)

export default paystackClient
  