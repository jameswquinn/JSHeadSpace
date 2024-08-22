import { HeadSpace } from 'head-space';

export async function handle({ event, resolve }) {
  const headSpace = new HeadSpace();
  event.locals.headSpace = headSpace;

  const response = await resolve(event);

  // Generate SSR tags
  const headTags = headSpace.generateSSRTags();

  // Inject head tags into the HTML
  const html = await response.text();
  const updatedHtml = html.replace('%sveltekit.head%', headTags);

  return new Response(updatedHtml, {
    status: response.status,
    headers: response.headers
  });
}
