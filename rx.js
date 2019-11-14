class DataSource {
    constructor() {
        let i = 0;
        this._id = setInterval(() => this.emit(i++), 200); // 创建定时器
    }

    emit(n) {
        const limit = 10;  // 设置数据上限值
        if (this.ondata) {
            this.ondata(n);
        }
        if (n === limit) {
            if (this.oncomplete) {
                this.oncomplete();
            }
            this.destroy();
        }
    }

    destroy() { // 清除定时器
        clearInterval(this._id);
    }
}

function myObservable(observer) {
    let datasource = new DataSource(); // 创建数据源
    datasource.ondata = (e) => observer.next(e); // 处理数据流
    datasource.onerror = (err) => observer.error(err); // 处理异常
    datasource.oncomplete = () => observer.complete(); // 处理数据流终止
    return () => { // 返回一个函数用于，销毁数据源
        datasource.destroy();
    };
}

const unsub = myObservable({
    next(x) { console.log(x); },
    error(err) { console.error(err); },
    complete() { console.log('done') }
});

// setTimeout(unsub, 500);