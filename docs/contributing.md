# Contributing Guide

## Getting Started

Welcome to the Zagro2 project! This guide will help you understand how to contribute to the project effectively.

## Development Setup

1. Fork and Clone
```bash
# Fork the repository on GitHub
git clone https://github.com/your-username/Zagro2.git
cd Zagro2
```

2. Install Dependencies
```bash
npm install
```

3. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your development keys
```

4. Start Development Server
```bash
npm start
```

## Development Workflow

### 1. Branch Strategy

```
main
 ├── feature/feature-name
 ├── bugfix/bug-description
 ├── hotfix/urgent-fix
 └── release/version-number
```

### 2. Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

Example:
```bash
git commit -m "feat(auth): add social login with Google"
```

### 3. Pull Request Process

1. Create Feature Branch
```bash
git checkout -b feature/new-feature
```

2. Make Changes
```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
```

3. Update Documentation
- Update README if needed
- Add inline documentation
- Update API documentation

4. Submit PR
```bash
git push origin feature/new-feature
# Create PR on GitHub
```

## Code Standards

### 1. TypeScript Style Guide

```typescript
// Use interfaces for object definitions
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type for unions/intersections
type ButtonVariant = 'primary' | 'secondary' | 'danger';

// Use meaningful names
const handleUserAuthentication = async (credentials: Credentials) => {
  // Implementation
};

// Use async/await over promises
const fetchUserData = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
```

### 2. React Native Best Practices

```typescript
// Component organization
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
}

const Component: React.FC<Props> = ({ title }) => {
  // State at the top
  const [data, setData] = useState<Data[]>([]);

  // Effects after state
  useEffect(() => {
    fetchData();
  }, []);

  // Helper functions
  const fetchData = async () => {
    // Implementation
  };

  // Render methods
  const renderItem = (item: Data) => {
    return <Text>{item.name}</Text>;
  };

  // Main render
  return (
    <View>
      {data.map(renderItem)}
    </View>
  );
};

export default Component;
```

### 3. Testing Standards

```typescript
// Component test example
describe('Component', () => {
  beforeEach(() => {
    // Setup
  });

  it('renders correctly', () => {
    const { getByText } = render(<Component title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('handles user interaction', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Component title="Test" onPress={onPress} />
    );
    
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Review Process

### 1. PR Review Checklist

- [ ] Code follows style guide
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No unnecessary dependencies added
- [ ] Commit messages follow convention
- [ ] No sensitive information exposed
- [ ] Performance considerations addressed

### 2. Review Comments

```typescript
// Good comment
// Consider using useCallback for memoization
const handleSubmit = useCallback(() => {
  // Implementation
}, [dependencies]);

// Bad comment
// This doesn't work
const handleSubmit = () => {
  // Implementation
};
```

## Development Tools

### 1. VS Code Extensions

Essential extensions for development:
- ESLint
- Prettier
- React Native Tools
- GitLens
- Jest Runner

### 2. Debugging

```typescript
// Using debugger
const debugFunction = () => {
  debugger; // IDE will break here
  // Continue debugging
};

// Console logging
console.log('[ComponentName]:', data); // Structured logging
```

## CI/CD Pipeline

### 1. Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests"
    ]
  }
}
```

### 2. GitHub Actions

```yaml
# .github/workflows/pr.yml
name: Pull Request

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install
        run: npm install
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
```

## Troubleshooting

### 1. Common Issues

```bash
# Clear React Native cache
npm start -- --reset-cache

# Clear Metro bundler cache
rm -rf $TMPDIR/metro-*

# Update dependencies
npm update
```

### 2. Debugging Tools

```typescript
// Network debugging
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

## Release Process

### 1. Version Bump

```bash
# Update version
npm version patch|minor|major

# Update changelog
git changelog
```

### 2. Release Checklist

- [ ] Version bumped
- [ ] Changelog updated
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Dependencies updated
- [ ] Performance verified
- [ ] Security checks passed

## Support

### Getting Help

1. Check documentation first
2. Search existing issues
3. Ask in discussions
4. Create new issue if needed

### Reporting Issues

```markdown
## Issue Description
[Clear description of the issue]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS:
- React Native version:
- Node version:
```

## Code of Conduct

1. Be respectful
2. Be inclusive
3. Be collaborative
4. Be professional

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
