class AVLTree{
    constructor(){
        this.root = null;
    }

    insert(data){
        const new_node = new AVLNode(data);

        if(this.root == null){
            this.root = new_node;
            drawTree(this.toObject())
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

        new_node.parent = prev;
        if(data < prev.data){
            prev.left = new_node;
        }else{
            prev.right = new_node;
        }
        this.#update_tree_height();
        this.#balance_from_insertion(new_node);
        drawTree(this.toObject())
    }

    inorder(){
        this.#inorder_traversal(this.root);
    }

    get_balance_factor(node=this.root){
        let left_height = 0;
        let right_height = 0;

        if(node.left){
            left_height = node.left.height;
        }

        if(node.right){
            right_height = node.right.height;
        }
        return left_height - right_height;
    }

    #update_tree_height(root=this.root){
        if(root == null){
            return 0;
        }
        let left = this.#update_tree_height(root.left);
        let right = this.#update_tree_height(root.right);

        root.height = Math.max(left, right) + 1;
        return root.height
    }

    #inorder_traversal(root){
        if(root == null){
            return
        }

        this.#inorder_traversal(root.left);
        console.log(root.data, root.parent?.data, root.height);
        this.#inorder_traversal(root.right);
    }

    #balance_from_insertion(node){
        if(node == null){
            return;
        }

        if(Math.abs(this.get_balance_factor(node)) < 2){
            this.#balance_from_insertion(node.parent);
            return;
        }

        var children;

        const balance_factor = this.get_balance_factor(node);
        if(balance_factor > 1){
            // left subtree
            const grand_parent = node;
            const parent = grand_parent.left;

            if((parent.left?.height ?? null) > (parent.right?.height ?? null)){
                // right rotation on grand_parent
                children = this.#right_rotation(grand_parent);
            }else{
                // left rotation on parent
                this.#left_rotation(parent);
                // right rotation on grand_parent
                children = this.#right_rotation(grand_parent);
            }
        }else if(balance_factor < -1){
            // right subtree
            const grand_parent = node;
            const parent = grand_parent.right;

            if((parent.right?.height ?? null) > (parent.left?.height ?? null)){
                // left rotation on grand_parent
                children = this.#left_rotation(grand_parent);
            }else{
                // right rotation on parent
                this.#right_rotation(parent);
                // left rotation on grand_parent
                children = this.#left_rotation(grand_parent);
            }
        }

        if(children.parent == null){
            this.root = children;
        }
        this.#update_tree_height();
    }

    #left_rotation(root) {
        const new_root = root.right;

        root.right = new_root.left;
        if (new_root.left) new_root.left.parent = root;

        new_root.left = root;
        new_root.parent = root.parent;

        if (root.parent == null) {
            this.root = new_root;
        } else if (root.parent.left === root) {
            root.parent.left = new_root;
        } else {
            root.parent.right = new_root;
        }
        root.parent = new_root;

        // Update heights
        root.height = Math.max(root.left?.height || 0, root.right?.height || 0) + 1;
        new_root.height = Math.max(new_root.left?.height || 0, new_root.right?.height || 0) + 1;

        return new_root;
    }

    #right_rotation(root) {
        const new_root = root.left;

        root.left = new_root.right;
        if (new_root.right) new_root.right.parent = root;

        new_root.right = root;
        new_root.parent = root.parent;

        if (root.parent == null) {
            this.root = new_root;
        } else if (root.parent.left === root) {
            root.parent.left = new_root;
        } else {
            root.parent.right = new_root;
        }

        root.parent = new_root;

        // Update heights
        root.height = Math.max(root.left?.height || 0, root.right?.height || 0) + 1;
        new_root.height = Math.max(new_root.left?.height || 0, new_root.right?.height || 0) + 1;

        return new_root;
    }

    toObject(){
        return this.root.serialize()
    }
}