# API Documentation

## Base URL
```
EXPO_PUBLIC_API_URL=https://zagro-backend-7w9j.onrender.com/api/v1
```

## Authentication

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userType": "RIDER"
}

Response:
{
  "success": boolean,
  "message": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

## Rides

### Create Ride
```http
POST /rides
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickup_location": {
    "latitude": number,
    "longitude": number,
    "address": "string"
  },
  "dropoff_location": {
    "latitude": number,
    "longitude": number,
    "address": "string"
  }
}

Response:
{
  "id": "string",
  "status": "string",
  "driver": {
    "id": "string",
    "name": "string",
    "rating": number
  }
}
```

### Get Ride History
```http
GET /rides
Authorization: Bearer <token>

Response:
[
  {
    "id": "string",
    "origin_address": "string",
    "destination_address": "string",
    "ride_time": number,
    "fare_price": number,
    "payment_status": "string",
    "driver": {
      "first_name": "string",
      "last_name": "string",
      "car_seats": number
    }
  }
]
```

### Get Ride Details
```http
GET /rides/{id}
Authorization: Bearer <token>

Response:
{
  "id": "string",
  "status": "string",
  "pickup_location": {
    "latitude": number,
    "longitude": number,
    "address": "string"
  },
  "dropoff_location": {
    "latitude": number,
    "longitude": number,
    "address": "string"
  },
  "driver": {
    "id": "string",
    "name": "string",
    "rating": number,
    "car_details": {
      "model": "string",
      "color": "string",
      "plate": "string"
    }
  }
}
```

## Payments

### Initialize Payment
```http
POST /payment/initialize/{rideId}
Authorization: Bearer <token>

Response:
{
  "authorization_url": "string",
  "reference": "string"
}
```

### Verify Payment
```http
GET /payment/verify/{reference}
Authorization: Bearer <token>

Response:
{
  "success": boolean,
  "message": "string",
  "data": {
    "amount": number,
    "status": "string",
    "reference": "string"
  }
}
```

## Real-time Events

### Socket.IO Events

#### Connection
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

#### Location Updates
```javascript
// Emit driver location
socket.emit('updateLocation', {
  latitude: number,
  longitude: number
});

// Listen for location updates
socket.on('locationUpdate', (data) => {
  const { latitude, longitude } = data;
});
```

#### Ride Status Updates
```javascript
socket.on('rideUpdate', (data) => {
  const { status, eta } = data;
});
```

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "string",
  "error": {
    "code": "string",
    "details": "string"
  }
}
```

### Common Error Codes
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Server Error

## Rate Limiting

The API implements rate limiting with the following constraints:
- 100 requests per minute per IP
- 1000 requests per hour per user token

## API Versioning

The API uses URL versioning:
- Current version: `v1`
- Version format: `/api/v{version_number}`

## Security

### Authentication
- All protected endpoints require a JWT token
- Token format: `Bearer <token>`
- Token expiration: 24 hours

### CORS
The API implements CORS with the following configuration:
- Allowed origins: Configured per environment
- Allowed methods: GET, POST, PUT, DELETE
- Allowed headers: Content-Type, Authorization

## Testing the API

### Curl Examples

1. Login:
```bash
curl -X POST https://api.zagro.dev/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

2. Create Ride:
```bash
curl -X POST https://api.zagro.dev/api/v1/rides \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup_location": {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "address": "San Francisco, CA"
    },
    "dropoff_location": {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "address": "Oakland, CA"
    }
  }'
```

## Webhooks

### Payment Webhook
```http
POST /webhooks/payment
Content-Type: application/json

{
  "type": "payment.success",
  "data": {
    "reference": "string",
    "amount": number,
    "status": "string"
  }
}
```

## API Client Implementation

### Example API Client
```typescript
class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  }
}
```
