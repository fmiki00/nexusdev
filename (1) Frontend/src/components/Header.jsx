function Header({ isLoggedIn, setIsLoggedIn, setActivePage, openAuthModal }) { // Függvény deklaráció a Header komponenshez, propsokkal: isLoggedIn (bejelentkezett állapot), setIsLoggedIn (állapot setter), setActivePage (oldal váltó), 
                                                                               // openAuthModal (modul nyitó)
    
    // Kijelentkezes függvény
    function logout() { // Függvény a kijelentkezéshez
        setIsLoggedIn(false); // Bejelentkezett állapot false-ra állítása
        setActivePage(0); // Aktív oldal visszaállítása főoldalra (0)
        alert("Sikeresen kijelentkeztel!"); // Sikeres kijelentkezés üzenet megjelenítése
    }

    return ( // JSX visszatérés a komponens rendereléséhez
        <nav className="navbar"> {/* Navigációs elem a navbar osztállyal */}
            <div className="navbar-brand"> 
                NEXUSDEV 
            </div>

            <div className="navbar-nav"> {/* Navigációs linkek div a navbar-nav osztállyal */}
                <a className="nav-link" onClick={() => setActivePage(0)}>Fooldal</a> {/* Link a főoldalra (0), onClick eseménykezelővel */}
                <a className="nav-link" onClick={() => setActivePage(1)}>Rolunk</a> {/* Link a "Rólunk" oldalra (1), onClick eseménykezelővel */}
                
                {isLoggedIn && ( // Feltételes renderelés, ha bejelentkezett
                    <>
                        <a className="nav-link" onClick={() => setActivePage(3)}>Rendeles</a> {/* Link a rendelés oldalra (3), csak bejelentkezett felhasználónak */}
                        
                        {/* Profil ikon */} 
                        <div className="profile-icon" onClick={() => setActivePage(4)}> {/* Profil ikon div, onClick a profil oldalra (4) */}
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* SVG ikon a profilhoz */}
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/> {/* SVG path a felhasználó ikonhoz */}
                            </svg>
                        </div>
                        
                        {/* Kijelentkezes ikon */} 
                        <div className="profile-icon" onClick={logout}> {/* Kijelentkezés ikon div, onClick a logout függvényre */}
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* SVG ikon a kijelentkezéshez */}
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/> {/* SVG path a kilépés ikonhoz */}
                            </svg>
                        </div>
                    </>
                )}
                
                {/* Bejelentkezes ikon */} 
                {!isLoggedIn && ( // Feltételes renderelés, ha nincs bejelentkezve
                    <div className="profile-icon" onClick={openAuthModal}> {/* Bejelentkezés ikon div, onClick az auth modal nyitásához */}
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> // SVG ikon a bejelentkezéshez
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/> // SVG path a felhasználó ikonhoz
                        </svg>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header; // Komponens exportálása alapértelmezettként
