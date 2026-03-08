# Auth API

## Endpoints

### POST /api/auth/login
Authenticate user with email and password.

### POST /api/auth/register
Create new user account.

### POST /api/auth/logout
Invalidate current session.

### GET /api/auth/me
Get current user profile.

## Error Codes
- 401: Invalid credentials
- 403: Account disabled
- 429: Too many attempts
