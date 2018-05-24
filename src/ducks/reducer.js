let initialState= {
    id: '',
    user: '',
    picture: '',
    email: '',
    phone: 0,
    pro: false
}

const USER_INFO= 'USER_INFO'
const ADD_EMAIL_PHONE='ADD_EMAIL_PHONE'

export default function reducer(state=initialState, action){
    switch(action.type){
        case USER_INFO:
            return Object.assign({}, state, action.payload)
        case ADD_EMAIL_PHONE: 
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

export function userInfo(id, user, picture, email, phone, pro){
    return {
        type: USER_INFO,
        payload: {
            id, user, picture, email, phone, pro
        }
    }
}

export function addContact(email, phone){
    return {
        type: ADD_EMAIL_PHONE,
        payload:{
            email, phone
        }
    }
}