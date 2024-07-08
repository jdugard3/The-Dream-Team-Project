const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			signupMessage: null,
			loginMessage: null, 
			isLoginSuccessful: false,
			isSignUpSuccessful: false,
			orders:[],
			favorites:[],
			shoes:[],
				shoeDetails:{
					name:"",
					brand:"", 
					story:"",
				},

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

			logout: () => {
				sessionStorage.removeItem('token');
				setStore({
					token: null,
					signupMessage: null,
					isSignUpSuccessful: false,
					loginMessage: null, 
					isLoginSuccessful: false,
				})
			},

			getShoes: async () => {
				const response = await fetch("https://zylalabs.com/api/916/sneakers+database+api/731/search+sneaker", {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer 4921|JxMOxwG0dTICy45mwp3WwQLJIvEps1RSbXk3Qdsk',
						'Content-Type': 'application/json'
					}
				});
		
				if (!response.ok) {
					throw new Error(`Error: ${response.status} ${response.statusText}`);
				}
		
				const data = await response.json();
				console.log(data.results);
				setStore({shoes: data.results})
			},

			getShoeDetails: async (id) => {
				setStore({ shoeDetails: null });
				const response = await fetch(`https://zylalabs.com/api/916/sneakers+database+api/733/get+sneaker+by+id&sneaker_id=Required?sneaker_id=${id}`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer 4921|JxMOxwG0dTICy45mwp3WwQLJIvEps1RSbXk3Qdsk',
						'Content-Type': 'application/json'
					}
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status} ${response.statusText}`);
				}

				const data = await response.json();
				console.log(data);
			}
		}
	};
};

export default getState;
