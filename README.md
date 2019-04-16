# Vue 基础一览

## 前言

jQuery 是曾经的前端开发者的标配，作为一个 DOM 和 ajax 的封装库。它让我们不用过的去考虑浏览器的兼容性，而把精力把在放在处理业务逻辑上面。

现在随着旧浏览器的淘汰，jQuery 的优势在逐渐减弱，不是说它不好，它曾经是强者。只是不大适应现在的环境，现在越来越多的新型框架涌现出来，而 Vue 就是其中一个。

Vue 的核心思想是数据驱动，鼓励去操作数据，而不是操作 DOM。

## Vue Devtools

一个 chrome 扩展，让你在一个更友好的界面中审查和调试 Vue 应用。

地址：[vuejs/vue-devtools](https://github.com/vuejs/vue-devtools#vue-devtools)

## Hello World

```html
<div id="app">{{message}}</div>

<!-- 引入 vue.js -->
<script src="../node_modules/vue/dist/vue.js"></script>

<!-- 使用 vue -->
<script>
  var vm = new Vue({
    // el：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
    el: '#app',
    // Vue 实例的数据对象，用于给 View 提供数据
    data: {
      message: 'Hello World!'
    }
  })

  // 可以通过 vm.$data 或 vm.msg 访问到data中的所有属性
  vm.$data.msg === vm.msg // true
</script>
```

模板语法-插值：

* 最常用的方式：Mustache(插值语法)，也就是 `{{}}` 语法
* 从数据对象 data 中获取数据，并进行绑定
* 说明：数据对象的属性值发生了改变，插值处的内容都会更新
* `{{}}`中只能出现单个 JavaScript 表达式 而不能解析js语句

## 双向数据绑定

数据和视图（DOM）互相响应：

* 数据的改变时，视图（DOM）会更新
* 通过视图（DOM）的改变也会引起数据的变化

原理：

* 通过 `Object.defineProperty()` 劫持数据属性，达到监听数据的目的。
* 通常只有表单控件有双向数据绑定，是利用绑定事件监听（input、change）实现的。

[示例代码](./demo/twoWayDataBinding.html)

## 动态添加数据的注意点

> 只有当实例被创建时 data 中存在的属性才是响应式的

```javascript
var vm = new Vue({
  // el：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
  el: '#app',
  // Vue 实例的数据对象，用于给 View 提供数据
  data: {
    // message: 'Hello World!'
  }
})
```

当上面的实例创建后再执行下面的代码，将不会触发任何的视图更新。

```javascript
vm.message = 'Good Bye World!'
```

## 异步 DOM 更新

## 指令

指令 (Directives) 是带有 v- 前缀的特殊特性

### v-bind

`v-bind` 指令可以用于响应式地更新 HTML 特性

```javascript
<a v-bind:href="url">...</a>
```

上面代码 `v-bind` 接收 `href` 作为参数，告知 `v-bind` 指令将该元素的 href 特性与表达式 url 的值绑定。

### v-on

`v-on` 指令用于监听 DOM 事件，接收事件类型（click、input）作为参数

```javascript
<a v-on:click="doSomething">...</a>
<input v-on:change="handleChange" />
// 或
<a v-on:click="doSomething(参数, $event)">...</a>
```

从 2.6.0 开始。可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```javascript
<a v-bind:[attributeName]="url">...</a>
<a v-on:[eventName]="doSomething">...</a>
```

### v-model

v-model 指令的作用是在表单元素上创建双向数据绑定

```javascript
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

除了数据改变触发视图更新这一方向，当 `v-model` 会监听到用户的输入的时候，数据也会得到更新。

### v-if、v-else、v-else-if 

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

```javascript
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### v-show

`v-show` 指令也是用于根据条件展示元素。

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

### v-for

v-for 指令的作用是基于源数据多次渲染元素或模板块，语法是 `alias in expression`

```javascript
<div v-for="item in items">
  {{ item.text }}
</div>
```

另外也可以为数组索引指定别名 (或者用于对象的键)：

```javascript
<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>
```

v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个 `key` 的特殊属性

```javascript
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

## 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。所以在模板中放太多的逻辑会不利于维护。

任何复杂逻辑，都应该使用*计算属性*。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

## 样式处理

我们可以通过 `v-bind` 直接给 `class` 和 `style` 绑定属性。Vue.js 在此基础上做了加强，表达式结果的类型除了字符
串之外，还可以是对象或数组。

### 绑定 HTML Class

你可以返回一个对象，当 `isActive` 为 `truthy` 的时候，这个元素就会拥有 `active` 这个 calss。

此外，`v-bind:class` 指令也可以与普通的 class 属性共存.

```javascript
<div
  v-bind:class="{ active: isActive }"
  class="static"
></div>
```

你也可以把一个数组传给 `v-bind:class`，以应用一个 class 列表

```javascript
<div v-bind:class="[activeClass, errorClass]"></div>
```

```html
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

### 绑定内联样式

把一个对象传给 `v-bind:style` 即可。

```javascript
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

## axios

[`axios`](https://github.com/axios/axios) 是一个基于Promise的HTTP客户端，用于浏览器和node.js。

我们用它来异步请求接口。

```javascript
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
```

## 单文件组件

首先组件是可无限复用的 Vue 实例，在单文件组件之前，我们使用 `Vue.component` 来定义全局组件，

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () { // data 选项必须是一个函数，而不是一个对象
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

紧接着用 new Vue({ el: '#container '}) 在每个页面内指定一个容器元素，并使用组件。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 `JavaScript` 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 `JavaScript` 驱动的时候，下面这些缺点将变得非常明显：

* 全局定义 (Global definitions) 强制要求每个 component 中的命名不得重复
* 字符串模板 (String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
* 不支持 CSS (No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
* 没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 `.vue` 的 single-file components(单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

## SPA 和 路由（vue-router）

### 什么是 SPA？

SPA 是 SinglePage Web Application 的缩写，字面上意思很明显，其实就是只有一张 Web 页面的应用。单页面跳转仅刷新局部资源 ，公共资源(js、css等)仅需加载一次。

优点是：

* 无刷新体验，页面之间切换快
* 不再以页面作为单位，而是更多采用组件话的思想，代码结构和组织方式更加规范化，便于修改和调整

缺点是：

* 首次加载大量资源
* 缺点是不利于 SEO 检索，因为数据数据都是在前端渲染的

Vue.js 的单页面应用有三个文件是必要的

* 一个html文件：index.html
* 一个webpack打包时的入口js文件：main.js
* 一个根vue组件，作为其他组件的挂载点：app.vue

### 什么是路由？

> 是指根据url分配到对应的处理程序

### 什么是 Vue Router ?

[Vue Router](https://router.vuejs.org/zh-cn/)

官方推荐使用 Vue Router 作为路由管理器，它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

Hash 模式 和 HTML5 History 模式

`vue-router` 默认 hash 模式 ———— 使用 URL 的 hash 来模拟一个完整的 URL。

history 模式，利用 `history.pushState` 来完成，需要后台配置支持。

### # 号

“#” 是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括 “#”。所以修改“#”号后面的内容，页面也不会刷新。

## Vue CLI 和 webpack

[Vue CLI](https://cli.vuejs.org/zh/)
[webpack](https://www.webpackjs.com/)

当你使用单文件组件开发单页面应用的时候，是需要结合 webpack 等构建工具才能部署到线上的。

webpack 是一个静态模块打包器，它可以将很多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。

Vue CLI 是 Vue 的一个命令行工具，只需要按照官网的指示敲几行代码就能新建一个项目框架，并包含 webpack 等工具。有了它，可以快速开始零配置原型开发。