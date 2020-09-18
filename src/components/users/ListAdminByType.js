import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../pages/Pagination";
import Swal from "sweetalert2";
import AxiosCenter from "../../shared/services/AxiosCenter";

const ListAdminByType = (props) => {

    const [users, setUser] = useState([]);
    //for the pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(50);


    useEffect(() => {
        loadUsers();
        //for the pagination
        setLoading(false);

    }, [])

    const loadUsers = async () => {
        try {
            const result = await AxiosCenter.getAllUsers();
            setUser(result.data);
        } catch (err) {
            console.log(err)
        }
    };

    console.log("Allusers : ", users)


    //Handle activation
    //debut desactivation utilisateur
    const isActivePage = (props.location.pathname.trim() === "/users/stvu/admins/active");
    const handleDesactiveUser = (id) => {
        Swal.fire({
            title: 'Êtes vous sûr ??',
            text: "Cet utilisateur sera désactivé!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, désactiver'
        }).then((result) => {
            if (result.value) {
                desactiveUser(id);
            }
        })
    }

    const desactiveUser = async (id) => {
        try {
            const user = users.filter(user => user.id === id);
            user[0].activated = false;
            await AxiosCenter.editUser(user[0]);
            loadUsers();
        } catch (err) {
            console.log(err)
        }
    }
    //fin desactivation utilisateur


    //debut activation utilisateur
    const isDesctivePage = (props.location.pathname.trim() === "/users/stvu/admins/desactive");
    const handleActiveUser = (id) => {
        Swal.fire({
            title: 'Êtes vous sûr ??',
            text: "Cet utilisateur sera activé!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, activer'
        }).then((result) => {
            if (result.value) {
                activeUser(id);
            }
        })
    }

    const activeUser = async (id) => {
        try {
            const user = users.filter(user => user.id === id);
            user[0].activated = true;
            await AxiosCenter.editUser(user[0]);
            loadUsers();
        } catch (err) {
            console.log(err)
        }
    }
    //fin activation utilisateur



    // const handleDeleteUser = (login) => {
    //     Swal.fire({
    //         title: 'Êtes vous sûr ??',
    //         text: "Cet utilisateur ne sera pas récuperable!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Oui, supprimer!'
    //     }).then((result) => {
    //         if (result.value) {
    //             deleteUser(login);
    //         }
    //     })
    // }

    // const deleteUser = async (login) => {
    //     try{
    //         await AxiosCenter.deleteUser(login);
    //         loadUsers();
    //     }catch(err) {
    //         console.log(err)
    //     }

    // }

    const goBack = () => {
        window.history.back();
    }

    // for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currrentPosts = users.slice(indexOfFirstPost, indexOfLastPost)

    //for pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    let toShow = null;
    if (props.location.pathname.trim() === "/users/stvu/admins/active") {
        toShow = true;
    } else if (props.location.pathname.trim() === "/users/stvu/admins/desactive") {
        toShow = false;
    } else if (props.location.pathname.trim() === "/users/stvu/admins/all") {
        toShow = "all";
    }

    let activeAdmins = [];
    if (toShow != null) {
        activeAdmins = currrentPosts.filter(admin => (admin.activated === toShow) && (admin.authorities[0] === "ROLE_ADMIN"));

    }
    if (toShow === "all") {
        activeAdmins = currrentPosts.filter(admin => admin.authorities[0] === "ROLE_ADMIN")
    }


    return (
        <div className="container">
            <div className="py-4">
                <div className="containe" r>
                    <div className="row">
                        <div className="col-12 shadow-sm p-3 mb-2 bg-white rounded">
                            <span><h1  >{isActivePage ? "Admins Activés" : isDesctivePage ? "Admins Desactivés" : "Tous Les Admins"}</h1></span>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-9">
                            <form className="form-inline mr-center">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-primary btn-rounded btn-sm my-3" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="col-3">
                            <Link to="/users/stvu/admins" className="btn btn-primary ml-5" >Accueil Admins</Link>
                        </div>
                    </div>

                </div>


                <table className="table border shadow" >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeAdmins.map((user, index) => (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.authorities[0]}</td>
                                    <td>
                                        <Link class="btn btn-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/view/comptable/${user.id}` :
                                            (user.authorities[0] + "").trim() === "ROLE_SOCIETY".trim() ? `/users/view/societe/${user.id}`
                                                : `/users/view/${user.id}`} > Détails</Link>
                                        <Link class="btn btn-outline-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/edit/comptable/${user.id}`
                                            : (user.authorities[0] + "").trim() === "ROLE_SOCIETY".trim() ? `/users/edit/societe/${user.id}`
                                                : `/users/edit/${user.id}`} >Modifier</Link>
                                        <Link class={isActivePage ? "btn btn-danger  btn-md center-block" : isDesctivePage ? "btn btn-success  btn-md center-block" : user.activated ? "btn btn-danger  btn-md px-3 center-block" : "btn btn-success  btn-md px-4 center-block"}
                                            onClick={isActivePage ? () => handleDesactiveUser(user.id) : isDesctivePage ? () => handleActiveUser(user.id) : user.activated ? () => handleDesactiveUser(user.id) : () => handleActiveUser(user.id)} >{isActivePage ? "Désactiver" : isDesctivePage ? "Activer" : user.activated ? "Désactiver" : "Activer"}</Link>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                    <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} />
                </table>
                <button className="btn btn-outline-success mt-5" onClick={goBack}>Retourner </button>

                <div>
                </div>
            </div>
        </div>
    );


}

export default ListAdminByType;






/*


  const [users, setUser] = useState([]);

    //for the pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(20);


    useEffect(() => {
        loadUsers();
        //for the pagination
        setLoading(false);

    }, [])

    const loadUsers = async () => {
        try{
            const result = await AxiosCenter.getAllUsers();
            setUser(result.data);
        } catch(err){
            console.log(err)
        }

    };

    const handleDeleteUser = (login) => {
        Swal.fire({
            title: 'Êtes vous sûr ??',
            text: "Cet utilisateur ne sera pas récuperable!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then((result) => {
            if (result.value) {
                deleteUser(login);
            }
        })
    }

    const deleteUser = async (login) => {
        try{
            await AxiosCenter.deleteUser(login);
            loadUsers();
        }catch(err) {
            console.log(err)
        }

    }

    const goBack = () => {
        window.history.back();
      }

    // for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currrentPosts = users.slice(indexOfFirstPost, indexOfLastPost)

    //for pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    let toShow = null;
    if(props.location.pathname.trim() === "/users/stvu/admins/active"){
        toShow = true;
    }else if(props.location.pathname.trim() === "/users/stvu/admins/desactive"){
        toShow = false;
    }else if(props.location.pathname.trim() === "/users/stvu/admins/all"){
        toShow = "all";
    }

    let activeAdmins = [];
    if(toShow != null){
        activeAdmins = currrentPosts.filter(admin => (admin.activated == toShow)  && (admin.authorities[0] === "ROLE_ADMIN"));

    }
    if(toShow === "all") {
        activeAdmins = currrentPosts.filter(admin => admin.authorities[0] === "ROLE_ADMIN")
    }


    return (
        <div className="container">
            <div className="py-4">
                <div className="container py-4">

                    <div className="row">
                        <div className="col mt-3">
                            <h3>Groupez par rôle </h3>
                        </div>

                        <div className="col-6">
                            <form className="form-inline mr-center">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-primary btn-rounded btn-sm my-3" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="col-0">
                            <Link to="/users/stau" className="btn btn-success" >Ajoutez Un Utilisateur</Link>
                        </div>
                    </div>

                </div>


                <table className="table border shadow" >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeAdmins.map((user, index) => (
                                <tr>
                                     <th scope="row">{user.id}</th>
                                     <td>{user.lastName}</td>
                                     <td>{user.firstName}</td>
                                     <td>{user.email}</td>
                                     <td>{user.authorities[0]}</td>
                                     <td>
                                         <Link class="btn btn-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/view/comptable/${user.id}` :
                                             (user.authorities[0] + "").trim() === "ROLE_SOCIETY".trim() ? `/users/view/societe/${user.id}`
                                                 : `/users/view/${user.id}`} > Détails</Link>
                                         <Link class="btn btn-outline-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/edit/comptable/${user.id}`
                                             : (user.authorities[0] + "").trim() === "ROLE_SOCIETY".trim() ? `/users/edit/societe/${user.id}`
                                                 : `/users/edit/${user.id}`} >Modifier</Link>
                                         <Link class="btn btn-danger  btn-md center-block" onClick={() => handleDeleteUser(user.login)} >Supprimer</Link>

                                     </td>

                                </tr>
                            ))
                        }

                    </tbody>
                    <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} />
                </table>
                <button className="btn btn-outline-success mt-5" onClick={goBack}>Retourner </button>

                <div>
                </div>
            </div>
        </div>
    );

*/
