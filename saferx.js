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

/**
 * 传入的 Observer 对象可以不实现所有规定的方法 (next、error、complete 方法)

在 complete 或者 error 触发之后再调用 next 方法是没用的

调用 unsubscribe 方法后，任何方法都不能再被调用了

complete 和 error 触发后，unsubscribe 也会自动调用

当 next、complete和error 出现异常时，unsubscribe 也会自动调用以保证资源不会浪费

next、complete和error是可选的。按需处理即可，不必全部处理
 */

class SafeObserver {
    constructor(destination) {
        this.destination = destination;
    }

    next(value) {
        // 尚未取消订阅，且包含next方法
        if (!this.isUnsubscribed && this.destination.next) {
            try {
                this.destination.next(value);
            } catch (err) {
                // 出现异常时，取消订阅释放资源，再抛出异常
                this.unsubscribe();
                throw err;
            }
        }
    }

    error(err) {
        // 尚未取消订阅，且包含error方法
        if (!this.isUnsubscribed && this.destination.error) {
            try {
                this.destination.error(err);
            } catch (e2) {
                // 出现异常时，取消订阅释放资源，再抛出异常
                this.unsubscribe();
                throw e2;
            }
            this.unsubscribe();
        }
    }

    complete() {
        // 尚未取消订阅，且包含complete方法
        if (!this.isUnsubscribed && this.destination.complete) {
            try {
                this.destination.complete();
            } catch (err) {
                // 出现异常时，取消订阅释放资源，再抛出异常
                this.unsubscribe();
                throw err;
            }
            this.unsubscribe();
        }
    }

    unsubscribe() { // 用于取消订阅
        this.isUnsubscribed = true;
        if (this.unsub) {
            this.unsub();
        }
    }
}

function myObservable(observer) {
    const safeObserver = new SafeObserver(observer); // 创建SafeObserver对象
    const datasource = new DataSource(); // 创建数据源
    datasource.ondata = (e) => safeObserver.next(e);
    datasource.onerror = (err) => safeObserver.error(err);
    datasource.oncomplete = () => safeObserver.complete();

    safeObserver.unsub = () => { // 为SafeObserver对象添加unsub方法
        datasource.destroy();
    };
    // 绑定this上下文，并返回unsubscribe方法
    return safeObserver.unsubscribe.bind(safeObserver);
}


const unsub = myObservable({
    next(x) { console.log(x); },
    error(err) { console.error(err); },
    complete() { console.log('done') }
});