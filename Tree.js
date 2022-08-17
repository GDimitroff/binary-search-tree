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
    if (root.data < value) return this.find(value, root.right);
    else return this.find(value, root.left);
  }

  insert(value) {
    if (!value) {
      throw new Error('Please specify a value to insert');
    }

    if (this.find(value)) {
      throw new Error('Node with this value already exist');
    }

    this.root = insertValue(value, this.root);
  }

  delete(value) {
    if (!value) {
      throw new Error('Please specify a value to delete');
    }

    this.root = deleteValue(value, this.root);
  }

  levelOrder(callback, root = this.root) {
    if (root === null) return null;

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      let current = queue.shift();

      if (callback) callback(current);

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

        if (callback) callback(current);

        results.push(current.data);
        current = current.right;
      }
    }

    return results;
  }

  preorder(callback, root = this.root) {
    if (root === null) return null;

    const stack = [root];
    const result = [];

    while (stack.length > 0) {
      let current = stack.pop();

      if (callback) callback(current);

      result.push(current.data);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }

    return result;
  }
}

function parseArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('Please provide an array as input');
  }

  return [...new Set(array)].sort((a, b) => a - b);
}

function insertValue(value, root) {
  if (root === null) {
    root = new TreeNode(value);
    return root;
  }

  if (root.data < value) {
    root.right = insertValue(value, root.right);
  } else {
    root.left = insertValue(value, root.left);
  }

  return root;
}

function deleteValue(value, root) {
  if (root === null) return root;

  if (value < root.data) root.left = deleteValue(value, root.left);
  else if (value > root.data) root.right = deleteValue(value, root.right);
  else {
    // Node with only one child or no child
    if (root.left === null) return root.right;
    else if (root.right === null) return root.left;

    // Node with two children: Get the inorder successor (biggest in the left subtree)
    root.data = maxValue(root.left);
    // Delete the inorder successor
    root.left = deleteValue(root.data, root.left);
  }

  return root;
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
