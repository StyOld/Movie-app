import React, {Componenets} from "react";
import PropTypes from 'prop-types';
import UILabel from "./UILabel";
import _ from 'lodash'


export default class UISelect extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    // shouldComponentUpdate(nextProps, nextStage) {
    //     return _.isEqual(nextProps, this.props) ? false : true
    // }

    // shouldComponentUpdate(nextProps, nextStage) {
    //     console.log('this.props', this.props);
    //     console.log('nextProps', nextProps);
    //
    //     if (nextProps.value !== this.props.value) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        const {id, name, value, onChange, label} = this.props;
        console.log('UISelect render')

        return (
            <div className="form-group">
                {/*<label htmlFor={id}>{labelText}</label>*/}

                <UILabel id={id}>
                    {label}
                </UILabel>
                <select
                    className="form-control"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {this.props.children}

                    {/*{options.map(option => {*/}
                            {/*return <option key={option.value} value={option.value}>*/}
                                {/*{option.label}*/}
                                {/*{option.image && <img scr={option.image}>}*/}
                            {/*</option>*/}
                    {/*})}*/}

                    {/*<option value="popularity.desc">Популярные по убыванию</option>*/}
                    {/*<option value="popularity.asc">Популярные по возростанию</option>*/}
                </select>
            </div>
        );
    }
}