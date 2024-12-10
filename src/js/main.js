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


let tree = new SplayTree();
tree.add(10)
tree.add(7)
tree.add(15)
tree.add(1)
tree.add(9)
// tree.add(13)
// tree.add(20)
// tree.add(30)
console.log(tree.toObject())

tree.inorder()