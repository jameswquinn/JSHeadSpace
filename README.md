# HeadSpace

HeadSpace is a framework-agnostic library for managing `<head>` elements in web applications. It provides a flexible and efficient way to manage meta tags, title, scripts, and other `<head>` elements, similar to React Helmet but designed to work with various frameworks.

## Installation

```bash
npm install head-space
```

or

```bash
yarn add head-space
```

## Usage

### React

```jsx
import React from 'react';
import { HeadSpaceProvider, useHead } from 'head-space';

function App() {
  return (
    <HeadSpaceProvider>
      <HomePage />
    </HeadSpaceProvider>
  );
}

function HomePage() {
  useHead({
    title: 'Home Page',
    meta: { description: 'Welcome to our home page' },
    links: { canonical: 'https://example.com' }
  });

  return <h1>Welcome to the Home Page</h1>;
}
```

For usage with other frameworks (Preact, Vue, Svelte), please refer to the examples in the `examples/` directory.

## API Documentation

For detailed API documentation, please refer to the [API.md](docs/API.md) file.

## Development

To set up the project for development:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build the project: `npm run build`

## Contributing

Please read our [contributing guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Publishing

To publish a new version of the package:

1. Update the version in `package.json` following [semantic versioning](https://semver.org/) guidelines.
2. Run `npm run build` to ensure the latest changes are built.
3. Commit your changes and push to the repository.
4. Run `npm publish` to publish the new version to npm.

Make sure you're logged in to npm (`npm login`) and have the necessary permissions to publish the package.
