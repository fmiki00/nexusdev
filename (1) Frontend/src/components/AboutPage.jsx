import miki1 from "../images/miki1.jfif"; 
import vendel from "../images/vendel.jfif"; 

function AboutPage() { 
    const teamMembers = [ // Csapat tagok tömb konstans deklarációja
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
            <section className="about-section"> {/* Szakasz elem az about-section osztállyal */}
                <h2 className="section-title">Kik Vagyunk?</h2> {/* Cím a szakaszhoz */}
                <div className="about-content"> {/* Tartalom div az about-content osztállyal */}
                    <p> 
                        A <strong>NexusDev</strong> egy fiatal webfejleszto csapat,  {/* Szöveg a cégről */}
                        amely 2024-ben alakult azzal a cellal, hogy egyedi es modern digitalis  {/* Folytatás */}
                        megoldasokat nyujtson vallalkozasok szamara. {/* Folytatás */}
                    </p>
                    <p> {/* Második bekezdés */}
                        Kuldetesunk, hogy ugyfeleink otleteit eletre keltsuk, es olyan weboldalakat,  {/* Küldetés szöveg */}
                        alkalmazasokat hozzunk letre, amelyek nem csak szepek, de hatekonyak is. {/* Folytatás */}
                    </p>
                </div>
            </section>

            {/* Csapat resz */} 
            <section className="team-section"> {/* Szakasz elem a team-section osztállyal */}
                <h2 className="section-title">Csapatunk</h2> {/* Cím a csapat szakaszhoz */}
                <div className="team-grid"> {/* Grid div a csapat tagokhoz */}
                    {teamMembers.map((member, index) => ( // Csapat tagok map-olása
                        <div key={index} className="team-card"> 
                            <div className="team-card-image"> 
                                {member.image ? ( // Feltétel, ha van kép
                                    <img src={member.image} alt={member.name} /> // Kép elem
                                ) : ( // Egyébként
                                    <div className="placeholder-image">No Image</div> // Placeholder szöveg
                                )}
                            </div>
                            <h3>{member.name}</h3> {/* Név cím */}
                            <p className="role">{member.role}</p> {/* Szerep bekezdés */}
                            <p className="bio">{member.bio}</p> {/* Bio bekezdés */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default AboutPage;

