parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vKFU":[function(require,module,exports) {

},{}],"Focm":[function(require,module,exports) {
"use strict";function t(t){return r(t)||e(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}require("./index.css");var c="https://pd-spellbook-api.richardrcargill.now.sh/",o=function(t){return'<nav id="letters" class="letters">\n  <ul class="no-style">\n    '.concat(t.map(function(t){return'<li><a id="'.concat(t,'" class="letter" href="#').concat(t,'_target">').concat(t,"</a></li>")}).join(""),"\n  </ul>\n</nav>")},a=function(t){return'<main id="terms" class="terms">\n  '.concat(l(),'\n  <ul class="no-style">\n    ').concat(t.map(function(t,n){return"<li>\n        <article ".concat(null!==t.position?'id="'.concat(t.title[0].toLowerCase(),'_target"'):null,' class="term">\n          <h2 data-key="').concat(n,'" class="term__title">\n            ').concat(t.title,'\n            <ul class="no-style tags">\n              ').concat(t.tags.map(function(t){return"<li>".concat(t,"</li>")}).join(""),'\n            </ul>\n          </h2>\n          <div class="term__content">').concat(t.children,"</div>\n        </article>\n    </li>")}).join(""),"\n  </ul>\n</main>")},i=function(){return'<nav class="nav">\n  <a href="mailto:mailto:annalisavalente@pm.me" class="nav__item button button--ghost">Contact me</a>\n  <a href="https://annalisa.space/about/" class="nav__item button">About</a>\n</nav>'},l=function(){return'<header class="header">\n  <h1 class="header__title">Product designer spellbook</h1>\n  <div class="term__content">\n    <p>Terms that I use everyday as a Product designer. This glossary is for technical and non-technical people. If you think something is missing or you want to contribute feel free to ping me!</p>\n  </div>\n</header>'};function u(t){var n=t.getBoundingClientRect();return n.top>=0&&n.bottom<=(window.innerHeight||document.documentElement.clientHeight)}function s(t){u(t)||(document.querySelector("#letters").scrollTop=t.offsetTop)}function d(t){t.map(function(t){if(u(t)){null!==document.querySelector(".active")&&document.querySelector(".active").classList.remove("active");var n=document.querySelector("#".concat(t.innerText[0]));n.classList.add("active"),s(n)}})}function m(t){var n=document.querySelector("#terms ul"),e=document.querySelector("#letters");document.addEventListener("scroll",function(){var r=n.getBoundingClientRect().top>18?n.getBoundingClientRect().top:18;e.style.top=r,d(t)})}function f(){t(document.querySelectorAll("#letters a")).forEach(function(t){t.addEventListener("click",function(){null!==document.querySelector(".active")&&document.querySelector(".active").classList.remove("active"),t.classList.add("active")})})}function v(t){return t.map(function(t){var n=parseInt(t.getAttribute("data-key"),10)-1,e=document.querySelector('[data-key="'.concat(n,'"]'));return e||null}).filter(function(t){return t})}function h(){var n=t(document.querySelectorAll('[id$="_target"] h2')),e=v(n);return[].concat(t(n),t(e))}function p(t){return fetch(c).then(function(t){return t.json()}).then(function(n){return t.call(null,n)})}function y(t){var n=t.letters,e=t.terms,r=i(),c=o(n),l=a(e);document.querySelector("#app").innerHTML=r+c+l}p(y).then(function(){var t=h();d(t),m(t),f()});
},{"./index.css":"vKFU"}]},{},["Focm"], null)
//# sourceMappingURL=https://richard-cargill.github.io/pd-spellbook/src.8a06916a.js.map