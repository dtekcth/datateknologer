declare global {
  interface Array<T> {
    take(n: number): Array<T>;
    skip(n: number): Array<T>;
    sum(): number;
    average(): number;
    min(): number;
    max(): number;
    first(): T;
    last(): T;
    random(): T;
    isEmpty(): boolean;
    inspect(fn: (x: T) => void): Array<T>;

    unique(): Array<T>;
    toSet(): Set<T>;
    without(filter: Array<T>): Array<T>;

    sortBy(fn: (left: T, right: T) => number): Array<T>;
    sortByKey(fn: (value: T) => any): Array<T>;
    groupInto(n: number): Array<Array<T>>;
    groupBy<K extends string | number | boolean>(
      fn: (e: T) => K,
    ): Array<[K, Array<T>]>;
  }
}
export {};

Array.prototype.min = function min() {
  return this.reduce((a, b) => (a < b ? a : b), Number.POSITIVE_INFINITY);
};

Array.prototype.max = function max() {
  return this.reduce((a, b) => (a > b ? a : b), Number.NEGATIVE_INFINITY);
};

Array.prototype.sum = function sum() {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.average = function average() {
  return this.sum() / this.length;
};

Array.prototype.first = function first() {
  return this[0];
};

Array.prototype.last = function last() {
  return this[this.length - 1];
};

Array.prototype.random = function random() {
  return this[Math.random().mul(this.length).trunc()];
};

Array.prototype.take = function take(n: number) {
  return this.slice(0, n);
};

Array.prototype.skip = function (n: number) {
  return this.slice(n);
};

Array.prototype.isEmpty = function isEmpty() {
  return this.length === 0;
};

Array.prototype.without = function without(other) {
  return this.filter((a) => !other.some((b) => a === b));
};

Array.prototype.inspect = function inspect(fn) {
  return this.map((e) => {
    fn(e);
    return e;
  });
};

Array.prototype.unique = function unique() {
  return this.filter((elem, pos) => {
    return this.indexOf(elem) === pos;
  });
};

Array.prototype.sortBy = function sortBy(comparator) {
  return this.map((e) => e).sort(comparator);
};

Array.prototype.sortByKey = function sortBy(extractKey) {
  return this.map((e) => e).sort((left, right) => {
    const leftKey = extractKey(left);
    const rightKey = extractKey(right);
    if (leftKey instanceof String && rightKey instanceof String) {
      return leftKey.localeCompare(rightKey as string);
    }
    return leftKey - rightKey;
  });
};

Array.prototype.groupInto = function groupInto(group_size) {
  return this.reduce(
    (arr, obj) => {
      if (arr.last().length < group_size) {
        arr.last().push(obj);
      } else {
        arr.push([obj]);
      }
      return arr;
    },
    [[]],
  );
};

Array.prototype.groupBy = function groupBy(fn) {
  const dict = this.reduce((map, obj) => {
    const groupKey = fn(obj);
    if (!map.has(groupKey)) {
      map.set(groupKey, []);
    }
    const values = map.get(groupKey);
    values?.push(obj);
    return map;
  }, new Map());
  return Array.from(dict.entries());
};

Array.prototype.toSet = function () {
  return new Set(this);
};
