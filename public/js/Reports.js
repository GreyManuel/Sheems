/*! For license information please see Reports.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[322],{9008:(t,e,r)=>{r.r(e),r.d(e,{default:()=>f});function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=x(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=l(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===h)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var h={};function p(){}function d(){}function v(){}var y={};u(y,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(C([])));g&&g!==e&&r.call(g,a)&&(y=g);var w=v.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function o(i,a,c,s){var u=l(t[i],t,a);if("throw"!==u.type){var f=u.arg,h=f.value;return h&&"object"==n(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,c,s)}),(function(t){o("throw",t,c,s)})):e.resolve(h).then((function(t){f.value=t,c(f)}),(function(t){return o("throw",t,c,s)}))}s(u.arg)}var i;this._invoke=function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return d.prototype=v,u(w,"constructor",v),u(v,"constructor",d),d.displayName=u(v,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(_.prototype),u(_.prototype,c,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),u(w,s,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=C,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:C(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function i(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function c(t){i(a,n,o,c,s,"next",t)}function s(t){i(a,n,o,c,s,"throw",t)}c(void 0)}))}}function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const u={data:function(){return{shift:{loading:!1}}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},(0,r(629).Se)(["ongoingShift","allShifts"])),created:function(){var t=this;return a(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$store.dispatch("getShifts");case 1:case"end":return e.stop()}}),e)})))()},mounted:function(){var t=this;return a(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t,t.$nextTick((function(){}));case 2:case"end":return e.stop()}}),e)})))()}};const f=(0,r(1900).Z)(u,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"shadow-sm p-2 m-1 bg-white",staticStyle:{"border-radius":"15px"}},[t._m(0),t._v(" "),r("div",{staticClass:"p-3"},[r("vs-alert",{attrs:{warn:""},scopedSlots:t._u([{key:"icon",fn:function(){return[r("i",{staticClass:"fa-duotone fa-timer fa-2x"})]},proxy:!0},{key:"title",fn:function(){return[r("h4",{staticClass:"m-0 fw-bold"},[t._v("\n                    Shifts\n                ")])]},proxy:!0}])},[t._v(" "),t._v(" "),r("div",[r("h5",{staticClass:"m-0 text-center"},[t._v("\n                    There is no ongoing shift. "),r("br"),r("br"),t._v("\n                    The ongoing shift will appear here.\n                ")]),t._v(" "),!1===t.shift.loading?r("div",{staticClass:"d-flex flex-column flex-md-row justify-content-center align-items-center p-2 m-2 mb-4"},t._l(t.allShifts,(function(e){return r("vs-button",{key:e.id,attrs:{dark:""},on:{click:function(r){return t.startShift(e.id)}}},[r("h6",{staticClass:"fw-bold m-0"},[r("i",{staticClass:"fa-duotone fa-play"}),t._v(" "),r("span",{staticClass:"p-1"},[t._v("\n                                Commence "+t._s(e.name)+"\n                            ")])])])})),1):r("div",{staticClass:"d-flex flex-row justify-content-center align-items-center p-2 m-2"},[r("div",{staticClass:"spinner-border spinner-border-sm",staticStyle:{height:"30px",width:"30px"},attrs:{role:"status"}},[r("span",{staticClass:"visually-hidden"},[t._v("Loading...")])])])])])],1),t._v(" "),r("hr"),t._v(" "),r("div",[r("h3",[t._v("\n            Shift Details\n        ")]),t._v(" "),r("div",{staticClass:"d-flex flex-row align-items-center"},t._l(t.allShifts,(function(e){return r("router-link",{key:e.id,staticClass:"text-decoration-none",attrs:{to:{name:"shiftDetails",params:{slug:e.id}}}},[r("vs-button",{attrs:{danger:"",active:t.$route.path.includes(e.id)}},[r("h6",{staticClass:"m-0 fw-bold"},[t._v("\n                        "+t._s(e.name)+"\n                    ")])])],1)})),1),t._v(" "),r("div",{staticClass:"p-2"},[r("router-view",{key:t.$route.path})],1)])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h4",{staticClass:"fw-bold"},[r("i",{staticClass:"fa-duotone fa-chart-network"}),t._v("\n        Reports\n    ")])}],!1,null,null,null).exports},1900:(t,e,r)=>{function n(t,e,r,n,o,i,a,c){var s,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),a?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=s):o&&(s=c?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),s)if(u.functional){u._injectStyles=s;var f=u.render;u.render=function(t,e){return s.call(e),f(t,e)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,s):[s]}return{exports:t,options:u}}r.d(e,{Z:()=>n})}}]);
//# sourceMappingURL=Reports.js.map