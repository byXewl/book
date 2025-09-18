(self.webpackChunkTopWritePlugins_copy_code=self.webpackChunkTopWritePlugins_copy_code||[]).push([[341],{341:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var o=r(483),n=r(99),a=r(196),c=r(831),i=r.n(c);function s(e){return a.Children.map(e,(e=>"string"==typeof e?e:e.props.children?s(e.props.children):"")).join("")}function l(e){let{children:t,props:r}=e;const[n,c]=(0,a.useState)(!1);return(0,o.jsxs)(u,{children:[t,(0,o.jsx)(p,{onClick:e=>{e.preventDefault(),e.stopPropagation();const t=s(r.children);i()(t),c(!0),setTimeout((()=>{c(!1)}),1e3)},children:n?"已复制":"复制"})]})}const p=n.styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px 6px;
  margin: 0px;
  text-transform: uppercase;
  border-radius: 3px;
  line-height: 1em;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  display: none;

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`,u=n.styled.div`
  position: relative;

  &:hover {
    ${p} {
      display: block;
    }
  }
`},875:e=>{"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,n){for(var a,c,i=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),s=1;s<arguments.length;s++){for(var l in a=Object(arguments[s]))r.call(a,l)&&(i[l]=a[l]);if(t){c=t(a);for(var p=0;p<c.length;p++)o.call(a,c[p])&&(i[c[p]]=a[c[p]])}}return i}},65:(e,t,r)=>{"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
r(875);var o=r(196),n=60103;if(60107,"function"==typeof Symbol&&Symbol.for){var a=Symbol.for;n=a("react.element"),a("react.fragment")}var c=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var o,a={},l=null,p=null;for(o in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(p=t.ref),t)i.call(t,o)&&!s.hasOwnProperty(o)&&(a[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===a[o]&&(a[o]=t[o]);return{$$typeof:n,type:e,key:l,ref:p,props:a,_owner:c.current}}t.jsx=l,t.jsxs=l},483:(e,t,r)=>{"use strict";e.exports=r(65)},831:(e,t,r)=>{"use strict";var o=r(247),n={"text/plain":"Text","text/html":"Url",default:"Text"},a="Copy to clipboard: #{key}, Enter";e.exports=function(e,t){var r,c,i,s,l,p,u=!1;t||(t={}),r=t.debug||!1;try{if(i=o(),s=document.createRange(),l=document.getSelection(),(p=document.createElement("span")).textContent=e,p.ariaHidden="true",p.style.all="unset",p.style.position="fixed",p.style.top=0,p.style.clip="rect(0, 0, 0, 0)",p.style.whiteSpace="pre",p.style.webkitUserSelect="text",p.style.MozUserSelect="text",p.style.msUserSelect="text",p.style.userSelect="text",p.addEventListener("copy",(function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),void 0===o.clipboardData){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=n[t.format]||n.default;window.clipboardData.setData(a,e)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,e);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))})),document.body.appendChild(p),s.selectNodeContents(p),l.addRange(s),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");u=!0}catch(o){r&&console.error("unable to copy using execCommand: ",o),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(o){r&&console.error("unable to copy using clipboardData: ",o),r&&console.error("falling back to prompt"),c=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:a),window.prompt(c,e)}}finally{l&&("function"==typeof l.removeRange?l.removeRange(s):l.removeAllRanges()),p&&document.body.removeChild(p),i()}return u}},247:e=>{e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],o=0;o<e.rangeCount;o++)r.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||r.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);
//# sourceMappingURL=341-51f591.js.map