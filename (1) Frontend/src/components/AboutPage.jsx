import miki1 from "../images/miki1.jfif";
import vendel from "../images/vendel.jfif";

function AboutPage() {
    const teamMembers = [
        {
            name: "Simo Zsolt",
            role: "Nexusdev director & Backend Developer",
            bio: "Tobb eves tapasztalattal rendelkezik webes alkalmazasok fejleszteseben."
        },
        {
            image: miki1,
            name: "Farkas Miklos",
            role: "Nexusdev director & Frontend Developer",
            bio: "Kreativ tervezo, aki felhasznalobaratfelületeket alkot."
        },
        {
            image: vendel,
            name: "Medgyes Vendel",
            role: "Nexusdev director & Database Specialist",
            bio: "Adatbazisok es szerveroldali megoldasok szakertoje."
        }
    ];

    return (
        <>
            {/* Rolunk resz */}
            <section className="about-section">
                <h2 className="section-title">Kik Vagyunk?</h2>
                <div className="about-content">
                    <p>
                        A <strong>NexusDev</strong> egy fiatal webfejleszto csapat, 
                        amely 2024-ben alakult azzal a cellal, hogy egyedi es modern digitalis 
                        megoldasokat nyujtson vallalkozasok szamara.
                    </p>
                    <p>
                        Kuldetesunk, hogy ugyfeleink otleteit eletre keltsuk, es olyan weboldalakat, 
                        alkalmazasokat hozzunk letre, amelyek nem csak szepek, de hatekonyak is.
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
                                {member.image ? (
                                    <img src={member.image} alt={member.name} />
                                ) : (
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                )}
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

export default AboutPage;

