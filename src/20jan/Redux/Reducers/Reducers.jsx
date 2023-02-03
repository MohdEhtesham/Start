import *as Type from "../Type"

const initialState={
    user_name:"",
    user_type:""
}

export const Reducers =(state =initialState, actions)=>{
    switch(actions.type){
        case Type.Save_User:{
            return{
                ...state,
                user_name:actions.payload.name,
                user_type:actions.payload.type,
            }
        }

        default:{
            return state;
        }
    }

}