"use strict";(self.webpackChunkTopWritePlugins_highlight=self.webpackChunkTopWritePlugins_highlight||[]).push([[722],{722:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var r=n(159),o=n(196);const a="container--f4f52969";var c=n(99);function i(){const{config:e}=(0,c.useBook)();return function(e){const t=n(181);return e.getPluginConfig("highlight",t)}(e)}function l(e){let{props:{children:t,className:l},children:u}=e;const s=i(),[f,g]=(0,o.useState)(null),[h,p]=(0,o.useState)((()=>(new Date).toISOString()));return(0,c.useAsyncEffect)((async()=>{const e=t.join("");if(e.match(/\n/)){const t=await async function(){const e=await n.e(282).then(n.t.bind(n,282,23));return await n.e(522).then(n.t.bind(n,522,23)),e}();try{let n,r=function(e){return e.map((function(e){return 0===e.search("lang-")?e.slice("lang-".length):0===e.search("language-")?e.slice("language-".length):null})).find((function(e){return Boolean(e)}))}(l||[]);r||(r=s.getValue("defaultLanguage","clike")),t.languages[r]||(r="clike"),n=t.highlight(e,t.languages[r],r),g(n),p((new Date).toISOString())}catch(e){console.error(e)}}}),[t]),f?(0,r.jsx)("code",{className:a,dangerouslySetInnerHTML:{__html:f}},h):u}},2:e=>{
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var c,i,l=o(e),u=1;u<arguments.length;u++){for(var s in c=Object(arguments[u]))n.call(c,s)&&(l[s]=c[s]);if(t){i=t(c);for(var f=0;f<i.length;f++)r.call(c,i[f])&&(l[i[f]]=c[i[f]])}}return l}},709:(e,t,n)=>{
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
n(2);var r=n(196),o=60103;if(60107,"function"==typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),a("react.fragment")}var c=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var r,a={},u=null,s=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(s=t.ref),t)i.call(t,r)&&!l.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:o,type:e,key:u,ref:s,props:a,_owner:c.current}}t.jsx=u},159:(e,t,n)=>{e.exports=n(709)}}]);
//# sourceMappingURL=722-9e44f7.js.map