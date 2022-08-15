import TreeNode from './TreeNode.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
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
    if (this.find(value)) {
      throw new Error('Node with this value already exist in the tree!');
    }

    if (root == null) {
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
}

export default Tree;
