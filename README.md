# 街巷之间 · Between the Lanes

静态竞赛项目网站，无需安装依赖。

## 本地预览

在本目录运行：

```bash
python3 -m http.server 4173
```

然后打开 `http://127.0.0.1:4173`。

## 后续添加图纸

1. 将优化后的图纸放入 `assets/images/`。
2. 在 `index.html` 的 `#drawings` 区域，用 `<button class="image-open">` 图片卡替换对应的 `.drawing-slot`。
3. 建议网页图片长边控制在 2400–3000px，JPEG 品质 80–85，兼顾清晰度与加载速度。

项目名、概念说明与空间文案目前为依据效果图整理的可编辑草案，提交前请替换为正式竞赛文本。
