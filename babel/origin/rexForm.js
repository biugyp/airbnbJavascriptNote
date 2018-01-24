;
(function(
    global,
    factory,
) {
    'use strict';

    if (typeof module === 'object' &&
        typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(
                global,
                true,
            ) :
            function(w) {
                if (!w.document) {
                    const errorTip = 'rexForm requires a window with a document!';
                    const ResError = new Error(errorTip);
                }
                return factory(w);
            };

    } else {
        factory(global);
    };

})(typeof window !== 'undefined' ? window : this, function(
    window,
    noGlabal,
) {
    'use strict';
    class RegularEXP {
        constructor(el, opt) {
            const arr = [];
            const pat = {
                IP: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                PORT: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
            };

            const style = {
                ylone: {
                    color: '#fff',
                    background: '#000',
                    width: '120px',
                    height: '50px',
                }
            };

            //对每一项深度拷贝
            const copy = (item) => {
                const obj = {};
                const ele = Object.prototype.hasOwnProperty.call(item, 'ele') ? item.ele : null;
                const pat = Object.prototype.hasOwnProperty.call(item, 'pat') ? item.pat : null;
                const text = Object.prototype.hasOwnProperty.call(item.tip, 'text') ? item.tip.text : '请输入正确的值';
                const style = Object.prototype.hasOwnProperty.call(item.tip, 'style') ? item.tip.style : 'ylone';
                const callback = Object.prototype.hasOwnProperty.call(item, 'callback') ? item.callback : null;
                obj.ele = ele;
                obj.pat = pat;
                obj.text = text;
                obj.style = style;
                obj.callback = callback;
                return obj;
            };

            if (opt && opt.length > 0) {
                for (let i = 0; i < opt.length; i++) {
                    arr.push(copy(opt[i]));
                }
            }

            this.pattern = pat;
            this.options = arr;
            return this;
        }

        init() {
            const opt = this.options;
            const patOBJ = this.pattern;
            const bindItem = (item) => {
                if (item.ele && item.pat) {
                    const ele = document.getElementById(item.ele);
                    const pat = item.pat;
                    const testPat = (val) => {
                        const pattern = Object.hasOwnProperty.call(patOBJ, pat) ? patOBJ[pat] : pat;
                        const reg = new RegExp(pattern);
                        const out = reg.test(val);
                        return out;
                    };

                    const isInPage = (node) => {
                        const out = (node == document.body) ? false : document.body.contains(node);
                        return out;
                    };

                    const creatDOM = () => {
                        const div = document.createElement('div');
                        const style = document.createAttribute('style');
                        const id = document.createAttribute('id');
                        const text = document.createTextNode('hello');
                        id.value = 'tips';
                        div.setAttributeNode(id);
                        div.setAttributeNode(style);
                        div.style.height = '30px';
                        div.style.width = '200px';
                        div.style.color = '#fff';
                        div.style.background = '#000';
                        div.appendChild(text);
                        document.getElementsByTagName('body').item(0).appendChild(div);
                    };

                    const dealOut = (val) => {
                        if (val) {
                            creatDOM();
                            alert('ok');
                        } else {
                            creatDOM();
                            alert('error');
                        }
                    };

                    ele.onblur = function(){
                        const val = ele.value;
                        const out = testPat(val);
                        dealOut(out);
                    };

                } else {
                    const errorTip = 'ele or pat is null!';
                    const ResError = new Error(errorTip);
                }
            };
            if (opt && opt.length > 0) {
                for(let i = 0; i < opt.length; i++){
                    bindItem(opt[i]);
                }
            }
        }
    };

    const rexForm = (options) => {
        const REXEXP = new RegularEXP(
            this,
            options,
        );
        return REXEXP.init();
    };

    if (!noGlabal) {
        //在window全局命名空间添加rexForm方法
        window.rexForm = rexForm;
    }

    return rexForm;
});