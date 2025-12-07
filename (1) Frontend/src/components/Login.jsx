import { useState } from "react";

function Login({ closeModal, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                emailAddress: email, 
                password: password 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.message);
            } else {
                alert("Sikeres bejelentkezés!");
                onLogin(data);
                closeModal();
            }
        })
        .catch(error => console.error("Error:", error));
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Enter your email address..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Enter your password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth-submit">
                Login
            </button>
        </form>
    );
}

export default Login;
