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
                    height: '20px',
                    padding: '0 10px',
                    'font-size': '12px',
                    'line-height': '20px',
                    'border-radius': '20px 5px 5px 0',
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
            this.style = style;
            return this;
        }

        init() {
            const opt = this.options;
            const patOBJ = this.pattern;
            const style = this.style;
            const bindItem = (item) => {
                if (item.ele && item.pat) {
                    const ele = document.getElementById(item.ele);
                    const rect = ele.getBoundingClientRect();
                    const offClientX = rect.right;
                    const offClinetY = rect.top;
                    const pattern = Object.hasOwnProperty.call(patOBJ, item.pat) ? patOBJ[item.pat] : item.pat;
                    const styleItem = Object.hasOwnProperty.call(style, item.style) ? style[item.style] : item.style;
                    const textItem = item.text;
                    const callFun = item.callback;
                    const testPat = (val) => {
                        const reg = new RegExp(pattern);
                        const out = reg.test(val);
                        return out;
                    };

                    const delTipEle = () => {
                        const node = document.getElementById('tips');
                        const out = (node === document.body || null) ? false : document.body.contains(node);
                        if (out) {
                            document.body.removeChild(node);
                        }
                    };

                    const creatDOM = (val) => {
                        const div = document.createElement('div');
                        const style = document.createAttribute('style');
                        const id = document.createAttribute('id');
                        id.value = 'tips';
                        div.setAttributeNode(id);
                        div.setAttributeNode(style);
                        div.style.position = 'absolute';
                        div.style.left = `${offClientX}px`;
                        div.style.top = `${offClinetY}px`;
                        for (let i in styleItem) {
                            div.style[i] = styleItem[i];
                        }
                        if (val) {
                            const text = document.createTextNode('✔');
                            div.appendChild(text);
                        } else {
                            const text = document.createTextNode(textItem);
                            div.appendChild(text);
                        }
                        document.getElementsByTagName('body').item(0).appendChild(div);
                    };

                    const dealOut = (val) => {
                        delTipEle();
                        creatDOM(val);
                    };

                    // 给当前元素添加失去焦点事件
                    ele.onblur = function(){
                        const val = ele.value;
                        const out = testPat(val);
                        dealOut(out);
                        if (callFun) {
                            const rexOut = {
                                ele: ele,
                                val: val,
                                out: out,
                            };
                            callFun(rexOut);
                        }
                    };

                    // 给当前元素添加获得焦点事件
                    ele.onfocus = function(){
                        delTipEle();
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