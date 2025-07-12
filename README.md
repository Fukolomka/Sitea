# CS2 Case Opening Site

A full-stack web application for opening CS2 cases with Steam authentication, real-time animations, and item management.

## Features

### 🎮 User Features
- **Steam Authentication**: Login with Steam OpenID
- **Case Opening**: Smooth animations with weighted random drops
- **Inventory Management**: Track and manage your items
- **Real-time Updates**: Live case opening notifications
- **Item Withdrawal**: Sell items back or withdraw to Steam
- **Balance Management**: Add funds and track spending

### 👨‍💼 Admin Features
- **Case Management**: Create, edit, and manage cases
- **Item Management**: Add new items with rarity and drop rates
- **User Management**: View users, manage balances and bans
- **Transaction Tracking**: Monitor all financial transactions
- **Statistics Dashboard**: Analytics and insights
- **Withdrawal Management**: Approve/reject withdrawal requests

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM with type safety
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **Steam OpenID** - Steam authentication

### Real-time & Communication
- **Socket.io** - Real-time bidirectional communication
- **WebSockets** - Live updates and notifications

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- MySQL database
- Steam API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cs2-case-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```bash
# Database
DATABASE_URL="mysql://username:password@localhost:3306/cs2_case_site"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Steam OpenID
STEAM_API_KEY="your-steam-api-key"
STEAM_RETURN_URL="http://localhost:3000/api/auth/steam/return"

# JWT
JWT_SECRET="your-jwt-secret-here"

# Admin (Steam IDs that should have admin access)
ADMIN_STEAM_IDS="76561198000000000,76561198000000001"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Database Schema

### Core Models
- **User**: Steam users with balance and role
- **Case**: Case containers with pricing
- **Item**: Individual items with rarity and pricing
- **CaseItem**: Junction table with drop rates
- **UserInventory**: User's item collection
- **CaseOpening**: History of case openings
- **Transaction**: Financial transaction records
- **Withdrawal**: Item withdrawal requests

### Relationships
- Users have many inventory items, transactions, and case openings
- Cases contain multiple items with specific drop rates
- Items can be in multiple cases with different drop rates
- All activities are logged for transparency

## API Endpoints

### Authentication
- `GET /api/auth/steam` - Initiate Steam login
- `GET /api/auth/steam/return` - Handle Steam callback
- `POST /api/auth/logout` - Logout user

### Cases
- `GET /api/cases` - List all active cases
- `GET /api/cases/[id]` - Get specific case details
- `POST /api/cases/[id]/open` - Open a case (requires auth)

### User
- `GET /api/user` - Get current user info
- `GET /api/user/inventory` - Get user's inventory
- `GET /api/user/transactions` - Get transaction history

### Admin (requires admin role)
- `GET /api/admin/cases` - Manage cases
- `POST /api/admin/cases` - Create new case
- `PUT /api/admin/cases/[id]` - Update case
- `DELETE /api/admin/cases/[id]` - Delete case
- `GET /api/admin/users` - Manage users
- `GET /api/admin/transactions` - View all transactions
- `GET /api/admin/withdrawals` - Manage withdrawals

## Project Structure

```
cs2-case-site/
├── public/                  # Static files
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   ├── open/[id]/       # Case opening page
│   │   ├── inventory/       # User inventory
│   │   ├── admin/           # Admin panel
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Reusable components
│   │   ├── ui/              # Base UI components
│   │   ├── CaseCard.tsx     # Case display component
│   │   ├── ItemCard.tsx     # Item display component
│   │   └── Navbar.tsx       # Navigation component
│   ├── lib/                 # Utility functions
│   │   ├── db.ts            # Database connection
│   │   ├── auth.ts          # Authentication utilities
│   │   ├── case-opening.ts  # Case opening logic
│   │   └── utils.ts         # General utilities
│   └── types/               # TypeScript type definitions
├── .env                     # Environment variables
├── package.json             # Dependencies
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Security Notes

- Never commit sensitive environment variables
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use secure JWT secrets and Steam API keys
- Implement proper CORS policies

## Deployment

### Production Checklist
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Set up monitoring and logging
- [ ] Implement backup strategies
- [ ] Configure CDN for static assets

### Recommended Platforms
- **Vercel** - Optimal for Next.js deployment
- **Railway** - Good for full-stack applications
- **AWS** - Enterprise-grade hosting
- **DigitalOcean** - Cost-effective VPS hosting

## Support

For questions or issues, please open an issue on GitHub or contact the development team.