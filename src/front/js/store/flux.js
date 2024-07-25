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
                   brand: "Jordan",
                   id: "1",
                   name: "Air Jordan 1 Mid",
                   retailPrice: 100,
             },
             {
                         brand: "Jordan",
                         id: "2",
                         name: "Air Jordan 6 Retro White/Black",
                         retailPrice: 200,
             },
             {
                         brand: "Jordan",
                         id: "3",
                         name: "Air Jordan 11 Retro 'Bred' 2019",
                         retailPrice: 311,
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
                };
    
                const response = await fetch(`${process.env.BACKEND_URL}api/signup`, options);
    
                if (!response.ok) {
                    const data = await response.json();
                    
                    if (response.status === 409) { 
                        setStore({ signupMessage: "Email is already associated with an account" });
                    } else {
                        setStore({ signupMessage: data.msg || "Sign up failed" });
                    }
                    
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    };
                }
    
                const data = await response.json();
                setStore({
                    signupMessage: data.msg,
                    isSignUpSuccessful: response.ok,
                    isAuthenticated: true 
                });
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
    
                const response = await fetch(`${process.env.BACKEND_URL}api/token`, options);
    
                if (!response.ok) {
                    const data = await response.json();
                    setStore({ loginMessage: data.msg });
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    };
                }
    
                const data = await response.json();
                sessionStorage.setItem("token", data.access_token);
                setStore({
                    loginMessage: data.msg,
                    token: data.access_token,
                    isLoginSuccessful: true,
                    isAuthenticated: true, 
                });
                return data;
            },

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

    return {
        store: {
            token: null,
            signupMessage: null,
            isSignUpSuccessful: false,
            loginMessage: null,
            isLoginSuccessful: false,
            isAuthenticated: false,
            cartItems: [],
            orders: [],
            cartItems: [],
            favorites: [],
            shoes: [],
            shoeImages: {}
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
                };
    
                const response = await fetch(`${process.env.BACKEND_URL}api/signup`, options);
    
                if (!response.ok) {
                    const data = await response.json();
                    
                    if (response.status === 409) { 
                        setStore({ signupMessage: "Email is already associated with an account" });
                    } else {
                        setStore({ signupMessage: data.msg || "Sign up failed" });
                    }
                    
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    };
                }
    
                const data = await response.json();
                setStore({
                    signupMessage: data.msg,
                    isSignUpSuccessful: response.ok,
                    isAuthenticated: true 
                });
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
    
                const response = await fetch(`${process.env.BACKEND_URL}api/token`, options);
    
                if (!response.ok) {
                    const data = await response.json();
                    setStore({ loginMessage: data.msg });
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    };
                }
    
                const data = await response.json();
                sessionStorage.setItem("token", data.access_token);
                setStore({
                    loginMessage: data.msg,
                    token: data.access_token,
                    isLoginSuccessful: true,
                    isAuthenticated: true, 
                });
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
                    isAuthenticated: false
                })
            },

            // getShoes: async () => {
            //     const response = await fetch("https://zylalabs.com/api/916/sneakers+database+api/731/search+sneaker", {
            //         method: 'GET',
            //         headers: {
            //             'Authorization': 'Bearer 4921|JxMOxwG0dTICy45mwp3WwQLJIvEps1RSbXk3Qdsk',
            //             'Content-Type': 'application/json'
            //         }
            //     });

            //     if (!response.ok) {
            //         throw new Error(`Error: ${response.status} ${response.statusText}`);
            //     }

            //     const data = await response.json();
            //     setStore({ shoes: data.results })

            //     data.results.forEach(shoe => {
            //         getActions().getShoeImage(shoe.id);
            //     });
            // },

            // getShoeDetails: async (id) => {
            //     setStore({ shoeDetails: null });
            //     const response = await fetch(`https://zylalabs.com/api/916/sneakers+database+api/733/get+sneaker+by+id&sneaker_id=Required?sneaker_id=${id}`, {
            //         method: 'GET',
            //         headers: {
            //             'Authorization': 'Bearer 4921|JxMOxwG0dTICy45mwp3WwQLJIvEps1RSbXk3Qdsk',
            //             'Content-Type': 'application/json'
            //         }
            //     });

            //     if (!response.ok) {
            //         throw new Error(`Error: ${response.status} ${response.statusText}`);
            //     }

            //     const data = await response.json();
            //     console.log(data);
            // },

            getShoeImage: async (id) => {
                const response = await fetch(`https://zylalabs.com/api/916/sneakers+database+api/733/get+sneaker+by+id&sneaker_id=Required?sneaker_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer 4921|JxMOxwG0dTICy45mwp3WwQLJIvEps1RSbXk3Qdsk',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    console.log(`Error: ${response.status}, ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                console.log(data.results)
                const imageUrl = data.results[0].image.original;

                const store = getStore();
                setStore({ shoeImages: { ...store.shoeImages, [id]: imageUrl } });
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
                setStore({ cartItems: [...store.cartItems, shoe] });
            },

            removeFromCart: (shoeId) => {
                const store = getStore();
                setStore({ cartItems: store.cartItems.filter(shoe => shoe.id !== shoeId) });
            },

            clearCart: () => {
                setStore({ cartItems: [] });
            },

            getShoes: () => {
                fetch(process.env.BACKEND_URL+"api/shoes")
                .then(resp => resp.json())
                .then(data => setStore({shoes:data.shoes}))
                .catch(error => console.log(error))
            },

            submitOrder: async (orderData) => {
                const store = getStore();
                const token = store.token;

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(orderData)
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/orders`, options);

                    if (!response.ok) {
                        const data = await response.json();
                        return {
                            error: {
                                status: response.status,
                                statusText: response.statusText,
                                msg: data.msg
                            }
                        };
                    }

                    const data = await response.json();
                    setStore({ orders: [...store.orders, data.order_details] });
                    setStore({ cartItems: [] });
                    return data;
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            statusText: "Internal Server Error",
                            msg: "An error occurred"
                        }
                    };
                }
            },

            // submitOrder: async (ShippingAddress, BillingAddress, CardNumber, CardCvv, CardMonth, CardYear) => {
            //     const store = getStore();
            //     const orderData = {
            //         ShippingAddress,
            //         BillingAddress,
            //         CardNumber,
            //         CardCvv,
            //         CardMonth,
            //         CardYear,
            //         items: store.orders.map(item => ({
            //             shoeId: item.id,
            //             quantity: 1
            //         }))
            //     }
            //     // const options = {
            //     //     method: "POST",
            //     //     headers: {
            //     //         "Content-Type": "application/json",
            //     //         "Authorization": `Bearer ${store.token}`
            //     //     },
            //     //     body: JSON.stringify({orderData})
            //     // };

            //     console.log(`Backend URL: ${process.env.BACKEND_URL}api/orders`);
            //     console.log("Store token:", store.token);
            //     console.log("Store orders:", store.orders);


			removeFromCart: (shoeId) => {
				const store = getStore();
				setStore({ orders: store.orders.filter(shoe => shoe.id !== shoeId) });
			},

			getShippingAddress: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}api/shipping-address`,{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					}
				});
				if (!response) {
					console.error("Failed to fetch shipping address",
						response.status);
						return false;
				}
				const responseBody = await response.json()
				return responseBody
			},

			updateShippingAddress: async (shippingData) => {
				const response = await fetch(`${process.env.BACKEND_URL}api/edit-shipping-address`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify(shippingData)
				});
			
				if (response.status !== 200) {
					console.error("Failed to update shipping address:", response.statusText);
					return false;
				}
			
				const responseBody = await response.json();
				console.log(responseBody);
				return true;
			},

			getBillingAddress: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}api/billing-address`,{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					}
				});
				if (!response) {
					console.error("Failed to fetch billing address",
						response.status);
						return false;
				}
				const responseBody = await response.json()
				return responseBody
			},

			updateBillingAddress: async (billingData) => {
				const response = await fetch(`${process.env.BACKEND_URL}api/edit-billing-address`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify(billingData)
				});
			
				if (response.status !== 200) {
					console.error("Failed to update billing address:", response.statusText);
					return false;
				}
			
				const responseBody = await response.json();
				console.log(responseBody);
				return true;
			},

			getCard: async () => {
				const response = await fetch(`${process.env.BACKEND_URL}api/card`,{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					}
				});
				if (!response) {
					console.error("Failed to fetch card info",
						response.status);
						return false;
				}
				const responseBody = await response.json()
				return responseBody
			},

			updateCard: async (cardData) => {
				const response = await fetch(`${process.env.BACKEND_URL}api/edit-card-info`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
					body: JSON.stringify({ card: cardData })
				});
			
				if (response.status !== 200) {
					console.error("Failed to update card info:", response.statusText);
					return false;
				}
			
				const responseBody = await response.json();
				console.log(responseBody);
				return true;
			},
			// }

            //     const response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Authorization": `Bearer ${store.token}`
            //         },
            //         body: JSON.stringify({orderData})
            //     });


            //     if (!response.ok) {
            //         console.log({
            //             error: {
            //                 status: response.status,
            //                 statusText: response.statusText
            //             }
            //         })
            //         return false
            //     }
            //     const data = await response.json();
            //     console.log(data)
            //     setStore({
            //         cartItems: []
            //     });
            //     return true;
            // },
        // }
    };
};

export default getState;