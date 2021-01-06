import React, { useState } from 'react';


export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
});

const AuthContextProvider = props => {

    const [state, setState] = useState(false);
    const loginHandler = () => {
        setState(true)
    }

    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            isAuth: state

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default  AuthContextProvider;
