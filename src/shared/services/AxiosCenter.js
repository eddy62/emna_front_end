import ApiBackEnd from './../config/ApiBackEnd';


const AxiosCenter = {

    authenticate(values) {

    },

    getCurrentUser() {
        return ApiBackEnd({
            method: 'get',
            url: '/account',
        })

    },
    getClientFournisseur() {
        return ApiBackEnd({
            method: 'get',
            url: '/client-fournisseurs',
        })

    },

    createClientFournisseur(values) {
        return ApiBackEnd({
            method: 'post',
            url: '/client-fournisseurs/new',
            data: values,

        })

    },



}

export default AxiosCenter;

/*

AxiosCenter.getCurrentUser().then(response => {
    response ........
}).catch(error => {
    //error.........
})



*/