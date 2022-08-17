import Tree from './Tree';

let tree;
beforeEach(() => {
  tree = new Tree([20, 80, 30, 70, 50, 40, 60]);
});

describe('Building a Binary Search Tree', () => {
  test('buildTree() throws error if input is not array', () => {
    expect(() => {
      new Tree(1);
    }).toThrow('Please provide an array as input');
  });

  test('buildTree() builds empty root node when provided with empty array', () => {
    expect(new Tree([]).root).toBe(null);
  });

  test('buildTree() removes duplicate values', () => {
    tree = new Tree([1, 7, 4, 4]);
    const root = tree.root;
    expect(root.data).toBe(4);
    expect(root.left.data).toBe(1);
    expect(root.right.data).toBe(7);
    expect(root.left.left).toBe(null);
    expect(root.right.right).toBe(null);
  });

  test('buildTree() returns level-0 root node', () => {
    expect(tree.root.data).toBe(50);
  });

  test('Root node returned by buildTree() has correct left child node', () => {
    expect(tree.root.left.data).toBe(30);
  });

  test('Root node returned by buildTree() has correct right child node', () => {
    expect(tree.root.right.data).toBe(70);
  });
});

describe('Finding a node', () => {
  test('find() returns null if no search value was provided', () => {
    expect(tree.find()).toBe(null);
  });

  test('find() returns null if the value is not found in the tree', () => {
    expect(tree.find(100)).toBe(null);
  });

  test('find() returns the right node', () => {
    expect(tree.find(20).data).toBe(20);
    expect(tree.find(80).data).toBe(80);
  });
});

describe('Inserting a node', () => {
  test('Insert: Not passing in a value results in an error', () => {
    expect(() => tree.insert()).toThrow('Please specify a value to insert');
  });

  test('Passing in a duplicate value throws error', () => {
    expect(() => tree.insert(20)).toThrow('Node with this value already exist');
  });

  test('Insert inserts node with that value at leaf', () => {
    tree.insert(5);
    tree.insert(100);

    expect(tree.inorder()).toStrictEqual([5, 20, 30, 40, 50, 60, 70, 80, 100]);

    expect(tree.levelOrder()).toStrictEqual([
      50, 30, 70, 20, 40, 60, 80, 5, 100,
    ]);
  });
});

describe('Deleting a node', () => {
  test('Delete: Not passing in a value results in an error', () => {
    expect(() => tree.delete()).toThrow('Please specify a value to delete');
  });

  test('Delete: Attempt to delete not existing node do not affect the tree', () => {
    tree.delete(100);
    expect(tree.inorder()).toStrictEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('Deleting a node which is a leaf of the tree (1)', () => {
    tree.delete(20);
    expect(tree.levelOrder()).toStrictEqual([50, 30, 70, 40, 60, 80]);
  });

  test('Deleting a node which is a leaf of the tree (2)', () => {
    tree.delete(40);
    expect(tree.levelOrder()).toStrictEqual([50, 30, 70, 20, 60, 80]);
  });

  test('Deleting a node which has one child (1)', () => {
    tree.delete(20);
    tree.delete(30);
    expect(tree.levelOrder()).toStrictEqual([50, 40, 70, 60, 80]);
  });

  test('Deleting a node which has one child (2)', () => {
    tree.delete(40);
    tree.delete(30);
    expect(tree.levelOrder()).toStrictEqual([50, 20, 70, 60, 80]);
  });

  test('Deleting a node which has two children', () => {
    tree.delete(70);
    expect(tree.levelOrder()).toStrictEqual([50, 30, 60, 20, 40, 80]);
  });

  test('Deleting the root node', () => {
    tree.delete(50);
    expect(tree.levelOrder()).toStrictEqual([40, 30, 70, 20, 60, 80]);
  });

  test('Deleting the root node which has no children', () => {
    tree = new Tree([50]);
    tree.delete(50);
    expect(tree.root).toBe(null);
  });
});

describe('levelOrder traversal', () => {
  test('levelOrder returns array with values if no callback is passed', () => {
    expect(tree.levelOrder()).toStrictEqual([50, 30, 70, 20, 40, 60, 80]);
  });

  test('levelOrder calls callback for each item in order', () => {
    const result = [];
    tree.levelOrder((node) => result.push(node.data));
    expect(result).toStrictEqual([50, 30, 70, 20, 40, 60, 80]);
  });

  test('levelOrder returns null if tree is empty', () => {
    tree = new Tree([123]);
    tree.delete(123);
    expect(tree.levelOrder()).toBe(null);
  });
});

describe('inorder traversal', () => {
  test('inorder returns array with values if no callback is passed', () => {
    expect(tree.inorder()).toStrictEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('inorder calls callback for each item in order', () => {
    const result = [];
    tree.inorder((node) => result.push(node.data));
    expect(result).toStrictEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('inorder returns null if tree is empty', () => {
    tree = new Tree([123]);
    tree.delete(123);
    expect(tree.inorder()).toBe(null);
  });
});
