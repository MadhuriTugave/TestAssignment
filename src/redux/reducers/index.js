const InitialState = {
    user:""
}
export  const userCreater =(state = InitialState,action)=>{
    if(action.type === "setUser"){
           return {
              ...state,
              user: action.payload
           }
    }
    return state;
}