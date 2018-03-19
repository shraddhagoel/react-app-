import React from 'react';
class InputError extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // const errorClass = this.props.visible ? 'error-message' : 'hidden';
        const { visible } = this.props;
        if (!visible) {
            return null;
        }

        return (
            <div >
                <span className='help-block'>{this.props.errorMessage}</span>
            </div>
        )
    }
}

export default InputError;