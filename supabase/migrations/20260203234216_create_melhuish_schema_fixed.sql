/*
  # Create Melhuish Automotriz Database Schema

  ## Overview
  This migration creates the complete database structure for Melhuish's automotive website,
  including new vehicles, used vehicles, branches, and customer inquiries.

  ## 1. New Tables

  ### brands
  - `id` (uuid, primary key) - Unique brand identifier
  - `name` (text) - Brand name (Chevrolet, Dongfeng, Foton)
  - `logo_url` (text) - URL to brand logo image
  - `slug` (text, unique) - URL-friendly identifier
  - `order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### vehicle_categories
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (SUV, Sedán, Pick Up, etc.)
  - `slug` (text, unique) - URL-friendly identifier
  - `created_at` (timestamptz) - Creation timestamp

  ### branches
  - `id` (uuid, primary key) - Unique branch identifier
  - `name` (text) - Branch name
  - `type` (text) - sales, service, both
  - `address` (text) - Full address
  - `city` (text) - City name
  - `region` (text) - Region name
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `hours_weekday` (text) - Weekday hours
  - `hours_saturday` (text) - Saturday hours
  - `hours_sunday` (text) - Sunday hours
  - `latitude` (numeric) - Map latitude
  - `longitude` (numeric) - Map longitude
  - `services` (text[]) - Array of available services
  - `brands_served` (text[]) - Array of brands served
  - `created_at` (timestamptz) - Creation timestamp

  ### vehicles
  - `id` (uuid, primary key) - Unique vehicle identifier
  - `brand_id` (uuid, foreign key) - Reference to brands table
  - `category_id` (uuid, foreign key) - Reference to vehicle_categories
  - `name` (text) - Vehicle model name
  - `version` (text) - Specific version/trim
  - `slug` (text, unique) - URL-friendly identifier
  - `image_url` (text) - Main vehicle image
  - `price_list` (numeric) - Official list price
  - `price_financing` (numeric) - Price with financing/bonuses
  - `includes_iva` (boolean) - Whether price includes VAT
  - `fuel_type` (text) - Diesel, Gasolina, Eléctrico, Híbrido
  - `transmission` (text) - Automática, Manual
  - `description` (text) - Vehicle description
  - `features` (jsonb) - Additional features as JSON
  - `is_active` (boolean) - Whether vehicle is available
  - `order` (integer) - Display order within brand
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### used_vehicles
  - `id` (uuid, primary key) - Unique used vehicle identifier
  - `brand` (text) - Brand name
  - `model` (text) - Model name
  - `year` (integer) - Manufacturing year
  - `kilometers` (integer) - Vehicle mileage
  - `transmission` (text) - Transmission type
  - `fuel_type` (text) - Fuel type
  - `price_cash` (numeric) - Cash payment price
  - `category` (text) - Vehicle category
  - `image_url` (text) - Main vehicle image
  - `is_offer` (boolean) - Whether vehicle is on special offer
  - `branch_id` (uuid, foreign key) - Reference to branch location
  - `is_available` (boolean) - Whether vehicle is still available
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### branch_staff
  - `id` (uuid, primary key) - Unique staff identifier
  - `branch_id` (uuid, foreign key) - Reference to branches table
  - `name` (text) - Staff member name
  - `position` (text) - Job position
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `photo_url` (text) - Profile photo URL
  - `created_at` (timestamptz) - Creation timestamp

  ### quotations
  - `id` (uuid, primary key) - Unique quotation identifier
  - `first_name` (text) - Customer first name
  - `last_name` (text) - Customer last name
  - `rut` (text) - Chilean RUT/ID
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `region` (text) - Customer region
  - `commune` (text) - Customer commune
  - `brand` (text) - Selected brand
  - `model` (text) - Selected model
  - `version` (text) - Selected version
  - `branch_id` (uuid, foreign key) - Preferred branch
  - `message` (text) - Additional message
  - `status` (text) - pending, contacted, closed
  - `created_at` (timestamptz) - Creation timestamp

  ### service_appointments
  - `id` (uuid, primary key) - Unique appointment identifier
  - `full_name` (text) - Customer full name
  - `email` (text) - Contact email
  - `rut` (text) - Chilean RUT/ID
  - `phone` (text) - Contact phone
  - `brand` (text) - Vehicle brand
  - `model` (text) - Vehicle model
  - `license_plate` (text) - Vehicle license plate
  - `year` (integer) - Vehicle year
  - `kilometers` (integer) - Vehicle mileage
  - `service_type` (text) - Type of service needed
  - `preferred_date` (date) - Preferred appointment date
  - `preferred_time` (text) - Preferred appointment time
  - `branch_id` (uuid, foreign key) - Service branch
  - `notes` (text) - Additional notes
  - `status` (text) - pending, confirmed, completed, cancelled
  - `created_at` (timestamptz) - Creation timestamp

  ### fleet_inquiries
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `company_rut` (text) - Company RUT/ID
  - `contact_name` (text) - Contact person name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `units_quantity` (integer) - Number of units needed
  - `brand` (text) - Preferred brand
  - `comments` (text) - Additional comments
  - `status` (text) - pending, contacted, closed
  - `created_at` (timestamptz) - Creation timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Public read access for vehicles, brands, categories, and branches
  - Public insert for quotations and appointments
  - Restrict administrative data access

  ## 3. Indexes
  - Add indexes for frequently queried columns
  - Optimize filtering and searching operations
*/

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  slug text UNIQUE NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create vehicle_categories table
CREATE TABLE IF NOT EXISTS vehicle_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create branches table FIRST (before used_vehicles)
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT 'both',
  address text NOT NULL,
  city text NOT NULL,
  region text,
  phone text,
  email text,
  hours_weekday text,
  hours_saturday text,
  hours_sunday text,
  latitude numeric,
  longitude numeric,
  services text[] DEFAULT '{}',
  brands_served text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  category_id uuid REFERENCES vehicle_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  version text,
  slug text UNIQUE NOT NULL,
  image_url text,
  price_list numeric,
  price_financing numeric,
  includes_iva boolean DEFAULT false,
  fuel_type text,
  transmission text,
  description text,
  features jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create used_vehicles table (after branches exists)
CREATE TABLE IF NOT EXISTS used_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  kilometers integer DEFAULT 0,
  transmission text,
  fuel_type text,
  price_cash numeric NOT NULL,
  category text,
  image_url text,
  is_offer boolean DEFAULT false,
  branch_id uuid REFERENCES branches(id) ON DELETE SET NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create branch_staff table
CREATE TABLE IF NOT EXISTS branch_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  position text,
  phone text,
  email text,
  photo_url text,
  created_at timestamptz DEFAULT now()
);

-- Create quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  rut text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  region text,
  commune text,
  brand text,
  model text,
  version text,
  branch_id uuid REFERENCES branches(id) ON DELETE SET NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create service_appointments table
CREATE TABLE IF NOT EXISTS service_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  rut text NOT NULL,
  phone text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  license_plate text NOT NULL,
  year integer NOT NULL,
  kilometers integer,
  service_type text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text,
  branch_id uuid REFERENCES branches(id) ON DELETE SET NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create fleet_inquiries table
CREATE TABLE IF NOT EXISTS fleet_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_rut text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  units_quantity integer NOT NULL,
  brand text,
  comments text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE branch_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet_inquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies for catalog data
CREATE POLICY "Public can view brands"
  ON brands FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view categories"
  ON vehicle_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view active vehicles"
  ON vehicles FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can view available used vehicles"
  ON used_vehicles FOR SELECT
  TO public
  USING (is_available = true);

CREATE POLICY "Public can view branches"
  ON branches FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view branch staff"
  ON branch_staff FOR SELECT
  TO public
  USING (true);

-- Public insert policies for customer inquiries
CREATE POLICY "Anyone can submit quotations"
  ON quotations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can request service appointments"
  ON service_appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can submit fleet inquiries"
  ON fleet_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_active ON vehicles(is_active);
CREATE INDEX IF NOT EXISTS idx_used_vehicles_brand ON used_vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_used_vehicles_available ON used_vehicles(is_available);
CREATE INDEX IF NOT EXISTS idx_used_vehicles_offer ON used_vehicles(is_offer);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON service_appointments(status);
CREATE INDEX IF NOT EXISTS idx_fleet_inquiries_status ON fleet_inquiries(status);