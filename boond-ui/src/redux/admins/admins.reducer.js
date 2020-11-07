const INITIAL_STATE = {
    currentAdmin : null
}

const adminReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CURRENT_ADMIN' :
            return{
                ...state,
                currentAdmin : action.payload
            }
        default:
            return state
    }
}

export default adminReducer;