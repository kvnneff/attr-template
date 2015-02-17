var Carry = require('carry');
var Classes = require('classes');
var Domify = require('domify');
var attrs = {};

/**
 * Expose `attrs`
 */
module.exports = attrs;

/**
 * data-selected
 */

attrs.selected = function selected(el, model) {
    var value = model[el.dataset.selected];
    if (el.value == value) {
        el.setAttribute('selected', 'selected');
    } else {
        el.removeAttribute('selected');
    }
};

/**
 * data-visible
 */

attrs.visible = function visible(el, model) {
    var value = model[el.dataset.visible];
    if (value) {
        Classes(el).add('visible').remove('hidden');
    } else {
        Classes(el).remove('visible').add('hidden');
    }
};

/**
 * data-hidden
 */

attrs.hidden = function hidden(el, model) {
    var value = model[el.dataset.hidden];
    if (value) {
        Classes(el).remove('visible').add('hidden');
    } else {
        Classes(el).add('visible').remove('hidden');
    }
};

/**
 * data-checked
 */

attrs.checked = function checked(el, model) {
    var value = model[el.dataset.checked]
    if (value) {
        el.setAttribute('checked', 'checked');
    } else {
        el.removeAttribute('checked');
    }
};

/**
 * data-append
 */

attrs.append = function append(el, model) {
    var other = model[el.dataset.append];
    if (typeof other === "string") other = Domify(other);
    el.appendChild(other);
};

/**
 * data-replace
 */

attrs.replace = function replace(el, model) {
    var other = Carry(model[el.dataset.replace], el);
    el.parentNode.replaceChild(other, el);
};

/**
 * data-text
 */

attrs.text = function text(el, model) {
    var value = model[el.dataset.text];
    if (el.tagName === 'TEXTAREA') return el.value = value;
    el.textContent = value;
};

/**
 * data-html
 */

attrs.html = function html(el, model) {
    var value = model[el.dataset.html];
    el.innerHTML = value;
};