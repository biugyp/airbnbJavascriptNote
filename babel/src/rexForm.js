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
                    width: '120px',
                    height: '50px'
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
            return this;
        }

        _createClass(RegularEXP, [{
            key: 'init',
            value: function () {
                function init() {
                    var opt = this.options;
                    var patOBJ = this.pattern;
                    var bindItem = function () {
                        function bindItem(item) {
                            if (item.ele && item.pat) {
                                var ele = document.getElementById(item.ele);
                                var pat = item.pat;
                                var testPat = function () {
                                    function testPat(val) {
                                        var pattern = Object.hasOwnProperty.call(patOBJ, pat) ? patOBJ[pat] : pat;
                                        var reg = new RegExp(pattern);
                                        var out = reg.test(val);
                                        return out;
                                    }

                                    return testPat;
                                }();

                                var isInPage = function () {
                                    function isInPage(node) {
                                        var out = node == document.body ? false : document.body.contains(node);
                                        return out;
                                    }

                                    return isInPage;
                                }();

                                var creatDOM = function () {
                                    function creatDOM() {
                                        // var a = isInPage('tips');
                                        var b = isInPage(document.getElementById('tips'));
                                        console.log(b);
                                        var div = document.createElement('div');
                                        var style = document.createAttribute('style');
                                        var id = document.createAttribute('id');
                                        var text = document.createTextNode('hello');
                                        id.value = 'tips';
                                        div.setAttributeNode(id);
                                        div.setAttributeNode(style);
                                        div.style.height = '30px';
                                        div.style.width = '200px';
                                        div.style.color = '#fff';
                                        div.style.background = '#000';
                                        div.appendChild(text);
                                        document.getElementsByTagName('body').item(0).appendChild(div);
                                    }

                                    return creatDOM;
                                }();

                                var dealOut = function () {
                                    function dealOut(val) {
                                        if (val) {
                                            creatDOM();
                                            alert('ok');
                                        } else {
                                            creatDOM();
                                            alert('error');
                                        }
                                    }

                                    return dealOut;
                                }();

                                ele.onblur = function () {
                                    var val = ele.value;
                                    var out = testPat(val);
                                    dealOut(out);
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