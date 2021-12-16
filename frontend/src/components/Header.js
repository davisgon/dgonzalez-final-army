import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import NewSoldier from "./managePersonnel/NewSoldier";
import PersonnelList from "./managePersonnel/PersonnelList";
import UpdateSoldier from "./managePersonnel/UpdateSoldier";

const Header = () => {
    return (
        <BrowserRouter>
            <div  >
                <div>
                    <img style={{ height: 'auto', width: '10%' }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mark_of_the_United_States_Army.svg/1200px-Mark_of_the_United_States_Army.svg.png"
                        alt="US Army" className="img-thumbnail"></img>
                    <h2>US Army Personal Registry</h2>
                    <Link style={{ float: 'right' }} margin-left='5px' className="btn btn-warning " to="/">Reset</Link>
                    &nbsp;
                    <Link style={{ float: 'right' }} margin-left='5px' className="btn btn-primary" to="/NewSoldier">New Soldier</Link>
                </div>

                <Route exact path="/" component={PersonnelList} />
                <Route path="/NewSoldier" component={NewSoldier} />
                <Route path="/edit/:id" component={UpdateSoldier} />

                {/*     Delete dont need nav /> */}
            </div>
        </BrowserRouter>
    );
}

export default Header;