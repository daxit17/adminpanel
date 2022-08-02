import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../Redux/Actions/Counter_Action';

function Counter(props) {

    const dispatch = useDispatch();

    const c = useSelector(state => state.counter);

    const handleIncremnet = () => {
        dispatch(increment());
    }

    const handleDecremnet = () => {
        dispatch(decrement());
    }

    return (
        <div>
            <h1>Counter</h1>
            <IconButton aria-label="delete" size="large" onClick={() => handleIncremnet()}>
                <AddIcon fontSize="inherit" />
            </IconButton>
            {c.counter}
            <IconButton aria-label="delete" size="large" onClick={() => handleDecremnet()}>
                <RemoveIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
}

export default Counter;