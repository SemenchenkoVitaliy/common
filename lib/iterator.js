'use strict';

class Iterator {
  constructor(base) {
    if (base[Symbol.iterator]) {
      this.base = base[Symbol.iterator]();
    } else if (base.next) {
      this.base = base;
    } else {
      throw new TypeError('Base is neither Iterator nor Itarable');
    }
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    return this.base.next();
  }

  forEach(fn) {
    for (const value of this) {
      fn(value);
    }
  }

  map(mapper) {
    // eslint-disable-next-line no-use-before-define
    return new MapIterator(this, mapper);
  }

  filter(predicate) {
    // eslint-disable-next-line no-use-before-define
    return new FilterIterator(this, predicate);
  }

  each(predicate) {
    for (const value of this) {
      if (!predicate(value)) {
        return false;
      }
    }
    return true;
  }

  find(predicate) {
    for (const value of this) {
      if (predicate(value)) {
        return { found: true, value };
      }
    }
    return { found: false, value: null };
  }

  includes(element) {
    for (const value of this) {
      if (value === element) {
        return true;
      }
    }
    return false;
  }

  reduce(reducer, initialValue) {
    let result = initialValue;
    for (const value of this) {
      result = reducer(result, value);
    }
    return result;
  }

  some(predicate) {
    for (const value of this) {
      if (predicate(value)) {
        return true;
      }
    }
    return false;
  }
}

class MapIterator extends Iterator {
  constructor(base, mapper) {
    super(base);
    this.mapper = mapper;
  }

  next() {
    const { done, value } = this.base.next();
    return { done, value: done ? undefined : this.mapper(value) };
  }
}

class FilterIterator extends Iterator {
  constructor(base, reducer) {
    super(base);

    this.reducer = reducer;
  }

  next() {
    for (const value of this.base) {
      if (this.reducer(value)) {
        return { done: false, value };
      }
    }
    return { done: true, value: undefined };
  }
}


module.exports = {
  Iterator
};
