!function(e){if("object"==typeof module&&"object"==typeof module.exports){var r=e(require,exports);void 0!==r&&(module.exports=r)}else"function"==typeof define&&define.amd&&define(["require","exports","../parser/htmlTags","../parser/razorTags"],e)}((function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("../parser/htmlTags"),a=e("../parser/razorTags");r.allTagProviders=[o.getHTML5TagProvider(),o.getAngularTagProvider(),o.getIonicTagProvider(),a.getRazorTagProvider()]}));