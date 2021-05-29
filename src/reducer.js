export const initialState = {
    user: {
        email: "",
        fname: "",
        lname: "",
        picture: "",
    },
    isAuthenticated: false,
    query: "",
}

export const actions = {
    SET_USER: "SET_USER",
    SET_AUTH: "SET_AUTH",
    SET_QUERY: "SET_QUERY"
}

const reducer = (state, action) =>
{
    console.log(action);
    switch (action.type)
    {
        case actions.SET_USER:
            return {
                ...state,
                user: action.user
            };
        
        case actions.SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };
        
        case actions.SET_QUERY:
            return {
                ...state,
                query: action.query
            }
        
        default:
            return state;
    }
}

export default reducer;