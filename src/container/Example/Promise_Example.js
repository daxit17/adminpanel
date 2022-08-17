import React, { useEffect } from 'react';

function Promise_Example(props) {

    const one = () => {
        return "One";
    }

    const two = () => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Two");
            }, 2000)
        })

        // setTimeout(() => {
        //     return "Two";
        // }, 2000)
    }

    const three = () => {
        return "Three";
    }

    const all = async () => {

        const oneAns = one()
        console.log(oneAns);

        const twoAns = await two()
        console.log(twoAns);

        const threeAns = three()
        console.log(threeAns);

    }

    const print = (p) => {
        console.log(p);
    }

    const sum = (a, b, callBack) => {
        let sum = 0;
        sum = a + b;
        callBack(sum);
    }

    sum(10, 20, print)



    useEffect(() => {
        all()
    }, [])

    return (
        <div>

        </div>
    );
}

export default Promise_Example;