import * as axios from 'axios';

export default class ContratService {
    static getContrat(id) {
        return axios.get('http://localhost:8080/api/contrats/employer/' + id,
            {
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=",
                },
            })
    }

    static getContratDetail(id) {
        return axios.get('http://localhost:8080/api/contrats/' + id,
            {
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=",
                },
            })
    }

    static postContrat(contrat) {
        return axios.post('http://localhost:8080/api/contrats/', contrat,
            {
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=",
                },
            })
    }

    static getEmploye(id) {
        return axios.get('http://localhost:8080/api/employer/article/clause/societe/'+ id,
            {
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=",
                },
            })
    }
}
