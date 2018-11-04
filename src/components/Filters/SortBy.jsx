import React from 'react';
import PropTypes from 'prop-types';
import UISelect from "../UIComponents/UISelect";
import * as actionsMovies from "../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class SortBy extends React.Component {
    static propTypes = {
        sort_by: PropTypes.string.isRequired,
        onChangeFilters: PropTypes.func.isRequired
    };

    static defaultProps = {
        optionsType: [
            {
                label: 'Популярные по убыванию',
                value: 'popularity.desc'
                // ,image: '/lol/jpg'
            },
            {
                label: 'Популярные по возростанию',
                value: 'popularity.asc'
            },
            {
                label: 'Рейтинг по убыванию',
                value: 'vote_average.desc'
            },            {
                label: 'Рейтинг по возростанию',
                value: 'vote_average.asc'
            }
        ]
    };

    render () {
        const {sort_by, onChangeFilters, optionsType} = this.props;
        const LabelText = () => <div>Сортировать по:</div>;

        return (
            <div>
                <UISelect
                    id="sort_by"
                    name="sort_by"
                    value={sort_by}
                    onChange={onChangeFilters}
                    label={LabelText}
                >
                    {optionsType.map(option => {
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
        sort_by: state.movies.filters.sort_by
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangeFilters: actionsMovies.actionCreatorChangeFilters
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);