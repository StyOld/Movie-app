import React from "react";
import PropTypes from 'prop-types';
import UILabel from "./UILabel";

export default class UISelect extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const {id, name, value, onChange, label, children} = this.props;

        return (
            <div className="form-group">
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
                    {children}
                </select>
            </div>
        );
    }
}