import { flushSync } from 'react-dom';

/**
 * Global protection against unhandled promise rejections from View Transitions API.
 * In environments like Google AI Studio preview iframes, an uncaught AbortError
 * can trigger the host UI to switch tabs from Preview to Chat.
 */
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event?.reason?.message || String(event?.reason || '');
    const name = event?.reason?.name || '';
    if (name === 'AbortError' || msg.toLowerCase().includes('transition')) {
      event.preventDefault();
    }
  });
}

let isTransitioning = false;

/**
 * Executes a state update wrapped in the browser's native View Transitions API (document.startViewTransition).
 * Uses flushSync to ensure React synchronously updates the DOM before the snapshot is taken,
 * and includes robust error-trapping and re-entrancy protection.
 */
export function runViewTransition(updateFn: () => void): void {
  // If a transition is already in flight, execute update directly to avoid AbortError
  if (isTransitioning) {
    updateFn();
    return;
  }

  const scrollContainer = document.getElementById('yoli-app-body');

  const hasViewTransition =
    typeof document !== 'undefined' &&
    typeof (document as any).startViewTransition === 'function';

  if (!hasViewTransition) {
    updateFn();
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
    return;
  }

  isTransitioning = true;

  try {
    const transition = (document as any).startViewTransition(() => {
      try {
        flushSync(() => {
          updateFn();
        });
      } catch {
        updateFn();
      }
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    });

    if (transition) {
      if (typeof transition.finished?.catch === 'function') {
        transition.finished
          .catch(() => {})
          .finally(() => {
            isTransitioning = false;
          });
      } else {
        isTransitioning = false;
      }

      if (typeof transition.ready?.catch === 'function') {
        transition.ready.catch(() => {});
      }
      if (typeof transition.updateCallbackDone?.catch === 'function') {
        transition.updateCallbackDone.catch(() => {});
      }
    } else {
      isTransitioning = false;
    }
  } catch {
    isTransitioning = false;
    updateFn();
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }
}
