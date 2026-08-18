# qtt · 个人站

一个离线可用的静态个人网站，设计语言借鉴 **Continuation Writing Studio V4.8**（奶油米背景、深蓝主色、圆角卡片、衬线大标题），强调色由金色调为青绿，形成个人化配色。

> 纯静态页面，无需安装环境、无需构建、无需联网，双击 `index.html` 即可浏览。

## 功能特性

- **首页（个人介绍）**：Hero 大标题 + 核心数据统计 + 关于我 / 技能 + 精选项目 + 最新博客 + 联系社交，共六大板块
- **多页导航**：首页 / 项目展示 / 个人博客 / 关于我 / 联系
- **暗色模式**：一键切换，选择通过 `localStorage` 持久化，刷新与翻页后保持
- **侧边栏收起/展开**：
  - 点击左上角 `qt` 图块即可收起/展开导航，收起时仅保留图标
  - 页面顶端默认展开；向下滚动自动收起；回到顶端自动展开
  - 手动选择在滚动中保持，回到顶端仍自动展开
- **响应式布局**：桌面（≥1050px）侧边栏；移动端侧边栏自动置顶为横排，禁用收起功能

## 配色

| 角色 | 变量 | 值 |
| --- | --- | --- |
| 背景 | `--bg` | `#f7f4ee`（奶油米） |
| 主色 | `--blue` | `#16395e`（深蓝） |
| 强调色 | `--accent` | `#2e7a59`（青绿） |
| 文字 | `--text` / `--muted` | `#14213d` / `#65748b` |
| 边框 | `--line` | `#e7dece` |

## 文件结构

```text
MyPages/
├─ index.html        首页（个人介绍页）
├─ projects.html     项目展示页（空壳，以「这里是知识的荒原」占位）
├─ blog.html         个人博客页（空壳，以「这里是知识的荒原」占位）
├─ README.md
├─ css/
│  └─ style.css      全站共享样式（设计令牌 / 组件 / 暗色模式 / 响应式）
└─ js/
   └─ main.js        暗色模式切换 + 侧边栏收起/展开逻辑
```

## 使用方式

直接双击 `index.html`，使用 Chrome 或 Edge 打开即可。项目完全离线运行，不依赖任何外部资源。

## 自定义指南

### 1. 替换个人信息
所有个人内容均在 `index.html` 中，直接搜索以下占位位置替换即可：
- Hero 大标题、简介（`hero-copy` 区块）
- 核心统计数字（`stat-grid` 四个 `stat-card`）
- 「关于我」介绍与技能标签、技能进度条
- 精选项目卡片（3 张 `project-card`）
- 最新博客文章（3 条 `article-item`）
- 联系链接（`contact-grid`，替换 GitHub / Email / Twitter 的占位 `href`）

### 2. 调整配色
编辑 `css/style.css` 顶部的 `:root` 设计令牌即可全局换色；暗色模式在 `body.dark` 中覆盖。

### 3. 完善项目页 / 博客页
`projects.html` 与 `blog.html` 目前为占位页，主体为「这里是知识的荒原」。可按 `index.html` 的组件风格（`project-card` / `article-item`）在其 `<main>` 中填充真实内容。

### 4. 侧边栏行为
相关参数在 `js/main.js` 顶部：
- `COLLAPSE_THRESHOLD`：触发自动收起的滚动距离（默认 140px）
- `isDesktop()`：启用收起的视口下限（默认 ≥1050px）

## 兼容性

- Chrome / Edge / Firefox / Safari 等现代浏览器
- 依赖 `backdrop-filter`、CSS Grid、`localStorage`，请使用较新版本浏览器

## 风格出处

视觉语言参考：[Continuation Writing Studio V4.8](../Continuation_Writing_Studio_V4_8/) —— 一个离线使用的英语读后续写数字教材项目。
