const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			signupMessage: null,
			isSignUpSuccessful: false,
			loginMessage: null,
			isLoginSuccessful: false,
			orders: [],
			favorites: [],
			shoes: [
				{
					brand: "Jordan",
					id: "1",
					name: "Air Jordan 1 Mid",
					retailPrice: 100,
					story: "The Air Jordan 1 is a high-top basketball shoe first produced by Nike for Michael Jordan in 1984 and released to the public in 1985. It features a sleek design with a prominent Nike Swoosh, the iconic Air Jordan Wings logo, and a durable leather upper. The original Bred (Black and Red) colorway became instantly recognizable and controversial, as it violated NBA uniform policies, leading Nike to capitalize on the Banned storyline for marketing. Its success on and off the court, driven by Jordan's legendary performance and Nike's innovative marketing, cemented the Air Jordan 1 as a cultural icon in both sports and fashion.",
					image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				},
				{
					brand: "Jordan",
					id: "2",
					name: "Air Jordan 6 Retro White/Black",
					retailPrice: 200,
					story: "The Air Jordan 6, released in 1991, is a celebrated basketball shoe designed by Tinker Hatfield for Michael Jordan, featuring a high-top silhouette, perforated side panels, and a distinctive heel tab for easy on-off access. Its design, inspired by Jordan's German sports car, includes visible Air cushioning in the sole for enhanced comfort and support. The Air Jordan 6 gained legendary status when Michael Jordan wore it during his first NBA championship win with the Chicago Bulls. Its blend of performance and style, coupled with its historic significance, has solidified its place as a beloved sneaker in the Air Jordan lineage.",
					image: "https://example.com/path-to-air-jordan-6-image.jpg"
				},
				{
					brand: "Jordan",
					id: "3",
					name: "Air Jordan 11 Retro 'Bred' 2019",
					retailPrice: 311,
					story: "The Air Jordan 11, released in 1995, is an iconic basketball shoe designed by Tinker Hatfield, known for its sleek patent leather upper, mesh fabric, and translucent rubber sole. It was designed to be both a high-performance athletic shoe and a stylish off-court option, showcasing a unique blend of luxury and technology. Michael Jordan wore the Air Jordan 11 during the 1995-96 NBA season, leading the Chicago Bulls to a historic 72-10 record and his fourth NBA championship. Its debut on the court and in the movie Space Jam solidified its legendary status, making it one of the most beloved and sought-after models in the Air Jordan series.",
					image: "https://example.com/path-to-air-jordan-11-image.jpg"
				},
			],
		},

		actions: {

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

				if (!response.ok) {
					const data = await response.json()
					setStore({ loginMessage: data.msg })
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
					setStore({ token: sessionToken })
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
				setStore({ orders: store.orders.filter(shoe => shoe.id !== shoeId) });
			}

		},
	};
};

export default getState;
