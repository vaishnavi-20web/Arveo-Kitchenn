# ARVÉO KITCHEN — Full Stack (Frontend + Backend + MySQL)

Restaurant website for ARVÉO KITCHEN with a Node.js + Express + MySQL backend
powering Feedback, Enquiry, Online Ordering (incl. QR table ordering), Table
Reservations, Party Hall Booking, Function Food Pre-booking, and Cake Booking.

The frontend UI, styling, animations, and navigation are **unchanged** — only
the JavaScript submission logic inside `frontend/ArveoKitchen.html` was
updated to call the real backend instead of simulating success locally.

---

## Project Structure

```
ARVEO-KITCHEN/
│
├── frontend/
│      ArveoKitchen.html          # Single-file React (CDN) app — UI unchanged
│
├── backend/
│      server.js                  # Express app entry point
│      package.json
│      .env                       # DB connection settings
│      config/
│           db.js                 # MySQL connection pool (mysql2/promise)
│      routes/                    # One router per module
│      controllers/               # Request handling / response shaping
│      models/                    # Raw SQL queries per table
│      middleware/
│           validation.js         # Shared express-validator chains
│
├── database/
│      arveo_kitchen.sql          # CREATE DATABASE + all tables + sample data
│
└── README.md
```

This follows an **MVC architecture**: routes → controllers → models, with
validation as middleware in front of each controller.

---

## 1. Prerequisites

- [Node.js](https://nodejs.org) v18+ and npm
- MySQL Server 8.x (or MariaDB 10.x) running locally
- A modern browser

---

## 2. Database Setup

1. Make sure MySQL is running.
2. Import the schema (creates the `arveo_kitchen` database and all tables,
   plus a few optional sample rows):

   ```bash
   mysql -u root -p < database/arveo_kitchen.sql
   ```

   If your MySQL root user has no password, omit `-p`.

---

## 3. Backend Setup

```bash
cd backend
npm install
```

This installs:

| Package            | Purpose                                   |
|---------------------|--------------------------------------------|
| express             | Web framework / routing                    |
| mysql2              | MySQL driver (promise-based)               |
| dotenv              | Loads `.env` config                        |
| cors                | Allows the frontend (different origin) to call the API |
| express-validator   | Request validation                          |
| nodemon (dev only)  | Auto-restarts server on file changes       |

### Configure `.env`

Already included with sensible local defaults — edit if your MySQL setup differs:

```
DB_HOST=localhost
DB_PORT=20379
DB_USER=root
DB_PASSWORD=
DB_NAME=arveo_kitchen
PORT=5000
```

### Run the backend

```bash
npm start        # production
# or
npm run dev       # auto-restart on changes (requires nodemon)
```

You should see:

```
✅ MySQL connected successfully to 'arveo_kitchen' at localhost:20379
🚀 ARVÉO KITCHEN API running at http://localhost:5000
```

Check it's alive: open `http://localhost:5000/api/health` in a browser —
you should get `{"success":true,"message":"ARVÉO KITCHEN API is running."}`.

---

## 4. Running the Frontend

The frontend is a single static HTML file — no build step required.

- Simplest: double-click `frontend/ArveoKitchen.html` to open it in your browser.
- Or serve it (recommended, avoids some browsers' `file://` restrictions):

  ```bash
  cd frontend
  npx serve .
  ```

The frontend calls the backend at `http://localhost:5000/api` (see the
`API_BASE` constant near the top of the `<script type="text/babel">` block
in `ArveoKitchen.html`). Change that constant if you deploy the backend
somewhere else.

**Important:** the backend must be running (step 3) before submitting any
form, or you'll see "Unable to process your request. Please try again."

---

## 5. API Documentation

All endpoints return JSON in the shape `{ success, message?, data?, errors? }`.
Validation failures return **HTTP 422** with a `errors` array of
`{ field, message }`. Server errors return **HTTP 500** with a generic
`"Unable to process your request. Please try again."` message (matching the
frontend's failure UI). Not-found lookups return **HTTP 404**.

### Feedback
```
POST    /api/feedback        Create feedback
GET     /api/feedback        List all feedback
GET     /api/feedback/:id    Get one feedback entry
DELETE  /api/feedback/:id    Delete a feedback entry
```
Body (POST): `full_name` (required), `phone` (optional, 10 digits),
`email` (optional), `overall_rating` (required, 1–5), plus optional
`food_quality`, `taste`, `service`, `staff_behaviour`, `cleanliness`,
`ambience`, `waiting_time`, `value_for_money` (each 1–5), `emoji_reaction`,
`visit_again`, `recommend`, `menu_items`, `experience`, `suggestions`.

### Enquiry
```
POST    /api/enquiry
GET     /api/enquiry
GET     /api/enquiry/:id
DELETE  /api/enquiry/:id
```
Body: `name` (required), `phone` (optional, 10 digits), `email` (optional),
`category` (required), `subject` (required), `description`, `priority`
(Low/Medium/High), `contact_method` (Phone/WhatsApp/Email).

### Orders (Online Ordering + QR Table Ordering)
```
POST    /api/orders
GET     /api/orders
GET     /api/orders/:id
DELETE  /api/orders/:id
```
Body: `customer_name` (required), `phone` (required, 10 digits), `email`,
`address`, `notes`, `delivery_option` (required), `payment_method`
(required), `total_amount` (required, number), `order_items` (required,
non-empty array of `{ id, name, price, qty }`).

> QR table ordering posts to this same endpoint with `delivery_option:
> "QR Table Order"` and a table-identifying placeholder name/phone, since
> QR ordering intentionally has no login or contact form.

### Reservations
```
POST    /api/reservations
GET     /api/reservations
GET     /api/reservations/:id
DELETE  /api/reservations/:id
```
Body: `name` (required), `phone` (required, 10 digits), `email`,
`reservation_date` (required, YYYY-MM-DD), `reservation_time` (required,
HH:MM), `guests` (required, > 0), `special_requests`.

### Party Hall Booking
```
POST    /api/partyhall
GET     /api/partyhall
GET     /api/partyhall/:id
DELETE  /api/partyhall/:id
GET     /api/partyhall/availability?hall_name=Grand%20Hall
```
Body: `hall_name` (required), `customer_name` (required), `phone`
(required, 10 digits), `email`, `function_type` (required), `booking_date`
(required), `booking_time` (required), `guest_count` (required, > 0),
`special_requirements`.

The `availability` endpoint returns `{ success, hall_name, bookedDates }` —
the frontend uses this to show already-booked dates for the selected hall
before a booking is confirmed.

### Function Food Pre-booking
```
POST    /api/function-booking
GET     /api/function-booking
GET     /api/function-booking/:id
DELETE  /api/function-booking/:id
```
Body: `function_type` (required), `hall_name` (required), `food_package`
(required), `guest_count` (required, > 0), `booking_date` (required),
`booking_time` (optional).

### Cake Booking
```
POST    /api/cake-booking
GET     /api/cake-booking
GET     /api/cake-booking/:id
DELETE  /api/cake-booking/:id
```
Body: `cake_type` (required), `weight` (required, kg), `message`,
`reference_image` (filename, optional), `delivery_time`,
`with_hall_booking` (boolean), `price` (required).

---

## 6. Validation Rules (express-validator)

- Full name / name: required, non-empty
- Phone: exactly 10 digits where required
- Email: valid email format when provided
- Guest counts: must be a positive integer
- Ratings: must be an integer between 1 and 5
- Dates: valid ISO date (YYYY-MM-DD); Times: valid HH:MM
- Every module has its own required-field checks (see routes/ files)

---

## 7. Notes on Design Decisions

- **MVC layout:** `routes/` only wires HTTP verbs + validation to
  `controllers/`; `controllers/` only shape requests/responses;
  `models/` are the only files that touch SQL.
- **Connection pooling:** `config/db.js` exports a `mysql2/promise` pool
  (not a single connection), so concurrent requests are handled safely.
- **CORS** is enabled broadly since the frontend is a static file that may
  be opened via `file://` or a different local port than the API.
- **No file storage server** is included for cake reference-image uploads —
  the filename is stored in `reference_image` as a string. Wiring actual
  file storage (e.g. multer + disk/S3) is a natural next step if needed.
- The frontend's **UI, CSS, animations, layout, and components were not
  modified** — only the `submit`/click-handler JavaScript logic inside
  each form component was changed to call the API, plus a small,
  visually-consistent inline error message (`.av-error-msg`) was added so
  failures are visible to the user, since forms previously had no failure
  path.
