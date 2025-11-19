# Mujassam - 3D Printing E-Commerce Platform

## Overview

Mujassam is a modern Vue.js-based 3D printing e-commerce platform that combines a stunning UI/UX with powerful 3D file management capabilities. The platform enables users to browse 3D printable products and upload their own 3D models for printing services.

---

## Core Features

### 1. Product Catalog
- Browse curated 3D printable products
- Filter by category, material, and price
- High-quality product images with 3D previews
- Detailed product specifications (dimensions, materials, print time)

### 2. 3D File Upload & Viewer
- Upload custom 3D files (STL, OBJ, 3MF formats)
- Interactive 3D model viewer with rotation, zoom, and pan
- Real-time model analysis (dimensions, volume, surface area)
- Automatic price estimation based on model specifications

### 3. E-Commerce Functionality
- Shopping cart management
- Secure checkout process
- Order tracking
- User account management

### 4. UI/UX Design Principles
- Clean, modern interface with intuitive navigation
- Responsive design for all devices
- Dark/light theme support
- Smooth animations and transitions
- Accessibility-compliant components

---

## Technical Stack

### Frontend
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **3D Rendering**: Three.js
- **UI Components**: Custom components / Component library (TBD)
- **Styling**: SCSS / Tailwind CSS
- **HTTP Client**: Axios

### Planned Integrations
- Payment gateway (Stripe/PayPal)
- File storage (AWS S3 / Cloudinary)
- Authentication (JWT-based)

---

## Project Structure

```
mujassam-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, styles
│   ├── components/      # Reusable Vue components
│   │   ├── common/      # Buttons, inputs, cards
│   │   ├── layout/      # Header, footer, sidebar
│   │   ├── product/     # Product-related components
│   │   └── viewer/      # 3D viewer components
│   ├── composables/     # Vue composables (reusable logic)
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── Products.vue
│   │   ├── ProductDetail.vue
│   │   ├── Upload.vue
│   │   ├── Cart.vue
│   │   └── Checkout.vue
│   ├── services/        # API service modules
│   ├── utils/           # Helper functions
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

---

## Key Pages

### Home Page
- Hero section with featured products
- Category highlights
- Call-to-action for custom uploads
- Testimonials/reviews section

### Products Page
- Grid/list view toggle
- Advanced filtering sidebar
- Pagination/infinite scroll
- Quick view modal

### Product Detail Page
- 3D model preview
- Material selection
- Quantity selector
- Add to cart functionality
- Related products

### Upload Page
- Drag-and-drop file upload
- Interactive 3D preview
- Model specifications display
- Print options configuration
- Instant price quote

### Cart & Checkout
- Cart item management
- Promo code application
- Shipping options
- Payment processing
- Order confirmation

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Mujassam
VITE_STORAGE_URL=https://storage.example.com
```

---

## Design System

### Colors (Planned)
- **Primary**: Deep blue / Indigo
- **Secondary**: Coral / Orange accent
- **Neutral**: Gray scale
- **Success/Error/Warning**: Standard semantic colors

### Typography
- **Headings**: Modern sans-serif (Inter, Poppins)
- **Body**: Readable sans-serif
- **Monospace**: For technical specs

### Spacing & Layout
- 8px base unit grid system
- Consistent padding and margins
- Max-width containers for readability

---

## API Integration Points

### Products API
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `GET /products/categories` - List categories

### Upload API
- `POST /upload` - Upload 3D file
- `GET /upload/:id/analysis` - Get model analysis
- `POST /upload/:id/quote` - Get price quote

### Cart API
- `GET /cart` - Get cart contents
- `POST /cart/add` - Add item to cart
- `PUT /cart/:itemId` - Update cart item
- `DELETE /cart/:itemId` - Remove from cart

### Orders API
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `GET /orders/history` - User order history

---

## Future Enhancements

- [ ] User authentication & profiles
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Real-time order tracking
- [ ] Admin dashboard
- [ ] Multi-language support (Arabic/English)
- [ ] Social sharing features
- [ ] AR preview on mobile devices

---

## Contributing

1. Create feature branch from `main`
2. Follow Vue style guide conventions
3. Write meaningful commit messages
4. Test thoroughly before PR
5. Request code review

---

## License

Proprietary - All rights reserved
