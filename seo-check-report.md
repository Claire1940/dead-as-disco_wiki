# SEO 检查报告

生成时间: 2026-05-06 UTC

## 检查摘要

- ✅ 通过: 31
- ❌ 失败: 0
- ⚠️ 警告: 3
- 📊 总计: 34

## 详细结果

### 阶段 1：代码结构检查

- ✅ `src/app/[locale]/layout.tsx` 包含 `<html lang={locale}>`，并配置基础 metadata、robots、alternates。
- ✅ `src/app/[locale]/[...slug]/page.tsx` 的 `generateMetadata` 覆盖 title/description/alternates/openGraph/robots。
- ✅ 动态页存在英文 fallback 逻辑（内容缺失时 fallback 到 `content/en`）。
- ✅ `src/app/sitemap.ts` 使用 `NEXT_PUBLIC_SITE_URL`，并按语言生成首页、分类页（仅>1文章）、详情页。
- ✅ i18n 路由配置为 `localePrefix: 'as-needed'`、`defaultLocale: 'en'`、`localeDetection: true`。
- ✅ SearchAction 结构化数据已在首页 `HomePageClient.tsx` 的 JSON-LD 中配置。
- ✅ `src/app/robots.ts` 存在并输出 `allow: /` 与 `sitemap`。
- ✅ H1 检查通过：首页、列表页、详情页、法务页均有单一主 H1。
- ✅ 主要组件图片均带 `alt` 文本（`NavigationPage`、卡片图片等）。
- ✅ 面包屑与相关内链组件路径完整（详情页使用 `DetailPage` 组合渲染）。
- ✅ 本次修复：恢复首页模块标题可链接（`LinkedTitle`），并注入真实 `moduleLinkMap`。
- ✅ 本次修复：首页法务链接改为按 locale 输出，避免跨语言跳转不一致。

### 阶段 2：构建验证

- ✅ `npm run typecheck` 通过。
- ✅ `npm run lint` 通过。
- ✅ `npm run build` 通过（存在已知 non-blocking warning，见“警告项”）。

### 阶段 3：安全检查

- ✅ 未在本次改动中新增敏感信息使用点。
- ✅ 运行链路未发现因本次改动引入的密钥泄露风险。

### 阶段 4：本地运行验证

- ✅ 首页 `curl -I` 返回 `HTTP/1.1 200 OK`。
- ✅ 非默认语言路由 `ja/ko/es` 全部 `200 OK`。
- ✅ `/en` 返回 `307` 到 `/`，符合 `as-needed` 预期。
- ✅ 首页 `{{OLD_THEME}}` 占位符残留计数为 `0`。
- ✅ 多语言文件 JSON 校验通过。

## 警告项（非阻塞）

1. `next build` 输出 `content` 目录相关 `Module not found` warning（当前仓库无 `content/`，但构建 exit code 为 0）。
2. 开发端口 `3000` 被占用，`next dev` 自动切换到 `3001`。
3. 翻译脚本 `ko` 某个 chunk API 超时后按设计回退英文（脚本机制允许，后续可再次覆盖优化）。

## 修复建议

### 🔴 高优先级

1. 无（本次阻塞项已清零）。

### 🟡 中优先级

1. 为 `content/` 缺失场景增加显式构建条件分支，减少 warning 噪音。
2. 将 dev 启动脚本加端口占用探测并输出实际端口到可复用变量。
3. 为翻译脚本增加“仅重试失败 chunk”能力，减少全量重跑成本。

### 🟢 低优先级

1. 清理不再启用语言文件（`de/fr/pt/ru/tr`）或改为按 routing 自动生成语言清单。

