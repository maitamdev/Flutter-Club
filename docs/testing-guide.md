# Testing Guide

## Cau truc test
- Unit tests cho utils va services
- Component tests cho UI components
- Integration tests cho form submissions
- E2E tests cho user flows

## Chay tests
npm run test         # Unit + Component
npm run test:e2e     # End-to-end

## Test coverage
npm run test:coverage

## Best practices
1. Moi function util nen co unit test
2. Moi form nen test validation
3. Moi API route nen test response format
4. Test ca truong hop loi va edge cases
