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
                setStore({ shoes: data.results })

                data.results.forEach(shoe => {
                    getActions().getShoeImage(shoe.id);
                });
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
                setStore({ orders: [...store.orders, shoe] });
            },

            removeFromCart: (shoeId) => {
                const store = getStore();
                setStore({ orders: store.orders.filter(shoe => shoe.id !== shoeId) });
            },

            submitOrder: async (userShippingAddress, userBillingAddress, userCardNumber, userCardCvv, userCardMonth, userCardYear) => {
                const store = getStore()
                const options = {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify({
                        shipping_address: userShippingAddress,
                        billing_address: userBillingAddress,
                        credit_card_num: userCardNumber,
                        credit_card_cvv: userCardCvv,
                        credit_card_month: userCardMonth,
                        credit_card_year: userCardYear
                    })
                };

                const response = await fetch(`${process.env.BACKEND_URL}api/orders`, options);

                if(!response.ok) {
                    return {
                        error: {
                            status: response.status,
                            statusText: response.statusText
                        }
                    }
                }

                const data = await response.json();
                setStore({
                    orders: []
                });
                return data;
            },
        }
    };
};

export default getState;
