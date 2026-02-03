/**
 * Gemini (Google) API Proxy Handler
 * Proxies requests to https://generativelanguage.googleapis.com
 */

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com';

/**
 * Handle Gemini API proxy requests
 * @param {Request} request - The incoming request
 * @param {string} path - The path after /gemini prefix
 * @returns {Promise<Response>}
 */
export async function handleGemini(request, path) {
    const url = new URL(request.url);
    const targetUrl = `${GEMINI_API_BASE}${path}${url.search}`;

    // Clone and forward headers
    const headers = new Headers(request.headers);
    headers.delete('host');

    const init = {
        method: request.method,
        headers: headers,
    };

    // Forward body for non-GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        init.body = request.body;
        init.duplex = 'half';
    }

    const response = await fetch(targetUrl, init);

    // Create new response with CORS headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', '*');

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
}
