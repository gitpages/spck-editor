var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./cssNodes","../utils/arrays"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("./cssNodes"),r=e("../utils/arrays"),o=function(){function e(e,t){this.offset=e,this.length=t,this.symbols=[],this.parent=null,this.children=[]}return e.prototype.addChild=function(e){this.children.push(e),e.setParent(this)},e.prototype.setParent=function(e){this.parent=e},e.prototype.findScope=function(e,t){return void 0===t&&(t=0),this.offset<=e&&this.offset+this.length>e+t||this.offset===e&&this.length===t?this.findInScope(e,t):null},e.prototype.findInScope=function(e,t){void 0===t&&(t=0);var n=e+t,o=r.findFirst(this.children,(function(e){return e.offset>n}));if(0===o)return this;var i=this.children[o-1];return i.offset<=e&&i.offset+i.length>=e+t?i.findInScope(e,t):this},e.prototype.addSymbol=function(e){this.symbols.push(e)},e.prototype.getSymbol=function(e,t){for(var n=0;n<this.symbols.length;n++){var r=this.symbols[n];if(r.name===e&&r.type===t)return r}return null},e.prototype.getSymbols=function(){return this.symbols},e}();t.Scope=o;var i=function(e){function t(){return e.call(this,0,Number.MAX_VALUE)||this}return __extends(t,e),t}(o);t.GlobalScope=i;var a=function(e,t,n,r){this.name=e,this.value=t,this.node=n,this.type=r};t.Symbol=a;var s=function(){function e(e){this.scope=e}return e.prototype.addSymbol=function(e,t,n,r){if(-1!==e.offset){var o=this.scope.findScope(e.offset,e.length);o&&o.addSymbol(new a(t,n,e,r))}},e.prototype.addScope=function(e){if(-1!==e.offset){var t=this.scope.findScope(e.offset,e.length);if(t&&(t.offset!==e.offset||t.length!==e.length)){var n=new o(e.offset,e.length);return t.addChild(n),n}return t}return null},e.prototype.addSymbolToChildScope=function(e,t,n,r,o){if(e&&-1!==e.offset){var i=this.addScope(e);i&&i.addSymbol(new a(n,r,t,o))}},e.prototype.visitNode=function(e){switch(e.type){case n.NodeType.Keyframe:return this.addSymbol(e,e.getName(),void 0,n.ReferenceType.Keyframe),!0;case n.NodeType.CustomPropertyDeclaration:return this.visitCustomPropertyDeclarationNode(e);case n.NodeType.VariableDeclaration:return this.visitVariableDeclarationNode(e);case n.NodeType.Ruleset:return this.visitRuleSet(e);case n.NodeType.MixinDeclaration:return this.addSymbol(e,e.getName(),void 0,n.ReferenceType.Mixin),!0;case n.NodeType.FunctionDeclaration:return this.addSymbol(e,e.getName(),void 0,n.ReferenceType.Function),!0;case n.NodeType.FunctionParameter:return this.visitFunctionParameterNode(e);case n.NodeType.Declarations:return this.addScope(e),!0;case n.NodeType.For:var t=e,r=t.getDeclarations();return r&&this.addSymbolToChildScope(r,t.variable,t.variable.getName(),void 0,n.ReferenceType.Variable),!0;case n.NodeType.Each:var o=e,i=o.getDeclarations();if(i)for(var a=0,s=o.getVariables().getChildren();a<s.length;a++){var f=s[a];this.addSymbolToChildScope(i,f,f.getName(),void 0,n.ReferenceType.Variable)}return!0}return!0},e.prototype.visitRuleSet=function(e){var t=this.scope.findScope(e.offset,e.length);if(t)for(var r=0,o=e.getSelectors().getChildren();r<o.length;r++){var i=o[r];i instanceof n.Selector&&1===i.getChildren().length&&t.addSymbol(new a(i.getChild(0).getText(),void 0,i,n.ReferenceType.Rule))}return!0},e.prototype.visitVariableDeclarationNode=function(e){var t=e.getValue()?e.getValue().getText():void 0;return this.addSymbol(e,e.getName(),t,n.ReferenceType.Variable),!0},e.prototype.visitFunctionParameterNode=function(e){var t=e.getParent().getDeclarations();if(t){var r=e.getDefaultValue(),o=r?r.getText():void 0;this.addSymbolToChildScope(t,e,e.getName(),o,n.ReferenceType.Variable)}return!0},e.prototype.visitCustomPropertyDeclarationNode=function(e){var t=e.getValue()?e.getValue().getText():"";return this.addCSSVariable(e.getProperty(),e.getProperty().getName(),t,n.ReferenceType.Variable),!0},e.prototype.addCSSVariable=function(e,t,n,r){-1!==e.offset&&this.scope.addSymbol(new a(t,n,e,r))},e}();t.ScopeBuilder=s;var f=function(){function e(e){this.global=new i,e.acceptVisitor(new s(this.global))}return e.prototype.findSymbolsAtOffset=function(e,t){for(var n=this.global.findScope(e,0),r=[],o={};n;){for(var i=n.getSymbols(),a=0;a<i.length;a++){var s=i[a];s.type!==t||o[s.name]||(r.push(s),o[s.name]=!0)}n=n.parent}return r},e.prototype.internalFindSymbol=function(e,t){var r=e;if(e.parent instanceof n.FunctionParameter&&e.parent.getParent()instanceof n.BodyDeclaration&&(r=e.parent.getParent().getDeclarations()),e.parent instanceof n.FunctionArgument&&e.parent.getParent()instanceof n.Function){var o=e.parent.getParent().getIdentifier();if(o){var i=this.internalFindSymbol(o,[n.ReferenceType.Function]);i&&(r=i.node.getDeclarations())}}if(!r)return null;for(var a=e.getText(),s=this.global.findScope(r.offset,r.length);s;){for(var f=0;f<t.length;f++){var l=t[f],c=s.getSymbol(a,l);if(c)return c}s=s.parent}return null},e.prototype.evaluateReferenceTypes=function(e){if(e instanceof n.Identifier){var t=e.referenceTypes;if(t)return t;if(e.isCustomProperty)return[n.ReferenceType.Variable];var r=n.getParentDeclaration(e);if(r){var o=r.getNonPrefixedPropertyName();if(("animation"===o||"animation-name"===o)&&r.getValue()&&r.getValue().offset===e.offset)return[n.ReferenceType.Keyframe]}}else if(e instanceof n.Variable)return[n.ReferenceType.Variable];return e.findAParent(n.NodeType.Selector,n.NodeType.ExtendsReference)?[n.ReferenceType.Rule]:null},e.prototype.findSymbolFromNode=function(e){if(!e)return null;for(;e.type===n.NodeType.Interpolation;)e=e.getParent();var t=this.evaluateReferenceTypes(e);return t?this.internalFindSymbol(e,t):null},e.prototype.matchesSymbol=function(e,t){if(!e)return!1;for(;e.type===n.NodeType.Interpolation;)e=e.getParent();if(t.name.length!==e.length||t.name!==e.getText())return!1;var r=this.evaluateReferenceTypes(e);return!(!r||-1===r.indexOf(t.type))&&this.internalFindSymbol(e,r)===t},e.prototype.findSymbol=function(e,t,n){for(var r=this.global.findScope(n);r;){var o=r.getSymbol(e,t);if(o)return o;r=r.parent}return null},e}();t.Symbols=f}));