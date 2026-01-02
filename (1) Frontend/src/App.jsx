import "./App.css";
import { useState } from "react";

import Header from "./components/Header.jsx";
import HomePage from "./components/HomePage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import Order from "./components/Order.jsx";
import Profile from "./components/Profile.jsx";
import LogRegModul from "./components/AuthModal.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    // Oldalak: 0 = Fooldal, 1 = Rolunk, 3 = Rendeles, 4 = Profil
    const [activePage, setActivePage] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Felhasznaloi adatok
    const [userData, setUserData] = useState({
        userId: -1,
        email: "",
        phone: "",
        birthDate: "",
        bio: ""
    });

    // Rendeles van-e
    const [isOrderExists, setIsOrderExists] = useState(false);

    // Bejelentkezes kezelese
    function handleLogin(data) {
        setUserData({
            userId: data.user[0].user_id,
            email: data.user[0].email_address,
            phone: data.user[0].phone_number,
            birthDate: data.user[0].birthdate,
            bio: data.user[0].bio
        });
        setIsOrderExists(data.order);
        setIsLoggedIn(true);
        setActivePage(3);
    }

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn}
                setActivePage={setActivePage}
                openAuthModal={() => setShowModal(true)}
            />

            <main>
                {activePage === 0 && <HomePage />}
                
                {activePage === 1 && <AboutPage />}

                {isLoggedIn && activePage === 3 && (
                    <Order 
                        isOrderExists={isOrderExists}
                        setIsOrderExists={setIsOrderExists}
                    />
                )}

                {isLoggedIn && activePage === 4 && (
                    <Profile 
                        userData={userData}
                        setActivePage={setActivePage}
                    />
                )}
            </main>

            <Footer />

            {showModal && (
                <LogRegModul 
                    closeModal={() => setShowModal(false)}
                    onLogin={handleLogin}
                />
            )}
        </>
    );
}

export default App;
