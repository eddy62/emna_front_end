import AxiosCenter from './../../shared/services/AxiosCenter';
import { toast } from 'react-toastify';
import React,{ Component } from 'react';




export default class QuoteService extends Component{




    static updateState(idQuote , state , refreshList){const affichage= state==="Archivé"?"Votre devis a bien été desarchivé":"Votre devis a bien été archivé";

        AxiosCenter.updateStateQuote(idQuote)
        .then((response)=>{
            toast.success(
                <div className="text-center">
                  <strong>
                  {affichage}
                  </strong>
                </div>,
                {position: "top-right"}
            );
            refreshList();
            
        })
        .catch((error)=>{
            console.log(error);
        })
        
         
        
      }
}