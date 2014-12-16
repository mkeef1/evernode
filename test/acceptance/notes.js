/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    server     = require('../../server/index'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getdb();



describe('Notes', function(){
  var cookie, noteId;
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        var options2 = {
          method: 'post',
          url: '/notes',
          payload: {
            title: 'note A',
            body: 'note A body',
            tags: 'tag1, tag2'
          },
          headers: {cookie:cookie}
        };

        server.inject(options2, function(response){
          noteId = response.result.noteId;
          console.log(noteId);
          done();
        });
      });
    });
  });

  describe('post /notes', function(){
    it('should create a note', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        payload: {
          title: 'note 1',
          body: 'note body 1',
          tags: 'tag1, tag2'
        },
        headers: {cookie:cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /notes', function(){
    it('should get all notes', function(done){
      var options = {
        method: 'get',
        url: '/notes',
        headers: {cookie:cookie},
        query: {
          limit: 10,
          offset: 0,
          tag: '%'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /notes/count', function(){
    it('should count a users notes', function(done){
      var options = {
        method: 'get',
        url: '/notes/count',
        headers: {cookie:cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.count).to.equal('1');
        done();
      });
    });
  });

  describe('get /notes/noteId', function(){
    it('should get a note', function(done){
      var options = {
        method: 'get',
        url: '/notes/' + noteId,
        headers: {cookie:cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('delete /notes/noteId', function(){
    it('should delete a note', function(done){
      var options = {
        method: 'delete',
        url: '/notes/' + noteId,
        headers: {cookie:cookie}
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('post /notes/noteId/upload-mobile', function(){
    it('should upload a photo', function(done){
      var options = {
        method: 'post',
        url: '/notes/' + noteId + '/upload-mobile',
        headers: {cookie:cookie},
        payload: {
          b64: 'b64string'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
