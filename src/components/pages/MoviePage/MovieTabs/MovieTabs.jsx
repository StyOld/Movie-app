import React from 'react';
import { Nav, NavItem, NavLink as NavLinkItem } from 'reactstrap';
import {Switch, Route} from 'react-router';
import {NavLink} from "react-router-dom"
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

export default class MovieTabs extends React.Component {
    render() {
        // console.log(this.props.moviesDetails.id)
        return (
            <div className='container mt-4'>
                <Nav tabs>
                    <NavItem>
                        <NavLinkItem>
                            <NavLink to ={`/movie/${this.props.itemId}/detail`} activeClassName="active">Детально</NavLink>
                        </NavLinkItem>
                    </NavItem>
                    <NavItem>
                        <NavLinkItem>
                            <NavLink to ={`/movie/${this.props.itemId}/videos`} activeClassName="active">Видео</NavLink>
                        </NavLinkItem>
                    </NavItem>
                    <NavItem>
                        <NavLinkItem>
                            <NavLink to ={`/movie/${this.props.itemId}/credits`} activeClassName="active">Видео</NavLink>
                        </NavLinkItem>
                    </NavItem>
                </Nav>
                <Switch>
                    <Route path="/movie/:id/detail" component={MovieDetail}/>
                    <Route path="/movie/:id/videos" component={MovieVideos}/>
                    <Route path="/movie/:id/credits" component={MovieCredits}/>
                </Switch>
            </div>
        );
    }
}
