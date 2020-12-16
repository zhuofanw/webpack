// import "@babel/polyfill";

const add = (x, y) => x + y;

// eslint-disable-next-line
new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完毕');
    resolve();
  }, 1000);
});

console.log(add(2, 5));
