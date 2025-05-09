# UI Core Package

A modern, accessible, and customizable React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## 🚀 Technologies

- **React 19+** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible Primitives
- **Storybook** - Component Documentation & Testing
- **Vitest** - Unit Testing
- **class-variance-authority** - Component Variants
- **clsx/tailwind-merge** - Class Name Utilities

## ✨ Key Features

- 🎨 Customizable theming with dark mode support
- ♿️ Accessible components following WAI-ARIA standards
- 📱 Responsive design
- 🔍 Type-safe props with TypeScript
- 📚 Comprehensive documentation with Storybook
- ✅ Thoroughly tested components
- 🎯 Zero-runtime CSS with Tailwind
- 🔄 Seamless integration with React applications

## 📦 Installation

```bash
pnpm install @dge/ui-core
```

## 🎯 Usage

### 1. Import Styles

```typescript
import "@dge/ui-core/index.css";
```

### 2. Use Components

```typescript
import { Button, Headline, DropdownMenu } from '@dge/ui-core';

function MyComponent() {
  return (
    <div>
      <Headline>Welcome</Headline>
      <Button variant="primary">Click Me</Button>
    </div>
  );
}
```

## 🧱 Components

### Button

A versatile button component with multiple variants and sizes.

```typescript
import { Button } from '@dge/ui-core';

function Example() {
  return (
    <Button variant="default" size="lg">
      Click Me
    </Button>
  );
}
```

**Props:**

- `variant`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`
- `size`: `'default' | 'sm' | 'lg' | 'icon'`

### Headline

Typography component for headings.

```typescript
import { Headline } from '@dge/ui-core';

function Example() {
  return <Headline variant="h1">Page Title</Headline>;
}
```

**Props:**

- `variant`: `'h1' | 'h2' | 'h3' | 'h4'`

### DropdownMenu

An accessible dropdown menu component.

```typescript
import { DropdownMenu } from '@dge/ui-core';

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Code

Inline code display component.

```typescript
import { Code } from '@dge/ui-core';

function Example() {
  return <Code>const example = "code";</Code>;
}
```

### Paragraph

Text paragraph component with proper spacing.

```typescript
import { Paragraph } from '@dge/ui-core';

function Example() {
  return <Paragraph>Your content here...</Paragraph>;
}
```

## 🎨 Theming

The library supports both light and dark modes through CSS variables. Customize the theme by modifying the CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
  /* ... other variables */
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  /* ... other dark mode variables */
}
```

## 🧪 Development

### Setup

```bash
pnpm install
```

### Run Storybook

```bash
pnpm run dev
```

### Testing

```bash
pnpm run test
```

### Build

```bash
pnpm run build
```

## 🧩 Architecture

The package follows a component-driven architecture:

```text
src/
├── components/     # React components
├── presets/       # Tailwind presets
├── utils/         # Utility functions
└── index.ts       # Public API
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add amazing feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/
   amazing-feature
   ```

5. Open a Pull Request

## 📝 Testing

Our testing strategy includes:

- Unit tests with Vitest
- Component testing with Storybook
- Visual regression testing (optional)
- Accessibility testing with Storybook a11y addon

## 📚 Additional Resources

- [Storybook Documentation](http://localhost:6001)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📄 License
