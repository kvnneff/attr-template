var assert = require('assert');
var Template = require('..');

describe('Template', function () {
    it('renders string templates', function () {
        var el = '<div id="foo"></div>';
        var result = Template(el);
        assert(result.tagName === 'DIV');
        assert(result.id === 'foo');
    });
    it('should not use setAttribute to render input\'s value', function(){
        var el = '<input data-value="value" />';
        var result = Template(el, { value: 'Foo' });
        assert(result.value == 'Foo');
    });

    it('should not use setAttribute to render textarea\'s value', function(){
        var el = '<textarea data-value="value"></textarea>';
        var result = Template(el, { value: 'Foo' });
        assert(result.value == 'Foo');
    });
});

describe('data-text', function(){
    it('should set element text', function(){
        var el = '<div><p data-text="name"></p></div>';
        var user = { name: 'Foo' };
        var result = Template(el, user);
        assert('Foo' == result.children[0].textContent);
    });
});

describe('data-html', function(){
    it('should set element html', function(){
        var el = '<div><p data-html="name"></p></div>';
        var user = { name: '<strong>Foo</strong>' };
        var result = Template(el, user);
        assert('<strong>Foo</strong>' == result.children[0].innerHTML);
    });
});

describe('data-visible', function(){
    it('should add .visible when truthy', function(){
        var el = '<div><p data-visible="file">Has a file</p></div>';
        var item = { file: 'some.png' };
        var result = Template(el, item);
        assert('visible' == result.children[0].className);
    });

    it('should remove .hidden when truthy', function(){
        var el = '<div><p data-visible="file" class="file hidden">Has a file</p></div>';
        var item = { file: 'some.png' };
        var result = Template(el, item);
        assert('file visible' == result.children[0].className);
    });
});

describe('data-hidden', function(){
    it('should add .hidden when truthy', function(){
        var el = '<div><p data-hidden="file">Has a file</p></div>';
        var item = { file: 'some.png' };
        var result = Template(el, item);
        assert('hidden' == result.children[0].className);
    });

    it('should remove .visible when truthy', function(){
        var el = '<div><p data-hidden="file" class="file visible">Has a file</p></div>';
        var item = { file: 'some.png' };
        var result = Template(el, item);
        assert('file hidden' == result.children[0].className);
    });
});

describe('data-checked', function(){
    it('should check when truthy', function(){
        var el = '<div><input data-checked="agree" /></div>';
        var user = { agree: true };
        var result = Template(el, user);
        console.log(result);
        assert('checked' == result.children[0].getAttribute('checked'));
    });

    it('should uncheck when falsey', function(){
        var el = '<div><input data-checked="agree" /></div>';
        var user = { agree: false };
        var result = Template(el, user);
        assert(null == result.children[0].getAttribute('checked'));
    });
});

describe('data-append', function(){
    it('should append an element', function(){
        var li = '<li>li</li>';
        var el = '<div><ul data-append="msg"></ul></div>';
        var result = Template(el, {msg: li});
        assert('li' == result.children[0].children[0].innerHTML);
    });
});

describe('data-replace', function(){
    it('should replace an element', function(){
        var canvas = document.createElement('canvas');
        var el = '<div><div data-replace="canvas"></div></div>';
        var result = Template(el, { canvas: canvas });
        assert(canvas == result.children[0]);
    });

    it('should carryover attributes', function(){
        var input = document.createElement('input');
        var el = '<div><div type="email" data-replace="input"></div>';
        var result = Template(el, { input: input });
        assert('email' == input.type);
    });

    it('shouldnt wipe out existing attributes', function(){
        var input = document.createElement('input');
        input.type = 'url'
        var el = '<div><div type="email" data-replace="input"></div>';
        var result = Template(el, { input: input });
        assert('url' == input.type);
    });

    it('should carryover classes', function(){
        var toggle = document.createElement('toggle');
        toggle.className = 'toggle';
        var el = '<div><div class="integration-toggle" data-replace="toggle"></div></div>';
        var result = Template(el, { toggle: toggle });
        assert('toggle integration-toggle' == toggle.className);
    });
});