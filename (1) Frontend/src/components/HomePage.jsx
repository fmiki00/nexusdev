import miki1 from "../images/miki1.jfif";
import vendel from "../images/vendel.jfif";

function HomePage() {
    const teamMembers = [
        {
            
            name: "Simó Zsolt",
            role: "Nexusdev director & Backend/Lead Developer",
            bio: "Több éves tapasztalattal rendelkezik webes alkalmazások fejlesztésében. Szenvedélye a tiszta kód és a modern technológiák alkalmazása."
        },
        {
            image: miki1,
            name: "Farkas Miklós",
            role: "Nexusdev director & Frontend Developer",
            bio: "Kreatív tervező, aki felhasználóbarát és vizuálisan lenyűgöző felületeket alkot. Minden projekt egyedi megközelítést kap tőle."
        },
        {
            image: vendel,
            name: "Medgyes Vendel",
            role: "Nexusdev director & Database Specialist",
            bio: "Adatbázisok és szerveroldali megoldások szakértője. Biztonságos és skálázható rendszereket épít ügyfeleink számára."
        }
    ];

    return (
        <>
            {/* fejlec resz */}
            <section className="hero-section">
                <h1>Üdvözöljük a NexusDev-nél</h1>
                <p className="subtitle">
                    Innovatív webfejlesztési megoldásokat kínálunk vállalkozások számára. 
                    Álmait valósággá változtatjuk a legmodernebb technológiák segítségével.
                </p>
            </section>

            {/* Rolunk resz */}
            <section className="about-section">
                <h2 className="section-title">Kik Vagyunk?</h2>
                <div className="about-content">
                    <p>
                        A <strong>NexusDev</strong> egy fiatal, dinamikus webfejlesztő csapat, 
                        amely 2024-ban alakult azzal a céllal, hogy egyedi és modern digitális 
                        megoldásokat nyújtson kis- és középvállalkozások számára.
                    </p>
                    <p>
                        Küldetésünk, hogy ügyfeleink ötleteit életre keltsük, és olyan weboldalakat, 
                        alkalmazásokat hozzunk létre, amelyek nem csak szépek, de hatékonyak is. 
                        Minden projektet személyre szabottan kezelünk, mert tudjuk, hogy minden 
                        vállalkozás egyedi.
                    </p>
                    <p>
                        Szolgáltatásaink között megtalálható a weboldal fejlesztés, mobilalkalmazás 
                        készítés, UI/UX tervezés és egyedi szoftverfejlesztés. Legyen szó egy 
                        egyszerű bemutatkozó oldalról vagy egy komplex e-commerce rendszerről, 
                        mi minden kihívásra felkészültünk!
                    </p>
                </div>
            </section>

            {/* Csapat resz */}
            <section className="team-section">
                <h2 className="section-title">Csapatunk</h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="team-card-image">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <h3>{member.name}</h3>
                            <p className="role">{member.role}</p>
                            <p className="bio">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default HomePage;
