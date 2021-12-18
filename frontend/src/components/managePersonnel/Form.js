import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { updateSoldierEntry, newSoldierEntry } from '../../actions/index';
import FileBase64 from 'react-file-base64';

import avatarImage from '../../avatars/General-Platon.jpg'
/* const options = [
  { value: "SAMUEL GONZALEZ", label: "SAMUEL GONZALEZ" },
  { value: "JONATHAN DAVID", label: "JONATHAN DAVID" },
  { value: "DAVID GONZALEZ", label: "DAVID GONZALEZ" },
  { value: "YUNG HO", label: "YUNG HO" },
  { value: "PETER PAN", label: "PETER PAN" },
  { value: "LIZY TAYLOR", label: "LIZY TAYLOR" }
]; */
/* import list from "../managePersonnel/list" */

const validationSchema = Yup.object().shape({

  /*   personAvatar: Yup.string().required('Avatar is required!'), */
  personName: Yup.string().required('Name is required!'),
  personSex: Yup.string().required('Field is required!'),
  personRank: Yup.string().required('Field is required!'),
  personSuperior: Yup.string().required('Field is required!'),
  personPhone: Yup.string().required('Field is required!'),
  personEmail: Yup.string().email('Invalid email address!').required('Email address is required!'),
  personNoOfDS: Yup.string().required('Field is required!'),
  personStartDate: Yup.string().required('Field is required!'),
});


const url = '/read';
//let options = {};

var myImage = 'empty';

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log(typeof (data));

    data.forEach(element => {

      console.log(element.personName);
      // options.i = element.personName;

      // options.push( element.personName);
    }
    );

    /* let authors = data[1].personName;
    console.log("*******************************************");
    console.log(authors); */
  })
  .catch(function (error) {
    console.log(error);
  });

/* var names = items.map(function (item) {
  return item['name'];
}); */

/* 
console.log(typeof (options));
console.log(options); */
/* const state = {
  persons: []
}
const datos = [];
state.persons = axios.get('/read');
console.log("*******************************************");
console.log(state.persons); */

/* (async () => {
  // GET request using axios with async/await
  const element = document.querySelector('#get-request-async-await .result');
  const response = await axios.get('/read');
  console.log( response.personName);
})();
 */
class form extends Component {

  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // Option selected: { value: "rojo", label: "rojo" }
    console.log(`Option selected:`, selectedOption);
  };


  constructor(props) {
    super(props);
    this.state = {
      id: typeof this.props.row._id !== 'undefined' ? this.props.row._id : '',
      personAvatar: typeof this.props.row.personAvatar !== 'undefined' ? this.props.row.personAvatar : '',
      personName: typeof this.props.row.personName !== 'undefined' ? this.props.row.personName : '',
      personSex: typeof this.props.row.personSex !== 'undefined' ? this.props.row.personSex : '',
      personRank: typeof this.props.row.personRank !== 'undefined' ? this.props.row.personRank : '',
      personSuperior: typeof this.props.row.personSuperior !== 'undefined' ? this.props.row.personSuperior : '',
      personPhone: typeof this.props.row.personPhone !== 'undefined' ? this.props.row.personPhone : '',
      personEmail: typeof this.props.row.personEmail !== 'undefined' ? this.props.row.personEmail : '',
      personNoOfDS: typeof this.props.row.personNoOfDS !== 'undefined' ? this.props.row.personNoOfDS : '',
      personStartDate: typeof this.props.row.personStartDate !== 'undefined' ? this.props.row.personStartDate : '',

      thumb: undefined,

      redirect: false
    }
  }
  async createUpdateRecord(values) {

    let results;
    // Validate mode Edit or New
    if (this.props.mode === 'edit') {
      results = await this.props.updateSoldierEntry(values);
      if (results.payload.data.response === 'success') {
        this.setState({ redirect: true });
      } else {
        console.log(results.payload.data.response);
      }
    } else {
      results = await this.props.newSoldierEntry(values);
      if (results.payload.data.response === 'success') {
        this.setState({ redirect: true });
      } else {
        console.log(results.payload.data.response);
      }
    }
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <Formik
          initialValues={{
            personAvatar: this.state.personAvatar,
            personName: this.state.personName,
            personSex: this.state.personSex,
            personRank: this.state.personRank,
            personSuperior: this.state.personSuperior,
            personPhone: this.state.personPhone,
            personEmail: this.state.personEmail,
            personNoOfDS: this.state.personNoOfDS,
            personStartDate: this.state.personStartDate,
            id: this.state.id
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            this.createUpdateRecord(values);
          }}
          render={({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <table className="table table-striped table-bordered" style={{ marginTop: 20/* , backgroundColor: '#f4e1d2' */ }}>
                <div className="container" backgroundColor="lightblue">
                  <div className="row" backgroundColor="lightblue">

                    <div>
                      <h2>{this.props.mode === 'edit' ? 'Update Soldier' : 'New Soldier'}</h2>
                    </div>

                    <div className="  col-md-6">
                      <img border-radius="100px" width="200px" src={values.personAvatar} alt="avatarImage" />

                      {/*  <Field name="personAvatar" className="form-control" placeholder="Avatar" type="text" /> */}

                      <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => myImage = base64}
                      />
                      {myImage === 'empty' ? <p hidden> {values.personAvatar = avatarImage} Avatar.. </p> : <p hidden>{values.personAvatar = (myImage)}</p>}

                    </div>

                    <div className={`form-group col-md-4 ${errors.personName && touched.personName && 'has-error'}`}>
                      <label htmlFor="personName">Soldier Name</label>
                      <Field name="personName" className="form-control" placeholder="Soldier Name" type="text" />
                      {errors.personName && touched.personName && <span className="help-block">{errors.personName}</span>}
                    </div>

                    <div className="col-md-6" ></div>
                    <div className="col-md-4" role="group" aria-labelledby="my-radio-group">
                      <label>
                        <div>Sex --- {values.personSex}  :</div>
                      </label>
                      <label>
                        <Field type="radio" name="personSex" value="M" />
                        Masculine
                      </label>
                      <label>
                        <Field type="radio" name="personSex" value="F" />
                        Femenine
                      </label>
                    </div>
                    <div className="col-md-6" ></div>
                    <div className="col-md-3">
                      <label htmlFor="personRank">Rank</label>
                      <select
                        name="personRank"
                        value={values.personRank}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: 'block' }}
                      >
                        <option value="" label="Select a rank" />
                        <option value="General" label="General" />
                        <option value="Colonel" label="Colonel" />
                        <option value="Major" label="Major" />
                        <option value="Captain" label="Captain" />
                        <option value="Warrant Officer" label="Warrant Officer" />
                        <option value="Lieutenant" label="Lieutenant" />
                        <option value="Sergeant" label="Sergeant" />
                        <option value="Corporal" label="Corporal" />
                        <option value="Specialist" label="Specialist" />
                        <option value="Private" label="Private" />
                      </select>
                    </div>


                    {/* dfdfs********************************************d */}
                    <div className="col-md-3" >
                      <label htmlFor="personSuperior">Superior</label>
                      <select
                        name="personSuperior"
                        value={values.personSuperior}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: 'block' }}
                      >
                        {/*     <option value="" label="Select a Superior" /> */}
                        <option value="" label="Select One" />
                        <option value="NONE" label="NONE" />
                        <option value="DAVID GONZALEZ" label="DAVID GONZALEZ" />
                        <option value="LIZY TAYLOR" label="LIZY TAYLOR" />
                        <option value="JONATHAN DAVID" label="JONATHAN DAVID" />
                        <option value="PETER PAN" label="PETER PAN" />
                        <option value="SAMUEL GONZALEZ" label="SAMUEL GONZALEZ" />
                        <option value="YOUNG HO" label="YOUNG HO" />
                        <option value="FRANCO DEL BOUCH" label="FRANCO DEL BOUCH" />
                        <option value="OWEN" label="OWEN" />
                      </select>
                    </div>

                    <div className="col-md-6"></div>

                    <div className={`form-group col-md-3 ${errors.personPhone && touched.personPhone && 'has-error'}`}>
                      <label htmlFor="personPhone">Phone</label>
                      <Field name="personPhone" className="form-control" placeholder="Phone" type="text" />
                      {errors.personPhone && touched.personPhone && <span className="help-block">{errors.personPhone}</span>}
                    </div>

                    <div className="col-md-6"></div>

                    <div className={`form-group col-md-3 ${errors.personEmail && touched.personEmail && 'has-error'}`}>
                      <label htmlFor="personEmail"> Email</label>
                      <Field name="personEmail" className="form-control" placeholder=" Email" type="text" />
                      {errors.personEmail && touched.personEmail && <span className="help-block">{errors.personEmail}</span>}
                    </div>



                    <div className={`form-group col-md-2 ${errors.personNoOfDS && touched.personNoOfDS && 'has-error'}`}>
                      <label htmlFor="personNoOfDS">  No Of DS</label>
                      <Field name="personNoOfDS" className="form-control" placeholder=" No Of DS" type="text" />
                      {errors.personNoOfDS && touched.personNoOfDS && <span className="help-block">{errors.personNoOfDS}</span>}
                    </div>


                    <div className="col-md-6"></div>

                    <div className={`form-group col-md-2 ${errors.personStartDate && touched.personStartDate && 'has-error'}`}>
                      <label htmlFor="personStartDate"> Start Date</label>
                      <Field name="personStartDate" className="form-control" placeholder=" Start Date" type="text" />
                      {errors.personStartDate && touched.personStartDate && <span className="help-block">{errors.personStartDate}</span>}
                    </div>

                    <div className="col-md-3"></div>
                    <div className="row">
                      <div className="col-lg-2 col-md-2">
                        <br></br>
                        <button type="submit" className="btn btn-primary">Aply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </table>
            </Form>
          )} />
      </div>
    );
  }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ updateSoldierEntry, newSoldierEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(form);
