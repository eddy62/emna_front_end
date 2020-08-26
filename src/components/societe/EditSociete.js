// import React, { useState, useEffect } from 'react';
// import { useHistory, useParams, Link } from 'react-router-dom';
// import Select from "react-select";
// import moment from "moment";

// import axios from "axios";


// const EditSociete = () => {

//     let history = useHistory();
//     const { id } = useParams();
//     const [user, setUser] = useState({

//         //informations générales
//         nom: "",
//         prenom:"",
//         login: "",
//         email: "",
//         role: "ROLE_SOCIETE",
//         langue: "",
//         active: false,
//         civilite: "",
//         telephone: "",
//         creePar: "Admin",
//         dateDeCreation: moment().format("DD-MM-YYYY hh:mm:ss"),


//         // Adresse
//         numeroDeRue: "",
//         codePostal: "",
//         nomDeRue: "",
//         ville: "",
        
//         //informations professionnel
//         emailPro: "",
//         siren: "",
//         siret: "",
//         domaineDActivite: "",
//         debutDActivite: "",
//         formeJuridique: "",
//         raisonSociale: "",
//         fax: "",
//         description: ""
//     });

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         await axios.put("http://localhost:3002/users/" + id, user)
//         history.push("/users")
//     }

//     const { 
//         nom,
//         prenom,
//         login,
//         email,
//         langue,
//         civilite,
//         telephone,
        

//         // Adresse
//         numeroDeRue,
//         codePostal,
//         nomDeRue,
//         ville,
        
//         //informations professionnel
//         emailPro,
//         siren,
//         siret,
//         domaineDActivite,
//         debutDActivite,
//         formeJuridique,
//         raisonSociale,
//         fax,
//         description
//     } = user;

//     const optionsCivilite = [
//         { value: 'Homme', label: 'Homme' },
//         { value: 'Femme', label: 'Femme' },
//         { value: 'Autre', label: 'Autre' },
//       ];

    
//     const optionsDomaineDActivite = [
//         {value : 'Administration, fonction publique', label : 'Administration, fonction publique'}, 
//         {value : 'Agroalimentaire', label : 'Agroalimentaire'},
//         {value : "Artisanat d'art", label : "Artisanat d'art"},
//         {value : 'Associations', label : 'Associations'}, 
//         {value : 'Banques, assurances, services financiers', label : 'Banques, assurances, services financiers'},
//         {value : 'Chimie, plastique, conditionnement', label : 'Chimie, plastique, conditionnement'},
//         {value : 'Commerce de détail, grande distribution', label : 'Commerce de détail, grande distribution'},
//         {value : 'Communication, marketing, information', label : 'Communication, marketing, information'},
//         {value : 'Construction, bâtiment, travaux publics', label : 'Construction, bâtiment, travaux publics'},
//         {value : 'Culture, sports, loisirs', label : 'Culture, sports, loisirs'},
//         {value : 'Energie', label : 'Energie'},
//         {value : 'Enseignement, formation', label : 'Enseignement, formation'},
//         {value : "Environnement, récupération, tri, recyclage, traitement des déchets,matériaux, de l'eau", label : "Environnement, récupération, tri, recyclage, traitement des déchets,matériaux, de l'eau"},
//         {value : 'Equipement, matériel pour activités professionnelles', label : 'Equipement, matériel pour activités professionnelles'},
//         {value : "Fabrication, commerce de gros d'articles destinés à la vente", label : "Fabrication, commerce de gros d'articles destinés à la vente"},
//         {value : 'Gestion, administrationdesentreprisesHôtellerie,restauration,tourisme', label : 'Gestion, administrationdesentreprisesHôtellerie,restauration,tourisme'},
//         {value : 'ImmobilierIndustrie textile', label : 'ImmobilierIndustrie textile'}, 
//         {value : "InformatiqueIngénieurs d'études et de recherche, chercheurs", label : "InformatiqueIngénieurs d'études et de recherche, chercheurs"},
//         {value : 'Logistique, transports', label : 'Logistique, transports'},
//         {value : 'Matériel électrique, électronique, optique', label : 'Matériel électrique, électronique, optique'},
//         {value : 'Mécanique, métallurgie', label : 'Mécanique, métallurgie'},
//         {value : 'Minerais, minéraux, sidérurgie', label : 'Minerais, minéraux, sidérurgie'},
//         {value : 'Professions juridiques', label : 'Professions juridiques'},
//         {value : 'Santé, action sociale', label : 'Santé, action sociale'}, 
//         {value : 'Services aux particuliers, collectivités, entreprises', label : 'Services aux particuliers, collectivités, entreprises'},
//         { value: 'AUTRE', label: 'AUTRE' }
//     ]


//     const optionsLangue = [
//         { value: 'Fr', label: 'Français' },
//         { value: 'An', label: 'Anglais' },
//       ];

    
//     const optionsFormeJuridique = [
//         { value: 'EL', label: 'EL' },
//         { value: 'EIRL', label: 'EIRL' },
//         { value: 'SARL/EURL', label: 'SARL/EURL' },
//         { value: 'SAS/SASU', label: 'SAS/SASU' },
//         { value: 'AUTRE', label: 'AUTRE' }
//       ];

//       const handleChangeFormeJuridique = (formeJuridique) => {
//         setUser({ ...user, formeJuridique: formeJuridique.value})
        
//       };
 
//       const handleChangeCivilite = (civilite) => {
//         setUser({ ...user, civilite: civilite.value})
//       };

//       const handleChangeDomaineDActivite = (domaineDActivite) => {
//         setUser({ ...user, domaineDActivite: domaineDActivite.value})
//         console.log(domaineDActivite.value)
//       };

//       const handleChangeLangue= (langue) => {
//         setUser({ ...user, langue: langue.value})
        
//       };


//     const onInputChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value })

//     }

//     const handleActive = (e) => {
//         setUser({ ...user, active: e.target.checked })

//     }

//     const loadUser = async () => {
//         const result = await axios.get("http://localhost:3002/users/" + id);
//         setUser(result.data)

//     }

//     useEffect(() => {
//         loadUser();
//     }, []);

//     return (
//         <div className="container-fluid">
//             <form onSubmit={e => onSubmit(e)}>

//                 <div className="w-75 mx-auto shadow p-5">

//                 <h2 className="text-center mb-4"><span class="font-weight-bold">Modifiez Une Société</span></h2>

//                     <div className="form-row">
//                         <div className="form-group col-md-12">
//                             <h3 className="mt-3">Informations générales</h3>
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
//                             <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  id="firstName" name="nom" value={nom} onChange={e => onInputChange(e)} required />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLastName"><span class="font-weight-bold"> Prénom </span></label>
//                             <input type="text" className="form-control" id="lastName" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  name="prenom" value={prenom} onChange={e => onInputChange(e)} required />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputEmail"><span class="font-weight-bold"> Email </span></label>
//                             <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => onInputChange(e)} required />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
//                             <input type="text" className="form-control" id="login" name="login" value={login} onChange={e => onInputChange(e)} required />
//                         </div>


//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLangue"><span class="font-weight-bold">Langue </span></label>
//                             <Select
//                                 options={optionsLangue}
//                                 value={langue.value} 
//                                 onChange={handleChangeLangue}
//                                 isSearchable= {true}
//                             />
//                         </div>


//                         <div className="form-group col-md-4">
//                             <label for="inputTelephone"><span class="font-weight-bold"> Téléphone </span></label>
//                             <input type="tel" className="form-control" pattern="[0-9]{10,15}" id="telephone" name="telephone" value={telephone} onChange={e => onInputChange(e)} />
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputCivilite"><span class="font-weight-bold"> Civilité </span></label>
//                             <Select 
//                                 isSearchable= {true}
//                                 options={optionsCivilite}
//                                 value={civilite.value}
//                                 onChange={handleChangeCivilite}
//                             />
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputRole"><span class="font-weight-bold"> Rôle </span></label>
//                             <input type="text" className="form-control" id="role" name="role"  value={user.role.trim() === "ROLE_ACCOUNTABLE" ?  "ROLE_ACCOUNTABLE" : "ROLE_SOCIETE"} />
//                         </div>

                           
//                         <div className="form-group col-md-4 mt-5" >
//                             <div class="form-check">
//                                 <input type="checkbox" class="form-check-input" id="active" checked={user.active} onChange={handleActive} />
//                                 <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
//                             </div>
//                         </div>
                        
                          
//                     </div>


//                     <div className="form-row">
//                     <div className="form-group col-md-12">
//                             <h3 className="mt-3">Adresse</h3> 
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputNumeroDeRue"><span class="font-weight-bold"> Numéro de la rue</span></label>
//                             <input type="text" class="form-control" pattern="[0-9]{1,15}" value={numeroDeRue} onChange={e => onInputChange(e)} name="numeroDeRue" id="numberoDeRue" required ></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputNomDeRue"><span class="font-weight-bold"> Nom de la rue </span></label>
//                             <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç]{2,30}" value={nomDeRue} onChange={e => onInputChange(e)} name="nomDeRue" id="nomDeRue" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputVille"><span class="font-weight-bold"> Ville</span></label>
//                             <input type="text" className="form-control"  pattern="[A-Za-zàâéêèìôùûç]{2,30}" value={ville} onChange={e => onInputChange(e)} name="ville" id="ville" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                                 <label for="inputCodePostal"><span class="font-weight-bold"> Code postal </span></label>
//                                 <input type="text" className="form-control" pattern="[0-9]{5,6}" value={codePostal} onChange={e => onInputChange(e)} name="codePostal" id="codePostal" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                                 <label for="inputFax"><span class="font-weight-bold">Fax</span></label>
//                                 <input type="text" className="form-control" value={fax} onChange={e => onInputChange(e)} name="fax" id="fax" required></input>
//                         </div>
//                     </div>


//                     <div className="form-row">
                    
//                         <div className="form-group col-md-12">
//                             <h3 className="mt-3">Information professionnelle</h3>
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputEmailPro"><span class="font-weight-bold"> Email professionnel </span></label>
//                             <input type="email" class="form-control" value={emailPro} onChange={e => onInputChange(e)} id="emailPro" name="emailPro" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputFormeJuridique"><span class="font-weight-bold"> Forme juridique </span></label>
//                             <Select 
//                                 options={optionsFormeJuridique}
//                                 value={formeJuridique.value}
//                                 onChange={handleChangeFormeJuridique}
//                             />
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputDomaineDActivite"><span class="font-weight-bold"> Domaine d'activité </span></label>
//                             <Select
                                
//                                 options={optionsDomaineDActivite}
//                                 value={domaineDActivite.value}
//                                 onChange={handleChangeDomaineDActivite}
//                                 isSearchable= {true}
//                             />
//                         </div>

//                         <div className="form-group col-md-4">
//                             <label for="inputSiren"><span class="font-weight-bold"> Siren </span></label>
//                             <input type="text" className="form-control"  pattern="[0-9]{9}" value={siren} onChange={e => onInputChange(e)} id="siren" name="siren" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                                 <label for="siret"><span class="font-weight-bold"> Siret </span></label>
//                                 <input type="text" className="form-control"  pattern="[0-9]{14}" value={siret} onChange={e => onInputChange(e)} id="siret" name="siret"></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                                 <label for="inputDebutDActivite"><span class="font-weight-bold"> Début d'activité </span></label>
//                                 <input type="date" className="form-control" value={debutDActivite} onChange={e => onInputChange(e)} id="debutDactivite" name="debutDActivite" required></input>
//                         </div>

//                         <div className="form-group col-md-4">
//                                 <label for="inputRasionSociale"><span class="font-weight-bold"> Raison sociale </span></label>
//                                 <input type="text" className="form-control" value={raisonSociale} pattern="[A-Za-zàâéêèìôùûç]{2,30}" onChange={e => onInputChange(e)} id="raisonSociale" name="raisonSociale" required ></input>
//                         </div>

//                         <div class="form-group col-md-12">
//                              <label for="inputDescription"><span class="font-weight-bold"> Description </span></label>
//                             <textarea class="form-control" rows="5" value={description} pattern="[A-Za-zàâéêèìôùûç0-9]{4, 2000}" onChange={e => onInputChange(e)} id="description" name="description" ></textarea>
//                         </div> 
//                         </div>

//                         <Link className="btn btn-outline-danger" to="/users/stau">Annulez</Link>
//                       <button type="submit" href="/users" className="btn btn-primary"> Modifiez </button>

//                     </div>         
//             </form>
//         </div>

//     )
// }

// export default EditSociete;


import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Select from "react-select";
import AxiosCenter from '../../shared/services/AxiosCenter';



const EditSociete = () => {

    let history = useHistory();
    const { id } = useParams();

        const [user, setUser] = useState({

        //informations générales
        activated: false,
        authorities: [
            "ROLE_SOCIETY"
        ],
        createdBy: "ADMIN",
        createdDate: "",
        email: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
        langKey: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        login: "",
        civilite: "",

        // Adresse
        numeroRue: "",
        codePostal: "",
        nomRue: "",
        ville: "",
        boitePostale: "",
        pays: "",

        //informations professionnel
        emailPro: "",
        siren: "",
        siret: "",
        domaineDactivite: "",
        dateDeCreation: "",
        formeJuridique: "",
        raisonSociale: "",
        fax: "",
        description: "",
        telephone: "",


    });

 
    const {

        //informations generales
        email,
        firstName,
        lastName,
        langKey,
        login,
        civilite,
     
        // Adresse
        numeroRue,
        codePostal,
        nomRue,
        ville,
        pays,


        //informations professionnel
        emailPro,
        siren,
        siret,
        domaineDactivite,
        dateDeCreation,
        formeJuridique,
        raisonSociale,
        fax,
        description,
        telephone,

    } = user;


    const optionsCivilite = [
        { value: 'Homme', label: 'Homme' },
        { value: 'Femme', label: 'Femme' },
        { value: 'Autre', label: 'Autre' },
      ];

    
    const optionsDomaineDActivite = [
        {value : 'Administration, fonction publique', label : 'Administration, fonction publique'}, 
        {value : 'Agroalimentaire', label : 'Agroalimentaire'},
        {value : "Artisanat d'art", label : "Artisanat d'art"},
        {value : 'Associations', label : 'Associations'}, 
        {value : 'Banques, assurances, services financiers', label : 'Banques, assurances, services financiers'},
        {value : 'Chimie, plastique, conditionnement', label : 'Chimie, plastique, conditionnement'},
        {value : 'Commerce de détail, grande distribution', label : 'Commerce de détail, grande distribution'},
        {value : 'Communication, marketing, information', label : 'Communication, marketing, information'},
        {value : 'Construction, bâtiment, travaux publics', label : 'Construction, bâtiment, travaux publics'},
        {value : 'Culture, sports, loisirs', label : 'Culture, sports, loisirs'},
        {value : 'Energie', label : 'Energie'},
        {value : 'Enseignement, formation', label : 'Enseignement, formation'},
        {value : "Environnement, récupération, tri, recyclage, traitement des déchets,matériaux, de l'eau", label : "Environnement, récupération, tri, recyclage, traitement des déchets,matériaux, de l'eau"},
        {value : 'Equipement, matériel pour activités professionnelles', label : 'Equipement, matériel pour activités professionnelles'},
        {value : "Fabrication, commerce de gros d'articles destinés à la vente", label : "Fabrication, commerce de gros d'articles destinés à la vente"},
        {value : 'Gestion, administrationdesentreprisesHôtellerie,restauration,tourisme', label : 'Gestion, administrationdesentreprisesHôtellerie,restauration,tourisme'},
        {value : 'ImmobilierIndustrie textile', label : 'ImmobilierIndustrie textile'}, 
        {value : "InformatiqueIngénieurs d'études et de recherche, chercheurs", label : "InformatiqueIngénieurs d'études et de recherche, chercheurs"},
        {value : 'Logistique, transports', label : 'Logistique, transports'},
        {value : 'Matériel électrique, électronique, optique', label : 'Matériel électrique, électronique, optique'},
        {value : 'Mécanique, métallurgie', label : 'Mécanique, métallurgie'},
        {value : 'Minerais, minéraux, sidérurgie', label : 'Minerais, minéraux, sidérurgie'},
        {value : 'Professions juridiques', label : 'Professions juridiques'},
        {value : 'Santé, action sociale', label : 'Santé, action sociale'}, 
        {value : 'Services aux particuliers, collectivités, entreprises', label : 'Services aux particuliers, collectivités, entreprises'},
        { value: 'AUTRE', label: 'AUTRE' }
    ]


    const optionsLangue = [
        { value: 'Fr', label: 'Français' },
        { value: 'An', label: 'Anglais' },
        { value: 'ar-ly', label: 'العربية' }
      ];

    
    const optionsFormeJuridique = [
        { value: 'EL', label: 'EL' },
        { value: 'EIRL', label: 'EIRL' },
        { value: 'SARL/EURL', label: 'SARL/EURL' },
        { value: 'SAS/SASU', label: 'SAS/SASU' },
        { value: 'AUTRE', label: 'AUTRE' }
      ];


    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleChangeFormeJuridique = (formeJuridique) => {
        setUser({ ...user, formeJuridique: formeJuridique.value })

    };

    const handleChangeCivilite = (civilite) => {
        setUser({ ...user, civilite: civilite.value })
    };

    const handleChangeDomaineDActivite = (domaineDactivite) => {
        setUser({ ...user, domaineDactivite: domaineDactivite.value })
    };

    const handleChangeLangue = (langKey) => {
        setUser({ ...user, langKey: langKey.value })

    };

    const handleActive = (e) => {
        setUser({ ...user, activated: e.target.checked })

    }

    useEffect(() => {
        loadUser();
        getSocieteID(id)
      
    }, [])


    //methode to find comptable by user before calling! Otherwise it'll show only the user.
    const getSocieteID = async (id) => {
        const result =  await AxiosCenter.getSocietyByUserId(id)
        return result.data;
    }
   
    const loadUser= () => {
        const societeId = getSocieteID(id).then( async (res) => {
            const result = await AxiosCenter.getSociete(res.id)
            setUser(result.data)
        });   
    }


    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(user)
            await AxiosCenter.editSociete(user);
            if(user.activated){
                history.push("/users/stvu/societes/active")
            }
            else{
                history.push("/users/stvu/societes/desactive")
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="container-fluid">
            <form onSubmit={e => onSubmit(e)}>

            <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4"><span class="font-weight-bold">Modifier Une Société</span></h2>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <h3 className="mt-3">Informations générales</h3>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  id="lastName" name="lastName" value={lastName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span class="font-weight-bold">Prénom</span></label>
                            <input type="text" className="form-control" id="firstNmae" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"  name="firstName" value={firstName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail"><span class="font-weight-bold"> Email</span></label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
                            <input type="text" className="form-control" id="login" name="login" value={login} onChange={e => onInputChange(e)} required />
                        </div>


                        <div className="form-group col-md-6">
                            <label htmlFor="inputLangue"><span class="font-weight-bold">Langue</span></label>
                            <Select
                                options={optionsLangue}
                                value={langKey.value} 
                                onChange={handleChangeLangue}
                                isSearchable= {true}
                            />
                        </div>



                        <div className="form-group col-md-4">
                            <label for="inputTelephone"><span class="font-weight-bold"> Téléphone </span></label>
                            <input type="tel" className="form-control" pattern="[0-9]{10,15}" id="telephone" name="telephone" value={telephone} onChange={e => onInputChange(e)} />
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputCivilite"><span class="font-weight-bold"> Civilité </span></label>
                            <Select
                                isSearchable={true}
                                options={optionsCivilite}
                                value={civilite.value}
                                onChange={handleChangeCivilite}
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputRole"><span class="font-weight-bold"> Rôle </span></label>
                            <input type="text" className="form-control" id="role" name="role" value="ROLE_SOCIETY" />
                        </div>


                        <div className="form-group col-md-4 mt-5" >
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="active" checked={user.activated} onChange={handleActive} />
                                <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
                            </div>
                        </div>


                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <h3 className="mt-3">Adresse</h3>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputNumeroDeRue"><span class="font-weight-bold"> Numéro de la rue</span></label>
                            <input type="text" class="form-control" pattern="[0-9]{1,15}" value={numeroRue} onChange={e => onInputChange(e)} name="numeroRue" id="numeroRue" required ></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputNomDeRue"><span class="font-weight-bold"> Nom de la rue </span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç]{2,30}" value={nomRue} onChange={e => onInputChange(e)} name="nomRue" id="nomRue" required></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputVille"><span class="font-weight-bold"> Ville</span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç]{2,30}" value={ville} onChange={e => onInputChange(e)} name="ville" id="ville" required></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputPays"><span class="font-weight-bold"> Pays</span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç]{2,30}" value={pays} onChange={e => onInputChange(e)} name="pays" id="pays" required></input>
                        </div>
                        
                        <div className="form-group col-md-4">
                            <label for="inputCodePostal"><span class="font-weight-bold"> Code postal </span></label>
                            <input type="text" className="form-control" pattern="[0-9]{5,6}" value={codePostal} onChange={e => onInputChange(e)} name="codePostal" id="codePostal" required></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputFax"><span class="font-weight-bold">Fax</span></label>
                            <input type="text" className="form-control" value={fax} onChange={e => onInputChange(e)} name="fax" id="fax" required></input>
                        </div>
                    </div>


                    <div className="form-row">

                        <div className="form-group col-md-12">
                            <h3 className="mt-3">Information professionnelle</h3>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputEmailPro"><span class="font-weight-bold"> Email professionnel </span></label>
                            <input type="email" class="form-control" value={emailPro} onChange={e => onInputChange(e)} id="emailPro" name="emailPro" required></input>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputFormeJuridique"><span class="font-weight-bold"> Forme juridique </span></label>
                            <Select
                                options={optionsFormeJuridique}
                                value={formeJuridique.value}
                                onChange={handleChangeFormeJuridique}
                            />

                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputDomaineDActivite"><span class="font-weight-bold"> Domaine d'activité </span></label>
                            <Select

                                options={optionsDomaineDActivite}
                                value={domaineDactivite.value}
                                onChange={handleChangeDomaineDActivite}
                                isSearchable={true}
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputSiren"><span class="font-weight-bold"> Siren </span></label>
                            <input type="text" className="form-control" pattern="[0-9]{9}" value={siren} onChange={e => onInputChange(e)} id="siren" name="siren" required></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="siret"><span class="font-weight-bold"> Siret </span></label>
                            <input type="text" className="form-control" pattern="[0-9]{14}" value={siret} onChange={e => onInputChange(e)} id="siret" name="siret"></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputDebutDActivite"><span class="font-weight-bold"> Début d'activité </span></label>
                            <input type="date" className="form-control" value={dateDeCreation} onChange={e => onInputChange(e)} id="dateDeCreation" name="dateDeCreation" required></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label for="inputRasionSociale"><span class="font-weight-bold"> Raison sociale </span></label>
                            <input type="text" className="form-control" value={raisonSociale} pattern="[A-Za-zàâéêèìôùûç]{2,30}" onChange={e => onInputChange(e)} id="raisonSociale" name="raisonSociale" required ></input>
                        </div>

                        <div class="form-group col-md-12">
                            <label for="inputDescription"><span class="font-weight-bold"> Description </span></label>
                            <textarea class="form-control" rows="5" value={description} pattern="[A-Za-zàâéêèìôùûç0-9]{4, 2000}" onChange={e => onInputChange(e)} id="description" name="description" ></textarea>
                        </div>
                    </div>

                    
                    <Link className="btn btn-outline-danger" to="/users/stvu/societes">Annulez</Link>
                    <button type="submit" href={user.activated ? "/users/stvu/societes/active" : "/users/stvu/societes/desactive"} className="btn btn-success"> Modifiez </button>

                </div>
            </form>
        </div>

    )
}

export default EditSociete;