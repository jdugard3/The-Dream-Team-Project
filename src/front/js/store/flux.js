const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			signupMessage: null,
			loginMessage: null, 
			isLoginSuccessful: false,
			isSignUpSuccessful: false,
			orders:[],

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
				return data;
			},

			syncSessionTokenFromStore: async () => {
				const sessionToken = sessionStorage.getItem('token');
				if (sessionToken && sessionToken != "" && sessionToken != undefined) {
					setStore({token: sessionToken})
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
		}
	};
};

export default getState;
