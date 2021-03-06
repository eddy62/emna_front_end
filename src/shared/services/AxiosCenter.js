import ApiBackEnd from "./../config/ApiBackEnd";
import UserService from "./UserService";
import Axios from "axios";

const AxiosCenter = {
  authenticate(values) {
    return ApiBackEnd({
      method: "post",
      url: "/authenticate",
      data: values,
    });
  },

  //Get
  getCurrentUser() {
    return ApiBackEnd({
      method: "get",
      url: "/account",
    });
  },

  getAllCustomerSupplierBySociete(id) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/societe/${id}`,
    });
  },

  getAllSocietiesByComptable(id) {
    return ApiBackEnd({
      method: "get",
      url: `/societes/comptable/${id}`,
    });
  },
  getAllSocieties() {
    return ApiBackEnd({
      method: "get",
      url: `/societes`,
    });
  },
  getSocietyByUser(id) {
    return ApiBackEnd({
      method: "get",
      url: `/societes/user/${id}`,
    });
  },

  getAccountantByUser(id) {
    return ApiBackEnd({
      method: "get",
      url: `/comptables/user/${id}`,
    });
  },

  getCustomerSupplier(id) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/wrapper/${id}`,
    });
  },

  getCustomerSupplierByName(nom) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/nom/${nom}`,
    });
  },

  getAllBonusTypes() {
    return ApiBackEnd({
      method: "GET",
      url: "/type-primes",
    });
  },

  getWrapperEmployee(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/${id}`,
    });
  },

  getAllWrapperEmployesBySociety(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/society/${id}`,
    });
  },

  getAllEmployesBySociety(id) {
    return ApiBackEnd({
      method: "get",
      url: `/employes/society/${id}`,
    });
  },

  getAllWrapperEmployeesBySocietyAndTypeContract(id, type) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/society/${id}/typecontrat/${type}`,
    });
  },

  getAllWrapperEmployesBySocietyAndStatutEmployee(id, codestatut) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrapperemployes/society/${id}/statutemploye/${codestatut}`,
    });
  },

  getAllTypeContracts() {
    return ApiBackEnd({
      method: "GET",
      url: `/type-contrats`,
    });
  },

  getAllStatutEmployees() {
    return ApiBackEnd({
      method: "GET",
      url: `/statut-employes`,
    });
  },

  getOneWrapperVariablesDePay(idEmploye, annee, mois) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrappervariablespaie/employe/${idEmploye}/annee/${annee}/mois/${mois}`,
    });
  },

  getStatement() {
    return ApiBackEnd({
      method: "get",
      url: "/releves",
    });
  },
  getStatementsByStateAndSociety(idEtat, idSociete) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/etat/${idEtat}/societe/${idSociete}`,
    });
  },
  getStatementByState(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/etat/${id}`,
    });
  },

  getStatementsBySocietyId(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/societe/${id}`,
    });
  },

  getStatementById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releves/${id}`,
    });
  },

  getBalanceStatementById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releves/${id}/solde`,
    });
  },

  updateStatement(values) {
    return ApiBackEnd({
      method: "put",
      url: "/releves",
      data: values,
    });
  },

  getOperationById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/operations/${id}`,
    });
  },

  getOperationsByReleveId(id) {
    return ApiBackEnd({
      method: "get",
      url: `/operations/releve/${id}`,
    });
  },

  getUser(id) {
    return ApiBackEnd({
      method: "get",
      url: "/users/" + id,
    });
  },

  getAllUsers() {
    return ApiBackEnd({
      method: "get",
      url: "/users/all",
    });
  },

  getAccountant(id) {
    return ApiBackEnd({
      method: "get",
      url: "/wrappercomptable/" + id,
    });
  },

  getAccountantByUserId(id) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/user/" + id,
    });
  },

  getProduct(id) {
    return ApiBackEnd({
      method: "get",
      url: `/produits/societe/${id}`,
    });
  },

  getProductById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/produits/${id}`,
    });
  },

  getSocietyById(id) {
    return ApiBackEnd({
      method: "get",
      url: "/wrappersociete/" + id,
    });
  },

  getSocietyByUserId(id) {
    return ApiBackEnd({
      method: "get",
      url: "/societes/user/" + id,
    });
  },

  getWrapperSociety(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrappersociete/${id}`,
    });
  },

  getAllAccountants() {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/all",
    });
  },

  getInvoicesBySociety(id) {
    return ApiBackEnd({
      method: "GET",
      url: `factures/societe/${id}`,
    });
  },

  getInvoicesByStatement(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/factures/relevé/${id}`
    })
  },

  getDepenseBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `depenses/societe/${id}`,
    });
  },

  getDepense(id) {
    return ApiBackEnd({
      method: "GET",
      url: `depenses/${id}`,
    });
  },

  getAllQuotesBySociety(id) {
    return ApiBackEnd({
      method: "GET",
      url: `devis/liste/societe/${id}`
    });
  },

  getQuoteById(id) {
    return ApiBackEnd({
      method: "GET",
      url: `devis/detail/${id}`
    });
  },
  getQuotesBySociety(id) {
    return ApiBackEnd({
      method: "GET",
      url: `devis/detail/${id}`
    });
  },

  getNewQuoteNumber(id) {
    return ApiBackEnd({
      method: "GET",
      url: `devis/nouveau/numero/${id}`
    });
  },

  getInfosForCreateQuote(id) {
    return Axios.all([
      this.getNewQuoteNumber(id),
      this.getAllCustomerSupplierBySociete(id),
      this.getProduct(id)
    ])
  },

  getLastNumFactBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/facture/lastnumfact/${id}`,
    });
  },

  getInfosForCreationFacture(id) {
    return Axios.all([
      this.getLastNumFactBySociete(id),
      this.getAllCustomerSupplierBySociete(id)
    ])
  },

  getAllClausesBySocietyId(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/clauses/society/${id}`,
    });
  },

  getAllArticles() {
    return ApiBackEnd({
      method: "GET",
      url: '/articles',
    })
  },

  getArticleById(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/articles/${id}`
    })
  },

  //Variables de paie
  getAllAbsenceTypes() {
    return ApiBackEnd({
      method: "GET",
      url: "/type-absences",
    });
  },

  getAllPaySlip() {
    return ApiBackEnd({
      method: "GET",
      url: `/fiche-paies`,
    });
  },

  getPdfFileById(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/getPdfFile/${id}`,
      responseType: 'blob'
    });
  },

  getAllPayslipByEmployeIdMonthStartMonthEnd(idEmploye, year, monthStart, monthEnd) {
    return ApiBackEnd({
      method: "GET",
      url: `/fiche-paies/employe/${idEmploye}/annee/${year}/moisDu/${monthStart}/moisFin/${monthEnd}`,
    });
  },


  getWrapperPayrollVariablesByEmployeIdByYearByMonth(idEmploye, year, month) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrappervariablespaie/employe/${idEmploye}/annee/${year}/mois/${month}`
    })
  },

  getAllContrats() {
    return ApiBackEnd({
      method: "GET",
      url: `/contrats`
    })
  },

  getPDFArchivedStatement(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releves/pdf/${id}`,
      responseType: 'arraybuffer'
    });
  },

  getDocumentByIdPayslip(idPayslip) {
    return ApiBackEnd({
      method: "GET",
      url: `/documents/idPaySlip/${idPayslip}`
    })
  },

  getHtmlDpae(id) {
    return ApiBackEnd({
      method: "get",
      url: `/dpae/html/${id}`,
      headers: {
        'content-type': 'charset=UTF-8'
      }
    });
  },

  getPdfDpae(id) {
    return ApiBackEnd({
      method: "get",
      url: `/dpae/pdf/${id}`,
      responseType: 'blob'
    });
  },
  getAllDpaeByEmployeIdMonthStartMonthEnd(idEmploye, year, monthStart, monthEnd) {
    return ApiBackEnd({
      method: "GET",
      url: `/dpae/employe/${idEmploye}/annee/${year}/moisDu/${monthStart}/moisFin/${monthEnd}`
    });
  },

  getAllAmendmentByContratId(idContrat) {
    return ApiBackEnd({
      method: "GET",
      url: `/avenants/contrats/${idContrat}`
    })
  },

  getPDFAmendment(idAmendment) {
    return ApiBackEnd({
      method: "get",
      url: `/avenant/pdf/${idAmendment}`,
      responseType: 'arraybuffer'
    });
  },

  getProduitsByNomOrReferenceAndSocieteId(keyWord){
    return ApiBackEnd({
      method: "GET",
      url: `/products/q/${keyWord}`
    });
  },

  getClientBySiretAndSocietyId(siret){
    return ApiBackEnd({
      method: "GET",
      url: `/clients-fournisseurs/siret/${siret}`
    });
  },

  getAllWrapperDpaesToDoBySociety(societyId) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrapper-dpaes-to-do/society/${societyId}`,
    })
  },

  // Fin Get

  //Post
  finishPasswordReset(values) {
    return ApiBackEnd({
      method: "post",
      url: `/account/reset-password/finish`,
      data: values,
    });
  },

  createAvenant(values) {
    return ApiBackEnd({
      method: "post",
      url: `/avenants/add/new`,
      data: values,
    });
  },

  createCustomerSupplier(values) {
    return ApiBackEnd({
      method: "post",
      url: `/client-fournisseurs/new`,
      data: values,
    });
  },

  createAbsence(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/absences",
      data: values,
    });
  },

  createBonus(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/primes",
      data: values,
    });
  },

  createOvertime(values) {
    return ApiBackEnd({
      method: "POST",
      url: `/heures-supplementaires`,
      data: values,
    })
  },

  createPaydayAdvanceOrReminder(values) {
    return ApiBackEnd({
      method: "POST",
      url: '/avance-rappel-salaires',
      data: values,
    })
  },

  createExpenseReport(values) {
    return ApiBackEnd({
      method: "POST",
      url: '/note-de-frais',
      data: values
    })
  },

  createWrapperEmployee(values) {
    return ApiBackEnd({
      method: "post",
      url: `/wrapperemployes`,
      data: values,
    });
  },

  postOperation(values) {
    return ApiBackEnd({
      method: "post",
      url: "/operations",
      data: values,
    });
  },

  postStatement(values) {
    return ApiBackEnd({
      method: "post",
      url: "/releves",
      data: values,
    });
  },

  addUser(values) {
    return ApiBackEnd({
      method: "post",
      url: "/users/add",
      data: values,
    });
  },

  addAccountant(values) {
    return ApiBackEnd({
      method: "post",
      url: "/wrappercomptable/add",
      data: values,
    });
  },

  createProduct(values) {
    return ApiBackEnd({
      method: "post",
      url: "/produits",
      data: values,
    });
  },

  addSociety(values) {
    return ApiBackEnd({
      method: "post",
      url: "/wrappersociete/add",
      data: values,
    });
  },

  createLineProduct(values) {
    return ApiBackEnd({
      method: "post",
      url: "/ligne-produits",
      data: values,
    });
  },

  requestPasswordReset(values) {
    return ApiBackEnd({
      method: "post",
      url: `/account/reset-password/init`,
      data: values,
    });
  },

  uploadInvoice(facture, files) {
    let formData = new FormData();
    formData.append("numfact", facture.numfact);
    formData.append("message", facture.message);
    formData.append("date", facture.date);
    formData.append("dateEcheance", facture.echeance);
    formData.append("prixHT", facture.prixHT);
    formData.append("prixTTC", facture.prixTTC);
    formData.append("tva", facture.tva);
    formData.append("moyenDePaiement", facture.moyenDePaiement);
    formData.append("societeId", UserService.getSocietyId());
    formData.append("client", facture.client);
    formData.append("numRue", facture.numAdresse);
    formData.append("nomRue", facture.nomRueAdresse);
    formData.append("codePostal", facture.codePostal);
    formData.append("ville", facture.ville);
    formData.append("pays", facture.pays);
    for (let i = 0; i < files.length; i++) {
      formData.append("listeFiles", files.item(i));
    }

    return ApiBackEnd({
      method: "POST",
      url: "/facture/new",
      mode: "no-cors",
      data: formData,
    });
  },

  uploadDepense(facture, files) {
    let formData = new FormData();
    formData.append("message", facture.message);
    formData.append("date", facture.date);
    formData.append("prixTTC", facture.prixTTC);
    formData.append("moyenDePaiement", facture.moyenDePaiement);
    formData.append("societeId", UserService.getSocietyId());
    formData.append("client", facture.client);
    for (let i = 0; i < files.length; i++) {
      formData.append("listeFiles", files.item(i));
    }

    return ApiBackEnd({
      method: "POST",
      url: "/depense/new",
      mode: "no-cors",
      data: formData,
    });
  },

  uploadContract(file, idContract ) {
    let formData = new FormData();
    formData.append('file',file[0])
    return ApiBackEnd({
      method: "POST",
      url: `/upload/contracts/${idContract}`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  },

  createOtherPayrollVariable(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/autres-variables",
      data: values,
    });
  },

  createArticle(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/articles",
      data: values,
    });
  },

  createQuote(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/devis",
      data: values,
    });
  },
  createFile() {
    return ApiBackEnd({
      method: "POST",
      url: "/documents",
    });
  },

  uploadFile(file) {
    return ApiBackEnd({
      method: "POST",
      url: "/upload",
      data: file
    })
  },


  createWrapperContrat(values) {
    return ApiBackEnd({
      method: "POST",
      url: `/wrapperContrat`,
      data: values
    })
  },

  createWrapperDepense(values) {
    return ApiBackEnd({
      method: "POST",
      url: `/wrapperdepense`,
      data: values
    })
  },

  uploadFiles(url,file,config){
    return ApiBackEnd({
      method: 'POST',
      url: url,
      data: file,
      onUploadProgress: config
    })
  },


  // Fin Post

  //Put
  updateCustomerSupplier(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/client-fournisseurs/wrapper`,
      data: values,
    });
  },

  updateStateQuote(idQuote){

    return ApiBackEnd({
      method:"PUT",
      url: `/quote/stateChange/${idQuote}`,
      data : idQuote,
    });
  },

  updateWrapperEmployee(values) {
    return ApiBackEnd({
      method: "put",
      url: `/wrapperemployes`,
      data: values,
    });
  },

  archiveWrapperEmployee(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/wrapperemploye/archive`,
      data: values,
    });
  },

  updateRapprochementOperation(idOperation) {
    return ApiBackEnd({
      method:"put",
      url:`/operations/${idOperation}`,
    })
  },

  mergeOperationToInvoices(idOperation,idFacture){
    return ApiBackEnd({
      method:"put",
      url:`/facture/${idOperation}/${idFacture}`,
    })
  },

  updateOperation(values) {
    return ApiBackEnd({
      method: "put",
      url: `/operations`,
      data: values,
    });
  },

  editUser(values) {
    return ApiBackEnd({
      method: "put",
      url: "/users/edit",
      data: values,
    });
  },

  validateStatement(id) {
    return ApiBackEnd({
      method: "put",
      url: `/releve/${id}`,
    });
  },

  editAccountant(values) {
    return ApiBackEnd({
      method: "put",
      url: "/wrappercomptable/edit",
      data: values,
    });
  },

  updateProduct(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/produits/update`,
      data: values,
    });
  },

  editSociety(values) {
    return ApiBackEnd({
      method: "put",
      url: "/wrappersociete/edit",
      data: values,
    });
  },

  updateAbsence(values) {
    return ApiBackEnd({
      method: "PUT",
      url: "/absences",
      data: values,
    });
  },

  modifyOvertime(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/heures-supplementaires`,
      data: values,
    })
  },

  modifyPaydayAdvanceOrReminder(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/avance-rappel-salaires`,
      data: values,
    })
  },
  modifyOtherPayrollVariable(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/autres-variables`,
      data: values,
    })
  },

  confirmPayrollVariables(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/wrappervariablespaie/process-variablespaie/1`,
      data: values,
    })
  },

  validatePayrollVariables(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/wrappervariablespaie/process-variablespaie/2`,
      data: values,
    })
  },

  updateBonus(values) {
    return ApiBackEnd({
      method: "put",
      url: `/primes`,
      data: values,
    });
  },

  updateExpenseReport(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/note-de-frais`,
      data: values,
    });
  },

  editArticle(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/articles`,
      data: values,
    });
  },

  validateStatementReconciliation(idReleve){
    return ApiBackEnd({
      method: "put",
      url: `/releve/valider/comptable/${idReleve}`,
    });
  },

  updateDepense(values){
    return ApiBackEnd({
      method: "put",
      url: "/wrapperdepenses",
      data: values
    });
  },

  archiveContrat(idContrat){
    return ApiBackEnd({
      method: "put",
      url: `/archiveContrat/${idContrat}`,
    });
  },

  // Fin Put

  //Delete
  deleteCustomerSupplier(clientId, userId) {
    return ApiBackEnd({
      method: "delete",
      url: `/client-fournisseurs/${clientId}/user/${userId}`,
    });
  },

  deleteWrapperEmployee(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/wrapperemployes/${id}`,
    });
  },

  deleteOperation(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/operations/${id}`,
    });
  },

  deleteStatement(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/releves/${id}`,
    });
  },

  deleteUser(id) {
    return ApiBackEnd({
      method: "delete",
      url: "/users/" + id,
    });
  },

  deleteProduct(produitId, userId) {
    return ApiBackEnd({
      method: "delete",
      url: `/produits/${produitId}/user/${userId}`,
    });
  },

  deleteInvoice(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/factures/${id}`,
    });
  },

  deleteAbsence(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/absences/${id}`,
    });
  },

  deleteOvertime(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/heures-supplementaires/${id}`,
    })
  },

  deletePaydayAdvanceOrReminder(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/avance-rappel-salaires/${id}`,
    })
  },

  deleteExpenseReport(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/note-de-frais/${id}`,
    });
  },

  deleteBonus(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/primes/${id}`,
    });
  },

  deleteOtherPayrollVariable(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/autres-variables/${id}`
    })
  },

  deleteClause(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/clauses/${id}`,
    });
  },

  deleteArticle(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/articles/${id}`
    });
  },

  deleteDocumentWithFile(id, filename) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/documents/${id}/${filename}`
    });
  },

  getInvoicesByOperationId(id){
    return ApiBackEnd({
      method: "GET",
      url:`facture/operation/${id}`
    })
  },
  deleteQuoteById(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/devis/${id}`
    });
  },

  // Fin Delete

};

export default AxiosCenter;

/*

AxiosCenter.getCurrentUser().then(response => {
    response ........
}).catch(error => {
    //error.........
})



*/
