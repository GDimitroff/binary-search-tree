import TreeNode from './TreeNode.js';

class Tree {
  #array;

  constructor(array) {
    this.#array = parseArray(array);
    this.root = this.buildTree(this.#array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new TreeNode(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  find(value, root = this.root) {
    if (root === null || root.data === value) return root;
    if (root.data < value) {
      return this.find(value, root.right);
    } else {
      return this.find(value, root.left);
    }
  }

  insert(value, root = this.root) {
    if (!value) {
      throw new Error('Please specify a value to insert');
    }

    if (this.find(value)) {
      throw new Error('Node with this value already exist');
    }

    if (root === null) {
      root = new TreeNode(value);
      return root;
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (!value) {
      throw new Error('Please specify a value to delete');
    }

    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        root.data = maxValue(root.left);
        root.left = this.delete(root.data, root.left);
      }
    }

    return root;
  }

  levelOrder(callback, root = this.root) {
    if (root === null) return null;

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      let current = queue.shift();

      if (callback) {
        callback(current);
      }

      result.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  inorder(callback, root = this.root) {
    if (root === null) return null;

    const stack = [];
    const results = [];

    let current = root;
    while (current !== null || stack.length > 0) {
      if (current !== null) {
        stack.push(current);
        current = current.left;
      } else {
        current = stack.pop();

        if (callback) {
          callback(current);
        }

        results.push(current.data);
        current = current.right;
      }
    }

    return results;
  }
}

function parseArray(array) {
  if (!Array.isArray(array) || array.length < 1) {
    throw new Error('Please provide valid array as input');
  }

  return [...new Set(array)].sort((a, b) => a - b);
}

function maxValue(root) {
  let max = root.data;
  while (root !== null) {
    max = root.data;
    root = root.right;
  }

  return max;
}

export default Tree;
