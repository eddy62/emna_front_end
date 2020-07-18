import ApiBackEnd from './../config/ApiBackEnd';


const AxiosCenter = {

    authenticate(values){
        
    },

    getCurrentUser(){
        return ApiBackEnd({
                method: 'get',
                url: '/account',
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