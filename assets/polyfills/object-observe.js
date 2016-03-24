/**
 * Source: https://github.com/MaxArt2501/object-observe
 */
 Object.observe||function(e,t,n,r){"use strict";var o,i,s=["add","update","delete","reconfigure","setPrototype","preventExtensions"],c=t.isArray||function(e){return function(t){return"[object Array]"===e.call(t)}}(e.prototype.toString),a=t.prototype.indexOf?t.indexOf||function(e,n,r){return t.prototype.indexOf.call(e,n,r)}:function(e,t,n){for(var r=n||0;r<e.length;r++)if(e[r]===t)return r;return-1},f=n.Map!==r&&Map.prototype.forEach?function(){return new Map}:function(){var e=[],t=[];return{size:0,has:function(t){return a(e,t)>-1},get:function(n){return t[a(e,n)]},set:function(n,r){var o=a(e,n);-1===o?(e.push(n),t.push(r),this.size++):t[o]=r},"delete":function(n){var r=a(e,n);r>-1&&(e.splice(r,1),t.splice(r,1),this.size--)},forEach:function(n){for(var r=0;r<e.length;r++)n.call(arguments[1],t[r],e[r],this)}}},u=e.getOwnPropertyNames?function(){var t=e.getOwnPropertyNames;try{arguments.callee}catch(n){var r=(t(a).join(" ")+" ").replace(/prototype |length |name /g,"").slice(0,-1).split(" ");r.length&&(t=function(t){var n=e.getOwnPropertyNames(t);if("function"==typeof t)for(var o,i=0;i<r.length;)(o=a(n,r[i++]))>-1&&n.splice(o,1);return n})}return t}():function(t){var n,r,o=[];if("hasOwnProperty"in t)for(n in t)t.hasOwnProperty(n)&&o.push(n);else{r=e.hasOwnProperty;for(n in t)r.call(t,n)&&o.push(n)}return c(t)&&o.push("length"),o},p=e.getPrototypeOf,l=e.defineProperties&&e.getOwnPropertyDescriptor,h=n.requestAnimationFrame||n.webkitRequestAnimationFrame||function(){var e=+new Date,t=e;return function(n){return setTimeout(function(){n((t=+new Date)-e)},17)}}(),v=function(e,t,n){var r=o.get(e);r?(d(r,e),w(e,r,t,n)):(r=b(e),w(e,r,t,n),1===o.size&&h(y))},b=function(t,n){var r,i=u(t),s=[],c=0,n={handlers:f(),frozen:e.isFrozen?e.isFrozen(t):!1,extensible:e.isExtensible?e.isExtensible(t):!0,proto:p&&p(t),properties:i,values:s,notifier:j(t,n)};if(l)for(r=n.descriptors=[];c<i.length;)r[c]=l(t,i[c]),s[c]=t[i[c++]];else for(;c<i.length;)s[c]=t[i[c++]];return o.set(t,n),n},d=function(){var t=l?function(e,t,n,r,o){var i=t.properties[n],s=e[i],c=t.values[n],a=t.descriptors[n];"value"in o&&(c===s?0===c&&1/c!==1/s:c===c||s===s)&&(m(e,t,{name:i,type:"update",object:e,oldValue:c},r),t.values[n]=s),!a.configurable||o.configurable&&o.writable===a.writable&&o.enumerable===a.enumerable&&o.get===a.get&&o.set===a.set||(m(e,t,{name:i,type:"reconfigure",object:e,oldValue:c},r),t.descriptors[n]=o)}:function(e,t,n,r){var o=t.properties[n],i=e[o],s=t.values[n];(s===i?0===s&&1/s!==1/i:s===s||i===i)&&(m(e,t,{name:o,type:"update",object:e,oldValue:s},r),t.values[n]=i)},n=l?function(e,n,r,o,i){for(var s,c=n.length;r&&c--;)null!==n[c]&&(s=l(e,n[c]),r--,s?t(e,o,c,i,s):(m(e,o,{name:n[c],type:"delete",object:e,oldValue:o.values[c]},i),o.properties.splice(c,1),o.values.splice(c,1),o.descriptors.splice(c,1)))}:function(e,t,n,r,o){for(var i=t.length;n&&i--;)null!==t[i]&&(m(e,r,{name:t[i],type:"delete",object:e,oldValue:r.values[i]},o),r.properties.splice(i,1),r.values.splice(i,1),n--)};return function(r,o,i){if(r.handlers.size&&!r.frozen){var s,c,f,h,v,b,d,y,g=r.values,j=r.descriptors,w=0;if(r.extensible)if(s=r.properties.slice(),c=s.length,f=u(o),j){for(;w<f.length;)v=f[w++],h=a(s,v),y=l(o,v),-1===h?(m(o,r,{name:v,type:"add",object:o},i),r.properties.push(v),g.push(o[v]),j.push(y)):(s[h]=null,c--,t(o,r,h,i,y));n(o,s,c,r,i),e.isExtensible(o)||(r.extensible=!1,m(o,r,{type:"preventExtensions",object:o},i),r.frozen=e.isFrozen(o))}else{for(;w<f.length;)v=f[w++],h=a(s,v),b=o[v],-1===h?(m(o,r,{name:v,type:"add",object:o},i),r.properties.push(v),g.push(b)):(s[h]=null,c--,t(o,r,h,i));n(o,s,c,r,i)}else if(!r.frozen){for(;w<s.length;w++)v=s[w],t(o,r,w,i,l(o,v));e.isFrozen(o)&&(r.frozen=!0)}p&&(d=p(o),d!==r.proto&&(m(o,r,{type:"setPrototype",name:"__proto__",object:o,oldValue:r.proto}),r.proto=d))}}}(),y=function(){o.size&&(o.forEach(d),i.forEach(g),h(y))},g=function(e,t){var n=e.changeRecords;n.length&&(e.changeRecords=[],t(n))},j=function(e,t){return arguments.length<2&&(t=o.get(e)),t&&t.notifier||{notify:function(t){t.type;var n=o.get(e);if(n){var r,i={object:e};for(r in t)"object"!==r&&(i[r]=t[r]);m(e,n,i)}},performChange:function(t,n){if("string"!=typeof t)throw new TypeError("Invalid non-string changeType");if("function"!=typeof n)throw new TypeError("Cannot perform non-function");var i,s,c=o.get(e),a=arguments[2],f=a===r?n():n.call(a);if(c&&d(c,e,t),c&&f&&"object"==typeof f){s={object:e,type:t};for(i in f)"object"!==i&&"type"!==i&&(s[i]=f[i]);m(e,c,s)}}}},w=function(e,t,n,r){var o=i.get(n);o||i.set(n,o={observed:f(),changeRecords:[]}),o.observed.set(e,{acceptList:r.slice(),data:t}),t.handlers.set(n,o)},m=function(e,t,n,r){t.handlers.forEach(function(t){var o=t.observed.get(e).acceptList;("string"!=typeof r||-1===a(o,r))&&a(o,n.type)>-1&&t.changeRecords.push(n)})};o=f(),i=f(),e.observe=function(t,n,o){if(!t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.observe cannot observe non-object");if("function"!=typeof n)throw new TypeError("Object.observe cannot deliver to non-function");if(e.isFrozen&&e.isFrozen(n))throw new TypeError("Object.observe cannot deliver to a frozen function object");if(o===r)o=s;else if(!o||"object"!=typeof o)throw new TypeError("Third argument to Object.observe must be an array of strings.");return v(t,n,o),t},e.unobserve=function(e,t){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new TypeError("Object.unobserve cannot unobserve non-object");if("function"!=typeof t)throw new TypeError("Object.unobserve cannot deliver to non-function");var n,r=i.get(t);return r&&(n=r.observed.get(e))&&(r.observed.forEach(function(e,t){d(e.data,t)}),h(function(){g(r,t)}),1===r.observed.size&&r.observed.has(e)?i["delete"](t):r.observed["delete"](e),1===n.data.handlers.size?o["delete"](e):n.data.handlers["delete"](t)),e},e.getNotifier=function(t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.getNotifier cannot getNotifier non-object");return e.isFrozen&&e.isFrozen(t)?null:j(t)},e.deliverChangeRecords=function(e){if("function"!=typeof e)throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");var t=i.get(e);t&&(t.observed.forEach(function(e,t){d(e.data,t)}),g(t,e))}}(Object,Array,this);
