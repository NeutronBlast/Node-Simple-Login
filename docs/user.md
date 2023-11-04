## Get Users

- **Method**: GET
- **Endpoint**: `/api/v1/users`

### Headers

- **Content-Type**: `application/json`

### Response 200 OK

```json
[
  {
    "id": 1,
    "name": "test",
    "phone": "213212656",
    "email": "test@gmail.com",
    "address": null,
    "session_active": true
  },
  {
    "id": 1,
    "name": "test",
    "phone": "213212656",
    "email": "test@gmail.com",
    "address": null,
    "session_active": true
  },
  {
    "id": 1,
    "name": "test",
    "phone": "213212656",
    "email": "test@gmail.com",
    "address": null,
    "session_active": true
  }
]
```

## Get User

- **Method**: GET
- **Endpoint**: `/api/v1/users/{id_user}`

### Headers

- **Content-Type**: `application/json`

### Response 200 OK

```json
{
  "id": 2,
  "document_type_id": null,
  "document_number": null,
  "name": null,
  "phone": "5654654",
  "email": "test",
  "address": null,
  "session_active": true
}
```

## Create User

- **Method**: POST
- **Endpoint**: `/api/v1/users`

### Headers

- **Content-Type**: `application/json`

### Request Body (raw)

```json
{
  "name": "string",
  "phone": "string",
  "email": "user@example.com",
  "password": "string",
  "address": "string"
}
```

### Response (200) OK

```json
{
    "name": "string",
    "phone": "string",
    "email": "user@example.com",
    "password": "string",
    "address": "string"
}
```

## Update User

- **Method**: PUT
- **Endpoint**: `/api/v1/users/{id_user}`

### Headers

- **Content-Type**: `application/json`

### Body (raw)

```json
{
  "name": "string",
  "phone": "string",
  "email": "user@example.com",
  "password": "string",
  "address": "string"
}
```

### Response (200) OK
```json
{
    "name": "string",
    "mobile_phone": "string",
    "email": "user@example.com",
    "password": "string",
    "address": "string"
}
```

## Delete User

- **Method**: DELETE
- **Endpoint**: `/api/v1/users/{id_user}`

### Headers

- **Content-Type**: `application/json`

### Response 204 OK

No content is returned in the response. A successful deletion of the user will result in a `204 No Content` response.
