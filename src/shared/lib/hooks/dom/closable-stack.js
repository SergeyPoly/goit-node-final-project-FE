class ClosableStack {
  _stack = [];

  add(closableElementId) {
    this._stack.push(closableElementId);
  }

  remove(closableElementId) {
    this._stack = this._stack.filter((id) => id !== closableElementId);
  }

  getLast() {
    return this._stack[this._stack.length - 1];
  }
}

export const closableStack = new ClosableStack();
