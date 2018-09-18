import React from 'react';
import PropTypes from 'prop-types';
import UISelect from "../UIComponents/UISelect";
import _ from "lodash";

// Один из способов задать ссылку на массив, что бы каждый раз не было лишнего рендера, но эти данные не передаються с компонентом.
// const options = [
//     {
//         label: 'Популярные по убыванию',
//         value: 'popularity.desc'
//     },
//     ...
// ];

export default class SortBy extends React.Component {
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

    // shouldComponentUpdate(nextProps, nextStage) {
    //     return _.isEqual(nextProps, this.props) ? false : true
    // }

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
                    // label='Сортировать по:'
                    // options={optionsType}
                >
                    {optionsType.map(option => {
                        return <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    })}
                    <p>children</p>
                </UISelect>
            </div>
        )
    }
}

