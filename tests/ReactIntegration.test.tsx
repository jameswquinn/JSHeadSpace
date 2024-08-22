import React from 'react';
import { render } from '@testing-library/react';
import { HeadSpaceProvider, useHead } from '../src/ReactIntegration';

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

describe('React Integration', () => {
  test('useHead hook updates head elements', () => {
    const TestComponent = () => {
      useHead({
        title: 'Test Title',
        meta: { description: 'Test description' },
        links: { canonical: { href: 'https://example.com' } },
      });
      return <div>Test Component</div>;
    };

    const { container } = render(
      <HeadSpaceProvider>
        <TestComponent />
      </HeadSpaceProvider>
    );

    // Add assertions here
  });
});
