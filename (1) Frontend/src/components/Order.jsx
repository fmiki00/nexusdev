import { useState } from "react";

function Order({ isOrderExists, setIsOrderExists }) {
    const [message, setMessage] = useState("");
    const [colorPalette, setColorPalette] = useState("");
    const [thematic, setThematic] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    // Rendeles kuldese
    function sendOrder() {
        fetch("http://127.0.0.1:3000/order", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: message, 
                colorPalette: colorPalette, 
                thematic: thematic, 
                logoUrl: logoUrl 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.message);
            } else {
                alert("Rendeles elkuldve!");
                setIsOrderExists(true);
            }
        });
    }

    // Rendeles visszavonasa
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
                alert("Rendeles visszavonva!");
                setIsOrderExists(false);
            }
        });
    }

    return (
        <div className="about-section">
            <h2 className="section-title">Rendeles</h2>
            <div className="about-content">
                {isOrderExists ? (
                    <div>
                        <p>Mar van aktiv rendelesed!</p>
                        <button className="auth-submit" onClick={revokeOrder}>
                            Rendeles visszavonasa
                        </button>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); sendOrder(); }}>
                        <textarea 
                            placeholder="Uzenet..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="profile-textarea"
                        />
                        <input 
                            type="text" 
                            placeholder="Szinpaletta..." 
                            value={colorPalette}
                            onChange={(e) => setColorPalette(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Tematika..." 
                            value={thematic}
                            onChange={(e) => setThematic(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Logo URL..." 
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                        />
                        <button type="submit" className="auth-submit">
                            Rendeles kuldese
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Order;

