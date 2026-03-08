# Component Guidelines

## File Structure
Each component should be in components/ui/ with a descriptive filename.

## Naming
- PascalCase for component names
- kebab-case for filenames

## Patterns
- Use 'use client' directive for client components
- Import cn from @/lib/utils for className merging
- Use cva for variant-based styling

## Accessibility
- Include ARIA attributes
- Support keyboard navigation
