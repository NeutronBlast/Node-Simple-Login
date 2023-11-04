## Login

- **Method**: POST
- **Endpoint**: `/api/v1/users/login`

### Headers

- **Content-Type**: `application/json`

### Request Body (Raw)

```json
{
  "phone": "prueba",
  "password": "prueba"
}
```

### Response 200 (OK)
```json
{
    "user": {
    "id": 53,
    "name": "prueba",
    "session_active": true,
    "email": "prueba@fakemail.com",
    "phone": "020202",
    "address": "AV Trist 14 05"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
}
```