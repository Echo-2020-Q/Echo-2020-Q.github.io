本地预览：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run dev
```

构建并复制最新静态网页到 GitHub Pages 仓库根目录：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run deploy:pages
```

只有命令最后显示以下内容，才说明静态网页可以上传：

```text
Verified publication journal and static About navigation.
```

如果期刊名称没有进入静态 HTML，或者 About 仍可能跳转到 `index.txt`，部署命令会报错并停止复制。

提交并推送：

```cmd
cd /d E:\Project\Echo-2020-Q.github.io
git add .
git commit -m "Deploy PRISM personal website"
git push origin main
```

每次修改 `content` 或 `src` 后，都必须重新运行 `npm run deploy:pages`。GitHub Pages 展示的是仓库根目录中的静态 HTML，而不是开发服务器实时读取的源文件。


cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run deploy:pages

cd /d E:\Project\Echo-2020-Q.github.io
git add .
git commit -m "Update publication journal and static website"
git push origin main
