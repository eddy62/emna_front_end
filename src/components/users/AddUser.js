import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Select from 'react-select';
import AxiosCenter from '../../shared/services/AxiosCenter';


const AddUser = () => {

    let history = useHistory();
    const [user, setUser] = useState({
        activated: false,
        authorities: [
            "ROLE_ADMIN"
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
        login: ""


    });

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleActive = (e) => {
        setUser({ ...user, activated: e.target.checked })

    }

    let emailTaken = "";
    let loginTaken = "";

    const onSubmit = async (e) => {
      
            e.preventDefault();
            await AxiosCenter.addUser(user).catch(function (error) {
                if (error.response) {
                    if(error.response.data.title === "Email is already in use!"){
                       console.log("Email est déja pris!")
                    }
                    if(error.response.data.title === "Login name already used!"){
                       console.log("Login est déja pris!")
                    }
                }else{
                    history.push("/users")
                }
            })
        
    }

   
    const optionsLangue = [
        { value: 'Fr', label: 'Français' },
        { value: 'An', label: 'Anglais' },
        { value: 'ar-ly', label: 'العربية' }
    ];
    const handleChangeLangue = (langKey) => {
        setUser({ ...user, langKey: langKey.value })

    };

  
    const { firstName, lastName, login, email, langKey } = user;
    return (
        <div className="container-fluid">
            <form onSubmit={e => onSubmit(e)}>

                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4"><span class="font-weight-bold">Ajoutez Un Admin</span></h2>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <h3 className="mt-3">Informations générales</h3>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
                            <input type="text" className="form-control" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}" title="Le nom ne doit contenir que des letters et ne peut pas être un seul lettre." id="lastName" name="lastName" value={lastName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span class="font-weight-bold">Prénom</span></label>
                            <input type="text" className="form-control" id="firstNmae" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}" title="Le prénom ne doit contenir que des letters et ne peut pas être un seul lettre." name="firstName" value={firstName} onChange={e => onInputChange(e)} required />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail"><span class="font-weight-bold"> Email</span></label>
                            <input type="email" className="form-control" id="email" title="Entrez un Email valide SVP!" name="email" value={email} onChange={e => onInputChange(e)} required />
                         
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
                                isSearchable={true}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputRole"><span class="font-weight-bold">Rôle</span></label>
                            <input type="text" className="form-control" id="role" name="role" value="ROLE_ADMIN" />
                        </div>

                        <div className="form-group col-md-4 mt-5" >
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="active" checked={user.activated} onChange={handleActive} />
                                <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
                            </div>
                        </div>

                    </div>
                    <Link className="btn btn-outline-danger" to="/users/stau">Annulez</Link>
                    <button type="submit" href="/users" className="btn btn-primary"> Créez </button>

                </div>
            </form>
        </div>

    )
}

export default AddUser;


























































































// import React, { useState } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import Select from 'react-select';
// import AxiosCenter from '../../shared/services/AxiosCenter';
// import { useFormik } from "formik";
// import * as Yup from "yup";


// const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     login: "",
// }

// const onSubmit = values => {
//     console.log('Form data', values)
// }

// const validationSchema = Yup.object({
//     firstName: Yup.string().required('Required')
//         .min(2, "Trop court!")
//         .max(15, "Trop long!"),
//     lastName: Yup.string().required('Required')
//         .min(2, "Trop court!")
//         .max(15, "Trop long!"),
//     email: Yup.string()
//         .email('Invalid email format')
//         .required('Required'),
//     login: Yup.string().required('Required')
// })



// const AddUser = () => {

//     let history = useHistory();
//     const [user, setUser] = useState({
//         activated: false,
//         authorities: [
//             "ROLE_ADMIN"
//         ],
//         createdBy: "ADMIN",
//         createdDate: "",
//         email: "",
//         firstName: "",
//         lastName: "",
//         imageUrl: "",
//         langKey: "",
//         lastModifiedBy: "",
//         lastModifiedDate: "",
//         login: ""


//     });



//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         validationSchema
//     })

//     console.log('formik.touched', formik.values)




//     const onInputChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value })
//     }

//     const handleActive = (e) => {
//         setUser({ ...user, activated: e.target.checked })

//     }

//     // const onSubmit = async (e) => {
//     //     try {
//     //         e.preventDefault();
//     //         await AxiosCenter.addUser(user);
//     //         history.push("/users")
//     //     } catch (err) {
//     //         console.log(err)
//     //         console.log("user : ")
//     //         console.log(user)
//     //     }

//     // }



//     const optionsLangue = [
//         { value: 'Fr', label: 'Français' },
//         { value: 'An', label: 'Anglais' },
//         { value: 'ar-ly', label: 'العربية' }
//     ];
//     const handleChangeLangue = (langKey) => {
//         setUser({ ...user, langKey: langKey.value })

//     };
//     const { firstName, lastName, login, email, langKey } = user;





//     return (
//         <div className="container-fluid">
//             <form onSubmit={formik.handleSubmit}>

//                 <div className="w-75 mx-auto shadow p-5">
//                     <h2 className="text-center mb-4"><span class="font-weight-bold">Ajoutez Un Admin</span></h2>

//                     <div className="form-row">
//                         <div className="form-group col-md-12">
//                             <h3 className="mt-3">Informations générales</h3>
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputFirstName"><span class="font-weight-bold"> Nom </span></label>
//                             <input type="text"
//                                 className="form-control"
//                                 pattern="[A-Za-zàâéêèìôùûç\s]{2,35}"
//                                 title="Le nom ne doit contenir que des letters et ne peut pas être un seul lettre."
//                                 id="lastName"
//                                 name="lastName"
//                                 value={formik.values.lastName} onChange={formik.onChange} />
//                             {formik.touched.lastName
//                                 && formik.errors.lastName
//                                 ? (<div>{formik.errors.lastName}</div>) : null}
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLastName"><span class="font-weight-bold">Prénom</span></label>
//                             <input type="text" className="form-control" id="firstNmae" pattern="[A-Za-zàâéêèìôùûç\s]{2,35}" title="Le prénom ne doit contenir que des letters et ne peut pas être un seul lettre." name="firstName" value={formik.values.lastName} onChange={formik.onChange} />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputEmail"><span class="font-weight-bold"> Email</span></label>
//                             <input type="email" className="form-control" id="email" title="Entrez un Email valide SVP!" name="email" value={formik.values.lastName} onChange={formik.onChange} />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLogin"><span class="font-weight-bold"> Login </span></label>
//                             <input type="text" className="form-control" id="login" name="login" value={formik.values.lastName} onChange={formik.onChange} />
//                         </div>


//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLangue"><span class="font-weight-bold">Langue</span></label>
//                             <Select
//                                 options={optionsLangue}
//                                 value={langKey.value}
//                                 onChange={handleChangeLangue}
//                                 isSearchable={true}
//                             />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputRole"><span class="font-weight-bold">Rôle</span></label>
//                             <input type="text" className="form-control" id="role" name="role" value="ROLE_ADMIN" />
//                         </div>

//                         <div className="form-group col-md-4 mt-5" >
//                             <div class="form-check">
//                                 <input type="checkbox" class="form-check-input" id="active" checked={user.activated} onChange={handleActive} />
//                                 <label class="form-check-label" htmlFor="active"><span class="font-weight-bold"> Activé</span></label>
//                             </div>
//                         </div>

//                     </div>
//                     <Link className="btn btn-outline-danger" to="/users/stau">Annulez</Link>
//                     <button type="submit" href="/users" className="btn btn-primary"> Créez </button>

//                 </div>
//             </form>
//         </div>

//     )
// }

// export default AddUser;


// import React, { useState } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import Select from 'react-select';
// import AxiosCenter from '../../shared/services/AxiosCenter';
// import { useFormik } from "formik";
// import * as Yup from "yup";


// const initialValues = {
//     activated: false,
//     authorities: [
//         "ROLE_ADMIN"
//     ],
//     createdBy: "ADMIN",
//     createdDate: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     imageUrl: "",
//     langKey: "",
//     lastModifiedBy: "",
//     lastModifiedDate: "",
//     login: ""
// }



// const validationSchema = Yup.object({
//     firstName: Yup.string()
//         .required('Obligatoire')
//         .min(2, "Trop court!")
//         .max(30, "Trop long!")
//         .matches(/^[A-Za-zàâéêèìôùûç -]{1,30}$/i, "Un prénom ne doit contenir que des lettres ou [-] et des spaces.")
//     ,
//     lastName: Yup.string().required('Obligatoire')
//         .min(2, "Trop court!")
//         .max(15, "Trop long!")
//         .matches(/^[A-Za-zàâéêèìôùûç -]{1,30}$/i, "Un nom ne doit contenir que des lettres ou [-] et des spaces.")
//     ,
//     email: Yup.string()
//         .email('Format E-mail ne pas valide')
//         .required('Obligatoire'),
//     login: Yup.string().required('Obligatoire'),
// })


// function AddUser() {


//     let history = useHistory();
//     const [user, setUser] = useState({
//         activated: false,
//         authorities: [
//             "ROLE_ADMIN"
//         ],
//         createdBy: "ADMIN",
//         createdDate: "",
//         email: "",
//         firstName: "",
//         lastName: "",
//         imageUrl: "",
//         langKey: "",
//         lastModifiedBy: "",
//         lastModifiedDate: "",
//         login: ""


//     });


//     const { langKey } = user;

//     const onSubmit = async (values,e)=> {
//         user.firstName = values.firstName;
//         user.lastName = values.lastName;
//         user.login = values.login;
//         user.email = values.email;

//         try {
//             e.preventDefault();
//             await AxiosCenter.addUser(user);
//             history.push("/users")
//         } catch (err) {
//             console.log(err)
//             console.log("user : ")
//             console.log(user)
//         }
//         console.log("The user pushed : ", user)

//     }

//     const formik = useFormik({
//         initialValues,
//         validationSchema
//     })


//     const onInputChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value })
//     }

//     const handleActive = (e) => {
//         setUser({ ...user, activated: e.target.checked })

//     }





//     const optionsLangue = [
//         { value: 'Fr', label: 'Français' },
//         { value: 'An', label: 'Anglais' },
//         { value: 'ar-ly', label: 'العربية' }
//     ];
//     const handleChangeLangue = (langKey) => {
//         setUser({ ...user, langKey: langKey.value })

//     };



//     return (

//         <div className="container-fluid">
//             <form onSubmit={e => onSubmit(e,formik.values)}>
//                 <div className="w-75 mx-auto shadow p-5">
//                     <h2 className="text-center mb-4"><span className="font-weight-bold">Ajoutez Un Admin</span></h2>

//                     <div className="form-row">

//                         <div className="form-group col-md-12">
//                             <h3 className="mt-3">Informations générales</h3>
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputFirstName"><span className="font-weight-bold"> Nom </span></label>
//                             <input
//                                 type='text'
//                                 id='lastName'
//                                 name='lastName'
//                                 className="form-control"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.lastName}
//                             />
//                             {formik.touched.lastName && formik.errors.lastName ? (
//                                 <div className='error' style={{ color: 'red' }}>{formik.errors.lastName}</div>
//                             ) : null}
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputFirstName"><span className="font-weight-bold"> Prénom </span></label>

//                             <input
//                                 type='text'
//                                 id='firstName'
//                                 name='firstName'
//                                 className="form-control"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.firstName}
//                             />
//                             {formik.touched.firstName && formik.errors.firstName ? (
//                                 <div className='error' style={{ color: 'red' }}>{formik.errors.firstName}</div>
//                             ) : null}
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputFirstName"><span className="font-weight-bold"> Email </span></label>
//                             <input
//                                 type='email'
//                                 id='email'
//                                 name='email'
//                                 className="form-control"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.email}
//                             />
//                             {formik.touched.email && formik.errors.email ? (
//                                 <div className='error' style={{ color: 'red' }}>{formik.errors.email}</div>
//                             ) : null}

//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLogin"><span className="font-weight-bold"> Login </span></label>
//                             <input
//                                 type='text'
//                                 id='login'
//                                 name='login'
//                                 className="form-control"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.login}
//                             />
//                             {formik.touched.login && formik.errors.login ? (
//                                 <div className='error' style={{ color: 'red' }} >{formik.errors.login}</div>
//                             ) : null}
//                         </div>


//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputLangue"><span className="font-weight-bold">Langue</span></label>
//                             <Select
//                                 options={optionsLangue}
//                                 value={langKey.value}
//                                 onChange={handleChangeLangue}
//                                 isSearchable={true}
//                             />
//                         </div>

//                         <div className="form-group col-md-6">
//                             <label htmlFor="inputRole"><span className="font-weight-bold">Rôle</span></label>
//                             <input type="text" className="form-control" id="role" name="role" value="ROLE_ADMIN" />
//                         </div>

//                         <div className="form-group col-md-4 mt-5" >
//                             <div className="form-check">
//                                 <input type="checkbox" className="form-check-input" id="active" checked={user.activated} onChange={handleActive} />
//                                 <label className="form-check-label" htmlFor="active"><span className="font-weight-bold"> Activé</span></label>
//                             </div>
//                         </div>

//                     </div>

//                     <Link className="btn btn-outline-danger" to="/users/stau">Annulez</Link>
//                     <button type="submit" href="/users" className="btn btn-primary"> Créez </button>


//                 </div>
//             </form>
//         </div>

//     )
// }

// export default AddUser