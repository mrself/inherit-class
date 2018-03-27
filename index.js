var clone = require('clone'),
	extend = require('extend'),
	h = require('js-helpers'),
	isPlainObject = require('is-plain-object');

module.exports = function(child, parent, parentName) {

	for (var key in parent) {
		if (parent._ignoreExtend && parent._ignoreExtend.indexOf(key) != -1) continue;
		if (key in child) {
			if (isPlainObject(parent[key]))
				child[key] = extend(true, {}, parent[key], child[key]);
		} else child[key] = clone(parent[key]);
	}

	(parent._extendArrayNames || []).forEach(function(i) {
		var childProp = false;
		try {
			childProp = h.g.getByPath(child, i);
		} catch (e) {}

		var parentProp = false;
		try {
			parentProp = h.g.getByPath(parent, i);
		} catch (e) {}
		
		if (childProp && parentProp)
			h.g.setByPath(child, i, parentProp.concat(childProp)
				// remove duplicates as props where cloned before
				.filter(function(value, index, ar) {
					return ar.indexOf(value) === index;
				}));
	});

	if (!child.parents) child.parents = {};
	child.parents[parentName] = parent;

	child.prototype = extend(true, {}, parent.prototype, child.prototype);
	child.prototype.constructor = child;
};