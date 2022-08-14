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

  it('Should throw error if the passing input is not of type array or it is empty', () => {
    expect(() => {
      new Tree([]);
    }).toThrow('Invalid input');

    expect(() => {
      new Tree('array of integers');
    }).toThrow('Invalid input');
  });
});
