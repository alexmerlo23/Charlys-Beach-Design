## Best full stack ecommerce website

![fullstack_ecommerce_website_using_reactjs](https://github.com/noorjsdivs/ecommerceyt/assets/104062645/a72bc8de-8426-4031-bfbd-13c7fe3eb01f)

### To initialize the project:
* Clone the project from this repo,
* cd into admin directory
* make npm install and run npm start
* From the root directory cd into client
* make npm install and npm run dev to start
* Create firebase app and get the credentials
* Paste the firebase credentials on firebase.ts in client
* Configure the cart email settings below before using cart submissions.

### Cart email requests

The cart form emails a confirmation to the customer and sends the customer's email and cart items to `alexmerlo23@gmail.com`. It does not collect payment. Copy `admin/.env.example` to `admin/.env.local` and fill in the SMTP values there. Keep the existing `admin/.env` unchanged; it is tracked by Git. For Gmail, use an App Password for `SMTP_PASS` (not your normal account password).

Run the backend from `admin` with `npm start`, and the frontend from `client` with `npm run dev`. The client updates live through Vite while the dev server is running. Real email delivery requires valid SMTP credentials.

_Happy coding
