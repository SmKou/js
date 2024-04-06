const Node = (v, left = null, right = null) => ({ value: v, left, right })
const tree = Node(1, Node(7, Node(2), Node(6, Node(5), Node(11))), Node(9, null, Node(9, Node(5), null)))

/* left -> root -> right */
const in_order = (node) => {
    if (!node.left && !node.right) return [node.value];
    const left = node.left ? in_order(node.left) : []
    const right = node.right ? in_order(node.right) : []
    return left.concat([node.value]).concat(right)
}
const in_order_2 = (node, queue = []) => {
    if (!node.left && !node.right) {
        queue.push(node.value)
        return queue
    }
    if (node.left)
        in_order_2(node.left, queue)
    queue.push(node.value)
    if (node.right)
        in_order_2(node.right, queue)
    return queue
}
// iterative
const in_order_3 = (node) => {}
const in_order_test = [ 2, 7, 5, 6, 11, 1, 9, 5, 9 ].join('')
console.log(in_order(tree).join('') === in_order_test)
console.log(in_order_2(tree).join('') === in_order_test)

/* root -> left -> right */
const pre_order = (node) => {
    if (!node.left && !node.right) return [node.value];
    const left = node.left ? pre_order(node.left) : []
    const right = node.right ? pre_order(node.right) : []
    return [node.value].concat(left).concat(right)
}
const pre_order_2 = (node, queue = []) => {
    if (!node.left && !node.right) {
        queue.push(node.value)
        return queue
    }
    queue.push(node.value)
    if (node.left) pre_order_2(node.left, queue)
    if (node.right) pre_order_2(node.right, queue)
    return queue
}
// iterative
const pre_order_3 = (node) => {}
const pre_order_test = [ 1, 7, 2, 6, 5, 11, 9, 9, 5 ].join('')
console.log(pre_order(tree).join('') === pre_order_test)
console.log(pre_order_2(tree).join('') === pre_order_test)

/* left -> right -> root */
const post_order = (node) => {
    if (!node.left && !node.right) return [node.value];
    const left = node.left ? post_order(node.left) : []
    const right = node.right ? post_order(node.right) : []
    return left.concat(right).concat([node.value])
}
const post_order_2 = (node, queue = []) => {
    if (!node.left && !node.right) {
        queue.push(node.value)
        return queue
    }
    if (node.left) post_order_2(node.left, queue)
    if (node.right) post_order_2(node.right, queue)
    queue.push(node.value)
    return queue
}
// iterative
const post_order_3 = (node) => {}
const post_order_test = [ 2, 5, 11, 6, 7, 5, 9, 9, 1 ].join('')
console.log(post_order(tree).join('') === post_order_test)
console.log(post_order_2(tree).join('') === post_order_test)