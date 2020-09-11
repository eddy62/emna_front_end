import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import ModifyBonus from '../children/ModifyBonus'
import AxiosCenter from "../../../../../shared/services/AxiosCenter";
import {toast} from "react-toastify";

const notify = type => {
  switch (type) {
      case "success":
          toast.success(
              <div className="text-center">
                  <strong>Prime Supprimé &nbsp;&nbsp;!</strong>
              </div>,
              {position: "top-right"}
          );
          break;
      case "error":
          toast.error(
              <div className="text-center">
                  <strong>Prime NON Supprimé &nbsp;&nbsp;!</strong>
              </div>,
              {position: "top-right"}
          );
          break;
  }
};


export default class TablePrime extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        modalAvance: false,
        index: null,
    }
}

toggleModal = (key) => {
  this.setState({
      index: key,
      modalAvance: !this.state.modalAvance,
  });
 
}

toggleModaleDelete = (key) => {
  this.setState({
      index: key,
      modaleDelete: !this.state.modaleDelete,
  });
}

callBackToDelete = () => {
  AxiosCenter.deletePrime(this.props.primeList[this.state.index].id).then(() => {
      this.toggleModaleDelete();
      this.props.reloadParentAfterUpdate();
      notify('success');
  }).catch((error) => {
      console.log(error);
      notify('error');
  });
}


  render() {   
    console.log(this.props.primeList)   
      return (
        <div>
        <MDBTable>
          <MDBTableHead color="default-color">
            <tr>
              <th className="font-weight-bold">Prime</th>
              <th>Montant</th>
              <th className="w-25"></th>
            </tr>
          </MDBTableHead>
          {this.props.primeList.length ? (
              <MDBTableBody>
              {this.props.primeList.map((prime, index) => (
                  <tr key={index}>
                      <td>{prime.intitule}</td>
                      <td>{prime.montant} €</td>
                      {prime.etatVariablePaieId === 1 ? (
                          <td>
                              <MDBBtn color="teal accent-3" rounded size="sm"
                              onClick={() => this.toggleModal(index)}>UPDATE</MDBBtn>
                              <MDBBtn color="danger" rounded size="sm"
                              onClick={() => this.toggleModaleDelete(index)}>DELETE</MDBBtn>
                          </td>
                      ) : (
                          <td>Confirmé</td>
                      )}
                  </tr>
              ))}          
              </MDBTableBody>
          ) : (
              <MDBTableBody>
              <tr>
                  <td colSpan="3">Pas de prime ce mois</td>
              </tr>
              </MDBTableBody>
          )}
          
          {console.log(this.state.index)}   
        </MDBTable>
        {/** MODALE DELETE */}
        <MDBModal isOpen={this.state.modaleDelete} backdrop={false} size="lg">
            <MDBModalBody>
                Etes-vous sur de vouloir supprimer cet enregistrement ?
                <MDBBtn
                    onClick={this.toggleModaleDelete}>Annuler</MDBBtn>
                <MDBBtn
                    onClick={this.callBackToDelete}>Confirmer</MDBBtn>
            </MDBModalBody>
        </MDBModal>
        {/** MODALE UPDATE */}
        <MDBModal isOpen={this.state.modalAvance} toggle={this.toggleModal} size="lg">
            <MDBModalBody>
                <ModifyBonus
                    prime={this.props.primeList[this.state.index]}  
                    index={this.state.index}                       
                    toggleAvance={this.toggleModal}
                    reloadParentAfterUpdate={this.props.reloadParentAfterUpdate}
                />
            </MDBModalBody>
        </MDBModal>
</div>
      );
    }
}