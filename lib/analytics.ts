const trackEvent = (name: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // Wait for umami to be available
  const attemptTrack = (retries = 0) => {
    const umami = (window as any).umami;
    if (umami && typeof umami.trackEvent === 'function') {
      umami.trackEvent(name, data);
    } else if (retries < 5) {
      // Retry after 100ms if umami not ready
      setTimeout(() => attemptTrack(retries + 1), 100);
    }
  };

  attemptTrack();
};

export function trackGateEntry() {
  trackEvent('gate_entry', {
    visitor_type: 'unauthenticated',
    url: window.location.href,
  });
}

export function trackAuthSuccess() {
  trackEvent('auth_success', {
    visitor_type: 'authenticated',
  });
}

export function trackAuthFailure() {
  trackEvent('auth_failure', {
    reason: 'invalid_password',
  });
}

export function trackSkuThumbnailClick(skuId: string, skuName: string) {
  trackEvent('sku_thumbnail_click', {
    sku_id: skuId,
    sku_name: skuName,
  });
}

export function trackMainPageAccess() {
  trackEvent('main_page_access', {
    visitor_type: 'authorized',
  });
}
