
import {MDBBtn, MDBCardTitle, MDBContainer,MDBInput} from "mdbreact";
import {ErrorMessage, Field, Formik,Form} from "formik";
import * as Yup from "yup";
import React from "react";
import BackBtn from "../../../../../shared/component/buttons/BackBtn";

const lexique =
{
  requiredDesc         : "*Descritpion obligatoire",
  requiredDate         : "*Date obligatoire",
  requiredType         : "*Type obligatoire",
  requiredSolde        : "*Solde obligatoire et non négatif",
  requiredSoldePositif :"*Solde non négatif",
  requireMention       : "* Mention obligatoire requis",
  operationType        : { name: "Type d'operation*", debit: "Débit", credit: "Crédit"},
  date                 : "Date*",
  description          : "Description*",
  solde                : "Solde (€)*"
} 



const ComposantErreur = (props) => (
    <div className="text-danger">{props.children}</div>
  );
  
  const ComposantInput = ({ field, form: { touched, errors }, ...props }) => (
    <MDBInput label={props.label} outline type="text" {...props} {...field} />
  );
  
  const ComposantDate = ({ field, form: { touched, errors }, ...props }) => (
    <MDBInput label={props.label} outline type="date"  {...props} {...field} />
  );

  const ComposantSelect=({ field, form: { touched, errors }, ...props }) => (
<div>

  <label>{props.label}</label>
  <select className=" form-control browser-default custom-select" {...props} {...field}>
      <option value="debit">Débit</option>
      <option value="credit">Crédit</option>
  </select>
</div>

  );

 const schema = (state) => { return Yup.object().shape({
    date         : Yup.date().required(lexique.requiredDate)
                    .max(state.datefin, "La date ne peut être supérieur à la date de fin du relevé")
                    .min(state.datedebut, "La date ne peut être inférieur a la date du début du relevé"),
    description  : Yup.string().required(lexique.requiredDesc),
    type         : Yup.string().required(lexique.requiredType),
    solde        : Yup.number().positive(lexique.requiredSoldePositif)
                                .required(lexique.requiredSolde)
})}

const FormOperation =({values,action,releve,history,title}) => {
    console.log(values.date)
    return (
        <MDBContainer>
                <div>
                    <MDBCardTitle tag="h1">{title}</MDBCardTitle>
                    <hr/>
                    <Formik initialValues        = {values}
                            onSubmit             = {action}
                            enableReinitialize   = {true}
                            validationSchema     = {schema(releve)}>

                        {({values,
                           errors,
                           touched,
                           dirty,
                           isSubmitting,
                           handleSubmit,
                           handleChange,
                           handleBlur,
                           handleReset,}) => (
                    <Form onSubmit={handleSubmit}
                    className="container-fluid p-5  lighten-5 justify-content-center align-items-center">
                  <Field
                    name="date"
                    label={lexique.date}
                    value={values.date}
                    min={releve.datedebut}
                    max={releve.datefin}
                    component={ComposantDate}
                  />
                  <ErrorMessage
                    name="date"
                    component={ComposantErreur}
  
                  />
  
                  {/* Description */}
                  <div>
                    <Field
                      name="description"
                      label={lexique.description}
                      component={ComposantInput}
                    />
                    <ErrorMessage
                      name="description"
                      component={ComposantErreur}
                    />
                  </div>
  
                  {/* Type */}
                  <div>
                      <Field
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="type"
                      label={lexique.operationType.name}
                      value={values.type}
                      component={ComposantSelect}
                      />
                      <ErrorMessage
                      name="type"
                      component={ComposantErreur}
                    />
                    
                  </div>
  
                  { /* Solde */ }
                  <div>
                    <Field
                      name="solde"
                      label={lexique.solde}
                      component={ComposantInput}
                    />
                  <ErrorMessage
                    name="solde"
                    component={ComposantErreur}
                  />
                  </div>
                                <br/>
                                <div className="row d-flex justify-content-center ">
                                    <MDBBtn rounded type="submit" color="teal lighten-2">
                                        Sauvegarder
                                    </MDBBtn>

                              {title==="Modification d'opération" && 
                              <MDBBtn
                              color="teal accent-3"
                              rounded
                              size="sm"
                              type="reset"
                              onClick={handleReset}
                              disabled={!dirty || isSubmitting}>
                              RESET
                            </MDBBtn>
                              }      
                    
                                    <BackBtn history={history} size={"sm"}></BackBtn>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </MDBContainer>
        );
}

export default FormOperation;