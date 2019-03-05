const { expect, test } = require('@oclif/test');
const fs = require('fs');
const mock = require('mock-fs');

describe('build firebase', () => {
  afterEach(() => {
    mock.restore();
  });

  test
    .stdout()
    .command(['init'])
    .do(() => {
      mock({
        '.redhead/headers.js': `
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
              'X-Custom2:abc2'
            ],
          },
        ];
      `,
        '.redhead/redirects.js': `
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
            options: '',
          }
        ];
      `,
        'firebase.json': `
      {
        "hosting": {
          "public": "dist",
          "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
          ],
          "rewrites": [
            {
              "source": "**",
              "destination": "/index.html"
            }
          ]
        }
      }
      `,
      });
    })
    .command(['build', '--platform=firebase'])
    .it('updates firebase.json with headers and redirects config when they are not present', () => {
      const output = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));

      expect(output.hosting.headers[0]).to.deep.equal({
        source: '/test1/*',
        headers: [
          {
            key: 'X-Custom',
            value: 'abc',
          },
        ],
      });
      expect(output.hosting.headers[1]).to.deep.equal({
        source: '/test',
        headers: [
          {
            key: 'X-Custom1',
            value: 'abc1',
          },
          {
            key: 'X-Custom2',
            value: 'abc2',
          },
        ],
      });

      expect(output.hosting.redirects[0]).to.deep.equal({
        source: '/path1',
        destination: '/new-path1',
        type: '301',
      });

      expect(output.hosting.redirects[1]).to.deep.equal({
        source: '/path2',
        destination: '/new-path2',
        type: '302',
      });
    });
});
