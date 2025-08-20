# Bill Station - Modern Fintech Platform

Bill Station is a comprehensive financial technology platform that provides users with a seamless digital banking experience. This application offers a wide range of financial services including money transfers, bill payments, virtual cards, cryptocurrency management, and more, all through an intuitive and user-friendly interface.

## ✨ Key Features

- 💳 **Virtual Cards**: Create and manage virtual cards for secure online transactions
- 💱 **Crypto Management**: Buy, sell, and manage cryptocurrencies
- ✈️ **Travel Services**: Book flights, hotels, and private charters
- 🏦 **Bank Transfers**: Send and receive money with ease
- 📱 **Mobile Top-ups**: Recharge airtime and data for all major networks
- 🎁 **Gift Cards**: Purchase and manage digital gift cards
- 🔒 **Secure Authentication**: Powered by Clerk for robust user authentication
- 📊 **Transaction History**: Track all your financial activities in one place

## 🚀 Technologies Used

- ⚡ **Frontend**: React 18 with TypeScript
- 🎨 **Styling**: Tailwind CSS with shadcn/ui components
- 🔄 **State Management**: React Query for server state
- 🛠 **Build Tool**: Vite
- 🔐 **Authentication**: Clerk
- 📱 **UI Components**: Radix UI Primitives
- 📅 **Date Handling**: date-fns
- 🎭 **Animation**: Framer Motion

## 🛠 Getting Started

### Prerequisites

- Node.js 16+ (Recommended: Latest LTS version)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd bill-station-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=your_api_base_url
   ```

4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗 Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Application pages/routes
├── services/      # API services and integrations
└── styles/        # Global styles and themes
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries or support, please contact our team at support@billstation.com
