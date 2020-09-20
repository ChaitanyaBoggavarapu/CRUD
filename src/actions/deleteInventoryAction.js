import axios from 'axios';
import {DELETE_INVENTORY} from './type';

var _= require('lodash');

export const deleteInventoryData = data => async dispatch => {
    console.log('check the inVentory delete data:------------', data);
    await axios.post('http://localhost:5000/deleteInventory',{
        data: { data },   
    // data: {
    //         createData: data,
    //         type: data.type,
    //         manufacturer: data.manufacturer,
    //         model: data.model,
    //         serial_number: data.serial_number,
    //         vendor: data.vendor,
    //         cost: data.cost,
    //         date_purchased: data.date_purchased,
    //         purchased_by: data.purchased_by,
    //         count: data.count,
    //         location: data.location
    //     },
        headers: {
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then(res => {
        if (!_.isNil(res.data))
            return dispatch(deleteInventoryRes(res.data));
        else
            return dispatch(deleteInventoryRes('FAILURE'));
    })
    .catch(err => {
        return dispatch(deleteInventoryRes('FAILURE'));
    })
}

export const deleteInventoryRes = data => {
    return{
        type: DELETE_INVENTORY,
        payload: data
    }
}

