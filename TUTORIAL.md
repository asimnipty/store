# E-Commerce Application Tutorial

A complete guide to understanding and working with this modern full-stack e-commerce application built with React, Express, and MongoDB.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Database Schema](#database-schema)
8. [Key Features](#key-features)
9. [Development Workflow](#development-workflow)
10. [API Endpoints](#api-endpoints)
11. [State Management](#state-management)
12. [Common Tasks](#common-tasks)

---

## Project Overview

This is a full-stack e-commerce platform that allows users to:
- Browse and search products
- View product details
- Add products to cart
- Manage shopping cart
- View featured products
- Integrate AI capabilities via Gemini API

The application uses a modern technology stack combining **React** for the frontend, **Express** for the backend API, and **MongoDB** for data persistence.

---

## Tech Stack

### Frontend
- **React 19** - UI library with hooks
- **Vite 6** - Fast build tool and dev server
- **TypeScript** - Static typing
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Lucide React** - Icon library
- **Motion** - Animation library

### Backend
- **Express 4** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - MongoDB object modeling
- **TypeScript** - Type safety
- **Dotenv** - Environment variable management

### Tools & Build
- **TSX** - TypeScript executor for development
- **ESBuild** - Fast JavaScript bundler
- **TypeScript 5.8** - Latest type scripting

---

## Project Structure

```
project-root/
├── backend/                      # Express server & API logic
│   ├── server.ts                # Main server entry point
│   ├── config/
│   │   └── db.ts                # MongoDB connection
│   ├── controllers/
│   │   └── productController.ts # Product business logic
│   ├── data/
│   │   ├── db.ts               # Database utilities
│   │   └── seed.ts             # Sample data seeding
│   ├── models/
│   │   └── Product.ts          # Mongoose product schema
│   └── routes/
│       └── productRoutes.ts     # Product API endpoints
│
├── frontend/                     # React Vite application
│   ├── index.html               # HTML entry point
│   └── src/
│       ├── main.tsx             # React entry
│       ├── App.tsx              # Root component
│       ├── pages/
│       │   ├── Home.tsx         # Home page with hero
│       │   ├── Shop.tsx         # Product listing
│       │   └── ProductDetail.tsx # Single product page
│       ├── components/
│       │   ├── Navbar.tsx       # Navigation
│       │   ├── CartDrawer.tsx   # Shopping cart
│       │   └── ProductCard.tsx  # Reusable product card
│       ├── store/
│       │   └── useCartStore.ts  # Zustand cart state
│       ├── data/
│       │   └── products.ts      # Product types/data
│       ├── lib/
│       │   └── utils.ts         # Utility functions
│       └── index.css            # Global styles
│
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── vite.config.ts               # Vite configuration
└── .env.local                    # Environment variables
```

---

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Gemini API Key** (optional, for AI features)

### Installation Steps

1. **Clone/Extract the project**
   ```bash
   cd project-root
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   On Windows:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas (cloud):
   - Create a cluster at https://www.mongodb.com/cloud/atlas
   - Get your connection string
   - Add to `.env.local`

5. **Seed the database** (optional - populate with sample data)
   ```bash
   npm run seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

---

## Backend Architecture

### Express Server (`server.ts`)

The server handles both the API and serves the frontend:

```typescript
// Key components:
- MongoDB connection via Mongoose
- Express middleware (JSON parsing)
- API routes at /api/products
- Vite middleware for frontend in development
- Static file serving in production
```

### Database Connection (`backend/config/db.ts`)

Establishes connection to MongoDB using Mongoose:
```typescript
- Connects to MONGODB_URI from environment
- Handles connection errors
- Sets up Mongoose configuration
```

### Models (`backend/models/Product.ts`)

Defines the Product schema with validation:

```typescript
interface IProduct {
  name: string              // Product name
  description: string       // Product details
  price: number            // Cost
  category: string         // Product category
  image: string            // Image URL
  features: string[]       // List of features
  inStock: boolean         // Availability
  createdAt: Date          // Creation timestamp
  updatedAt: Date          // Update timestamp
}
```

### Controllers (`backend/controllers/productController.ts`)

Business logic for product operations:
- Get all products
- Get single product by ID
- Create new product
- Update product
- Delete product

### Routes (`backend/routes/productRoutes.ts`)

Maps HTTP requests to controller functions:
```
GET    /api/products        → Get all products
GET    /api/products/:id    → Get product by ID
POST   /api/products        → Create product
PUT    /api/products/:id    → Update product
DELETE /api/products/:id    → Delete product
```

### Data Seeding (`backend/data/seed.ts`)

Populates MongoDB with sample products for testing and development.

---

## Frontend Architecture

### Pages

#### Home (`frontend/src/pages/Home.tsx`)
- Hero section with call-to-action
- Featured products display (first 3 products)
- Feature highlights (Fast, Secure, Free Shipping)
- Link to shop page

#### Shop (`frontend/src/pages/Shop.tsx`)
- Browse all products
- Product filtering/sorting
- Grid layout display
- Add to cart functionality

#### ProductDetail (`frontend/src/pages/ProductDetail.tsx`)
- Individual product page
- Full product information
- Feature list
- Stock status
- Add to cart button

### Components

#### Navbar (`frontend/src/components/Navbar.tsx`)
- Navigation menu
- Cart icon with item count
- Links to Home/Shop pages
- Mobile responsive

#### ProductCard (`frontend/src/components/ProductCard.tsx`)
- Displays product in grid/list
- Shows name, price, image
- Add to cart button
- Link to product detail

#### CartDrawer (`frontend/src/components/CartDrawer.tsx`)
- Slide-out cart panel
- List of cart items
- Item quantity controls
- Remove item option
- Checkout button

### State Management with Zustand (`frontend/src/store/useCartStore.ts`)

Simple, scalable cart state:

```typescript
interface CartStore {
  items: CartItem[]              // Cart items
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
```

**Why Zustand?**
- Minimal boilerplate vs Redux
- No Provider wrapper needed
- Easy to understand and test
- Perfect for small to medium apps

### Data Types (`frontend/src/data/products.ts`)

```typescript
interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  features: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

interface CartItem extends Product {
  quantity: number
}
```

### Utilities (`frontend/src/lib/utils.ts`)

Helper functions for common operations:
- Format prices
- Handle dates
- Validation functions

---

## Database Schema

### Product Collection

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  description: String (required, max 2000 chars),
  price: Number (required),
  category: String,
  image: String (URL),
  features: [String],
  inStock: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Validation Rules:**
- name: Required, max 100 characters
- description: Required, max 2000 characters
- price: Required, must be number
- All fields automatically indexed for faster queries

---

## Key Features

### 1. Product Management
- Create, read, update, delete products
- Product categories and filtering
- Stock management

### 2. Shopping Cart
- Add/remove items
- Update quantities
- Real-time price calculation
- Persistent state with Zustand

### 3. Responsive Design
- Mobile-first approach with Tailwind CSS
- Clean, modern UI
- Smooth animations with Motion

### 4. API-Driven Architecture
- RESTful backend API
- Fetch products from server
- Real-time data updates

### 5. Production Ready
- TypeScript for type safety
- Error handling
- Environment-based configuration
- Optimized builds

---

## Development Workflow

### Available npm Scripts

```bash
# Start development server (both backend & frontend)
npm run dev

# Seed database with sample data
npm run seed

# Build for production
npm run build

# Preview production build
npm run preview

# Link checking
npm run lint

# Clean build artifacts
npm run clean

# Start production server
npm start
```

### Development Process

1. **Make changes to files**
   - Backend: `backend/**/*.ts`
   - Frontend: `frontend/src/**/*.tsx`

2. **Hot reloading**
   - Vite automatically refreshes changes
   - TypeScript checks on save

3. **Check for errors**
   ```bash
   npm run lint
   ```

4. **Test in browser**
   - http://localhost:3000

5. **Build and deploy**
   ```bash
   npm run build
   npm run start
   ```

---

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Products Endpoints

#### Get All Products
```
GET /api/products

Response:
[
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Laptop Pro",
    price: 1299.99,
    ...
  }
]
```

#### Get Single Product
```
GET /api/products/:id

Response:
{
  _id: "507f1f77bcf86cd799439011",
  name: "Laptop Pro",
  description: "High-performance laptop",
  price: 1299.99,
  ...
}
```

#### Create Product
```
POST /api/products

Body:
{
  name: "New Product",
  description: "Product description",
  price: 99.99,
  category: "electronics",
  image: "url",
  features: ["Fast", "Reliable"],
  inStock: true
}

Response: Created product object
```

#### Update Product
```
PUT /api/products/:id

Body: (any fields to update)
{
  price: 89.99,
  inStock: false
}

Response: Updated product object
```

#### Delete Product
```
DELETE /api/products/:id

Response:
{
  success: true,
  message: "Product deleted"
}
```

#### Health Check
```
GET /api/health

Response:
{
  status: "ok",
  message: "Server is running!"
}
```

---

## State Management

### Zustand Cart Store

**Basic Usage:**

```typescript
import { useCartStore } from '@/store/useCartStore'

function MyComponent() {
  const { items, addItem, removeItem, getTotalPrice } = useCartStore()
  
  return (
    <div>
      {items.map(item => (
        <div key={item._id}>
          {item.name} - ${item.price}
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${getTotalPrice()}</p>
    </div>
  )
}
```

**Key Methods:**

| Method | Purpose |
|--------|---------|
| `addItem(item)` | Add product to cart |
| `removeItem(id)` | Remove product from cart |
| `updateQuantity(id, qty)` | Change item quantity |
| `clearCart()` | Empty the cart |
| `getTotalItems()` | Get total number of items |
| `getTotalPrice()` | Calculate total price |

---

## Common Tasks

### Add a New Product to Database

```typescript
// 1. In Postman or fetch call:
const newProduct = {
  name: "Gaming Mouse",
  description: "High-precision gaming mouse",
  price: 59.99,
  category: "accessories",
  image: "https://example.com/mouse.jpg",
  features: ["RGB", "10000 DPI", "Wireless"],
  inStock: true
}

fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct)
})
```

### Create a New Page

1. **Create component:**
   ```typescript
   // frontend/src/pages/NewPage.tsx
   export function NewPage() {
     return <div>New Page</div>
   }
   ```

2. **Add route in App.tsx:**
   ```typescript
   import { NewPage } from './pages/NewPage'
   
   <Route path="/new" element={<NewPage />} />
   ```

3. **Add navigation link:**
   ```typescript
   // In Navbar.tsx
   <Link to="/new">New Page</Link>
   ```

### Modify Product Schema

1. **Update Mongoose schema:**
   ```typescript
   // backend/models/Product.ts
   const ProductSchema = new Schema({
     name: String,
     // Add new field:
     rating: {
       type: Number,
       min: 0,
       max: 5
     }
   })
   ```

2. **Update TypeScript interface:**
   ```typescript
   export interface IProduct extends Document {
     rating?: number
   }
   ```

3. **Reseed database:**
   ```bash
   npm run seed
   ```

### Add Environment Variable

1. **Update `.env.local`:**
   ```
   NEW_VARIABLE=value
   ```

2. **Access in code:**
   ```typescript
   const value = process.env.NEW_VARIABLE
   ```

### Deploy to Production

1. **Build the application:**
   ```bash
   npm run build
   npm run clean && npm run build  # Clean build
   ```

2. **Upload to hosting:**
   - Upload `dist/` folder
   - Set environment variables on server
   - Ensure MongoDB access from server

3. **Start server:**
   ```bash
   npm run start
   ```

---

## Troubleshooting

### MongoDB Connection Issues
**Problem:** "Cannot connect to MongoDB"

**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Check connection string in `.env.local`
- Verify MongoDB is accessible from your network

### Port 3000 Already in Use
**Problem:** "Port 3000 already in use"

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### TypeScript Errors
**Problem:** Type errors in IDE

**Solution:**
```bash
# Check all types
npm run lint

# Ensure TypeScript is updated
npm install -D typescript@latest
```

### Styles Not Applying
**Problem:** Tailwind CSS classes not working

**Solution:**
- Verify `vite.config.ts` has Tailwind plugin
- Ensure class names are in template literals
- Rebuild: `npm run dev`

---

## Best Practices

1. **Always use TypeScript types** - Catch errors early
2. **Keep components small** - Single responsibility principle
3. **Use environment variables** - Never hardcode secrets
4. **Validate data** - Both frontend and backend
5. **Error handling** - Wrap async operations in try-catch
6. **Code organization** - Follow the folder structure
7. **Component composition** - Reuse components where possible
8. **Responsive design** - Test on mobile devices

---

## Next Steps

1. **Customize styling** - Update Tailwind theme
2. **Add authentication** - Implement user login/signup
3. **Add payment** - Integrate Stripe or similar
4. **Add reviews** - Allow customer feedback
5. **Search/Filter** - Enhance product discovery
6. **Email notifications** - Order confirmations
7. **Analytics** - Track user behavior
8. **SEO optimization** - Improve search visibility

---

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## Summary

This e-commerce application demonstrates modern full-stack development with:
- ✅ Separated frontend and backend
- ✅ RESTful API architecture
- ✅ Type-safe development with TypeScript
- ✅ Responsive UI with Tailwind CSS
- ✅ Efficient state management with Zustand
- ✅ Production-ready build process
- ✅ Easy development workflow

Start by exploring the code files, making small changes, and gradually building upon this foundation. Happy coding! 🚀
