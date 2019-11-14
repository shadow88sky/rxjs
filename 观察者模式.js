// 被观察者对象
class Subject {
    constructor() {
        this.observerCollection = []
    }

    // 注册观察者
    registerObserver(observer) {
        this.observerCollection.push(observer)
    }

    // 取消订阅
    unRegisterObserver(observer) {
        let index = this.observerCollection.indexOf(observer)
        this.observerCollection.splice(index, 1)
    }

    // 发送通知
    notifyObservers() {
        this.observerCollection.forEach(observer => observer.notify());
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }
    notify() {
        console.log(`${this.name} has been notified.`)
    }
}

let subject = new Subject(); // 创建主题对象

let observer1 = new Observer('x'); // 创建观察者A - 'semlinker'
let observer2 = new Observer('y'); // 创建观察者B - 'lolo'

subject.registerObserver(observer1); // 注册观察者A
subject.registerObserver(observer2); // 注册观察者B

subject.notifyObservers(); // 通知观察者

subject.unRegisterObserver(observer2); // 移除观察者A

subject.notifyObservers(); // 验证是否成功移除