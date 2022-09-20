import React, { useMemo } from 'react';
import { useState } from 'react';

function Example_UseMemo(props) {

    const [counter, setCounter] = useState(0);
    const [num, setNum] = useState(0);


    const findfactorial = (n) => {
        console.log("findfactorial");
        if (n > 1) {
            return n * findfactorial(n - 1);
        } else {
            return 1;
        }
    }

    //without useMemo
    // const result = findfactorial(num)

    //with useMemo
    const result = useMemo(() => {
        findfactorial(num)
        return findfactorial(num)
    }, [num])

    return (
        <div>
            <input type="text" onChange={(e) => setNum(e.target.value)} /><br />

            <br />
            <button onClick={() => setCounter(counter + 1)}>Counter</button>

            <br />

            Counter : {counter}

            <br />
            factorial : {result}
        </div>
    );
}

export default Example_UseMemo;