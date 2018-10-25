import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
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
        return (
            <div className='container'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Детально
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Видео
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Актёры
                        </NavLink>
                    </NavItem>
                </Nav>
                {/* 
                <Route path="/movie/:id/images" component={MovieDetail}>
                <Route path="/movie/:id/videos" component={MovieDetail}>
                <Route path="/movie/:id/credites" component={MovieDetail} />
                */}
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <MovieDetail />
                    </TabPane>
                    <TabPane tabId="2">
                        <MovieVideos />
                    </TabPane>
                    <TabPane tabId="3">
                        <MovieCredits />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}
