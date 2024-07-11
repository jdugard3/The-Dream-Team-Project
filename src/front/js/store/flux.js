const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			signupMessage: null,
			isSignUpSuccessful: false,
			loginMessage: null, 
			isLoginSuccessful: false,
			orders:[],
			favorites:[],
			shoes:[
				{
					brand:"Nike",
					id:"1",
					name:"The Nike Shoe",
					retailPrice:100,
					story:""

				},
				{
					brand:"Jordan",
					id:"2",
					name:"Air Jordan",
					retailPrice:250,
					story:""

				},
				{
					brand:"Adidas",
					id:"3",
					name:"Adidas shoe",
					retailPrice:50,
					story:""

				},
			],
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

			syncSessionTokenFromStore: () => {
				const sessionToken = sessionStorage.getItem('token');
				if (sessionToken && sessionToken != "" && sessionToken != undefined) {
					setStore({token: sessionToken})
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
				})
			},

			addFavorite: (shoe) => {
                const store = getStore();
                setStore({ favorites: [...store.favorites, shoe] });
            },
			
            removeFavorite: (shoeId) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter(shoe => shoe.id !== shoeId) });
            },

			addToCart: (shoe) => {
				const store = getStore();
				setStore({ orders: [...store.orders, shoe] });
			},

			removeFromCart: (shoeId) => {
				const store = getStore();
				setStore({ orders: store.orders.filter (shoe => shoe.id !== shoeId) });
			}

		},
	};
};

export default getState;
