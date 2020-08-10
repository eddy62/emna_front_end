import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../pages/Pagination";
import Swal from "sweetalert2";
import AxiosCenter from "../../shared/services/AxiosCenter";
const Users = () => {

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

    // for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currrentPosts = users.slice(indexOfFirstPost, indexOfLastPost)

    //for pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    

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
                            currrentPosts.map((user, index) => (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.authorities[0]}</td>
                                    <td>
                                        <Link class="btn btn-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/view/comptable/${user.id}` :
                                            (user.authorities[0] + "").trim() === "ROLE_SOCIETE".trim() ? `/users/view/societe/${user.id}`
                                                : `/users/view/${user.id}`} > Détails</Link>
                                        <Link class="btn btn-outline-primary mr-2 btn-md center-block" to={(user.authorities[0] + "").trim() === "ROLE_ACCOUNTANT".trim() ? `/users/edit/comptable/${user.id}`
                                            : (user.authorities[0] + "").trim() === "ROLE_SOCIETE".trim() ? `/users/edit/societe/${user.id}`
                                                : `/users/edit/${user.id}`} >Modifier</Link>
                                        <Link class="btn btn-danger  btn-md center-block" onClick={() => handleDeleteUser(user.login)} >Supprimer</Link>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <Pagination postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} />
                </table>



                <div>
                </div>
            </div>
        </div>
    );
}

export default Users;
