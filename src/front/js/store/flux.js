const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			token: null,
			signupMessage: null,
			isSignUpSuccessful: false,
			loginMessage: null,
			isLoginSuccessful: false,
			user: null,
			orders: [],
			favorites: [],
			shoes: [
				{
					brand: "Nike",
					id: "1",
					name: "The Nike Shoe",
					retailPrice: 100,
					story: ""

				},
				{
					brand: "Jordan",
					id: "2",
					name: "Air Jordan",
					retailPrice: 250,
					story: ""

				},
				{
					brand: "Adidas",
					id: "3",
					name: "Adidas shoe",
					retailPrice: 50,
					story: ""

				},
			],
		},

		actions: {
			feedback: async (userEmail, userFeedback) => {
				const options = {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: userEmail,
						description: userFeedback
					})
				}
				const response = await fetch(`${process.env.BACKEND_URL}api/feedback`, options)

				if (!response.ok) {
					return {
						error: {
							status: response.status,
							statusText: response.statusText
						}
					}
				}
				const data = await response.json();
				return data;
			},

			signUp: async (userEmail, userPassword, userFullName) => {
				const options = {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: userEmail,
						password: userPassword,
						full_name: userFullName
					})
				}
				const response = await fetch(`${process.env.BACKEND_URL}api/signup`, options)

				if (!response.ok) {
					const data = await response.json()
					setStore({ signupMessage: data.msg })
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

			login: async (user) => {
				const response = await fetch(
					process.env.BACKEND_URL + "api/users/login", {
					method: 'POST',
					// mode: 'cors',
					body: JSON.stringify({
						email: user.email,
						password: user.password
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status !== 201) return false
				const responseBody = await response.json();
				setStore({
					token: responseBody.access_token,
					isLoggedIn: true,
					userId:responseBody.userId
					
				});
				sessionStorage.setItem("token", responseBody.access_token);
				return true
			},

			/* if(!response.ok) {
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
		}, */

			fetchUserData: async () => {
				
				const response = await fetch(`${process.env.BACKEND_URL}api/user`, {
					headers: {
						'Authorization': 'Bearer ' + sessionStorage.getItem("token")
					},
				});
				console.log("Response status:", response.status); // Debugging log
				if (!response.ok) {

					console.log("Failed to fetch User data:", response.status); // Debugging log
					return false;
				}
				const data = await response.json();
				setStore({user:data.user})
				return true
			},

			syncSessionTokenFromStore: () => {
				const sessionToken = sessionStorage.getItem('token');
				console.log("Session token:", sessionToken); // Debugging log
				if (sessionToken && sessionToken != "" && sessionToken != undefined) {
					setStore({ token: sessionToken })
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
				setStore({ orders: store.orders.filter(shoe => shoe.id !== shoeId) });
			}

		},
	};
};

export default getState;
