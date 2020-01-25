!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","vscode-languageserver-types","../parser/htmlScanner","../htmlLanguageTypes","../parser/htmlEntities","vscode-nls","../utils/strings","../languageFacts/builtinDataProviders","../languageFacts/fact"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("vscode-languageserver-types"),r=e("../parser/htmlScanner"),a=e("../htmlLanguageTypes"),o=e("../parser/htmlEntities"),i=e("vscode-nls"),s=e("../utils/strings"),u=e("../languageFacts/builtinDataProviders"),c=e("../languageFacts/fact"),f=i.loadMessageBundle(),T=function(){function e(){this.completionParticipants=[]}return e.prototype.setCompletionParticipants=function(e){this.completionParticipants=e||[]},e.prototype.doComplete=function(e,t,i,T){var p={isIncomplete:!1,items:[]},g=this.completionParticipants,m=u.getAllDataProviders().filter((function(t){return t.isApplicable(e.languageId)&&(!T||!1!==T[t.getId()])})),k=e.getText(),E=e.offsetAt(t),v=i.findNodeBefore(E);if(!v)return p;var x,h=r.createScanner(k,v.start),S="";function b(t,n){return void 0===n&&(n=E),t>E&&(t=E),{start:e.positionAt(t),end:e.positionAt(n)}}function y(e,t){var r=b(e,t);return m.forEach((function(e){e.provideTags().forEach((function(e){p.items.push({label:e.name,kind:n.CompletionItemKind.Property,documentation:e.description,textEdit:n.TextEdit.replace(r,e.name),insertTextFormat:n.InsertTextFormat.PlainText})}))})),p}function C(e){for(var t=e;t>0;){var n=k.charAt(t-1);if("\n\r".indexOf(n)>=0)return k.substring(t,e);if(!l(n))return null;t--}return k.substring(0,e)}function A(e,t,r){void 0===r&&(r=E);var o=b(e,r),i=d(k,r,a.ScannerState.WithinEndTag,a.TokenType.EndTagClose)?"":">",s=v;for(t&&(s=s.parent);s;){var u=s.tag;if(u&&(!s.closed||s.endTagStart&&s.endTagStart>E)){var c={label:"/"+u,kind:n.CompletionItemKind.Property,filterText:"/"+u+i,textEdit:n.TextEdit.replace(o,"/"+u+i),insertTextFormat:n.InsertTextFormat.PlainText},f=C(s.start),T=C(e-1);if(null!==f&&null!==T&&f!==T){var l=f+"</"+u+i;c.textEdit=n.TextEdit.replace(b(e-1-T.length),l),c.filterText=T+"</"+u+i}return p.items.push(c),p}s=s.parent}return t?p:(m.forEach((function(e){e.provideTags().forEach((function(e){p.items.push({label:"/"+e.name,kind:n.CompletionItemKind.Property,documentation:e.description,filterText:"/"+e+i,textEdit:n.TextEdit.replace(o,"/"+e+i),insertTextFormat:n.InsertTextFormat.PlainText})}))})),p)}function O(t,r){if(T&&T.hideAutoCompleteProposals)return p;if(!c.isVoidElement(r)){var a=e.positionAt(t);p.items.push({label:"</"+r+">",kind:n.CompletionItemKind.Property,filterText:"</"+r+">",textEdit:n.TextEdit.insert(a,"$0</"+r+">"),insertTextFormat:n.InsertTextFormat.Snippet})}return p}function F(e,t){return y(e,t),A(e,!0,t),p}function P(e,t){void 0===t&&(t=E);for(var r=E;r<t&&"<"!==k[r];)r++;var o=b(e,r),u=d(k,t,a.ScannerState.AfterAttributeName,a.TokenType.DelimiterAssign)?"":'="$1"',c=S.toLowerCase(),f=Object.create(null);return m.forEach((function(e){e.provideAttributes(c).forEach((function(e){if(!f[e.name]){f[e.name]=!0;var t,r=e.name;"v"!==e.valueSet&&u.length&&(r+=u,(e.valueSet||"style"===e.name)&&(t={title:"Suggest",command:"editor.action.triggerSuggest"})),p.items.push({label:e.name,kind:"handler"===e.valueSet?n.CompletionItemKind.Function:n.CompletionItemKind.Value,documentation:e.description,textEdit:n.TextEdit.replace(o,r),insertTextFormat:n.InsertTextFormat.Snippet,command:t})}}))})),function(e,t){var r={};r["data-"]='data-$1="$2"',i&&i.roots.forEach((function(e){return function e(n){n.attributeNames.forEach((function(e){!s.startsWith(e,"data-")||r[e]||t[e]||(r[e]=e+'="$1"')})),n.children.forEach((function(t){return e(t)}))}(e)}));Object.keys(r).forEach((function(t){return p.items.push({label:t,kind:n.CompletionItemKind.Value,textEdit:n.TextEdit.replace(e,r[t]),insertTextFormat:n.InsertTextFormat.Snippet})}))}(o,f),p}function I(r,a){var o,i,s,u;if(void 0===a&&(a=E),E>r&&E<=a&&(u=k[r],/^["']*$/.test(u))){var c=r+1,f=a;a>r&&k[a-1]===k[r]&&f--;var T=function(e,t,n){for(;t>n&&!l(e[t-1]);)t--;return t}(k,E,c),d=function(e,t,n){for(;t<n&&!l(e[t]);)t++;return t}(k,E,f);o=b(T,d),s=E>=c&&E<=f?k.substring(c,E):"",i=!1}else o=b(r,a),s=k.substring(r,E),i=!0;var v=S.toLowerCase(),h=x.toLowerCase();if(g.length>0)for(var y=b(r,a),C=0,A=g;C<A.length;C++){var O=A[C];O.onHtmlAttributeValue&&O.onHtmlAttributeValue({document:e,position:t,tag:v,attribute:h,value:s,range:y})}return m.forEach((function(e){e.provideValues(v,h).forEach((function(e){var t=i?'"'+e.name+'"':e.name;p.items.push({label:e.name,filterText:t,kind:n.CompletionItemKind.Unit,textEdit:n.TextEdit.replace(o,t),insertTextFormat:n.InsertTextFormat.PlainText})}))})),D(),p}function K(e){return E===h.getTokenEnd()&&($=h.scan())===e&&h.getTokenOffset()===E?h.getTokenEnd():E}function V(){for(var n=0,r=g;n<r.length;n++){var a=r[n];a.onHtmlContent&&a.onHtmlContent({document:e,position:t})}return D()}function D(){for(var e=E-1,r=t.character;e>=0&&s.isLetterOrDigit(k,e);)e--,r--;if(e>=0&&"&"===k[e]){var a=n.Range.create(n.Position.create(t.line,r-1),t);for(var i in o.entities)if(s.endsWith(i,";")){var u="&"+i;p.items.push({label:u,kind:n.CompletionItemKind.Keyword,documentation:f("entity.propose","Character entity representing '"+o.entities[i]+"'"),textEdit:n.TextEdit.replace(a,u),insertTextFormat:n.InsertTextFormat.PlainText})}}return p}for(var L,$=h.scan();$!==a.TokenType.EOS&&h.getTokenOffset()<=E;){switch($){case a.TokenType.StartTagOpen:if(h.getTokenEnd()===E){var N=K(a.TokenType.StartTag);return 0===t.line&&(L=void 0,L=b(E,N),p.items.push({label:"!DOCTYPE",kind:n.CompletionItemKind.Property,documentation:"A preamble for an HTML document.",textEdit:n.TextEdit.replace(L,"!DOCTYPE html>"),insertTextFormat:n.InsertTextFormat.PlainText})),F(E,N)}break;case a.TokenType.StartTag:if(h.getTokenOffset()<=E&&E<=h.getTokenEnd())return y(h.getTokenOffset(),h.getTokenEnd());S=h.getTokenText();break;case a.TokenType.AttributeName:if(h.getTokenOffset()<=E&&E<=h.getTokenEnd())return P(h.getTokenOffset(),h.getTokenEnd());x=h.getTokenText();break;case a.TokenType.DelimiterAssign:if(h.getTokenEnd()===E){N=K(a.TokenType.AttributeValue);return I(E,N)}break;case a.TokenType.AttributeValue:if(h.getTokenOffset()<=E&&E<=h.getTokenEnd())return I(h.getTokenOffset(),h.getTokenEnd());break;case a.TokenType.Whitespace:if(E<=h.getTokenEnd())switch(h.getScannerState()){case a.ScannerState.AfterOpeningStartTag:return F(h.getTokenOffset(),K(a.TokenType.StartTag));case a.ScannerState.WithinTag:case a.ScannerState.AfterAttributeName:return P(h.getTokenEnd());case a.ScannerState.BeforeAttributeValue:return I(h.getTokenEnd());case a.ScannerState.AfterOpeningEndTag:return A(h.getTokenOffset()-1,!1);case a.ScannerState.WithinContent:return V()}break;case a.TokenType.EndTagOpen:if(E<=h.getTokenEnd())return A(h.getTokenOffset()+1,!1,K(a.TokenType.EndTag));break;case a.TokenType.EndTag:if(E<=h.getTokenEnd())for(var W=h.getTokenOffset()-1;W>=0;){var w=k.charAt(W);if("/"===w)return A(W,!1,h.getTokenEnd());if(!l(w))break;W--}break;case a.TokenType.StartTagClose:if(E<=h.getTokenEnd()&&S)return O(h.getTokenEnd(),S);break;case a.TokenType.Content:if(E<=h.getTokenEnd())return V();break;default:if(E<=h.getTokenEnd())return p}$=h.scan()}return p},e.prototype.doTagComplete=function(e,t,n){var o=e.offsetAt(t);if(o<=0)return null;var i=e.getText().charAt(o-1);if(">"===i){if((u=n.findNodeBefore(o))&&u.tag&&!c.isVoidElement(u.tag)&&u.start<o&&(!u.endTagStart||u.endTagStart>o))for(var s=(f=r.createScanner(e.getText(),u.start)).scan();s!==a.TokenType.EOS&&f.getTokenEnd()<=o;){if(s===a.TokenType.StartTagClose&&f.getTokenEnd()===o)return"$0</"+u.tag+">";s=f.scan()}}else if("/"===i){for(var u=n.findNodeBefore(o);u&&u.closed;)u=u.parent;if(u&&u.tag){var f;for(s=(f=r.createScanner(e.getText(),u.start)).scan();s!==a.TokenType.EOS&&f.getTokenEnd()<=o;){if(s===a.TokenType.EndTagOpen&&f.getTokenEnd()===o)return u.tag+">";s=f.scan()}}}return null},e}();function l(e){return/^\s*$/.test(e)}function d(e,t,n,o){for(var i=r.createScanner(e,t,n),s=i.scan();s===a.TokenType.Whitespace;)s=i.scan();return s===o}t.HTMLCompletion=T}));