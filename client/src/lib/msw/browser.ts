import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { simulateStatusUpdates } from './data';

export const worker = setupWorker(...handlers);

// Start the worker and enable status updates simulation
export async function startMSW() {
  if (typeof window !== 'undefined') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        quiet: false,
      });
      
      // Start simulating status updates
      simulateStatusUpdates();
      
      console.log('MSW worker started with service monitoring simulation');
    } catch (error) {
      console.warn('MSW failed to start, continuing without mocking:', error);
      // Continue without MSW in case of service worker issues
      simulateStatusUpdates();
    }
  }
}
