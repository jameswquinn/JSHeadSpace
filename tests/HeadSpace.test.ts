import HeadSpace from '../src/HeadSpace';

describe('HeadSpace', () => {
  let headSpace: HeadSpace;

  beforeEach(() => {
    // Set up a mock document
    document.head.innerHTML = '';
    document.title = '';
    headSpace = new HeadSpace();
  });

  test('setTitle updates document title', () => {
    headSpace.setTitle('Test Title');
    expect(document.title).toBe('Test Title');
  });

  test('setMeta adds meta tag', () => {
    headSpace.setMeta('description', 'Test description');
    const metaTag = document.querySelector('meta[name="description"]');
    expect(metaTag).toBeTruthy();
    expect(metaTag?.getAttribute('content')).toBe('Test description');
  });

  // Add more tests for other methods...
});
