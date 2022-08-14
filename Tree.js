import TreeNode from './TreeNode.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error('Invalid input');
    }

    // Removing duplicates and sorting the array
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    function build(sortedArray, start = 0, end = sortedArray.length - 1) {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(sortedArray[mid]);
      node.left = build(sortedArray, start, mid - 1);
      node.right = build(sortedArray, mid + 1, end);

      return node;
    }

    return build(sortedArray);
  }

  insert(value) {
    //TODO: check for duplication when find() method is implemented

    function insertRecursive(root, value) {
      if (root === null) {
        root = new TreeNode(value);
        return root;
      }

      if (value < root.data) {
        root.left = insertRecursive(root.left, value);
      } else {
        root.right = insertRecursive(root.right, value);
      }

      return root;
    }

    this.root = insertRecursive(this.root, value);
  }
}

export default Tree;
