export default class Queue {

  private store = [];

  enqueue(elem) {
    this.store.push(elem);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.store.shift();
  }

  isEmpty() {
    return this.store.length === 0;
  }

  getStore() {
    return this.store;
  }
}