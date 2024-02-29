const node = (value = null, left = null, right = null) => {
    let height = 1

    const rotateRR = () => {
        
    }

    const balance = () => {
        const rh = right ? right.height : 0
        const lh = left ? left.height : 0
        if (lh > rh + 1) {
            const lrh = left.right ? left.right.height : 0
            const llh = left.left ? left.left.height : 0
            if (lrh > llh)
                left.rotateRR()
            rotateLL()
        }
        else if (rh > lh + 1) {
            const rrh = right.right ? right.right.height : 0
            const rlh = right.left ? right.left.height : 0
            if (rlh > rrh)
                right.rotateLL()
            rotateRR()
        }
    }

    const add = val => {
        if (val < value) {
            if (left)
                left.add(val)
            else
                left = node(val)

            if (!right || right.height < left.height)
                height = left.height + 1
        }
        else {
            if (right)
                right.add(val)
            else
                right = node(val)

            if (!left || right.height > left.height)
                height = right.height + 1
        }

        balance()
    }

    return {
        value, left, right, height,
        add,
        balance
    }
}