import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { soldierList, deleteSoldierEntry, soldierSuperiorList } from '../../actions/index';

import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class PersonnelList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.confirmDelete = this.confirmDelete.bind(this); // props confirmDelete
    this.doSearch = this.doSearch.bind(this);
    this.idPersonSuperior = this.props.match.params.personSuperior;
  }
  async getAList() {
    let results = await this.props.soldierList();
    this.setState({ list: results.payload.data });
  }


  /******************************** */
  state = {
    items2: Array.from({ length: 20 })
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items2: Object.keys(this.state.personAvatar).concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };
  /********************************** */

  /*   async getASuperior() {
      console.log("*******************************************personSuperior");
      console.log(this.idPersonSuperior);
      let result = await this.props.soldierSuperiorList(this.idPersonSuperior);
      this.setState({ list: Object.assign(this.state.list, result.payload.data) });
    }
   */

  componentDidMount() {
    this.getAList();
  }

  async confirmDelete(e) {
    if (window.confirm('Are you sure ?')) {
      let results = await this.props.deleteSoldierEntry(e.target.id);
      if (results.payload.data.response === 'success') {
        this.getAList();
      }
    }
  }

  // Search Table call from displayList
  doSearch() {
    var searchTable = document.getElementById('searchTable');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    for (var i = 1; i < searchTable.rows.length; i++) {
      var cellsOfRow = searchTable.rows[i].getElementsByTagName('td');
      var found = false;
      for (var j = 0; j < cellsOfRow.length && !found; j++) {
        var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
        if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
          found = true;
        }
      }
      if (found) {
        searchTable.rows[i].style.display = '';
      } else {
        searchTable.rows[i].style.display = 'none';
      }
    }
  }
  //  List soldier is a personnel **********************************************************
  displayAList() {

    if (Object.keys(this.state.list).length > 0) {
      const row = this.state.list.map((item, i) => {
        return <tr key={i}>

          <td>
            <div className="card" key={item._id}>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" style={{ width: '50px', height: '50px' }} src={item.personAvatar} alt="personAvatar" />
              </div>
            </div></td>

          <td>{item.personName}</td>
          <td>{item.personSex}</td>
          <td>{item.personRank}</td>
          <td>
            <Link id={item._personSuperior} onClick={this.getASuperior} to="/"> {item.personSuperior} </Link>
          </td>
          <td> <a href={"tel:" + item.personPhone}>{item.personPhone}</a></td>
          <td><a href={"https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" + item.personEmail} target="_blank">{item.personEmail}</a>

          </td>
          <td>{item.personNoOfDS}</td>
          <td>{item.personStartDate}</td>
          <td>
            <Link to={"/edit/" + item._id}><div className="edit icon"></div></Link>
          </td>

          <td>
            <Link id={item._id} onClick={this.confirmDelete} className="trash icon" to="/"></Link>
          </td>
        </tr>

      });
      return (
        <Fragment>
          <br></br>
          <input id="searchTerm" type="text" placeholder='Search ..' onKeyUp={this.doSearch} />
          <table id="searchTable" className="table table-striped table-bordered" style={{ marginTop: 20 }}>
            <thead>
              <tr style={{ backgroundColor: '#87CEFA' }}>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Sex</th>
                <th scope="col">Rank</th>
                <th scope="col">Superior</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">NoOfDS</th>
                <th scope="col">StartDate</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>

              </tr>
            </thead>
            <tbody>
              {row}
            </tbody>
          </table>
        </Fragment >
      );
    } else {
      return <p><em>Emty.</em></p>;
    }
  }
  render() {
    return (
      <InfiniteScroll
        dataLength={Object.keys(this.state.list).length}
       /*  next={this.fetchMoreData} */
        hasMore={true}
        loader={<h4>Loading...InfiniteScroll</h4>}
      >
        <div className="col-lg-12 col-md-12">
          {this.displayAList()}
        </div>
      </InfiniteScroll>

    );
  }
}

const mapStateToDispatch = (dispatch) => {
  return bindActionCreators({ soldierSuperiorList, soldierList, deleteSoldierEntry }, dispatch);
};

export default connect(null, mapStateToDispatch)(PersonnelList);