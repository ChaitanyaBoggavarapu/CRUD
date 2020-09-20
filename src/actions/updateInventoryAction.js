import axios from 'axios';
import {UPDATE_INVENTORY} from './type';

var _= require('lodash');

export const updateInventoryData = data => async dispatch => {
    console.log('check the inVentory create data:------------', data);
    await axios.post('http://localhost:5000/updateInventory',{
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
        console.log('check the response: ', res);
        if (!_.isNil(res.data))
            return dispatch(updateInventoryRes(res.data));
        else
            return dispatch(updateInventoryRes('FAILURE'));
    })
    .catch(err => {
        return dispatch(updateInventoryRes('FAILURE'));
    })
}

export const updateInventoryRes = data => {
    return{
        type: UPDATE_INVENTORY,
        payload: data
    }
}

