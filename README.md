Personal HomePage of Zijian Chen
=====
- My Page: https://zijianchen98.github.io/

### Acknowledgements
- Thanks Jon Barron for this amazing website template.

### 论文维护与本地预览

- 每篇论文维护在 `_publications/*.md`：YAML 中填写 `title`、`authors`（可保留 HTML）、`year`、`venue`、可选 `highlight`、`fields`、`status`、`order`、`image`、`image_alt`、`title_url` 和 `links`，正文保存完整摘要。
- `fields` 可同时包含 `llm`、`quality`、`obi`、`early`；`status` 为 `preprint` 或 `published`，按论文实际发表场所维护，不从 News 自动推断。`order` 决定首页顺序，数值越小越靠前。链接用 `label`、`url` 和可选 `note` 保存提取码；早期论文通过论文级 `note` 说明星号含义。
- 分类按钮名称维护在 `_data/publication_categories.yml`。首页只生成一份论文列表，禁用 JavaScript 时仍显示全部论文。

安装 Ruby / Bundler 后，在仓库根目录运行：

```sh
bundle install
bundle exec jekyll serve
```

浏览 `http://localhost:4000`；正式构建使用 `bundle exec jekyll build`，生成目录为 `_site/`。直接打开源 `index.html` 不会渲染 Liquid。

GitHub Pages 必须使用支持 Jekyll / Liquid 和自定义 collection 的构建方式，不能把源文件作为普通静态 HTML 直接发布，也不要添加 `.nojekyll`。本次仅配置本地 Jekyll，未更改 Pages 设置或添加部署 workflow；部署端 Jekyll 版本由所选 Pages 构建方式决定。