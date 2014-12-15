/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    Note       = require('../../server/models/note'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getdb();



describe('Note', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('#save', function(){
    it('should save a new note', function(done){
      var note = new Note({title:'note 1'});

      expect(note).to.be.instanceof(Note);
      done();
      });
    });

  describe('.create', function(){
    it('should create a new note', function(done){
      var note = {title: 'note1', body: 'body 1', tags:'tag1, tag2'};
      Note.create({id:1}, note, function(err, noteId){
        expect(err).to.be.null;
        done();
      });
    });
  });

  // describe('.login', function(){
  //   it('should login a new user', function(done){
  //     User.login({username:'bob', password:'1234'}, function(user){
  //       expect(user.username).to.equal('bob');
  //       done();
  //     });
  //   });
  // it('should NOT login a User - bad username', function(done){
  //     User.login({username:'wrong', password:'123'}, function(user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  //   it('should NOT login a User - bad password', function(done){
  //     User.login({username:'bob', password:'wrong'}, function(user){
  //       expect(user).to.be.undefined;
  //       done();
  //     });
  //   });
  // });
});
