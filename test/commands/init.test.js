const { expect, test } = require('@oclif/test');
const rimraf = require('rimraf');
const fs = require('fs');

describe('init', () => {
  beforeEach(() => {
    rimraf.sync('.redhead');
  });

  test
    .stdout()
    .command(['init'])
    .it('creates folders/files for default options', (ctx) => {
      const output = ctx.stdout.split('\n');

      expect(output.length).to.equal(5);
      expect(output[0]).to.equal('Initializing files...');
      expect(output[1]).to.equal('\tcreate .redhead');
      expect(output[2]).to.equal('\tcreate .redhead/headers.js');
      expect(output[3]).to.equal('\tcreate .redhead/redirects.js');
      expect(output[4]).to.contain('');
    });

  test
    .do(() => {
      fs.mkdirSync('.redhead');
      fs.closeSync(fs.openSync('.redhead/headers.js', 'w'));
      fs.closeSync(fs.openSync('.redhead/redirects.js', 'w'));
    })
    .stdout()
    .command(['init'])
    .it('detects existing folders/files for default options', (ctx) => {
      const output = ctx.stdout.split('\n');

      expect(output.length).to.equal(5);
      expect(output[0]).to.contain('Initializing files...');
      expect(output[1]).to.contain('\texists .redhead');
      expect(output[2]).to.contain('\texists .redhead/headers.js');
      expect(output[3]).to.contain('\texists .redhead/redirects.js');
      expect(output[4]).to.contain('');
    });

  test
    .stdout()
    .command(['init', '--no-headers'])
    .it('does not create the headers file', (ctx) => {
      const output = ctx.stdout.split('\n');

      expect(output.length).to.equal(4);
      expect(output[0]).to.contain('Initializing files...');
      expect(output[1]).to.contain('\tcreate .redhead');
      expect(output[2]).to.contain('\tcreate .redhead/redirects.js');
      expect(output[3]).to.contain('');
    });

  test
    .stdout()
    .command(['init', '--no-redirects'])
    .it('does not create the redirects file', (ctx) => {
      const output = ctx.stdout.split('\n');

      expect(output.length).to.equal(4);
      expect(output[0]).to.contain('Initializing files...');
      expect(output[1]).to.contain('\tcreate .redhead');
      expect(output[2]).to.contain('\tcreate .redhead/headers.js');
      expect(output[3]).to.contain('');
    });
});
