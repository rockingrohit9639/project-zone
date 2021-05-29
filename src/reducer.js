export const initialState = {
    email: "",
    isAthenticated: false,
    query: "",
}

export const actions = {
    SET_EMAIL: "SET_EMAIL",
    SET_AUTH: "SET_AUTH",
    SET_QUERY: "SET_QUERY"
}

const reducer = (state, action) =>
{
    console.log(action);
    switch (action.type)
    {
        case actions.SET_EMAIL:
            return {
                ...state,
                email: action.email
            };
        
        case actions.SET_AUTH:
            return {
                ...state,
                isAthenticated: action.isAthenticated
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