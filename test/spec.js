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


	describe('Merge arrays pointed in ._extendArrayNames', function() {
		it('merge arrays', function() {
			F1.array = [2];
			F2.array = [1];
			F2._extendArrayNames = ['array'];
			inherit(F1, F2, 'f2');
			expect(F1.array).to.eql([1, 2]);
		});

		it('merge arrays with multilevel path', function() {
			F1.defaults = {array: [2]};
			F2.defaults = {array: [1]};
			F2._extendArrayNames = ['defaults.array'];
			inherit(F1, F2, 'f2');
			expect(F1.defaults.array).to.eql([1, 2]);
		});

		it('do nothing if parent does not have needed prop', function() {
			F1.array = [2];
			F2._extendArrayNames = ['array'];
			inherit(F1, F2, 'f2');
			expect(F1.array).to.eql([2]);
		});

		it('copy parent if child does not have the same prop', function() {
			F2.array = [2];
			F2._extendArrayNames = ['array'];
			inherit(F1, F2, 'f2');
			expect(F1.array).to.eql([2]);
		});
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