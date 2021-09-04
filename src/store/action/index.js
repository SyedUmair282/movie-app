import Firebase from "../../Firebase Config/config";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const login = () => {

    return (dispatch) => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("sign in data==>", user);
                dispatch({
                    type: "Hello world",
                    data: user.displayName,
                    data1: user.photoURL
                })
            }).catch((error) => {
                console.log(error)
            });

    }
}
const logout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth).then(() => {

            dispatch({
                type: "logout",
                data: null,
                data1: null
            })
        }).catch((error) => {
            alert("Error to logout");
        });
    }
}
const current = () => {
    return (dispatch) => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({
                    type: "current",
                    data: user.displayName,
                    data1: user.photoURL
                })
            }
        });
    }
}
export {
    login,
    logout,
    current

}