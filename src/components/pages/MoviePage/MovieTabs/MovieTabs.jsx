import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

export default class MovieTabs extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        // console.log(this.props.moviesDetails.id)
        return (
            <div className='container mt-4'>
                <Nav tabs>
                    <NavItem>
                        <Link to ={`/movie/${this.props.itemId}}/detail`}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Детально
                        </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to ={`/movie/${this.props.itemId}/videos`}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Видео
                        </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to ={`/movie/${this.props.itemId}/credits`}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Актёры
                        </NavLink>
                        </Link>
                    </NavItem>
                </Nav>
                <Switch>
                    <Route path="/movie/:id/detail" component={MovieDetail}/>
                    <Route path="/movie/:id/videos" component={MovieVideos}/>
                    <Route path="/movie/:id/credits" component={MovieCredits}/>
                    <Route component={MovieDetail}/>
                </Switch>
            </div>
        );
    }
}