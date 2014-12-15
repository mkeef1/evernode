
'use strict';

var expect     = require('chai').expect,
    User       = require('../../server/models/user'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    beforeEach = lab.beforeEach;



describe('User', function(){

  describe('#save', function(){
    it('should create a user object', function(done){
      var user = new User({username:'bob'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bob');
      done();
      });
    });
});
