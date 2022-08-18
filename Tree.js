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
  }

  delete(value) {
    if (!value) {
      throw new Error('Please specify a value to delete');
    }

    this.root = deleteValue(value, this.root);

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
  }

  // Breadth First Traversal (level by level)
  // Used Queue : First In, First Out
  levelOrder(callback) {
    if (this.root === null) return null;

    const queue = [this.root];
    const result = [];

    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      if (callback) callback(current);
    }

    if (!callback) return result;
  }

  // inorder | left root right
  inorder(callback, root = this.root, inorderList = []) {
    if (root === null) return null;

    this.inorder(callback, root.left, inorderList);
    callback ? callback(root) : inorderList.push(root.data);
    this.inorder(callback, root.right, inorderList);

    if (!callback) return inorderList;
  }

  // preorder | root left right
  preorder(callback, root = this.root, preorderList = []) {
    if (root === null) return null;

    callback ? callback(root) : preorderList.push(root.data);
    this.preorder(callback, root.left, preorderList);
    this.preorder(callback, root.right, preorderList);

    if (!callback) return preorderList;
  }

  // postorder | left right root
  postorder(callback, root = this.root, postorderList = []) {
    if (root === null) return null;

    this.postorder(callback, root.left, postorderList);
    this.postorder(callback, root.right, postorderList);
    callback ? callback(root) : postorderList.push(root.data);

    if (!callback) return postorderList;
  }

  // Height is defined as the number of edges in longest path from a given node to a leaf node
  // Height of a leaf node is 0
  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // The depth of a node total number of edges from the root node to the target node
  // Depth of root node is 0
  depth(node, root = this.root) {
    if (this.root === null) return -1;
    if (node === this.root) return 0;

    if (node.data > root.data) return this.depth(node, root.right) + 1;
    else if (node.data < root.data) return this.depth(node, root.left) + 1;
    else return 0;
  }
}

function parseArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('Please provide an array as input');
  }

  return [...new Set(array)].sort((a, b) => a - b);
}

// Returns the max value in the left subtree needed when deleting a node with two children
function maxValue(root) {
  let max = root.data;
  while (root !== null) {
    max = root.data;
    root = root.right;
  }

  return max;
}

export default Tree;
