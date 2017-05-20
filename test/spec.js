var chai = require('chai'),
	expect = chai.expect,

	inherit = require('../index');

var F1, F2;
beforeEach(function() {
	F1 = function () {};
	F2 = function () {};
});

describe('Copy static props', function() {
	it('check', function() {
		F2.prop = 1;
		inherit(F1, F2, 'f2');
		expect(F1.prop).to.eql(1);
	});

	it('do not rewrite existing props', function() {
		F1.prop = 0;
		F2.prop = 1;
		inherit(F1, F2, 'f2');
		expect(F1.prop).to.eql(0);
	});

	it('extend objects', function() {
		F1.prop = {prop1: '1'};
		F2.prop = {prop2: '2'};
		inherit(F1, F2, 'f2');
		expect(F1.prop).to.eql({prop1: '1', prop2: '2'});
	});
});

describe('Copy prototype', function() {
	it('check', function() {
		F2.prototype.prop = 1;
		inherit(F1, F2, 'f2');
		expect(F1.prototype.prop).to.eql(1);
	});

	it('do not owerwrite', function() {
		F1.prototype.prop = 0;
		F2.prototype.prop = 1;
		inherit(F1, F2, 'f2');
		expect(F1.prototype.prop).to.eql(0);
	});
});

describe('Set parents prop', function() {
	it('set prop by the provided key', function() {
		inherit(F1, F2, 'f2');
		expect(F1.parents.f2).to.eql(F2);
	});
});