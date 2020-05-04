### script
为了防止页面白屏，通常 `script` 标签放在页面底部，也就是 `</body>` 之前

```js
<html>
  <body>
  ...
  <script src="a.js"></script>
  <script src="b.js"></script>
  </body>
</html>
```

如果把 `script` 标签放在head标签里而且没有 `defer` 或 `async` ,浏览器会立即加载并执行指定的脚本

```js
<html>
  <body>
  <head>
    <script src="a.js"></script>
    <script src="b.js"></script>
  </head>
  ...
  </body>
</html>
```

`立即` 指的是在渲染该 `script` 标签之下的文档元素之前，不等待后续载入的文档元素，读到就加载并执行，这样就会阻塞后续的文档解析

#### defer 关键字

```js
<script src="a.js" defer></script>
```

 * 并发下载 顺序执行
 * 页面渲染完再执行
 效果和放在页面底部一样

 #### async 关键字

 ```js
<script src="a.js" async></script>
```

* 并发下载 异步执行
* 下载完成就执行
所以如果脚本之间有依赖关系不要用 `asymc`
