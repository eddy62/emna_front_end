
const stock={
    filtreEmployeSelected:"",
    filtreAnneeSelected:"",
    filtreMoisSelected:"",

    getFiltreEmployeSelected(){
      return this.filtreEmployeSelected;
    },

    setFiltreEmployeSelected(employeSelected){
        this.filtreEmployeSelected = employeSelected;
    },

    getFiltreAnneeSelected(){
        return this.filtreAnneeSelected;
    },

    setFiltreAnneeSelected(anneeSelected){
        this.filtreAnneeSelected = anneeSelected;
    },
    getFiltreMoisSelected(){
        return this.filtreMoisSelected;
    },

    setFiltreMoisSelected(moisSelected){
        this.filtreMoisSelected = moisSelected;
    }
};

export default stock;