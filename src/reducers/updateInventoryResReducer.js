import { UPDATE_INVENTORY } from '../actions/type';

const initialState = {
    updateInventoryResList: null
}

export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_INVENTORY:
            return {
                ...state,
                updateInventoryResList: action.payload
            };
        default:
            return state;
    }
}