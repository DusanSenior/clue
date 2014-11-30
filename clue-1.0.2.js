/*
name: clue module
description: provides scaffolding functions (getHTML, getType...)
version: 1.0.2
License: MIT
Copyright: Copyright (c) 2014, Dusan Koutsky
Date: developing in progress ....
*/

var clue = (function () {

    var _version = "1.0.2";
    var buildTagProp = "tag";
    var buildAttrProp = "attr";
    var buildContentProp = "content";
    var buildDataProp = "data";

    // private functions

    function isArrayEx(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            var toStringFunction = Object.prototype.toString;
            return toStringFunction.call(obj) === toStringFunction.call([]);
        }
    }

    function getType(obj) {
        return isArrayEx(obj) ? "array" : typeof obj;
    }

    /// return html string generated from JSON object template
    /// Example:
    ///var jsonObj = [{ tag: "div", 
    ///                 attr: { class: "class-1", id: "div-1" }, 
    ///                 data: { value: "10" }, 
    ///                 content: [{ tag: "div", content: "1" }, { tag: "div", content: "2" }] },
    ///               { tag: "span", attr: { class: "class-2", href: "href-2" }, data: { message: "warning" }, content: "text" }
    ///              ];
    /// 
    ///var htmlStr = clue.getHTML(jsonObj);
    ///result: <div class='class-1' id='href-1' data-value='10'>
    ///             <div>1</div>
    ///             <div>2</div>
    ///        </div>
    ///        <span class='class-2' href='href-2' data-message='warning'>text</span>
    function htmlBuilder(tagObj) {
        if (getType(tagObj) == "array") {
            var str = "";
            for (var tags in tagObj) {
                str += htmlBuilder(tagObj[tags]);
            }
            return str;
        }
        else {
            if (tagObj != null && buildTagProp in tagObj) {
                var str = "<" + tagObj[buildTagProp];
                if (buildAttrProp in tagObj) {
                    switch (getType(tagObj[buildAttrProp])) {
                        case "string":
                            str += tagObj[buildAttrProp];
                            break;
                        case "object":
                            for (var attr in tagObj[buildAttrProp]) {
                                str += " " + attr + "='" + tagObj[buildAttrProp][attr] + "'";
                            };
                            break;
                        default:
                            break;
                    }
                }
                if (buildDataProp in tagObj) {
                    switch (getType(tagObj[buildDataProp])) {
                        case "string":
                            str += " data-" + tagObj[buildDataProp];
                            break;
                        case "object":
                            for (var data in tagObj[buildDataProp]) {
                                str += " " + "data-" + data + "='" + tagObj[buildDataProp][data] + "'";
                            };
                            break;
                        default:
                            break;
                    }
                }
                str += ">"
                if (buildContentProp in tagObj) {
                    switch (getType(tagObj[buildContentProp])) {
                        case "string":
                            str += tagObj[buildContentProp];
                            break;
                        case "object":
                            str += htmlBuilder(tagObj[buildContentProp]);
                            break;
                        case "array":
                            for (var tObj in tagObj[buildContentProp]) {
                                str += htmlBuilder(tagObj[buildContentProp][tObj]);
                            }
                        default:
                            break;
                    }
                }
                return str + "</" + tagObj[buildTagProp] + ">";
            } else {
                return "";
            }
        }
    }

    // public methods and properties
    return {
        version: _version,
        newString: function (char, length) { return typeof(length) === "number" && length % 1 === 0 && length >= 0 ? Array(length + 1).join(char) : char;},
        getType: function (obj) { return getType(obj); },
        getHTML: function (obj) { return htmlBuilder(obj); }
    }
})();
