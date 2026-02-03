# AI Proxy

一个部署在 Cloudflare Workers 上的 AI API 代理，支持 OpenAI、Claude 和 Gemini。

## 功能特性

- 🚀 **多平台支持** - 同时代理 OpenAI、Claude、Gemini API
- 🔒 **透明代理** - 完整转发请求，支持所有模型
- 🌐 **CORS 支持** - 可从任意前端调用
- 🎨 **验证界面** - 内置美观的测试页面

## 快速开始

### 前置要求

- Node.js 18+
- [Cloudflare 账户](https://dash.cloudflare.com/sign-up)
- Wrangler CLI（随项目安装）

### 本地开发

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 访问 http://localhost:8787
```

### 部署到 Cloudflare

```bash
# 首次部署需要登录
npx wrangler login

# 部署
npm run deploy
```

部署成功后会得到一个 URL，如：`https://ai-proxy.your-subdomain.workers.dev`

## API 端点

| 提供商 | 路径前缀 | 目标 API |
|--------|----------|----------|
| OpenAI | `/openai/*` | api.openai.com |
| Claude | `/claude/*` | api.anthropic.com |
| Gemini | `/gemini/*` | generativelanguage.googleapis.com |

## 使用示例

### OpenAI

```bash
curl -X POST https://your-worker.workers.dev/openai/v1/chat/completions \
  -H "Authorization: Bearer sk-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Claude

```bash
curl -X POST https://your-worker.workers.dev/claude/v1/messages \
  -H "x-api-key: sk-ant-xxx" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 512,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Gemini

```bash
curl -X POST "https://your-worker.workers.dev/gemini/v1beta/models/gemini-2.0-flash-exp:generateContent?key=xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Hello"}]}]
  }'
```

## 自定义域名（可选）

编辑 `wrangler.toml`：

```toml
routes = [
  { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## License

MIT
