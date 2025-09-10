# Getting Started with Zagro2

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- A code editor (VS Code recommended)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AlphaC137/Zagro2.git
cd Zagro2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_PLACES_API_KEY=your_google_places_key
EXPO_PUBLIC_DIRECTIONS_API_KEY=your_google_directions_key
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

4. Start the development server:
```bash
npm start
```

## Development Environment Setup

### VS Code Extensions
- ESLint
- Prettier
- React Native Tools
- Tailwind CSS IntelliSense

### iOS Development
1. Install Xcode
2. Install iOS Simulator
3. Run `npx expo run:ios`

### Android Development
1. Install Android Studio
2. Set up Android Emulator
3. Run `npx expo run:android`

## Project Structure

```
/
├── app/                    # Main application screens
├── assets/                # Static assets
├── components/            # Reusable components
├── constants/            # App constants
├── lib/                  # Core utilities
├── store/               # State management
└── types/               # TypeScript definitions
```

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android
- `npm run ios`: Run on iOS
- `npm run web`: Run on web browser
- `npm test`: Run tests
- `npm run lint`: Run ESLint

## Troubleshooting

### Common Issues

1. Metro Bundler issues:
```bash
npm start -- --reset-cache
```

2. Dependencies issues:
```bash
rm -rf node_modules
npm install
```

3. Environment Variables:
- Ensure all environment variables are properly set
- Restart the development server after changing .env

### Getting Help

- Check the [GitHub Issues](https://github.com/AlphaC137/Zagro2/issues)
- Join our community discussions
- Contact the development team
