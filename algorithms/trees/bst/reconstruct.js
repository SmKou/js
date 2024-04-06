const Node = (v, left = null, right = null) => ({ value: v, left, right })
const tree_test = Node(1, Node(7, Node(2), Node(6, Node(5), Node(11))), Node(9, null, Node(9, Node(5), null)))

const validate_tree = (tree, test = tree_test) => {}

const in_order_queue = [ 2, 7, 5, 6, 11, 1, 9, 5, 9 ]
const pre_order_queue = [ 1, 7, 2, 6, 5, 11, 9, 9, 5 ]
const post_order_queue = [ 2, 5, 11, 6, 7, 5, 9, 9, 1 ]

const reverse_in_order = (arr = in_order_queue) => {}

const reverse_pre_order = (arr = pre_order_queue) => {}

const reverse_post_order = (arr = post_order_queue) => {}