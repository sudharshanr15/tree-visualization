class AVLNode{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.parent = null;
    }

    serialize(){
        let obj = {};
        obj.left = this.left ? this.left.serialize() : null;
        obj.right = this.right ? this.right.serialize() : null;
        obj.data = this.data;
        obj.parent = this.parent;

        return obj;
    }
}