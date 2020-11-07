import adminReducer from './admins/admins.reducer';

import {combineReducers} from 'redux';

export default combineReducers({
    admin : adminReducer,
})
