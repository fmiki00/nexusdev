import { useState } from "react";

function Profile({ userData, setActivePage }) {
    const [emailAddress, setEmailAddress] = useState(userData.email || "");
    const [phoneNumber, setPhoneNumber] = useState(userData.phone || "");
    const [birthDate, setBirthDate] = useState(userData.birthDate || "");
    const [bio, setBio] = useState(userData.bio || "");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    // Profil frissitese
    function editProfile(e) {
        e.preventDefault();
        
        fetch("http://127.0.0.1:3000/updateProfile", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                emailAddress, 
                phoneNumber, 
                birthDate, 
                bio, 
                password, 
                oldPassword 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.message);
            } else {
                alert("Profil frissitve!");
                setActivePage(3);
            }
        });
    }

    return (
        <div className="about-section">
            <h2 className="section-title">Profil</h2>
            <div className="about-content">
                <form className="auth-form" onSubmit={editProfile}>
                    <input 
                        type="email" 
                        placeholder="Email cim" 
                        value={emailAddress} 
                        onChange={e => setEmailAddress(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Telefonszam" 
                        value={phoneNumber} 
                        onChange={e => setPhoneNumber(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        value={birthDate} 
                        onChange={e => setBirthDate(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Bemutatkozas" 
                        value={bio} 
                        rows="4" 
                        onChange={e => setBio(e.target.value)}
                        className="profile-textarea"
                    />
                    <input 
                        type="password" 
                        placeholder="Uj jelszo" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Regi jelszo" 
                        onChange={e => setOldPassword(e.target.value)} 
                    />
                    <button type="submit" className="auth-submit">
                        Mentes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;

