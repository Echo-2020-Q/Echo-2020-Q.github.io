本地开发预览：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run dev
```

`npm run dev` 是开发服务器。GitHub Pages 展示的是生产静态构建，两者内容与交互应一致，但底层加载方式不同。

上线前在本地检查生产构建：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run build
npm run verify:pages
```

校验成功时会显示：

```text
Verified publication journal and static About navigation.
```

GitHub Pages 已由 `.github/workflows/deploy-pages.yml` 自动构建和部署。修改源码后，只需提交并推送：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io
git add .
git commit -m "Update personal website"
git push origin main
```

推送后，在 GitHub 仓库的 `Actions` 页面查看 `Build and deploy PRISM website`。构建和校验全部通过后，GitHub Pages 才会更新。

首次使用自动部署时，需要进入 GitHub 仓库：

```text
Settings > Pages > Build and deployment > Source
```

将 Source 设置为 `GitHub Actions`。

如需继续使用旧的手动复制方式，可以运行：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run deploy:pages
```
