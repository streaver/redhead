const { expect, test } = require('@oclif/test');
const rimraf = require('rimraf');
const fs = require('fs');

describe('build', () => {
  beforeEach(() => {
    rimraf.sync('.redhead');
    rimraf.sync('_headers');
    rimraf.sync('_redirects');
    rimraf.sync('dist/_headers');
    rimraf.sync('dist/_redirects');
  });

  afterEach(() => {
    rimraf.sync('.redhead');
    rimraf.sync('_headers');
    rimraf.sync('_redirects');
    rimraf.sync('dist/_headers');
    rimraf.sync('dist/_redirects');
  });

  test
    .stdout()
    .command(['init', '--no-redirects'])
    .do(() => {
      fs.writeFileSync('.redhead/headers.js', `
        module.exports = [
          {
            path: '/test1/*',
            headers: [
              'X-Custom: abc'
            ],
          },
          {
            path: '/test',
            headers: [
              'X-Custom1: abc1',
              'X-Custom2: abc2'
            ],
          },
        ];
      `);
    })
    .command(['build'])
    .it('creates _headers from config file', () => {
      const output = fs.readFileSync('_headers', 'utf8').split('\n');

      expect(output.length).to.equal(5);
      expect(output[0]).to.equal('/test1/*');
      expect(output[1]).to.equal('\tX-Custom: abc');
      expect(output[2]).to.equal('/test');
      expect(output[3]).to.equal('\tX-Custom1: abc1');
      expect(output[4]).to.equal('\tX-Custom2: abc2');
    });

  test
    .stdout()
    .command(['init', '--no-headers'])
    .do(() => {
      fs.writeFileSync('.redhead/redirects.js', `
        module.exports = [
          {
            from: '/path1',
            to: '/new-path1',
            status: '301',
            options: '',
          },
          {
            from: '/path2',
            to: '/new-path2',
            status: '302',
            options: 'Role=admin',
          }
        ];
      `);
    })
    .command(['build'])
    .it('creates _redirects from config file', () => {
      const output = fs.readFileSync('_redirects', 'utf8').split('\n');

      expect(output.length).to.equal(2);
      expect(output[0]).to.equal('/path1\t/new-path1\t301\t');
      expect(output[1]).to.equal('/path2\t/new-path2\t302\tRole=admin');
    });

  test
    .stdout()
    .command(['init', '--no-headers'])
    .do(() => {
      fs.writeFileSync('.redhead/redirects.js', `
        module.exports = [
          {
            from: '/path1',
            to: '/new-path1',
            status: '301',
            options: '',
          },
          {
            from: '/path2',
            to: '/new-path2',
            status: '302',
            options: 'Role=admin',
          }
        ];
      `);
    })
    .command(['build', '--output', 'dist'])
    .it('creates dist/_redirects from config file', () => {
      const output = fs.readFileSync('dist/_redirects', 'utf8').split('\n');

      expect(output.length).to.equal(2);
      expect(output[0]).to.equal('/path1\t/new-path1\t301\t');
      expect(output[1]).to.equal('/path2\t/new-path2\t302\tRole=admin');
    });
});
