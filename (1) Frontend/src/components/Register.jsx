import { useState } from "react";

function Register({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                emailAddress: email, 
                phoneNumber: phone, 
                birthDate: birthDate, 
                username: username, 
                password: password 
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (!data.error) {
                onSuccess();
            }
        })
        .catch(error => console.error("Error:", error));
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Email address here..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="tel" 
                placeholder="Phone number here..." 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Username here..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth-submit">
                Regisztráció
            </button>
        </form>
    );
}

export default Register;
