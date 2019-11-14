const Rx = require('rxjs')
require('rxjs/add/observable/of')
require('rxjs/add/observable/from')
require('rxjs/add/observable/fromPromise')
require('rxjs/add/observable/throw')
require('rxjs/add/observable/interval')
const { map, pipe } = require('rxjs/operators')

// var observable = Rx.Observable
//     .create(function (observer) {
//         observer.next('Semlinker'); // RxJS 4.x 以前的版本用 onNext
//         observer.next('Lolo');
//     });

// // 订阅这个 Observable    
// observable.subscribe(function (value) {
//     console.log(value);
// });


// var observable = Rx.Observable
//     .create(function (observer) {
//         observer.next('Semlinker'); // RxJS 4.x 以前的版本用 onNext
//         observer.next('Lolo');

//         setTimeout(() => {
//             observer.next('RxJS Observable');
//         }, 300);
//     })

// console.log('start');
// observable.subscribe(function (value) {
//     console.log(value);
// });
// console.log('end');



// of
// var source = Rx.Observable.of('Semlinker', 'Lolo');

// source.subscribe({
//     next: function (value) {
//         console.log(value);
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });

// var arr = [1, 2, 3];
// var source = Rx.Observable.from(arr); // 也支持字符串，如 "Angular 2 修仙之路"

// source.subscribe({
//     next: function (value) {
//         console.log(value);
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });

// var source = Rx.Observable
//     .fromPromise(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Hello RxJS!');
//         }, 3000)
//     }));

// source.subscribe({
//     next: function (value) {
//         console.log(value);
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });


// var source = Rx.Observable.throw('Oop!');

// source.subscribe({
//     next: function (value) {
//         console.log(value);
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log('Throw Error: ' + error);
//     }
// });

// var source = Rx.Observable.interval(1000);

// source.subscribe({
//     next: function (value) {
//         console.log(value);
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log('Throw Error: ' + error);
//     }
// });


// var observable = Rx.Observable
//     .create(function (observer) {
//         observer.next('Semlinker');
//         observer.next('Lolo');
//         observer.complete();
//         observer.next('not work');
//     });

// // 创建一个观察者
// var observer = {
//     next: function (value) {
//         console.log(value);
//     },
//     error: function (error) {
//         console.log(error);
//     },
//     complete: function () {
//         console.log('complete');
//     }
// }

// // 订阅已创建的observable对象
// observable.subscribe(observer);



//延迟计算
// var source = Rx.Observable.from([1, 2, 3, 4, 5]);
// var example = source.pipe(map(x => x + 1))
// example.subscribe(x => console.log(x))

// var source = [1, 2, 3, 4, 5];
// var example = source.map(x => x + 1);
// console.log(example)