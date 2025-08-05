# Complete Xano Backend Requirements - Bill Station Application

## Overview
This document provides a COMPLETE list of all database tables and API endpoints required for the new Xano backend workspace to support every feature in the Bill Station application.

---

## 📊 Complete Database Tables (20 Tables)

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
- pin (Text, Encrypted, 4 digits) - FOR TRANSACTIONS
- dateOfBirth (Date, Optional)
- gender (Text: 'male', 'female', 'other', Optional)
- maritalStatus (Text, Optional)
- nationality (Text, Optional)
- placeOfBirth (Text, Optional)
- lastPasswordChange (DateTime, Optional)
- lastPinChange (DateTime, Optional)
- passwordChangeCount (Number, Default: 0)
- pinChangeCount (Number, Default: 0)
- created_at (DateTime)
- updated_at (DateTime)
```

### 2. **kyc_verification** (KYC & Identity Verification)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- idType (Text: 'passport', 'national_id', 'drivers_license', 'voters_card')
- idNumber (Text)
- idIssuingCountry (Text)
- idExpiryDate (Date)
- idFrontImage (Text, URL)
- idBackImage (Text, URL)
- selfieImage (Text, URL)
- proofOfAddress (Text, URL)
- employmentLetter (Text, URL, Optional)
- bankStatement (Text, URL, Optional)
- status (Text: 'pending', 'approved', 'rejected', 'under_review')
- rejectionReason (Text, Optional)
- verifiedAt (DateTime, Optional)
- created_at (DateTime)
- updated_at (DateTime)
```

### 3. **user_profiles** (Extended User Information from Onboarding)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- occupation (Text)
- employerName (Text)
- employerAddress (Text)
- employmentType (Text: 'full_time', 'part_time', 'self_employed', 'unemployed', 'student')
- monthlyIncome (Number)
- sourceOfFunds (Text: 'salary', 'business', 'investment', 'inheritance', 'other')
- additionalIncome (Text, Optional)
- bankAccountHistory (Text: 'new', 'existing', 'multiple')
- creditHistory (Text: 'excellent', 'good', 'fair', 'poor', 'none')
- investmentExperience (Text: 'beginner', 'intermediate', 'advanced', 'expert')
- riskTolerance (Text: 'low', 'medium', 'high')
- purposeOfAccount (Text: 'personal', 'business', 'investment', 'savings', 'other')
- emergencyContactName (Text)
- emergencyContactPhone (Text)
- emergencyContactRelationship (Text)
- expectedMonthlyTransactions (Number, Optional)
- securityQuestion1 (Text, Encrypted)
- securityAnswer1 (Text, Encrypted)
- securityQuestion2 (Text, Encrypted)
- securityAnswer2 (Text, Encrypted)
- created_at (DateTime)
- updated_at (DateTime)
```

### 4. **transactions** (Transaction History)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'credit', 'debit')
- category (Text: 'transfer', 'bills', 'giftcard', 'airtime', 'data', 'electricity', 'cable-tv', 'buy-tickets', 'crypto', 'travel', 'hotel', 'virtual-card', 'currency-conversion', 'chauffeur', 'education', 'betting', 'transport', 'rent')
- amount (Number)
- description (Text)
- recipient (Text, Optional)
- reference (Text, Unique)
- bankCode (Text, Optional)
- bankName (Text, Optional)
- status (Text: 'pending', 'completed', 'failed', 'cancelled', 'processing')
- metadata (JSON, Optional)
- fee (Number, Default: 0)
- currency (Text, Default: 'NGN')
- exchangeRate (Number, Optional)
- created_at (DateTime)
- updated_at (DateTime)
```

### 5. **cards** (Virtual Cards)
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
- cardBrand (Text: 'visa', 'mastercard', 'amex')
- dailyLimit (Number)
- monthlyLimit (Number)
- created_at (DateTime)
- updated_at (DateTime)
```

### 6. **notifications** (User Notifications)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'transaction', 'security', 'promotional', 'system', 'payment', 'bills', 'travel', 'crypto', 'kyc', 'tier_upgrade')
- title (Text)
- message (Text)
- priority (Text: 'low', 'medium', 'high')
- read (Boolean, Default: false)
- action (Text, Optional)
- actionUrl (Text, Optional)
- pushSent (Boolean, Default: false)
- emailSent (Boolean, Default: false)
- smsSent (Boolean, Default: false)
- created_at (DateTime)
```

### 7. **user_settings** (User Preferences & Security Settings)
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
- biometricEnabled (Boolean, Default: false)
- twoFactorEnabled (Boolean, Default: false)
- twoFactorMethod (Text: 'sms', 'email', 'authenticator', Optional)
- sessionTimeout (Number, Default: 30) // minutes
- autoLock (Boolean, Default: true)
- autoLockTimeout (Number, Default: 5) // minutes
- profileVisibility (Text: 'public', 'private', 'friends', Default: 'private')
- dataSharing (Boolean, Default: false)
- analyticsTracking (Boolean, Default: true)
- marketingEmails (Boolean, Default: false)
- created_at (DateTime)
- updated_at (DateTime)
```

### 8. **user_sessions** (Login Sessions)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- token (Text, Unique)
- deviceInfo (JSON)
- ipAddress (Text)
- userAgent (Text)
- isActive (Boolean, Default: true)
- expiresAt (DateTime)
- lastActivity (DateTime)
- created_at (DateTime)
```

### 9. **otp_verification** (OTP Management)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- email (Text)
- phone (Text)
- otp (Text)
- type (Text: 'signup', 'login', 'password-reset', 'transaction', 'kyc', 'pin-reset')
- isUsed (Boolean, Default: false)
- attempts (Number, Default: 0)
- maxAttempts (Number, Default: 3)
- expiresAt (DateTime)
- created_at (DateTime)
```

### 10. **bills** (Bill Payments)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- category (Text: 'airtime', 'data', 'electricity', 'tv', 'education', 'betting', 'transport', 'rent', 'water', 'gas', 'internet', 'waste')
- provider (Text)
- amount (Number)
- accountNumber (Text)
- meterNumber (Text, Optional)
- phoneNumber (Text, Optional)
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- reference (Text, Unique)
- metadata (JSON, Optional)
- dueDate (Date, Optional)
- billPeriod (Text, Optional)
- created_at (DateTime)
```

### 11. **gift_cards** (Gift Card Transactions)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- brand (Text: 'amazon', 'steam', 'apple', 'google', 'sephora', 'nordstrom', 'nike', 'vanilla', 'walmart', 'target', 'bestbuy', 'ebay')
- amount (Number)
- currency (Text, Default: 'USD')
- type (Text: 'buy', 'sell')
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- reference (Text, Unique)
- cardCode (Text, Optional)
- cardImage (Text, URL, Optional)
- discount (Number, Default: 0)
- created_at (DateTime)
```

### 12. **crypto_trades** (Cryptocurrency Trading)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- crypto (Text: 'bitcoin', 'ethereum', 'binance', 'cardano', 'solana', 'polkadot', 'ripple', 'dogecoin', 'litecoin', 'bitcoin-cash', 'stellar', 'chainlink')
- type (Text: 'buy', 'sell')
- amountCrypto (Number)
- amountNaira (Number)
- price (Number)
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- reference (Text, Unique)
- profitLoss (Number, Optional)
- originalPrice (Number, Optional)
- walletAddress (Text, Optional)
- transactionHash (Text, Optional)
- created_at (DateTime)
```

### 13. **travel_bookings** (Flight & Hotel Bookings)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'flight', 'hotel', 'private-jet', 'package')
- from (Text)
- to (Text)
- departureDate (DateTime)
- returnDate (DateTime, Optional)
- passengers (Number)
- amount (Number)
- status (Text: 'pending', 'confirmed', 'cancelled', 'completed')
- reference (Text, Unique)
- bookingDetails (JSON)
- flightNumber (Text, Optional)
- hotelName (Text, Optional)
- roomType (Text, Optional)
- checkInDate (DateTime, Optional)
- checkOutDate (DateTime, Optional)
- created_at (DateTime)
```

### 14. **tickets** (Event Tickets)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- eventName (Text)
- eventDate (DateTime)
- venue (Text)
- ticketType (Text)
- quantity (Number)
- amount (Number)
- status (Text: 'pending', 'confirmed', 'cancelled', 'used')
- reference (Text, Unique)
- ticketCode (Text, Optional)
- seatNumber (Text, Optional)
- section (Text, Optional)
- row (Text, Optional)
- eventCategory (Text: 'concert', 'sports', 'theater', 'comedy', 'conference', 'exhibition')
- created_at (DateTime)
```

### 15. **airtime_swaps** (Airtime & Data)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- type (Text: 'airtime', 'data')
- network (Text: 'MTN', 'Airtel', 'Glo', '9mobile')
- phoneNumber (Text)
- amount (Number)
- dataPlan (Text, Optional)
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- reference (Text, Unique)
- planDuration (Text, Optional)
- dataSize (Text, Optional)
- created_at (DateTime)
```

### 16. **bank_accounts** (User Bank Accounts)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- bankName (Text)
- bankCode (Text)
- accountNumber (Text)
- accountName (Text)
- isDefault (Boolean, Default: false)
- isActive (Boolean, Default: true)
- accountType (Text: 'savings', 'current', 'domiciliary')
- currency (Text, Default: 'NGN')
- created_at (DateTime)
```

### 17. **beneficiaries** (Frequent Recipients)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- name (Text)
- accountNumber (Text)
- bankName (Text)
- bankCode (Text)
- phoneNumber (Text, Optional)
- email (Text, Optional)
- isFavorite (Boolean, Default: false)
- nickname (Text, Optional)
- created_at (DateTime)
```

### 18. **chauffeur_bookings** (Chauffeur Services)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- serviceType (Text: 'airport', 'city-tour', 'business', 'wedding', 'hourly', 'daily')
- destination (Text)
- pickupLocation (Text)
- date (DateTime)
- duration (Text)
- passengers (Number)
- amount (Number)
- status (Text: 'pending', 'confirmed', 'cancelled', 'completed')
- reference (Text, Unique)
- vehicleType (Text, Optional)
- driverName (Text, Optional)
- driverPhone (Text, Optional)
- vehicleNumber (Text, Optional)
- specialRequests (Text, Optional)
- created_at (DateTime)
```

### 19. **currency_conversions** (Asset Conversion)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- fromAsset (Text)
- toAsset (Text)
- fromAmount (Number)
- toAmount (Number)
- exchangeRate (Number)
- fee (Number)
- status (Text: 'pending', 'completed', 'failed', 'cancelled')
- reference (Text, Unique)
- conversionType (Text: 'currency', 'crypto', 'giftcard')
- provider (Text, Optional)
- created_at (DateTime)
```

### 20. **file_uploads** (Profile Pictures & Documents)
```sql
- id (Primary Key, UUID)
- userId (Foreign Key -> users.id)
- fileName (Text)
- fileUrl (Text)
- fileType (Text: 'profile_picture', 'id_front', 'id_back', 'selfie', 'proof_of_address', 'employment_letter', 'bank_statement')
- fileSize (Number)
- mimeType (Text)
- isPublic (Boolean, Default: false)
- status (Text: 'uploaded', 'processed', 'verified', 'rejected')
- created_at (DateTime)
```

---

## 🔌 Complete API Endpoints (150+ APIs)

### **Authentication APIs (12 APIs)**
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
POST /auth/change-pin
```

### **User Management APIs (20 APIs)**
```
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
POST /users/:id/upgrade-tier
GET /users/:id/settings
PATCH /users/:id/settings
POST /users/:id/upload-profile-picture
DELETE /users/:id/profile-picture
GET /users/:id/kyc-status
POST /users/:id/verify-phone
POST /users/:id/verify-email
POST /users/:id/enable-2fa
POST /users/:id/disable-2fa
POST /users/:id/enable-biometric
POST /users/:id/change-password
POST /users/:id/change-pin
POST /users/:id/delete-account
GET /users/:id/profile-complete
POST /users/:id/complete-profile
```

### **Profile Management APIs (15 APIs)**
```
GET /profile/:userId
PATCH /profile/:userId
POST /profile/:userId/update-personal-info
POST /profile/:userId/update-contact-info
POST /profile/:userId/update-address
POST /profile/:userId/update-employment
POST /profile/:userId/update-financial-profile
POST /profile/:userId/update-emergency-contact
GET /profile/:userId/onboarding-data
POST /profile/:userId/save-onboarding-data
POST /profile/:userId/upload-document
DELETE /profile/:userId/document/:documentId
GET /profile/:userId/documents
POST /profile/:userId/validate-profile
GET /profile/:userId/completion-percentage
```

### **KYC & Verification APIs (10 APIs)**
```
GET /kyc/:userId
POST /kyc/submit
PATCH /kyc/:id
GET /kyc/:id/status
POST /kyc/:id/upload-document
DELETE /kyc/:id/document/:documentId
POST /kyc/:id/verify-identity
POST /kyc/:id/approve
POST /kyc/:id/reject
GET /kyc/documents/:userId
```

### **Transaction APIs (12 APIs)**
```
GET /transactions
GET /transactions/:id
POST /transactions
PATCH /transactions/:id
DELETE /transactions/:id
GET /transactions/category/:category
GET /transactions/user/:userId
GET /transactions/export/:userId
POST /transactions/bulk
GET /transactions/statistics/:userId
POST /transactions/refund/:id
GET /transactions/search
```

### **Card APIs (12 APIs)**
```
GET /cards
GET /cards/:id
POST /cards
PATCH /cards/:id
DELETE /cards/:id
POST /cards/:id/fund
POST /cards/:id/freeze
POST /cards/:id/unfreeze
POST /cards/:id/block
POST /cards/:id/unblock
GET /cards/:id/transactions
POST /cards/:id/change-limits
```

### **Notification APIs (15 APIs)**
```
GET /notifications
GET /notifications/:id
POST /notifications
PATCH /notifications/:id
DELETE /notifications/:id
POST /notifications/mark-read
POST /notifications/mark-all-read
GET /notifications/unread-count
POST /notifications/send-push
POST /notifications/send-email
GET /notifications/preferences/:userId
PATCH /notifications/preferences/:userId
POST /notifications/test-push
POST /notifications/test-email
POST /notifications/test-sms
```

### **Settings Management APIs (20 APIs)**
```
GET /settings/:userId
PATCH /settings/:userId
POST /settings/:userId/update-notifications
POST /settings/:userId/update-security
POST /settings/:userId/update-privacy
POST /settings/:userId/update-preferences
POST /settings/:userId/update-language
POST /settings/:userId/update-currency
POST /settings/:userId/update-theme
POST /settings/:userId/enable-biometric
POST /settings/:userId/disable-biometric
POST /settings/:userId/enable-2fa
POST /settings/:userId/disable-2fa
POST /settings/:userId/set-session-timeout
POST /settings/:userId/set-auto-lock
POST /settings/:userId/update-quiet-hours
POST /settings/:userId/reset-preferences
GET /settings/:userId/export-data
POST /settings/:userId/import-data
DELETE /settings/:userId/delete-data
```

### **Bill Payment APIs (15 APIs)**
```
GET /bills
GET /bills/:id
POST /bills
PATCH /bills/:id
DELETE /bills/:id
GET /bills/category/:category
POST /bills/verify-meter
POST /bills/verify-account
GET /bills/providers/:category
GET /bills/data-plans/:network
POST /bills/airtime-purchase
POST /bills/data-purchase
POST /bills/electricity-payment
POST /bills/cable-tv-payment
POST /bills/education-payment
GET /bills/history/:userId
```

### **Gift Card APIs (12 APIs)**
```
GET /gift-cards
GET /gift-cards/:id
POST /gift-cards
PATCH /gift-cards/:id
DELETE /gift-cards/:id
GET /gift-cards/brands
POST /gift-cards/verify
GET /gift-cards/rates
POST /gift-cards/buy
POST /gift-cards/sell
GET /gift-cards/portfolio/:userId
POST /gift-cards/redeem
```

### **Crypto Trading APIs (15 APIs)**
```
GET /crypto-trades
GET /crypto-trades/:id
POST /crypto-trades
PATCH /crypto-trades/:id
DELETE /crypto-trades/:id
GET /crypto/prices
GET /crypto/portfolio
GET /crypto/market-data
POST /crypto/buy
POST /crypto/sell
GET /crypto/wallet/:userId
POST /crypto/withdraw
GET /crypto/deposit-address
GET /crypto/transaction-history/:userId
POST /crypto/convert
```

### **Travel Booking APIs (15 APIs)**
```
GET /travel-bookings
GET /travel-bookings/:id
POST /travel-bookings
PATCH /travel-bookings/:id
DELETE /travel-bookings/:id
GET /flights/search
GET /hotels/search
POST /travel-bookings/confirm
GET /airports
GET /cities
POST /travel-bookings/cancel
GET /travel-bookings/upcoming/:userId
POST /travel-bookings/modify
GET /travel-bookings/invoice/:id
POST /travel-bookings/refund
```

### **Ticket APIs (12 APIs)**
```
GET /tickets
GET /tickets/:id
POST /tickets
PATCH /tickets/:id
DELETE /tickets/:id
GET /events
GET /events/:id
POST /tickets/verify
GET /venues
GET /tickets/upcoming/:userId
POST /tickets/transfer
GET /tickets/qr-code/:id
```

### **Airtime & Data APIs (10 APIs)**
```
GET /airtime-swaps
GET /airtime-swaps/:id
POST /airtime-swaps
PATCH /airtime-swaps/:id
DELETE /airtime-swaps/:id
GET /data-plans
POST /airtime-swaps/verify-number
GET /networks
GET /airtime-swaps/history/:userId
POST /airtime-swaps/bulk
```

### **Bank Account APIs (10 APIs)**
```
GET /bank-accounts
GET /bank-accounts/:id
POST /bank-accounts
PATCH /bank-accounts/:id
DELETE /bank-accounts/:id
POST /bank-accounts/verify
GET /banks
POST /bank-accounts/set-default
GET /bank-accounts/transactions/:id
POST /bank-accounts/validate
```

### **Beneficiary APIs (10 APIs)**
```
GET /beneficiaries
GET /beneficiaries/:id
POST /beneficiaries
PATCH /beneficiaries/:id
DELETE /beneficiaries/:id
POST /beneficiaries/verify
GET /beneficiaries/favorites/:userId
POST /beneficiaries/set-favorite
GET /beneficiaries/search
POST /beneficiaries/import
```

### **Chauffeur Service APIs (12 APIs)**
```
GET /chauffeur-bookings
GET /chauffeur-bookings/:id
POST /chauffeur-bookings
PATCH /chauffeur-bookings/:id
DELETE /chauffeur-bookings/:id
GET /chauffeur/services
GET /chauffeur/vehicles
POST /chauffeur-bookings/confirm
GET /chauffeur-bookings/upcoming/:userId
POST /chauffeur-bookings/cancel
GET /chauffeur/rates
POST /chauffeur-bookings/modify
```

### **Currency Conversion APIs (8 APIs)**
```
GET /currency-conversions
GET /currency-conversions/:id
POST /currency-conversions
GET /exchange-rates
GET /currencies
POST /currency-conversions/calculate
GET /currency-conversions/history/:userId
POST /currency-conversions/execute
```

### **File Upload APIs (8 APIs)**
```
GET /files/:userId
POST /files/upload
DELETE /files/:id
GET /files/:id/download
POST /files/upload-profile-picture
POST /files/upload-document
GET /files/kyc/:userId
POST /files/validate
```

### **Utility APIs (10 APIs)**
```
GET /banks
GET /countries
GET /states/:countryCode
GET /currencies
GET /exchange-rates
GET /languages
GET /timezones
POST /contact/support
GET /app/version
GET /maintenance/status
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

### **PIN System (For Transactions)**
- 4-digit PIN (separate from password)
- Encrypted storage
- PIN change history tracking
- PIN verification for all transactions
- Maximum 3 failed attempts before lockout

### **KYC & Compliance**
- Document verification
- Identity verification
- Address verification
- Employment verification
- Risk assessment

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

### **Biometric Authentication**
- Fingerprint support
- Face ID support
- Biometric preferences

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
2. KYC verification system
3. Basic transactions
4. Bill payments
5. Airtime & data

### **Phase 2 (Advanced Features)**
1. Virtual cards
2. Gift cards
3. Crypto trading
4. Travel bookings
5. Chauffeur services

### **Phase 3 (Premium Features)**
1. Real-time notifications
2. Advanced analytics
3. API integrations
4. Mobile optimizations
5. Advanced security features

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

# KYC Services
VERIFY_ME_API_KEY=your_verify_me_key
NIBSS_API_KEY=your_nibss_key

# Crypto Services
BINANCE_API_KEY=your_binance_key
BINANCE_SECRET_KEY=your_binance_secret

# Travel Services
AMADEUS_API_KEY=your_amadeus_key
AMADEUS_SECRET=your_amadeus_secret

# Gift Card Services
GIFT_CARD_API_KEY=your_gift_card_key
```

---

## 📈 Summary

This comprehensive setup includes:

✅ **20 Database Tables** covering all application features  
✅ **150+ API Endpoints** for complete functionality  
✅ **Complete KYC System** with document verification  
✅ **Profile Picture Management** with file uploads  
✅ **Multi-tier User System** with upgrade capabilities  
✅ **Comprehensive Transaction Tracking** across all services  
✅ **Virtual Card Management** with funding capabilities  
✅ **Real-time Notifications** with preferences  
✅ **Bill Payment System** for all utilities  
✅ **Gift Card Marketplace** with multiple brands  
✅ **Cryptocurrency Trading** with real-time prices  
✅ **Travel Booking System** (flights, hotels, private jets)  
✅ **Event Ticket System**  
✅ **Airtime & Data Management**  
✅ **Bank Integration** with account verification  
✅ **Beneficiary Management** for quick transfers  
✅ **Chauffeur Services** for transportation  
✅ **Currency Conversion** for asset trading  
✅ **File Upload System** for documents and images  
✅ **Advanced Security** with 2FA and biometric support  
✅ **Complete Profile Management** with onboarding data integration  
✅ **Comprehensive Settings System** with all user preferences  
✅ **PIN-based Transaction Security** separate from login password  
✅ **Persistent Tier System** with saved progress  
✅ **Account Deletion** and data management  
✅ **Shared State Management** between mobile and desktop views  

This setup provides a complete, scalable backend that supports every feature in your Bill Station application with room for future expansion! 