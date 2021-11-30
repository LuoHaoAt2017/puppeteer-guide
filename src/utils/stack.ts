export default class Stack {
  private store = [];

  push(elem) {
    this.store.push(elem);
  }

  pop() {
    if (!this.isEmpty()) {
      return this.store.splice(this.store.length - 1, 1)[0];
    }
  }

  top() {
    if (!this.isEmpty()) {
      return this.store[this.store.length - 1];
    }
    return;
  }

  isEmpty() {
    return this.store.length === 0;
  }

  clear() {
    this.store = [];
  }
}
