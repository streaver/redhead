module.exports = config => config
  .map(rule => `${rule.from}\t${rule.to}\t${rule.status}\t${rule.options}`)
  .join('\n');
