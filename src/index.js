import { handleOpenAI } from './providers/openai.js';
import { handleClaude } from './providers/claude.js';
import { handleGemini } from './providers/gemini.js';

// Import HTML template
import htmlContent from './ui/index.html';

/**
 * AI Proxy Worker
 * Routes requests to OpenAI, Claude, and Gemini APIs
 */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return handleCORS();
        }

        try {
            // Route based on path prefix
            if (path.startsWith('/openai')) {
                const apiPath = path.replace('/openai', '') || '/';
                return await handleOpenAI(request, apiPath);
            }

            if (path.startsWith('/claude')) {
                const apiPath = path.replace('/claude', '') || '/';
                return await handleClaude(request, apiPath);
            }

            if (path.startsWith('/gemini')) {
                const apiPath = path.replace('/gemini', '') || '/';
                return await handleGemini(request, apiPath);
            }

            // Serve verification UI for root path
            if (path === '/' || path === '/index.html') {
                return new Response(htmlContent, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8',
                    },
                });
            }

            // Health check endpoint
            if (path === '/health') {
                return new Response(JSON.stringify({
                    status: 'ok',
                    timestamp: new Date().toISOString(),
                    providers: ['openai', 'claude', 'gemini']
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            // 404 for unknown routes
            return new Response(JSON.stringify({
                error: 'Not Found',
                message: 'Unknown endpoint. Available prefixes: /openai, /claude, /gemini',
                availableEndpoints: {
                    openai: '/openai/v1/...',
                    claude: '/claude/v1/...',
                    gemini: '/gemini/v1beta/...',
                    ui: '/',
                    health: '/health'
                }
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });

        } catch (error) {
            return new Response(JSON.stringify({
                error: 'Internal Server Error',
                message: error.message
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    },
};

/**
 * Handle CORS preflight requests
 */
function handleCORS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400',
        },
    });
}
