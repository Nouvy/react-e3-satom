import {useState} from "react";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateName(value) {
        if (!value.trim()) {
            return "Le nom est obligatoire";
        }
        if (value.trim().length < 3) {
            return "Le nom doit contenir minimum 3 caractères"
        }
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //Eviter de recharger la page
        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            return; // Arrêter l'exécution si il y a une erreur
        }
        setError(""); // Réinitialiser l'erreur si la validation passe

        try {
            const response = await fetch("http://localhost:3000/submit",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });
            
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    alert(`Succès ! ${JSON.stringify(data)}`);
                } else {
                    const text = await response.text();
                    alert(`Succès ! ${text}`);
                }
            } else {
                alert(`Erreur : Une erreur est survenue`);
            }
        } catch (errorApi) {
            alert(`Erreur de connexion : ${errorApi.message}`);
        }
        console.log("Formulaire envoyé");
        console.log(name);
    }

    function handleChange(e) {
        setName(e.target.value);
        if (error) {
            setError(validateName(e.target.value));
        }
    }

    return (

            <form onSubmit={handleSubmit}>
                <div className="card">
                    <label htmlFor="name">Nom :
                        <input value={name} onChange={handleChange} type="text" />
                    </label>
                    {error && <p style={{color: "red" }}>{error}</p> }
                </div>
                <div className="card">
                    <label htmlFor="email">Email :
                        <input value={email} onChange={e=> setEmail(e.target.value)} type={"email"} />
                    </label>
                </div>
                <div className="card">
                    <label htmlFor={"password"}>Mot de passe :
                        <input value={password} onChange={e=>setPassword(e.target.value)} type={"password"} />
                    </label>
                </div>

                <button type={"submit"}>Envoyer</button>
            </form>
        );

}
export default ContactForm;