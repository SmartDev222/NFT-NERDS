import React from 'react';
import { Select, MenuItem } from '@mui/material';
import './style.scss';

const CustomizedSelect = props => {

    return (
        <Select
            value={props.value}
            onChange={props.onChange}
            inputProps={{ 'aria-label': 'Without label' }}
            className="customzed-select"
        >
            {props.options.map((item, index) => {
                return <MenuItem key={index} value={item.value}>{item.text}</MenuItem>;
            })}
        </Select>
    );
}

export default CustomizedSelect;