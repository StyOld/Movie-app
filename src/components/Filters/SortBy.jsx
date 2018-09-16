import React from 'react';
import PropTypes from 'prop-types';
import UISelect from "../UIComponents/UISelect";
import _ from "lodash";

// const options = [
//     {
//         label: 'Популярные по убыванию',
//         value: 'popularity.desc'
//     },
//     {
//         label: 'Популярные по возростанию',
//         value: 'popularity.asc'
//     },
//     {
//         label: 'Рейтинг по убыванию',
//         value: 'vote_average.desc'
//     },            {
//         label: 'Рейтинг по возростанию',
//         value: 'vote_average.asc'
//     }
// ];

export default class SortBy extends React.Component {
    static propTypes = {
        sort_by: PropTypes.string.isRequired,
        onChangeFilters: PropTypes.func.isRequired
    }

    static defaultProps = {
        optionsType: [
            {
                label: 'Популярные по убыванию',
                value: 'popularity.desc',
                image: '/lol/jpg'
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
            ],
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
            },
        ]
    }

    // shouldComponentUpdate(nextProps, nextStage) {
    //     return _.isEqual(nextProps, this.props) ? false : true
    // }

    render () {
        const {sort_by, onChangeFilters, optionsType, primary_release_year, optionsYear} = this.props;
        const LabelText1 = () => <p>Сортировать по:</p>;
        const LabelText2 = () => <p>Год релиза:</p>;

        return (
            <div>
                <UISelect
                    id="sort_by"
                    name="sort_by"
                    value={sort_by}
                    onChange={onChangeFilters}
                    label={LabelText1}
                    // label='Сортировать по:'
                    // options={options}
                >
                    {optionsType.map(option => {
                        return <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    })}
                    <p>children</p>
                </UISelect>

                <UISelect
                    id="primary_release_year"
                    name="primary_release_year"
                    value={primary_release_year}
                    onChange={onChangeFilters}
                    label={LabelText2}
                    // options={options2}
                >
                    {optionsYear.map(option => {
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

