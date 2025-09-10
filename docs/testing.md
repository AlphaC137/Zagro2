# Testing Documentation

## Overview

This document outlines the testing strategy and procedures for the Zagro2 ride-sharing application. The testing approach covers unit tests, integration tests, end-to-end tests, and performance testing.

## Testing Stack

- Jest: Unit testing framework
- React Native Testing Library: Component testing
- Cypress: End-to-end testing
- Jest Coverage: Code coverage reporting

## Unit Testing

### 1. Component Testing

```typescript
// components/__tests__/CustomButton.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

describe('CustomButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={() => {}} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### 2. Hook Testing

```typescript
// hooks/__tests__/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  it('handles sign in', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password'
      });
    });
    
    expect(result.current.user).toBeTruthy();
  });
});
```

### 3. Utility Function Testing

```typescript
// utils/__tests__/formatters.test.ts
import { formatTime, formatDate } from '../utils';

describe('Formatters', () => {
  describe('formatTime', () => {
    it('formats minutes correctly', () => {
      expect(formatTime(45)).toBe('45 min');
      expect(formatTime(90)).toBe('1h 30m');
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = '2025-09-10';
      expect(formatDate(date)).toBe('10 September 2025');
    });
  });
});
```

## Integration Testing

### 1. API Integration Tests

```typescript
// api/__tests__/rides.test.ts
import { fetchAPI } from '../fetch';

describe('Rides API', () => {
  it('creates a new ride', async () => {
    const ride = await fetchAPI('/rides', {
      method: 'POST',
      body: JSON.stringify({
        pickup_location: {
          latitude: 37.7749,
          longitude: -122.4194
        },
        dropoff_location: {
          latitude: 37.7858,
          longitude: -122.4064
        }
      })
    });
    
    expect(ride).toHaveProperty('id');
    expect(ride.status).toBe('pending');
  });
});
```

### 2. Store Integration Tests

```typescript
// store/__tests__/locationStore.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocationStore } from '../locationStore';

describe('Location Store', () => {
  it('updates user location', () => {
    const { result } = renderHook(() => useLocationStore());
    
    act(() => {
      result.current.setUserLocation({
        latitude: 37.7749,
        longitude: -122.4194,
        address: 'San Francisco'
      });
    });
    
    expect(result.current.userLatitude).toBe(37.7749);
    expect(result.current.userLongitude).toBe(-122.4194);
  });
});
```

## End-to-End Testing

### 1. User Flow Tests

```typescript
// e2e/userFlows.spec.ts
describe('User Flows', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('completes booking flow', () => {
    // Sign in
    cy.get('[data-testid="email-input"]').type('user@example.com');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="sign-in-button"]').click();

    // Book ride
    cy.get('[data-testid="book-ride-button"]').click();
    cy.get('[data-testid="destination-input"]').type('Airport');
    cy.get('[data-testid="confirm-booking"]').click();

    // Verify booking
    cy.get('[data-testid="booking-confirmation"]').should('be.visible');
  });
});
```

### 2. Navigation Tests

```typescript
// e2e/navigation.spec.ts
describe('Navigation', () => {
  it('navigates between tabs', () => {
    cy.get('[data-testid="home-tab"]').click();
    cy.url().should('include', '/home');

    cy.get('[data-testid="rides-tab"]').click();
    cy.url().should('include', '/rides');

    cy.get('[data-testid="profile-tab"]').click();
    cy.url().should('include', '/profile');
  });
});
```

## Performance Testing

### 1. Load Time Tests

```typescript
// performance/loadTime.test.ts
describe('Performance Tests', () => {
  it('loads home screen within threshold', async () => {
    const start = performance.now();
    
    // Navigate to home
    await navigateToHome();
    
    const end = performance.now();
    const loadTime = end - start;
    
    expect(loadTime).toBeLessThan(2000); // 2 seconds threshold
  });
});
```

### 2. Memory Usage Tests

```typescript
// performance/memory.test.ts
describe('Memory Usage', () => {
  it('maintains acceptable memory usage', async () => {
    const initialMemory = performance.memory.usedJSHeapSize;
    
    // Perform operations
    await performHeavyOperations();
    
    const finalMemory = performance.memory.usedJSHeapSize;
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB threshold
  });
});
```

## Test Configuration

### 1. Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
```

### 2. Testing Environment Setup

```typescript
// setupTests.ts
import '@testing-library/jest-native/extend-expect';
import { cleanup } from '@testing-library/react-native';

// Mock external dependencies
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Clean up after each test
afterEach(cleanup);
```

## Continuous Integration

### 1. GitHub Actions Configuration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: npm install
      
      - name: Run Tests
        run: npm test
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v2
```

## Testing Guidelines

### 1. Test Structure

```typescript
describe('Component/Feature', () => {
  // Setup
  beforeEach(() => {
    // Setup code
  });

  // Cleanup
  afterEach(() => {
    // Cleanup code
  });

  // Test cases
  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### 2. Best Practices

1. Test Coverage
- Aim for 80% coverage
- Focus on critical paths
- Include edge cases

2. Test Organization
- Group related tests
- Use descriptive names
- Follow AAA pattern

3. Mocking
- Mock external dependencies
- Use meaningful test data
- Clean up mocks after tests

## Test Reports

### 1. Coverage Report

```bash
# Generate coverage report
npm test -- --coverage

# Output
=============================== Coverage summary ===============================
Statements   : 85.32% ( 324/380 )
Branches     : 80.15% ( 109/136 )
Functions    : 83.87% ( 78/93 )
Lines        : 86.11% ( 310/360 )
================================================================================
```

### 2. Performance Report

```typescript
// Generate performance report
const generatePerformanceReport = async () => {
  const metrics = await collectMetrics();
  return {
    loadTimes: {
      homeScreen: metrics.homeLoadTime,
      mapScreen: metrics.mapLoadTime,
    },
    memoryUsage: {
      peak: metrics.peakMemory,
      average: metrics.averageMemory,
    },
    networkCalls: {
      successful: metrics.successfulCalls,
      failed: metrics.failedCalls,
      averageResponseTime: metrics.avgResponseTime,
    },
  };
};
```
