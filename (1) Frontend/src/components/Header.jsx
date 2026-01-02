function Header({ isLoggedIn, setIsLoggedIn, setActivePage, openAuthModal }) {
    
    // Kijelentkezes
    function logout() {
        setIsLoggedIn(false);
        setActivePage(0);
        alert("Sikeresen kijelentkeztel!");
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                NEXUSDEV
            </div>
            
            <div className="navbar-nav">
                <a className="nav-link" onClick={() => setActivePage(0)}>Fooldal</a>
                <a className="nav-link" onClick={() => setActivePage(1)}>Rolunk</a>
                
                {isLoggedIn && (
                    <>
                        <a className="nav-link" onClick={() => setActivePage(3)}>Rendeles</a>
                        
                        {/* Profil ikon */}
                        <div className="profile-icon" onClick={() => setActivePage(4)}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        
                        {/* Kijelentkezes ikon */}
                        <div className="profile-icon" onClick={logout}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                            </svg>
                        </div>
                    </>
                )}
                
                {/* Bejelentkezes ikon */}
                {!isLoggedIn && (
                    <div className="profile-icon" onClick={openAuthModal}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;
