# Chenglintao 个人主页

使用 Next.js、TypeScript 和 Tailwind CSS 构建的个人作品集。

- 网站：https://orangechengcc.github.io/
- 仓库：https://github.com/OrangeChengcc/OrangeChengcc.github.io
- 联系邮箱：chenglintao@whut.edu.cn

## 本地开发

```bash
npm ci
npm run dev
```

打开 http://localhost:8522。

## 部署到 GitHub Pages

1. 在仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
2. 打开 **Actions → Deploy to GitHub Pages → Run workflow**，选择 `main` 并运行。如果首次推送触发的任务因尚未启用 Pages 而失败，完成第 1 步后重新运行即可。
3. 部署成功后访问 https://orangechengcc.github.io/。

之后每次推送到 `main` 都会自动构建并更新网站。只需提交源代码，构建生成的 `out/` 和 `.next/` 不需要提交。

更新网站时，在项目目录执行：

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

工作流会先运行 ESLint，再构建静态页面并部署。如果使用其他仓库名，例如 `my-portfolio`，网站地址会是 `https://orangechengcc.github.io/my-portfolio/`。工作流会读取 Pages 配置并自动设置资源路径，也支持在 Pages 设置中配置的自定义域名。

## 本地检查静态导出

```bash
npm run build
python3 -m http.server 8523 --directory out
```

打开 http://localhost:8523。正式部署的页面不会显示 Next.js 开发模式的“N”按钮。

## 许可证

本项目使用 MIT 许可证，详见 [LICENSE](LICENSE)。
