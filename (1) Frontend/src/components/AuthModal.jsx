import { useState } from "react"; 
import Login from "./Login.jsx"; 
import Register from "./Register.jsx"; 

function LogRegModul({ closeModal, onLogin }) { // LogRegModul komponens függvény deklarációja, propsokkal: closeModal (modal bezáró), onLogin (bejelentkezés kezelő)
    const [showLogin, setShowLogin] = useState(true); // showLogin állapot és setter hook használata, kezdeti érték true (bejelentkezés megjelenítése)

    return ( 
        <div className="modal-overlay" onClick={closeModal}> 
            <div className="auth-card" onClick={(e) => e.stopPropagation()}> {/* Auth card div, onClick megállítja az esemény buborékolását */}
                
                <button className="auth-card-close" onClick={closeModal}> 
                    ✕ 
                </button>
                
                <h2>{showLogin ? "Bejelentkezés" : "Regisztráció"}</h2> {/* Cím feltételes alapján */}
                
                <div className="auth-tabs"> 
                    <button  // Bejelentkezés tab gomb
                        className={showLogin ? "auth-tab active" : "auth-tab"} // Osztály feltételes alapján
                        onClick={() => setShowLogin(true)} // onClick eseménykezelő a bejelentkezés megjelenítéséhez
                    >
                        Bejelentkezés 
                    </button>
                    <button  // Regisztráció tab gomb
                        className={showLogin ? "auth-tab" : "auth-tab active"} // Osztály feltételes alapján
                        onClick={() => setShowLogin(false)} // onClick eseménykezelő a regisztráció megjelenítéséhez
                    >
                        Regisztráció 
                    </button>
                </div>
                
                {showLogin ? ( // Feltételes renderelés, ha showLogin true
                    <Login closeModal={closeModal} onLogin={onLogin} /> // Login komponens renderelése propsokkal
                ) : ( // Egyébként
                    <Register onSuccess={() => setShowLogin(true)} /> // Register komponens renderelése onSuccess callback-kel
                )}
                
            </div>
        </div>
    );
}

export default LogRegModul; 
