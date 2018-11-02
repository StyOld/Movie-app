import React from 'react';
import { Nav, NavLink as NavLinkItem} from 'reactstrap';
import {Switch, Route} from 'react-router';
import {NavLink} from 'react-router-dom';
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

export default class MovieTabs extends React.Component {
    render() {
        return (
            <div className='container mt-4'>
                <Nav tabs>
                    <NavLinkItem>
                        <NavLink
                            to ={`/movie/${this.props.itemId}/detail`}
                            // activeClassName="active"
                            className='text-decor'
                            id='text-decor'
                        >
                            Детально
                        </NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink
                            to ={`/movie/${this.props.itemId}/videos`}
                            activeClassName="active"
                            id='text-decor'
                        >
                            Видео
                        </NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink
                            to ={`/movie/${this.props.itemId}/credits`}
                            activeClassName="active"
                            id='text-decor'
                        >
                            Актёры
                        </NavLink>
                    </NavLinkItem>
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