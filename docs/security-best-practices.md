# Security Best Practices

## Authentication
- Use Firebase Auth for all authentication flows
- Implement session timeout after 30 minutes of inactivity

## Input Validation
- Sanitize all user inputs on both client and server
- Use Zod schemas for runtime validation

## API Security
- Implement rate limiting on all API endpoints
- Use CSRF tokens for state-changing requests

## Firebase Rules
- Follow principle of least privilege
- Validate data structure in security rules
