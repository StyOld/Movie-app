import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// export default
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
            <div className='container'>
                <Nav tabs>
                    <NavItem>
                        <Link to ={`/movie/${this.props.itemId}/detail`}>
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

                {/*<TabContent activeTab={this.state.activeTab}>*/}
                    {/*<TabPane tabId="1">*/}
                        {/*<MovieDetail />*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tabId="2">*/}
                        {/*<MovieVideos />*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tabId="3">*/}
                        {/*<MovieCredits />*/}
                    {/*</TabPane>*/}
                {/*</TabContent>*/}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         moviesDetails: state.movie.moviesDetails
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//     },dispatch)
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(MovieTabs);