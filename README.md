###Clue
scaffolding javascript/jQuery functions  (getHTML, getType...), version: 1.0.2

###Example
####Source JSON Object
```javascript
var jsonObj = [{
    tag: "div",
    attr: { class: "class-1", id: "div-1" },
    data: { value: "10" },
    content: [{ tag: "div", content: "1" },
              { tag: "div", content: "2" }]
    },
    {
        tag: "a", attr: { class: "class-2", href: "href-2" },
        data: { message: "warning" }, content: "text"
    }
];

var htmlStr = clue.getHTML(jsonObj);
```
####Result
```html
<div class='class-1' id='div-1' data-value='10'>
  <div>1</div>
  <div>2</div>
</div>
<a class='class-2' href='href-2' data-message='warning'>text</a>
```
