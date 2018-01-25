var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function (global, factory) {
    'use strict';

    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                var errorTip = 'rexForm requires a window with a document!';
                var ResError = new Error(errorTip);
            }
            return factory(w);
        };
    } else {
        factory(global);
    };
})(typeof window !== 'undefined' ? window : undefined, function (window, noGlabal) {
    'use strict';

    var _this = this;

    var RegularEXP = function () {
        function RegularEXP(el, opt) {
            _classCallCheck(this, RegularEXP);

            var arr = [];
            var pat = {
                IP: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                PORT: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
            };

            var style = {
                ylone: {
                    color: '#fff',
                    background: '#000',
                    height: '20px',
                    padding: '0 10px',
                    'font-size': '12px',
                    'line-height': '20px',
                    'border-radius': '20px 5px 5px 0'
                }
            };

            //对每一项深度拷贝
            var copy = function copy(item) {
                var obj = {};
                var ele = Object.prototype.hasOwnProperty.call(item, 'ele') ? item.ele : null;
                var pat = Object.prototype.hasOwnProperty.call(item, 'pat') ? item.pat : null;
                var text = Object.prototype.hasOwnProperty.call(item.tip, 'text') ? item.tip.text : '请输入正确的值';
                var style = Object.prototype.hasOwnProperty.call(item.tip, 'style') ? item.tip.style : 'ylone';
                var callback = Object.prototype.hasOwnProperty.call(item, 'callback') ? item.callback : null;
                obj.ele = ele;
                obj.pat = pat;
                obj.text = text;
                obj.style = style;
                obj.callback = callback;
                return obj;
            };

            if (opt && opt.length > 0) {
                for (var i = 0; i < opt.length; i++) {
                    arr.push(copy(opt[i]));
                }
            }

            this.pattern = pat;
            this.options = arr;
            this.style = style;
            return this;
        }

        _createClass(RegularEXP, [{
            key: 'init',
            value: function () {
                function init() {
                    var opt = this.options;
                    var patOBJ = this.pattern;
                    var style = this.style;
                    var bindItem = function () {
                        function bindItem(item) {
                            if (item.ele && item.pat) {
                                var ele = document.getElementById(item.ele);
                                var rect = ele.getBoundingClientRect();
                                var offClientX = rect.right;
                                var offClinetY = rect.top;
                                var pattern = Object.hasOwnProperty.call(patOBJ, item.pat) ? patOBJ[item.pat] : item.pat;
                                var styleItem = Object.hasOwnProperty.call(style, item.style) ? style[item.style] : item.style;
                                var textItem = item.text;
                                var callFun = item.callback;
                                var testPat = function () {
                                    function testPat(val) {
                                        var reg = new RegExp(pattern);
                                        var out = reg.test(val);
                                        return out;
                                    }

                                    return testPat;
                                }();

                                var delTipEle = function () {
                                    function delTipEle() {
                                        var node = document.getElementById('tips');
                                        var out = node === document.body || null ? false : document.body.contains(node);
                                        if (out) {
                                            document.body.removeChild(node);
                                        }
                                    }

                                    return delTipEle;
                                }();

                                var creatDOM = function () {
                                    function creatDOM(val) {
                                        var div = document.createElement('div');
                                        var style = document.createAttribute('style');
                                        var id = document.createAttribute('id');
                                        id.value = 'tips';
                                        div.setAttributeNode(id);
                                        div.setAttributeNode(style);
                                        div.style.position = 'absolute';
                                        div.style.left = String(offClientX) + 'px';
                                        div.style.top = String(offClinetY) + 'px';
                                        for (var i in styleItem) {
                                            div.style[i] = styleItem[i];
                                        }
                                        if (val) {
                                            var text = document.createTextNode('✔');
                                            div.appendChild(text);
                                        } else {
                                            var _text = document.createTextNode(textItem);
                                            div.appendChild(_text);
                                        }
                                        document.getElementsByTagName('body').item(0).appendChild(div);
                                    }

                                    return creatDOM;
                                }();

                                var dealOut = function () {
                                    function dealOut(val) {
                                        delTipEle();
                                        creatDOM(val);
                                    }

                                    return dealOut;
                                }();

                                // 给当前元素添加失去焦点事件
                                ele.onblur = function () {
                                    var val = ele.value;
                                    var out = testPat(val);
                                    dealOut(out);
                                    if (callFun) {
                                        var rexOut = {
                                            ele: ele,
                                            val: val,
                                            out: out
                                        };
                                        callFun(rexOut);
                                    }
                                };

                                // 给当前元素添加获得焦点事件
                                ele.onfocus = function () {
                                    delTipEle();
                                };
                            } else {
                                var errorTip = 'ele or pat is null!';
                                var ResError = new Error(errorTip);
                            }
                        }

                        return bindItem;
                    }();
                    if (opt && opt.length > 0) {
                        for (var i = 0; i < opt.length; i++) {
                            bindItem(opt[i]);
                        }
                    }
                }

                return init;
            }()
        }]);

        return RegularEXP;
    }();

    ;

    var rexForm = function rexForm(options) {
        var REXEXP = new RegularEXP(_this, options);
        return REXEXP.init();
    };

    if (!noGlabal) {
        //在window全局命名空间添加rexForm方法
        window.rexForm = rexForm;
    }

    return rexForm;
});