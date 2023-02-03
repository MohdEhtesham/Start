import *as Type from './Type'
export const Saveuser=(user_data)=>({
    type:Type.Save_User,
    payload:user_data
})