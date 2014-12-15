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
  var noteId;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      Note.create({id:1}, {title:'a', body:'b', tags:'c, d, e'}, function(results){
        noteId = results;
        console.log('id', results);
        done();
      });
    });
  });


  describe('.create', function(){
    it('should create a new note', function(done){
      Note.create({id:1}, {title:'a1', body:'b1', tags:'c1,c2,c3'}, function(err, noteId){
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.query', function(){
    it('should query all notes', function(done){
      Note.query({id:1}, {}, function(err, results){
        expect(results).to.have.length(1);
        done();
      });
    });
  });

  // describe('.uploadmobile', function(){
  //   it('should upload a photo', function(done){
  //     Note.uploadmobile({token:'tkn'}, 'b64image', noteId, function(err, results){
  //       expect(err).to.be.null;
  //       console.log(err);
  //       done();
  //     });
  //   });
  // });
});
