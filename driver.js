import Tree from './Tree.js';

const randomizer = () => {
  const length = Math.floor(Math.random() * 16) + 5;
  return new Array(length)
    .fill(-50)
    .map((e) => Number(e) + Math.floor(Math.random() * 101));
};

// (1)
const random = randomizer();
console.log('(1) The initial array is: ', random);
const tree = new Tree(random);
console.log();

// (2)
console.log('(2) Is the tree balanced? ', tree.isBalanced());
console.log();

// (3)
console.log('(3.1) In Order Print: ', tree.inorder());
console.log();
console.log('(3.2) Pre Order Print: ', tree.preorder());
console.log();
console.log('(3.3) Post Order Print: ', tree.postorder());
console.log();

// (4)
tree.insert(52);
tree.insert(150);
tree.insert(70);
tree.insert(1200);

// (5)
console.log('(5) Is the tree balanced after insertion? ', tree.isBalanced());
console.log();

// (6)
tree.rebalance();

// (7)
console.log(
  '(7) Is the tree balanced after using rebalance() method? ',
  tree.isBalanced()
);
console.log();

// (8)
console.log('(8) Pretty Print:');
console.log();
tree.prettyPrint();
