!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../utils/arrays"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("../utils/arrays"),i=function(e,t){this.name=e,this.node=t};function o(e,t,i,o){var n=e[t];n.value=i,i&&(r.includes(n.properties,o)||n.properties.push(o))}function n(e,t,r,i){"top"===t||"right"===t||"bottom"===t||"left"===t?o(e,t,r,i):function(e,t,r){o(e,"top",t,r),o(e,"right",t,r),o(e,"bottom",t,r),o(e,"left",t,r)}(e,r,i)}function a(e,t,r){switch(t.length){case 1:n(e,void 0,t[0],r);break;case 2:n(e,"top",t[0],r),n(e,"bottom",t[0],r),n(e,"right",t[1],r),n(e,"left",t[1],r);break;case 3:n(e,"top",t[0],r),n(e,"right",t[1],r),n(e,"left",t[1],r),n(e,"bottom",t[2],r);break;case 4:n(e,"top",t[0],r),n(e,"right",t[1],r),n(e,"bottom",t[2],r),n(e,"left",t[3],r)}}function s(e,t){return void 0===t&&(t=!0),(!t||!r.includes(["initial","unset"],e))&&0!==parseFloat(e)}function u(e,t){return void 0===t&&(t=!0),e.map((function(e){return s(e.getText(),t)}))}function c(e,t){return void 0===t&&(t=!0),!r.includes(["none","hidden"],e)&&(!t||!r.includes(["initial","unset"],e))}function l(e,t){return void 0===t&&(t=!0),e.map((function(e){return c(e.getText(),t)}))}function p(e){var t=e.getChildren();if(1===t.length)return s(o=t[0].getText())&&c(o);for(var r=0,i=t;r<i.length;r++){var o;if(!s(o=i[r].getText(),!1)||!c(o,!1))return!1}return!0}t.Element=i,t.default=function(e){for(var t={top:{value:!1,properties:[]},right:{value:!1,properties:[]},bottom:{value:!1,properties:[]},left:{value:!1,properties:[]}},r=0,i=e;r<i.length;r++){var o=i[r],d=o.node.value;if(void 0!==d)switch(o.name){case"box-sizing":return{top:{value:!1,properties:[]},right:{value:!1,properties:[]},bottom:{value:!1,properties:[]},left:{value:!1,properties:[]}};case"width":t.width=o;break;case"height":t.height=o;break;default:var f=o.name.split("-");switch(f[0]){case"border":switch(f[1]){case void 0:case"top":case"right":case"bottom":case"left":switch(f[2]){case void 0:n(t,f[1],p(d),o);break;case"width":n(t,f[1],s(d.getText(),!1),o);break;case"style":n(t,f[1],c(d.getText(),!0),o)}break;case"width":a(t,u(d.getChildren(),!1),o);break;case"style":a(t,l(d.getChildren(),!0),o)}break;case"padding":1===f.length?a(t,u(d.getChildren(),!0),o):n(t,f[1],s(d.getText(),!0),o)}}}return t}}));