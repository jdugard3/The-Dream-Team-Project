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
                    brand: "Nike",
                    id: "1",
                    name: "The Nike Shoe",
                    retailPrice: 100
                },
                {
                    brand: "Jordan",
                    id: "2",
                    name: "Air Jordan",
                    retailPrice: 250
                },
                {
                    brand: "Adidas",
                    id: "3",
                    name: "Adidas Shoe",
                    retailPrice: 50
                }
            ]
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
            },

            // submitOrder: async (order) => {
            //     let data = JSON.stringify({shoe_id: order.shoe_id, shoe: order.shoe, quantitiy: order.quantity, total: order.total_price, shipping_address: order.shipping_address, mailing_address: order.mailing_address, credit_card_info: order.credit_card_info })

            //     const response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Authorization": "Bearer " + sessionStorage.getItem("token")
            //         },
            //         body: data
            //     })
            //     if (response.status !== 200) return false;
            //     const responseBody = await response.json();
            //     console.log(responseBody)
            //     return true
            

            submitOrder: async (orderData) => {
                try {
                    const store = getStore();
                    const token = store.token;
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(orderData)
                    };
                    const response = await fetch(`${process.env.BACKEND_URL}/api/orders`, options);
                    if (!response.ok) {
                        throw new Error("Error submitting order", response.statusText );
                    }
                    const data = await response.json();
                    setStore({ orders: [] });  // Clear the cart after successful order submission
                    return true;
                } catch (error) {
                    console.error("Error submitting order: ", error);
                    return false;
                }
            },
        }
    };
};

export default getState;
