const runOne = require('./').default;

;(async () => {
  const foo = await runOne('foo', {wait: 7000});
  console.log(foo);
  await new Promise(res => setTimeout(res, 5000))
  console.log('cleaning up');
  foo.cleanup();
  await new Promise(res => setTimeout(res, 5000))
})();
