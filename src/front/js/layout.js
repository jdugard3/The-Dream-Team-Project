import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { MichaelJordan } from "./pages/MichaelJordan";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import { Feedback } from "./pages/Feedback";

import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { OrdersPage } from "./pages/OrdersPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { UserEditPage } from "./pages/UserEditPage";
import { ResetPassword } from "./pages/ResetPassword";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<SignUpPage />} path="/signup" />
                        <Route element={<OrdersPage />} path="/orders" />
                        <Route element={<UserEditPage />} path="/profile/edit" />
                        <Route element={<UserProfilePage />} path="/profile" />

                        <Route element={<MichaelJordan />} path="/michael-jordan" />

                        <Route element={<Feedback />} path="/feedback" />
                        <Route element={<ResetPassword />} path="/resetpassword" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
