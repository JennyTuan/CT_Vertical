# 仓库指南

## 项目结构与模块组织
- `src/main.ts` 为入口，挂载 `App.vue`、路由与 Vuetify。
- `src/layouts/` 统一布局（Header/Sidebar/Footer）。
- `src/pages/` 页面级组件（如 `PositionPage.vue`、`ScanningPage.vue`）。
- `src/components/` 复用 UI 组件（`HeaderBar`、`SidebarPanel`、`MetricCard`、`FooterSteps`）。
- `src/composables/` 共享逻辑（如 `useScanState.ts`）。
- `src/constants/`、`src/types/`、`src/data/` 分别放常量、类型与模拟数据。
- 全局样式在 `src/styles/main.css`，组件局部样式用 `style scoped`。

## 开发与构建命令
- `npm install` 安装依赖。
- `npm run dev` 启动本地开发服务。
- `npm run build` 构建生产包。
- `npm run preview` 本地预览构建产物。

## 路由与页面规范
- 路由集中在 `src/router/index.ts`，页面路径与文件名保持一致。
- 新增页面：先建 `src/pages/FooPage.vue`，再注册路由。
- 页面内只处理页面级布局与交互，复用块应拆到 `src/components/`。

## 模拟数据与状态
- 模拟数据集中在 `src/data/`，避免散落在页面中。
- 共享状态逻辑放 `src/composables/`，页面通过组合式函数获取状态。
- 不引入后端依赖；后续如需切换真实接口，优先在 `src/data/` 层替换。

## 编码风格与命名
- Vue 3 + TypeScript；缩进 2 空格。
- 组件/页面文件名用 `PascalCase`；变量与函数用 `camelCase`。
- 图标使用 Material Design Icons（`@mdi/font`），通过 `<v-icon icon="mdi-xxx" />`。

## 提交与 PR 规范
- 提交使用 Conventional Commits（如 `feat: xxx`、`fix: xxx`）。
- PR 包含：变更说明、UI 截图、启动与环境变量说明。

## 配置与安全
- 本地配置用 `.env.local`（如 `GEMINI_API_KEY`）。
- 不提交密钥与 `.env.local`。
