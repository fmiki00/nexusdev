import { useState } from "react"; 

function Login({ closeModal, onLogin }) { // Login komponens függvény deklarációja, propsokkal: closeModal (modal bezáró), onLogin (bejelentkezés kezelő)
    const [email, setEmail] = useState(""); // Email állapot és setter hook használata, kezdeti érték üres string
    const [password, setPassword] = useState(""); // Jelszó állapot és setter hook használata, kezdeti érték üres string

    function handleSubmit(e) { // Form beküldés kezelő függvény
        e.preventDefault(); // Alapértelmezett form viselkedés megakadályozása
        
        fetch("http://127.0.0.1:3000/login", { // Fetch kérés küldése a backend login végpontra
            method: "POST", // HTTP metódus POST
            credentials: "include", // Cookie-k küldése a kéréssel
            headers: { "Content-Type": "application/json" }, // Fejléc JSON tartalomtípusra
            body: JSON.stringify({  // Kérés törzse JSON formátumban
                emailAddress: email,  // Email cím küldése
                password: password  // Jelszó küldése
            })
        })
        .then(response => response.json()) // Válasz JSON formátumba alakítása
        .then(data => { // Adatok feldolgozása
            if (data.error) { // Ha hiba van a válaszban
                alert(data.message); // Hibaüzenet megjelenítése
            } else { // Egyébként
                alert("Sikeres bejelentkezés!"); // Sikeres bejelentkezés üzenet
                onLogin(data); // onLogin callback hívása az adatokkal
                closeModal(); // Modal bezárása
            }
        })
        .catch(error => console.error("Error:", error)); 
    }

    return ( 
        <form className="auth-form" onSubmit={handleSubmit}> 
            <input  
                type="email"  // Típus email
                placeholder="Enter your email address..."  // Placeholder szöveg
                value={email} // Érték az email állapotból
                onChange={(e) => setEmail(e.target.value)} // onChange eseménykezelő az email frissítéséhez
            />
            <input  
                type="password"  // Típus password
                placeholder="Enter your password..."  // Placeholder szöveg
                value={password} // Érték a password állapotból
                onChange={(e) => setPassword(e.target.value)} // onChange eseménykezelő a jelszó frissítéséhez
            />
            <button type="submit" className="auth-submit"> 
                Login 
            </button>
        </form>
    );
}

export default Login;
