class SplayTree{
    constructor(){
        this.root = null;
    }

    add(data){
        let node = new Node(data);

        if(this.root == null){
            this.root = node;
            return;
        }

        let current = this.root;
        let prev = null;

        while(current != null){
            prev = current;

            if(data < current.data){
                current = current.left;
            }else{
                current = current.right;
            }
        }

        if(data < prev.data){
            prev.left = node;
        }else{
            prev.right = node;
        }
        node.parent = prev;

        this.splay(data)
    }

    splay(data) {
        let current = this.#find(data); // Add a helper to locate the node

        if (current == null) {
            console.log("Element not found");
            return;
        }

        while (current.parent != null) {
            if (current.parent.parent == null) {
                // zig rotation
                if (current.parent.left == current) {
                    // right rotation
                    current = this.#right_rotation(current.parent);
                } else {
                    // left rotation
                    current = this.#left_rotation(current.parent);
                }
            } else {
                // zig zig rotation

                let parent = current.parent;
                let grandparent = parent.parent;

                if (current == parent.left && parent == grandparent.left) {
                    //  right rotation on grand_parent
                    this.#right_rotation(grandparent);
                    //  right rotation on parent
                    current = this.#right_rotation(parent);
                } else if (current == parent.right && parent == grandparent.right) {
                    //  left rotation on grand_parent
                    this.#left_rotation(grandparent);
                    //  left rotation on parent
                    current = this.#left_rotation(parent);
                } else if (current == parent.right && parent == grandparent.left) {
                    // left rotation on parent
                    this.#left_rotation(parent);
                    // right rotation on grand_parent
                    current = this.#right_rotation(grandparent);
                } else {
                    // right rotation on parent
                    this.#right_rotation(parent);
                    // left rotation on grand_parent
                    current = this.#left_rotation(grandparent);
                }
            }
        }

        this.root = current;
        drawTree(this.toObject())
    }


    #right_rotation(node) {
        let new_root = node.left;
        new_root.parent = node.parent;

        if (new_root.right != null) {
            new_root.right.parent = node;
        }
        node.left = new_root.right;

        if (node.parent == null) {
            this.root = new_root;
        } else if (node == node.parent.left) {
            node.parent.left = new_root;
        } else {
            node.parent.right = new_root;
        }

        new_root.right = node;
        node.parent = new_root;

        return new_root;
    }

    #left_rotation(node) {
        let new_root = node.right;
        new_root.parent = node.parent;


        if (new_root.left != null) {
            new_root.left.parent = node;
        }
        node.right = new_root.left;

        if (node.parent == null) {
            this.root = new_root;
        } else if (node == node.parent.left) {
            node.parent.left = new_root;
        } else {
            node.parent.right = new_root;
        }

        new_root.left = node;
        node.parent = new_root;

        return new_root;
    }


    #insert_node(node, new_root){

        if(node == null){
            return;
        }

        let prev = null;
        while(new_root != null){
            prev = new_root;

            if(node.data < new_root.data){
                new_root = new_root.left;
            }else{
                new_root = new_root.right;
            }
        }

        if(node.data < prev.data){
            prev.left = node;
        }else{
            prev.right = node;
        }

        node.parent = prev;
    }

    #inorder_traversal(root){
        if(root == null){
            return;
        }
        this.#inorder_traversal(root.left);
        console.log(root.data, root.parent);
        this.#inorder_traversal(root.right);
    }

    inorder(){
        this.#inorder_traversal(this.root);
    }

    #find(data) {
        let current = this.root;

        while (current != null) {
            if (data == current.data) {
                return current;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null; // Not found
    }

    toObject(){
        return this.root.serialize()
    }
}