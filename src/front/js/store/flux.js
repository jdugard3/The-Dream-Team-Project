const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            signupMessage: null,
            isSignUpSuccessful: false,
            loginMessage: null, 
            isLoginSuccessful: false,
            user: null,
        },
        actions: {
            signUp: async (userEmail, userPassword) => {
                const options = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: userPassword
                    })
                }
                const response = await fetch(`${process.env.BACKEND_URL}api/signup`, options)

                if(!response.ok) {
                    const data = await response.json()
                    setStore({signupMessage: data.msg})
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    }
                }
                const data = await response.json()
                setStore({
                    signupMessage: data.msg,
                    isSignUpSuccessful: response.ok
                })
                return data;
            },
            
            login: async (userEmail, userPassword) => {
                const options = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: userPassword
                    })
                }
                const response = await fetch(`${process.env.BACKEND_URL}api/token`, options)

                if(!response.ok) {
                    const data = await response.json()
                    setStore({loginMessage: data.msg})
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    }
                }
                const data = await response.json()
                sessionStorage.setItem("token", data.access_token)
                setStore({
                    loginMessage: data.msg,
                    token: data.access_token,
                    isLoginSuccessful: true
                })
                getActions().fetchUserData();
                return data;
            },

            fetchUserData: async () => {
                const store = getStore();
                const options = {
                    method: 'GET', 
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${store.token}`,
                    },
                };
                const response = await fetch(`${process.env.BACKEND_URL}api/user`, options)
                
                if(response.ok) {
                    const user = await response.json();
                    setStore({ user });
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            },

            syncSessionTokenFromStore: () => {
                const sessionToken = sessionStorage.getItem('token');
                if (sessionToken && sessionToken != "" && sessionToken != undefined) {
                    setStore({token: sessionToken})
                    getActions().fetchUserData();
                }
            },

            logout: () => {
                sessionStorage.removeItem('token');
                setStore({
                    token: null,
                    signupMessage: null,
                    isSignUpSuccessful: false,
                    loginMessage: null, 
                    isLoginSuccessful: false,
                    user: null,
                })
            },
        }
    };
};

export default getState;
