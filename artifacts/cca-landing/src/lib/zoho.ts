const ZOHO_FORM_BASE =
  "https://forms.zohopublic.com/ccaforms/form/CCAShortLeadIntakeForm/formperma/RNgtmYPeYa7-ztIWdk8uDiy1lSq6H80ZCNPxha5lViI";

/**
 * Build the Zoho intake form URL with a sanitized `referrername` param.
 * Only origin + pathname are passed (no query/hash) so no sensitive URL data
 * leaks to the third-party form. Falls back to the bare base URL on any error.
 */
export function getZohoFormSrc(): string {
  try {
    let rfr = "";
    try {
      const loc = window.self !== window.top ? window.top!.location : window.location;
      rfr = `${loc.origin}${loc.pathname}`;
    } catch {
      const loc = window.location;
      rfr = `${loc.origin}${loc.pathname}`;
    }
    if (rfr && /^https?:\/\//i.test(rfr)) {
      return `${ZOHO_FORM_BASE}?referrername=${encodeURIComponent(rfr.slice(0, 1800))}`;
    }
  } catch {
    /* fall through to base */
  }
  return ZOHO_FORM_BASE;
}
