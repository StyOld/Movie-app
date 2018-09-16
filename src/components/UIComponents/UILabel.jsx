import React, {Componenets} from "react";

class UILabel extends React.PureComponent {
    // shouldComponentUpdate(nextProps, nextStage) {
    //     console.log('this.props', this.props)
    //     console.log('nextProps', nextProps)
    //
    //     if (nextProps.id !== this.props.id) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        const {id, children} = this.props;
        // console.log('UILabel render')
        return <label htmlFor={id}>{children()}</label>
    }
}
export default UILabel;