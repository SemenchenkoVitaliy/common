'use strict';

class Iterator {
  constructor(base) {
    if (base.next) {
      this.base = base;
    } else if (base[Symbol.iterator]) {
      this.base = base[Symbol.iterator]();
    } else {
      throw new TypeError('Base is neither Iterator nor Itarable');
    }

    this[Symbol.iterator] = () => this;
  }

  next() {
    return this.base.next();
  }

  forEach(callback) {
    for (const value of this.base) {
      callback(value);
    }
  }

  map(callback) {

    class MapIterator extends Iterator {
      constructor(base, callback) {
        super(base);

        this.callback = callback;
      }

      next() {
        const { done, value } = this.base.next();
        return { done, value: done ? undefined : this.callback(value) };
      }
    }

    return new MapIterator(this, callback);
  }

  filter(callback) {

    class FilterIterator extends Iterator {
      constructor(base, callback) {
        super(base);

        this.callback = callback;
      }

      next() {
        for (const value of this.base) {
          if (this.callback(value)) {
            return { done: false, value };
          }
        }
        return { done: true, value: undefined };
      }
    }

    return new FilterIterator(this, callback);
  }

  each(callback) {
    for (const value of this.base) {
      if (!callback(value)) {
        return false;
      }
    }
    return true;
  }

  find(callback) {
    for (const value of this.base) {
      if (callback(value)) {
        return { found: true, value };
      }
    }
    return { found: false, value: null };
  }

  includes(element) {
    for (const value of this.base) {
      if (value === element) {
        return true;
      }
    }
    return false;
  }

  reduce(callback, initialValue) {
    let result = initialValue;
    for (const value of this.base) {
      result = callback(result, value);
    }
    return result;
  }

  some(callback) {
    for (const value of this.base) {
      if (callback(value)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = {
  for: (base) => new Iterator(base),
};
