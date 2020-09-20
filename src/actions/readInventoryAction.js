import axios from 'axios';
import {GET_INVENTORY} from './type';

var _= require('lodash');

export const getInventory = () => dispatch => {
    axios.post('http://localhost:5000/getInventory',{
        data: {
        },
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        console.log('check the response: ', res);
        if (!_.isNil(res.data))
            dispatch(setInventory(res.data));
    })
    .catch(err => {
        if (!_.isNil(err))
            dispatch(setInventory({}));
    })
}

export const setInventory = data => {
    return{
        type: GET_INVENTORY,
        payload: data
    }
}

