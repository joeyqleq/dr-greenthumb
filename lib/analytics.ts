export function trackGateEntry() {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.trackEvent('gate_entry', {
      url: window.location.href,
      domain: window.location.hostname,
    });
  }
}

export function trackAuthSuccess(password?: string) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.trackEvent('auth_success', {
      visitor_type: 'authenticated',
      url: window.location.href,
    });
  }
}

export function trackAuthFailure() {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.trackEvent('auth_failure', {
      reason: 'invalid_password',
    });
  }
}

export function trackSkuThumbnailClick(skuId: string, skuName: string) {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.trackEvent('sku_thumbnail_click', {
      sku_id: skuId,
      sku_name: skuName,
      timestamp: new Date().toISOString(),
    });
  }
}

export function trackMainPageAccess() {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.trackEvent('main_page_access', {
      visitor_type: 'authorized',
      url: window.location.href,
    });
  }
}
