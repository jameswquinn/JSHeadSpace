import { render } from '@testing-library/svelte';
import { useHead } from '../src/SvelteIntegration';

// Mock HeadSpace
jest.mock('../src/HeadSpace', () => {
  return jest.fn().mockImplementation(() => ({
    createChild: jest.fn().mockReturnValue({
      setTitle: jest.fn(),
      setMeta: jest.fn(),
      setLink: jest.fn(),
    }),
    removeChild: jest.fn(),
  }));
});

describe('Svelte Integration', () => {
  test('useHead function updates head elements', () => {
    const TestComponent = {
      render: () => {
        useHead({
          title: 'Test Title',
          meta: { description: 'Test description' },
          links: { canonical: { href: 'https://example.com' } },
        });
        return { html: '<div>Test Component</div>' };
      },
    };

    const { container } = render(TestComponent);

    // Add assertions here
  });
});
