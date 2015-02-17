'use strict';
var Domify = require('component/domify');
var Walk = require('anthonyshort/dom-walk');
var customAttrs = require('./custom');
var Template;

/**
 * Attributes supported
 */

var attrs = [
    'id',
    'src',
    'rel',
    'cols',
    'rows',
    'name',
    'href',
    'title',
    'class',
    'style',
    'width',
    'value',
    'height',
    'tabindex',
    'placeholder'
];

/**
 * Render `template` using `model`
 * @param {Element|String} template
 * @param {Object} model
 * @api public
 */
Template = function Template(template, model) {
    if (typeof template === 'string') template = Domify(template);
    model = model || {};

    Walk(template, function (el, next) {
        attrs.forEach(function (attribute) {
            renderAttribute(el, attribute);
        });

        for (var attribute in customAttrs) {
            renderCustomAttribute(el, attribute);
        }

        next();
    });

    function renderCustomAttribute(el, attribute) {
        if (el.dataset && el.dataset[attribute] && model[el.dataset[attribute]]) {
            customAttrs[attribute](el, model);
        }
    };

    function renderAttribute(el, attribute) {
        if (el.dataset && el.dataset[attribute] && model[el.dataset[attribute]]) {
            if (!!~['INPUT', 'TEXTAREA'].indexOf(el.tagName) && attribute === 'value') {
                el.value = model[el.dataset[attribute]];
            }
            el.setAttribute(attribute, model[el.dataset[attribute]]);
        }
    };

    return template;
};

/**
 * Expose `Template`
 */
module.exports = Template;