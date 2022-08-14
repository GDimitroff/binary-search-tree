import TreeNode from './TreeNode';

describe('Tree Node', () => {
  it('Should successfully create tree node', () => {
    const node = new TreeNode(100);
    expect(node.data).toBe(100);
    expect(node.left).toBe(null);
    expect(node.right).toBe(null);
  });
});
