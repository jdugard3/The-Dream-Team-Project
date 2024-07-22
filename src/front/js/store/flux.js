const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            signupMessage: null,
            isSignUpSuccessful: false,
            loginMessage: null,
            isLoginSuccessful: false,
            orders: [],
            cartItems: [],
            favorites: [],
            shoes: [
                {
                    brand: "Jordan",
                    id: "685d6f3d-f54f-496a-b36a-219c7650b3c4",
                    name: "Air Jordan 1",
                    retailPrice: 650
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
            ],
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
                        setStore({ signupMessage: "User already exists" });
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
                    isSignUpSuccessful: response.ok
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
                setStore({ orders: [...store.cartItems, shoe] });
            },

            removeFromCart: (shoeId) => {
                const store = getStore();
                setStore({ orders: store.cartItems.filter(shoe => shoe.id !== shoeId) });
            },

            clearCart: () => {
                setStore({ cartItems: [] });
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
                    getActions().clearCart();
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
        }
    };
};

export default getState;