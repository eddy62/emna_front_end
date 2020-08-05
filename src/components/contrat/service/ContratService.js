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

    static getEmployeBySociete(id) {
        return axios.get('http://localhost:8080/api/contrats/' + id,
            {
                headers: {
                    Authorization: "Basic YWRtaW46YWRtaW4=",
                },
            })
    }
}
