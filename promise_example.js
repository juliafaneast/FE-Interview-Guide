let p = new Promise((resolve, reject) => {
   throw new Error('this error from promise');
   resolve(1);
});

p.then((onFullfilled) => {
   console.log('this is promise then resolve');
   console.log(onFullfilled);
   throw new Error();
}, (onRejected) => {
   console.log('this is promise then reject');
   throw new Error();
}).catch(e => {
   console.log('this is error');
   console.log(e);
});
