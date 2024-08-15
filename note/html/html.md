**[笔记索引](noteindex)**

# html

## 框架
```html
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 标题 </title>
    <link rel="stylesheet" href="styles.css">
    顶部内容
    </head>
    <body>
        <main>
            正文内容
        </main>
        <footer>
            底部内容
            <!--需要自定义css标签-->
        </footer>
    </body>
</html>
```


## 引用方法：

位于同一文件夹下的文件，直接引用文件名 `example.html`

同一目录不同文件夹 `file/example.html`

父目录相同 `../file/example.html`

外链 `http://www.example.com"`

图片：`<img src="file/altai.png" alt="example" width="500" height="250">`

链接：

email: `<a href="mailto (someone@example.com)> 打开某人的邮箱地址 </a>`


## 打开页面方式(target):

`<a href="www.example.com" target="">` 当前页

`<a href="www.example.com" target="_blank">` 新窗口
