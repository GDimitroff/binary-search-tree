import Tree from './Tree';

describe('Binary Search Tree', () => {
  it('Should successfully create BST', () => {
    const firstTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 324]);
    expect(firstTree.root.data).toBe(7);

    const secondTree = new Tree([1, 2, 3]);
    expect(secondTree.root.data).toBe(2);

    const thirdTree = new Tree([3, 4]);
    expect(thirdTree.root.data).toBe(3);

    const fourthTree = new Tree([1]);
    expect(fourthTree.root.data).toBe(1);
  });

  it('Should successfully insert new node on correct position', () => {
    const tree = new Tree([1, 10, 5]);
    const root = tree.root;
    tree.insert(0);
    tree.insert(2);
    tree.insert(30);
    tree.insert(25);

    expect(root.left.left.data).toBe(0);
    expect(root.left.right.data).toBe(2);
    expect(root.right.right.data).toBe(30);
    expect(root.right.right.left.data).toBe(25);
  });

  it('Should throw error if you try to insert a node with duplicate value', () => {
    const tree = new Tree([1, 10, 5]);
    expect(() => {
      tree.insert(1);
    }).toThrow('Node with this value already exist');
  });

  it('Should correctly find value in the tree', () => {
    const tree = new Tree([1, 10, 5, 8, 234, 10]);
    expect(tree.find(1).data).toBe(1);
    expect(tree.find(10).data).toBe(10);
    expect(tree.find(19)).toBe(null);
  });

  it('Should correctly delete node when it is a leaf', () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    expect(tree.find(20).data).toBe(20);
    expect(tree.find(30).left.data).toBe(20);
    tree.delete(20);
    expect(tree.find(20)).toBe(null);
    expect(tree.find(30).left).toBe(null);
    expect(tree.find(30).right.data).toBe(40);
  });

  it('Should correctly delete node when it has single child (Path 1)', () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    tree.delete(20);
    tree.delete(30);
    expect(tree.find(40).data).toBe(40);
    expect(tree.find(40).left).toBe(null);
    expect(tree.find(40).right).toBe(null);
    expect(tree.find(50).left.data).toBe(40);
  });

  it('Should correctly delete node when it has single child (Path 2)', () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    tree.delete(40);
    tree.delete(30);
    expect(tree.find(40)).toBe(null);
    expect(tree.find(30)).toBe(null);
    expect(tree.find(20).data).toBe(20);
    expect(tree.find(20).left).toBe(null);
    expect(tree.find(20).right).toBe(null);
  });

  it('Should correctly delete node when it has 2 children', () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    const root = tree.root;
    tree.delete(50);
    expect(root.data).toBe(40);
    expect(root.left.data).toBe(30);
    expect(root.left.left.data).toBe(20);
    expect(root.left.right).toBe(null);
  });

  it('Should throw error if no such node exist', () => {
    const tree = new Tree([20, 30, 40, 50, 60, 70, 80]);
    expect(() => {
      tree.delete(100);
    }).toThrow("Node with this value don't exist");
  });
});
