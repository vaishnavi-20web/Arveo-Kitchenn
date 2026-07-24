-- =====================================================================
-- ARVÉO KITCHEN — Database Schema
-- Run this file to create the database and all required tables.
--   mysql -u root -p < arveo_kitchen.sql
-- =====================================================================

CREATE DATABASE IF NOT EXISTS arveo_kitchen
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE arveo_kitchen;

-- ---------------------------------------------------------------------
-- feedbacks
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feedbacks (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  full_name         VARCHAR(150)  NOT NULL,
  phone             VARCHAR(10)   NULL,
  email             VARCHAR(150)  NULL,
  overall_rating    TINYINT       NOT NULL,
  food_quality      TINYINT       NULL,
  taste             TINYINT       NULL,
  service           TINYINT       NULL,
  staff_behaviour   TINYINT       NULL,
  cleanliness       TINYINT       NULL,
  ambience          TINYINT       NULL,
  waiting_time      TINYINT       NULL,
  value_for_money   TINYINT       NULL,
  emoji_reaction    VARCHAR(10)   NULL,
  visit_again       VARCHAR(10)   NULL,
  recommend         VARCHAR(10)   NULL,
  menu_items        TEXT          NULL,
  experience        TEXT          NULL,
  suggestions       TEXT          NULL,
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_overall_rating CHECK (overall_rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- enquiries
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(150)  NOT NULL,
  phone           VARCHAR(10)   NULL,
  email           VARCHAR(150)  NULL,
  category        VARCHAR(100)  NOT NULL,
  subject         VARCHAR(200)  NOT NULL,
  description     TEXT          NULL,
  priority        VARCHAR(10)   NOT NULL DEFAULT 'Low',
  contact_method  VARCHAR(20)   NOT NULL DEFAULT 'Phone',
  created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- food_orders
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS food_orders (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  customer_name     VARCHAR(150)  NOT NULL,
  phone             VARCHAR(10)   NOT NULL,
  email             VARCHAR(150)  NULL,
  address           TEXT          NULL,
  notes             TEXT          NULL,
  delivery_option   VARCHAR(30)   NOT NULL,
  payment_method    VARCHAR(30)   NOT NULL,
  total_amount      DECIMAL(10,2) NOT NULL,
  order_items       JSON          NOT NULL,
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- reservations
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reservations (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  name                VARCHAR(150)  NOT NULL,
  phone               VARCHAR(10)   NOT NULL,
  email               VARCHAR(150)  NULL,
  reservation_date    DATE          NOT NULL,
  reservation_time    TIME          NOT NULL,
  guests              INT           NOT NULL,
  special_requests    TEXT          NULL,
  created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_guests_positive CHECK (guests > 0)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- party_hall_bookings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS party_hall_bookings (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  hall_name             VARCHAR(50)   NOT NULL,
  customer_name         VARCHAR(150)  NOT NULL,
  phone                 VARCHAR(10)   NOT NULL,
  email                 VARCHAR(150)  NULL,
  function_type         VARCHAR(50)   NOT NULL,
  booking_date          DATE          NOT NULL,
  booking_time          TIME          NOT NULL,
  guest_count           INT           NOT NULL,
  special_requirements  TEXT          NULL,
  created_at            TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_hall_guests_positive CHECK (guest_count > 0)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- function_bookings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS function_bookings (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  function_type  VARCHAR(50)   NOT NULL,
  hall_name      VARCHAR(50)   NOT NULL,
  food_package   VARCHAR(50)   NOT NULL,
  guest_count    INT           NOT NULL,
  booking_date   DATE          NOT NULL,
  booking_time   TIME          NULL,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_fb_guests_positive CHECK (guest_count > 0)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- cake_bookings
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cake_bookings (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  cake_type         VARCHAR(50)   NOT NULL,
  weight            DECIMAL(4,1)  NOT NULL,
  message           VARCHAR(200)  NULL,
  reference_image   VARCHAR(255)  NULL,
  delivery_time     TIME          NULL,
  with_hall_booking BOOLEAN       NOT NULL DEFAULT FALSE,
  price             DECIMAL(10,2) NOT NULL,
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================================
-- Optional sample data
-- =====================================================================

INSERT INTO feedbacks (full_name, phone, email, overall_rating, food_quality, taste, service, staff_behaviour, cleanliness, ambience, waiting_time, value_for_money, emoji_reaction, visit_again, recommend, menu_items, experience, suggestions)
VALUES ('Ramesh Kumar', '9876543210', 'ramesh@example.com', 5, 5, 5, 4, 5, 5, 4, 4, 5, '😍', 'Yes', 'Yes', 'Chicken Biryani, Gulab Jamun', 'Excellent ambience and great value for money.', 'Add more South Indian breakfast options.');

INSERT INTO enquiries (name, phone, email, category, subject, description, priority, contact_method)
VALUES ('Divya Sharma', '9123456780', 'divya@example.com', 'Party Hall Booking', 'Availability for December', 'Wanted to check Grand Hall availability for a wedding reception.', 'Medium', 'WhatsApp');

INSERT INTO reservations (name, phone, email, reservation_date, reservation_time, guests, special_requests)
VALUES ('Arjun Patel', '9988776655', 'arjun@example.com', '2026-08-15', '19:30:00', 4, 'Window seating preferred.');

INSERT INTO party_hall_bookings (hall_name, customer_name, phone, email, function_type, booking_date, booking_time, guest_count, special_requirements)
VALUES ('Grand Hall', 'Sneha Reddy', '9012345678', 'sneha@example.com', 'Wedding', '2026-09-20', '18:00:00', 280, 'Stage decoration in gold and emerald theme.');
