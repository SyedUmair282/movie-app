const Initial_state = {
    name: null,
    image: null
}
export default (state = Initial_state, action) => {
    switch (action.type) {
        case 'Hello world':
            return ({
                ...state,
                name: action.data,
                image: action.data1
            })
        case 'logout':
            return ({
                ...state,
                name: action.data,
                image: action.data1
            })
        case 'current':
            return ({
                ...state,
                name: action.data,
                image: action.data1
            })
        default:
            return state;
    }
}