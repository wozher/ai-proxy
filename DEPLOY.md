# 部署指南

将 AI Proxy 部署到 Cloudflare Workers 的详细步骤。

## 步骤 1：准备工作

### 1.1 注册 Cloudflare 账户

如果没有账户，访问 [Cloudflare 注册页面](https://dash.cloudflare.com/sign-up) 创建。

### 1.2 安装依赖

```bash
cd /Users/devin/tools/workspace_front/ai-proxy
npm install
```

## 步骤 2：登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器让你授权 Wrangler 访问你的 Cloudflare 账户。

## 步骤 3：部署

```bash
npm run deploy
```

成功后输出类似：

```
Uploaded ai-proxy (1.23 sec)
Published ai-proxy (0.45 sec)
  https://ai-proxy.your-subdomain.workers.dev
```

## 步骤 4：验证部署

访问你的 Worker URL（如 `https://ai-proxy.xxx.workers.dev`），应看到验证界面。

## 可选配置

### 绑定自定义域名

1. 在 Cloudflare Dashboard 中添加你的域名
2. 编辑 `wrangler.toml`：

```toml
routes = [
  { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

3. 重新部署：

```bash
npm run deploy
```

### 环境变量

如需配置环境变量，可通过 Dashboard 或 wrangler：

```bash
npx wrangler secret put MY_SECRET
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run deploy` | 部署到生产 |
| `npx wrangler tail` | 查看实时日志 |
| `npx wrangler delete` | 删除 Worker |

## 故障排除

### 部署失败

1. 确保已登录：`npx wrangler whoami`
2. 检查 `wrangler.toml` 配置是否正确

### API 调用失败

1. 检查 API Key 是否正确
2. 使用验证界面测试连接
3. 查看日志：`npx wrangler tail`
