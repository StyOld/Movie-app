import React from 'react';
import PropTypes from 'prop-types';
import UISelect from "../UIComponents/UISelect";

export default class PrimaryReleaseYear extends React.PureComponent {
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
        console.log('primary_release_year');

        return (
            <div>
                <UISelect
                    id="primary_release_year"
                    name="primary_release_year"
                    value={primary_release_year}
                    onChange={onChangeFilters}
                    label={LabelText}
                    // options={optionsYear}
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