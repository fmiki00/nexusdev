import { useState } from "react"; 

function Register({ onSuccess }) { // Register komponens függvény deklarációja, propszal: onSuccess (sikeres regisztráció callback)
    const [email, setEmail] = useState(""); // Email állapot és setter hook használata, kezdeti érték üres string
    const [phone, setPhone] = useState(""); // Telefonszám állapot és setter hook használata, 
    const [birthDate, setBirthDate] = useState(""); // Születési dátum állapot és setter hook használata, 
    const [username, setUsername] = useState(""); // Felhasználónév állapot és setter hook használata,
    const [password, setPassword] = useState(""); // Jelszó állapot és setter hook használata, 

    function handleSubmit(e) { // Form beküldés kezelő függvény
        e.preventDefault(); // Alapértelmezett form viselkedés megakadályozása
        
        fetch("http://127.0.0.1:3000/register", { // Fetch kérés küldése a backend register végpontra
            method: "POST", // HTTP metódus POST
            credentials: "include", // Cookie-k küldése a kéréssel
            headers: { "Content-Type": "application/json" }, // Fejléc JSON tartalomtípusra
            body: JSON.stringify({  // Kérés törzse JSON formátumban
                emailAddress: email,  
                phoneNumber: phone,  
                birthDate: birthDate,  
                username: username, 
                password: password  
            })
        })
        .then(response => response.json()) // Válasz JSON formátumba alakítása
        .then(data => { // Adatok feldolgozása
            alert(data.message); // Üzenet megjelenítése a válaszból
            if (!data.error) { // Ha nincs hiba
                onSuccess(); // onSuccess callback hívása
            }
        })
        .catch(error => console.error("Error:", error)); // Hiba esetén konzolra írás
    }

    return ( 
        <form className="auth-form" onSubmit={handleSubmit}> 
            <input  // Email input mező
                type="email"  
                placeholder="Email address here..." 
                value={email} // Érték az email állapotból
                onChange={(e) => setEmail(e.target.value)} // onChange eseménykezelő az email frissítéséhez
            />
            <input  // Telefonszám input mező
                type="tel"  
                placeholder="Phone number here..."  
                value={phone} // Érték a phone állapotból
                onChange={(e) => setPhone(e.target.value)} // onChange eseménykezelő a telefonszám frissítéséhez
            />
            <input  // Születési dátum input mező
                type="date" 
                value={birthDate} // Érték a birthDate állapotból
                onChange={(e) => setBirthDate(e.target.value)} // onChange eseménykezelő a születési dátum frissítéséhez
            />
            <input  // Felhasználónév input mező
                type="text" 
                placeholder="Username here..." 
                value={username} // Érték az username állapotból
                onChange={(e) => setUsername(e.target.value)} // onChange eseménykezelő a felhasználónév frissítéséhez
            />
            <input  // Jelszó input mező
                type="password"  
                placeholder="Password..."  
                value={password} // Érték a password állapotból
                onChange={(e) => setPassword(e.target.value)} // onChange eseménykezelő a jelszó frissítéséhez
            />
            <button type="submit" className="auth-submit"> 
                Regisztráció
            </button>
        </form>
    );
}

export default Register;
