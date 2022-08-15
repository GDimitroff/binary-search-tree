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
    }).toThrow('Node with this value already exist in the tree!');
  });

  it('Should correctly find value in the tree', () => {
    const tree = new Tree([1, 10, 5, 8, 234, 10]);
    expect(tree.find(1).data).toBe(1);
    expect(tree.find(10).data).toBe(10);
    expect(tree.find(19)).toBe(null);
  });
});
