import firebase from 'firebase';
import auth from 'firebase';
import { authConstanst } from './constants';
import { getRealtimeUsers } from './user.actions';
const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
        //Now lets logout user

        const db = firebase.firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then(() => {

            auth()
            .signOut()
            .then(() => {
                //successfully
                localStorage.clear();
                dispatch({type: `${authConstanst.USER_LOGOUT}_SUCCESS`});
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } })
            })

        })
        .catch(error => {
            console.log(error);
        })

        


    }
}

export default logout