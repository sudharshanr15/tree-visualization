// let tree = new SplayTree();
// tree.add(15)
// tree.add(5)
// tree.add(2)
// tree.add(20)
// // tree.add(9)
// // tree.add(13)
// // tree.add(20)
// // tree.add(500)

// tree.inorder()

// // let tree = d3.layout.tree()


let tree = new AVLTree()
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);
tree.insert(8);
tree.insert(9);
tree.insert(10);
tree.insert(11);
tree.insert(12);
console.log(tree.toObject())