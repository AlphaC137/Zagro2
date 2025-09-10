# UI Components Documentation

## Overview

Zagro2 uses a component-based architecture with NativeWind (TailwindCSS) for styling. All components are built with TypeScript and follow React Native best practices.

## Core Components

### CustomButton
A versatile button component with multiple variants.

```typescript
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

// Usage
<CustomButton
  title="Sign In"
  bgVariant="primary"
  textVariant="default"
  onPress={handleSignIn}
/>
```

### InputField
A customizable text input component.

```typescript
interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

// Usage
<InputField
  label="Email"
  placeholder="Enter email"
  icon={icons.email}
  textContentType="emailAddress"
/>
```

### GoogleTextInput
Location search input with Google Places integration.

```typescript
interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

// Usage
<GoogleTextInput
  icon={icons.search}
  handlePress={handleLocationSelect}
/>
```

### Map
Interactive map component with markers and routing.

```typescript
// Usage
<Map />  // Component handles its own state through store
```

### RideCard
Displays ride information in a card format.

```typescript
interface RideCardProps {
  ride: Ride;
}

// Usage
<RideCard ride={rideData} />
```

## Layouts

### RideLayout
Standard layout for ride-related screens.

```typescript
interface RideLayoutProps {
  children: React.ReactNode;
  title: string;
}

// Usage
<RideLayout title="Book Ride">
  {/* Screen content */}
</RideLayout>
```

## Theme System

### Colors
```javascript
const colors = {
  primary: {
    100: "#F5F8FF",
    500: "#0286FF",
    900: "#242B4D",
  },
  secondary: {
    100: "#F8F8F8",
    500: "#AAAAAA",
    900: "#333333",
  },
  success: {
    500: "#38A169",
  },
  danger: {
    500: "#F56565",
  },
  general: {
    100: "#CED1DD",
    500: "#F6F8FA",
  },
};
```

### Typography
```javascript
const fontFamily = {
  Jakarta: ["Jakarta", "sans-serif"],
  JakartaBold: ["Jakarta-Bold", "sans-serif"],
  JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
  JakartaMedium: ["Jakarta-Medium", "sans-serif"],
};
```

### Common Styles
```javascript
const commonStyles = {
  shadow: "shadow-md shadow-neutral-400/70",
  roundedFull: "rounded-full",
  container: "flex-1 bg-white p-5",
};
```

## Screen Flows

### Authentication Flow
```
Welcome Screen
    │
    ├── Sign Up Screen
    │      │
    │      └── Home Screen
    │
    └── Sign In Screen
           │
           └── Home Screen
```

### Main Navigation Flow
```
Tab Navigation
    │
    ├── Home Tab
    │    │
    │    └── Book Ride Flow
    │         │
    │         ├── Location Selection
    │         ├── Driver Selection
    │         └── Ride Confirmation
    │
    ├── Rides Tab
    │    │
    │    └── Ride History
    │         │
    │         └── Ride Details
    │
    ├── Chat Tab
    │    │
    │    └── Chat List
    │         │
    │         └── Chat Room
    │
    └── Profile Tab
```

## Component Best Practices

### 1. Component Structure
```typescript
import { FC } from 'react';
import { View, Text } from 'react-native';

interface Props {
  // Props interface
}

const Component: FC<Props> = ({ prop1, prop2 }) => {
  // Component logic

  return (
    <View>
      {/* Component JSX */}
    </View>
  );
};

export default Component;
```

### 2. Style Organization
```typescript
// Component-specific styles
const styles = {
  container: "flex-1 bg-white p-5",
  header: "text-2xl font-JakartaBold mb-5",
  content: "flex-row items-center justify-between",
};
```

### 3. Component Testing
```typescript
describe('Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Component />);
    expect(getByText('Title')).toBeTruthy();
  });
});
```

## Accessibility

### Guidelines
1. Use semantic elements
2. Provide accessibility labels
3. Support screen readers
4. Maintain proper contrast

### Example
```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Sign in button"
  accessibilityHint="Tapping this button will sign you in"
>
  <Text>Sign In</Text>
</TouchableOpacity>
```

## Performance Optimization

### 1. Memoization
```typescript
const MemoizedComponent = React.memo(({ prop }) => {
  return <View>{/* Component content */}</View>;
});
```

### 2. Lazy Loading
```typescript
const LazyComponent = React.lazy(() => import('./Component'));
```

### 3. Image Optimization
```typescript
<Image
  source={require('./image.png')}
  resizeMode="contain"
  className="w-full h-[300px]"
/>
```

## Component Documentation Template

```markdown
# Component Name

## Description
Brief description of the component's purpose and functionality.

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop1 | string | Yes | - | Description |
| prop2 | number | No | 0 | Description |

## Usage Example
\`\`\`typescript
import { Component } from './components';

<Component
  prop1="value"
  prop2={42}
/>
\`\`\`

## Notes
Additional information about usage, edge cases, or dependencies.
```
