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
}

export default Tree;
