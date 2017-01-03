var clone = require('clone'),
	extend = require('extend');

module.exports = function(child, parent, parentName) {
	for (var key in parent) {
		if (parent._ignoreExtend && parent._ignoreExtend.indexOf(key) != -1) continue;
		if (!(key in child))
			child[key] = clone(parent[key]);
	}
	if (!child.parents) child.parents = {};
	child.parents[parentName] = parent;

	child.prototype = extend(true, {}, parent.prototype, child.prototype);
	child.prototype.constructor = child;
};