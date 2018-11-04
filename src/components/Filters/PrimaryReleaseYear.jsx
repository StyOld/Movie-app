import React from 'react';
import PropTypes from 'prop-types';
import UISelect from "../UIComponents/UISelect";
import * as actionsMovies from "../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PrimaryReleaseYear extends React.Component {
    static propTypes = {
        primary_release_year: PropTypes.string.isRequired,
        onChangeFilters: PropTypes.func.isRequired
    };

    static defaultProps = {
        optionsYear : [
            {
                label: '2018',
                value: '2018'
            },
            {
                label: '2017',
                value: '2017'
            },
            {
                label: '2016',
                value: '2016'
            },
            {
                label: '2015',
                value: '2015'
            }
        ]
    };

    render() {
        const {primary_release_year, onChangeFilters, optionsYear} = this.props;
        const LabelText = () => <div>Год релиза:</div>;

        return (
            <div>
                <UISelect
                    id="primary_release_year"
                    name="primary_release_year"
                    value={primary_release_year}
                    onChange={onChangeFilters}
                    label={LabelText}
                >
                    {optionsYear.map(option => {
                        return <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    })}
                    children
                </UISelect>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        primary_release_year: state.movies.filters.primary_release_year
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangeFilters: actionsMovies.actionCreatorChangeFilters
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryReleaseYear);