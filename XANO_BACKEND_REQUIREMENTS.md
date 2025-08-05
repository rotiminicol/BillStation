# Xano Backend Requirements - Bill Station Application

## Overview
This document outlines all the database tables and API endpoints required for the new Xano backend workspace to support the complete Bill Station application functionality.

---

## 📊 Database Tables

### 1. **users** (Main User Table)
```sql
- id (Primary Key, UUID)
- firstName (Text)
- lastName (Text)
- email (Text, Unique)
- phone (Text)
- password (Text, Hashed)
- balance (Number, Default: 20000)
- accountNumber (Text, Unique)
- profilePicture (Text, Optional)
- tier (Text: 'tier1', 'tier2', 'tier3', Default: 'tier1')
- tierLimit (Number, Default: 50000)
- isVerified (Boolean, Default: false)
- isActive (Boolean, Default: true)
- address (Text, Optional)
- country (Text, Optional)
- state (Text, Optional)
- created_at (DateTime)
- updated_at (DateTime)
```

### 2. **transactions** (Transaction History)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'credit', 'debit')
- category (Text: 'transfer', 'bills', 'giftcard', 'airtime', 'data', 'electricity', 'cable-tv', 'buy-tickets', 'crypto', 'travel', 'hotel', 'virtual-card')
- amount (Number)
- description (Text)
- recipient (Text, Optional)
- reference (Text, Unique)
- bankCode (Text, Optional)
- bankName (Text, Optional)
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- metadata (JSON, Optional)
- created_at (DateTime)
- updated_at (DateTime)
```

### 3. **cards** (Virtual Cards)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- name (Text)
- number (Text, Masked)
- expiry (Text)
- cvv (Text, Encrypted)
- balance (Number)
- currency (Text, Default: 'USD')
- isActive (Boolean, Default: true)
- cardType (Text: 'virtual', 'physical')
- color (Text, Optional)
- created_at (DateTime)
- updated_at (DateTime)
```

### 4. **notifications** (User Notifications)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'transaction', 'security', 'promotional', 'system', 'payment', 'bills', 'travel', 'crypto')
- title (Text)
- message (Text)
- priority (Text: 'low', 'medium', 'high')
- read (Boolean, Default: false)
- action (Text, Optional)
- actionUrl (Text, Optional)
- created_at (DateTime)
```

### 5. **user_settings** (User Preferences)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- pushNotifications (Boolean, Default: true)
- emailNotifications (Boolean, Default: true)
- smsNotifications (Boolean, Default: false)
- transactionAlerts (Boolean, Default: true)
- securityAlerts (Boolean, Default: true)
- promotionalNotifications (Boolean, Default: false)
- systemNotifications (Boolean, Default: true)
- quietHours (Boolean, Default: false)
- quietHoursStart (Text, Default: "22:00")
- quietHoursEnd (Text, Default: "08:00")
- language (Text, Default: "en")
- currency (Text, Default: "NGN")
- theme (Text: 'light', 'dark', 'auto', Default: 'light')
- created_at (DateTime)
- updated_at (DateTime)
```

### 6. **user_sessions** (Login Sessions)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- token (Text, Unique)
- deviceInfo (JSON)
- ipAddress (Text)
- userAgent (Text)
- isActive (Boolean, Default: true)
- expiresAt (DateTime)
- created_at (DateTime)
```

### 7. **otp_verification** (OTP Management)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- email (Text)
- phone (Text)
- otp (Text)
- type (Text: 'signup', 'login', 'password-reset', 'transaction')
- isUsed (Boolean, Default: false)
- expiresAt (DateTime)
- created_at (DateTime)
```

### 8. **bills** (Bill Payments)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- category (Text: 'airtime', 'data', 'electricity', 'tv', 'education', 'betting', 'transport', 'rent')
- provider (Text)
- amount (Number)
- accountNumber (Text)
- meterNumber (Text, Optional)
- phoneNumber (Text, Optional)
- status (Text: 'pending', 'completed', 'failed')
- reference (Text, Unique)
- metadata (JSON, Optional)
- created_at (DateTime)
```

### 9. **gift_cards** (Gift Card Transactions)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- brand (Text: 'amazon', 'steam', 'apple', 'google', 'sephora', 'nordstrom', 'nike', 'vanilla')
- amount (Number)
- currency (Text, Default: 'USD')
- type (Text: 'buy', 'sell')
- status (Text: 'pending', 'completed', 'failed')
- reference (Text, Unique)
- cardCode (Text, Optional)
- created_at (DateTime)
```

### 10. **crypto_trades** (Cryptocurrency Trading)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- crypto (Text: 'bitcoin', 'ethereum', 'binance', 'cardano', 'solana', 'polkadot', 'ripple', 'dogecoin')
- type (Text: 'buy', 'sell')
- amountCrypto (Number)
- amountNaira (Number)
- price (Number)
- status (Text: 'pending', 'completed', 'failed')
- reference (Text, Unique)
- profitLoss (Number, Optional)
- created_at (DateTime)
```

### 11. **travel_bookings** (Flight & Hotel Bookings)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'flight', 'hotel', 'private-jet')
- from (Text)
- to (Text)
- departureDate (DateTime)
- returnDate (DateTime, Optional)
- passengers (Number)
- amount (Number)
- status (Text: 'pending', 'confirmed', 'cancelled')
- reference (Text, Unique)
- bookingDetails (JSON)
- created_at (DateTime)
```

### 12. **tickets** (Event Tickets)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- eventName (Text)
- eventDate (DateTime)
- venue (Text)
- ticketType (Text)
- quantity (Number)
- amount (Number)
- status (Text: 'pending', 'confirmed', 'cancelled')
- reference (Text, Unique)
- ticketCode (Text, Optional)
- created_at (DateTime)
```

### 13. **airtime_swaps** (Airtime & Data)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'airtime', 'data')
- network (Text: 'MTN', 'Airtel', 'Glo', '9mobile')
- phoneNumber (Text)
- amount (Number)
- dataPlan (Text, Optional)
- status (Text: 'pending', 'completed', 'failed')
- reference (Text, Unique)
- created_at (DateTime)
```

### 14. **bank_accounts** (User Bank Accounts)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- bankName (Text)
- bankCode (Text)
- accountNumber (Text)
- accountName (Text)
- isDefault (Boolean, Default: false)
- isActive (Boolean, Default: true)
- created_at (DateTime)
```

### 15. **beneficiaries** (Frequent Recipients)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- name (Text)
- accountNumber (Text)
- bankName (Text)
- bankCode (Text)
- phoneNumber (Text, Optional)
- isFavorite (Boolean, Default: false)
- created_at (DateTime)
```

---

## 🔌 API Endpoints

### **Authentication APIs**
```
POST /auth/signup
POST /auth/login
POST /auth/logout
GET /auth/me
PATCH /auth/me
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-reset-token
POST /auth/send-otp
POST /auth/verify-otp
POST /auth/resend-otp
```

### **User Management APIs**
```
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
POST /users/:id/upgrade-tier
GET /users/:id/settings
PATCH /users/:id/settings
```

### **Transaction APIs**
```
GET /transactions
GET /transactions/:id
POST /transactions
PATCH /transactions/:id
DELETE /transactions/:id
GET /transactions/category/:category
GET /transactions/user/:userId
```

### **Card APIs**
```
GET /cards
GET /cards/:id
POST /cards
PATCH /cards/:id
DELETE /cards/:id
POST /cards/:id/fund
POST /cards/:id/freeze
POST /cards/:id/unfreeze
```

### **Notification APIs**
```
GET /notifications
GET /notifications/:id
POST /notifications
PATCH /notifications/:id
DELETE /notifications/:id
POST /notifications/mark-read
POST /notifications/mark-all-read
```

### **Bill Payment APIs**
```
GET /bills
GET /bills/:id
POST /bills
PATCH /bills/:id
DELETE /bills/:id
GET /bills/category/:category
POST /bills/verify-meter
POST /bills/verify-account
```

### **Gift Card APIs**
```
GET /gift-cards
GET /gift-cards/:id
POST /gift-cards
PATCH /gift-cards/:id
DELETE /gift-cards/:id
GET /gift-cards/brands
POST /gift-cards/verify
```

### **Crypto Trading APIs**
```
GET /crypto-trades
GET /crypto-trades/:id
POST /crypto-trades
PATCH /crypto-trades/:id
DELETE /crypto-trades/:id
GET /crypto/prices
GET /crypto/portfolio
```

### **Travel Booking APIs**
```
GET /travel-bookings
GET /travel-bookings/:id
POST /travel-bookings
PATCH /travel-bookings/:id
DELETE /travel-bookings/:id
GET /flights/search
GET /hotels/search
POST /travel-bookings/confirm
```

### **Ticket APIs**
```
GET /tickets
GET /tickets/:id
POST /tickets
PATCH /tickets/:id
DELETE /tickets/:id
GET /events
GET /events/:id
POST /tickets/verify
```

### **Airtime & Data APIs**
```
GET /airtime-swaps
GET /airtime-swaps/:id
POST /airtime-swaps
PATCH /airtime-swaps/:id
DELETE /airtime-swaps/:id
GET /data-plans
POST /airtime-swaps/verify-number
```

### **Bank Account APIs**
```
GET /bank-accounts
GET /bank-accounts/:id
POST /bank-accounts
PATCH /bank-accounts/:id
DELETE /bank-accounts/:id
POST /bank-accounts/verify
```

### **Beneficiary APIs**
```
GET /beneficiaries
GET /beneficiaries/:id
POST /beneficiaries
PATCH /beneficiaries/:id
DELETE /beneficiaries/:id
POST /beneficiaries/verify
```

### **Utility APIs**
```
GET /banks
GET /countries
GET /states/:countryCode
GET /currencies
GET /exchange-rates
POST /upload/profile-picture
```

---

## 🔐 Security & Authentication

### **JWT Token Management**
- Token expiration: 24 hours
- Refresh token mechanism
- Token blacklisting for logout
- Rate limiting on auth endpoints

### **Data Protection**
- Password hashing (bcrypt)
- Sensitive data encryption
- Input validation and sanitization
- CORS configuration
- API rate limiting

### **OTP System**
- 4-digit OTP codes
- 5-minute expiration
- Maximum 3 attempts
- Cooldown period after failed attempts

---

## 📱 Mobile-Specific Features

### **Push Notifications**
- Firebase Cloud Messaging integration
- Notification preferences per user
- Quiet hours support
- Notification history

### **Offline Support**
- Transaction queuing
- Data synchronization
- Offline transaction limits

---

## 🔄 Real-time Features

### **WebSocket Support**
- Real-time balance updates
- Live transaction notifications
- Crypto price updates
- Chat support

---

## 📊 Analytics & Reporting

### **Dashboard Data**
- Transaction summaries
- Spending analytics
- Category-wise reports
- Export functionality

---

## 🚀 Performance Optimizations

### **Caching Strategy**
- Redis for session management
- API response caching
- Database query optimization
- CDN for static assets

---

## 📋 Implementation Priority

### **Phase 1 (Core Features)**
1. User authentication & management
2. Basic transactions
3. Bill payments
4. Airtime & data

### **Phase 2 (Advanced Features)**
1. Virtual cards
2. Gift cards
3. Crypto trading
4. Travel bookings

### **Phase 3 (Premium Features)**
1. Real-time notifications
2. Advanced analytics
3. API integrations
4. Mobile optimizations

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url

# Authentication
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# External APIs
PAYSTACK_SECRET_KEY=your_paystack_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# SMS/Email Services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SENDGRID_API_KEY=your_sendgrid_key

# File Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_s3_bucket

# Firebase (Push Notifications)
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_PRIVATE_KEY=your_firebase_key
FIREBASE_CLIENT_EMAIL=your_firebase_email
```

---

This comprehensive setup will provide all the functionality needed for your Bill Station application with room for future expansion and scalability. 