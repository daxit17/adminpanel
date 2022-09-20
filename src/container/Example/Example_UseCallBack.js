import React, { useState } from 'react';
import Listitem from './Listitem';

function Example_UseCallBack(props) {

    const [theme, setTheme] = useState(false);
    const [num, setNum] = useState(0);

    const Toggle_theme = {
        backgroundColor: theme ? '#000' : '#fff',
        color: theme ? '#fff' : '#000'
    }

    const getItem = () => {

    }

    return (
        <div style={Toggle_theme}>
            <button onClick={() => setTheme(!theme)}>Toggle Theme</button>
            <input type="text" onChange={(e) => setNum(parseInt(e.target.value))} />
            <Listitem getItem={getItem} />
        </div>
    );
}

export default Example_UseCallBack;