var clone = require('clone'),
	extend = require('extend'),
	isPlainObject = require('is-plain-object');

module.exports = function(child, parent, parentName) {
	for (var key in parent) {
		if (parent._ignoreExtend && parent._ignoreExtend.indexOf(key) != -1) continue;
		if (key in child) {
			if (isPlainObject(parent[key]))
				child[key] = extend(true, child[key], parent[key]);
		} else child[key] = clone(parent[key]);
	}
	if (!child.parents) child.parents = {};
	child.parents[parentName] = parent;

	child.prototype = extend(true, {}, parent.prototype, child.prototype);
	child.prototype.constructor = child;
};