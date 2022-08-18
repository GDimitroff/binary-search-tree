# JavaScript Binary Search Tree

An implementation of a Binary Search Tree data structure written in JavaScript while applying Test-Driven Development (TDD).

Includes the following methods:

- `insert(value)` - inserts a new node with the given value into the tree
- `remove(value)` - removes the node holding the given value from the tree
- `find(value)` - returns the node holding the given value in the tree
- `levelOrder()` - traverses each node of the tree in level order
- `inorder()` - traverses each node of the tree inorder
- `preorder()` - traverses each node of the tree preorder
- `postorder()` - traverses each node of the tree postorder
- `height()` - returns the height of a node -- defined as the longest path between the node and a leaf node
- `depth()` - returns the depth of a node -- defined as the distance between the node and the root
- `isBalanced()` - returns true/false based on whether or not the tree is balanced
- `rebalance()` - rebalances the tree
- `prettyPrint` - prints the tree in the console in a human reader friendly format

Also included is a small driver script that tests most of the tree's functionality.

## Testing

In order to run the tests you should do the following:

1. Clone this project:

   ```sh
    git clone https://github.com/GDimitroff/binary-search-tree.git;
   ```

2. Once you have cloned this project, you can install the required dependencies by using `npm test` in the terminal.

3. Type `npm test` in the terminal to run the tests.
