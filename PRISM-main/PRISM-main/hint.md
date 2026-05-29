cd E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run dev

可以，cmd 里也可以运行。命令稍微换一下写法即可。

在 cmd 里依次运行：

cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm install
npm run build
然后复制构建结果到仓库根目录：

cd /d E:\Project\Echo-2020-Q.github.io
xcopy PRISM-main\PRISM-main\out\* . /E /I /Y
type nul > .nojekyll
最后提交并推送：

git add .
git commit -m "Deploy PRISM personal website"
git push origin main
如果你的默认分支不是 main，先查一下：

git branch
看到前面带 * 的就是当前分支。一般你的仓库应该是 main。


cd /d E:\Project\Echo-2020-Q.github.io\PRISM-main\PRISM-main
npm run build
cd /d E:\Project\Echo-2020-Q.github.io
xcopy PRISM-main\PRISM-main\out\* . /E /I /Y
type nul > .nojekyll
git add .
git commit -m "Deploy PRISM personal website"
git push origin main