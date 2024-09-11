import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

(function () {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // Default to passive: true for scroll-blocking events
    const shouldModifyOptions =
      (type === 'scroll' || type === 'wheel' || type === 'touchstart' || type === 'touchmove') &&
      !options;
    const newOptions = shouldModifyOptions
      ? { passive: true, capture: false }
      : options;
    return originalAddEventListener.call(this, type, listener, newOptions);
  };
})();
