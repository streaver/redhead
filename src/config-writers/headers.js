module.exports = config => config
  .map((rule) => {
    const headers = rule.headers.map(h => `\t${h}`).join('\n');

    return `${rule.path}\n${headers}`;
  })
  .join('\n');
