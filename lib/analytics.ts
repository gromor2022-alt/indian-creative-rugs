/**
 * Google tag (gtag.js) for indiancreativerugs.com.
 * Loaded once per page from app/layout.tsx.
 */
export const GOOGLE_TAG_ID = "GT-WRCRTJTP";

export const googleTagSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;

export const googleTagInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');
`;
