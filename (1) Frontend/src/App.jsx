import "./App.css";
import { useState } from "react";

import Header from "./components/Header.jsx";
import HomePage from "./components/HomePage.jsx";
import LogRegModul from "./components/AuthModal.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // Oldalak: 0 = Főoldal, 3 = Rendelés, 4 = Profil
  const [activePage, setActivePage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Felhasználói adatok
  const [userId, setUserId] = useState(-1);
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // Rendelés adatok
  const [isOrderExists, setIsOrderExists] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderColorPalette, setOrderColorPalette] = useState("");
  const [orderThematic, setOrderThematic] = useState("");
  const [orderLogoUrl, setOrderLogoUrl] = useState("");

  // Bejelentkezés kezelése
  function handleLogin(data) {
    setUserId(data.user.user_id);
    setEmailAddress(data.user.email_address);
    setPhoneNumber(data.user.phone_number);
    setBirthDate(data.user.birth_date);
    setBio(data.user.bio);
    setIsOrderExists(data.order);
    setIsLoggedIn(true);
    setActivePage(3);
  }

  // Kijelentkezés
  function logout() {
    fetch("http://127.0.0.1:3000/logout", {
      method: "GET",
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert("Kijelentkezve!");
        setIsLoggedIn(false);
        setActivePage(0);
      }
    });
  }

  // Rendelés küldése
  function sendOrder() {
    fetch("http://127.0.0.1:3000/order", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: orderMessage, 
        colorPalette: orderColorPalette, 
        thematic: orderThematic, 
        logoUrl: orderLogoUrl 
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert("Rendelés elküldve!");
        setIsOrderExists(true);
      }
    });
  }

  // Rendelés visszavonása
  function revokeOrder() {
    fetch("http://127.0.0.1:3000/revokeOrder", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert("Rendelés visszavonva!");
        setIsOrderExists(false);
      }
    });
  }

  // Profil frissítése
  function editProfile() {
    fetch("http://127.0.0.1:3000/updateProfile", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailAddress, phoneNumber, birthDate, bio, password, oldPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.message);
      } else {
        alert("Profil frissítve!");
        setActivePage(3);
      }
    });
  }

  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        logout={logout} 
        setActivePage={setActivePage}
        openAuthModal={() => setShowModal(true)}
      />

      <main>
        {activePage === 0 && <HomePage />}

        {isLoggedIn && activePage === 3 && (
          <Order 
            isOrderExists={isOrderExists}
            orderMessage={orderMessage}
            setOrderMessage={setOrderMessage}
            orderColorPalette={orderColorPalette}
            setOrderColorPalette={setOrderColorPalette}
            orderThematic={orderThematic}
            setOrderThematic={setOrderThematic}
            orderLogoUrl={orderLogoUrl}
            setOrderLogoUrl={setOrderLogoUrl}
            sendOrder={sendOrder}
            revokeOrder={revokeOrder}
          />
        )}

        {isLoggedIn && activePage === 4 && (
          <div className="about-section">
            <h2 className="section-title">Profil</h2>
            <div className="about-content">
              <div className="auth-form">
                <input 
                  type="email" 
                  placeholder="Email cím" 
                  value={emailAddress} 
                  onChange={e => setEmailAddress(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Telefonszám" 
                  value={phoneNumber} 
                  onChange={e => setPhoneNumber(e.target.value)} 
                />
                <input 
                  type="date" 
                  value={birthDate} 
                  onChange={e => setBirthDate(e.target.value)} 
                />
                <textarea 
                  placeholder="Bemutatkozás" 
                  value={bio} 
                  rows="4" 
                  onChange={e => setBio(e.target.value)}
                  className="profile-textarea"
                />
                <input 
                  type="password" 
                  placeholder="Új jelszó" 
                  onChange={e => setPassword(e.target.value)} 
                />
                <input 
                  type="password" 
                  placeholder="Régi jelszó" 
                  onChange={e => setOldPassword(e.target.value)} 
                />
                <button className="auth-submit" onClick={editProfile}>
                  Mentés
                </button>
              </div>
            </div>
          </div>
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
