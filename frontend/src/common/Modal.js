import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: null
        }
    }
    render() {
        return (
                <div id="custom_modal" className="modal">
                    <div className="modal-content">
                        <h4>{this.props.header}</h4>
                        <p>{this.props.message}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Ok</a>
                    </div>
                </div>
        )
    }
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', () => {
            let instance = document.getElementById('custom_modal');
            instance = M.Modal.init(instance);
            this.setState({ instance })
        })
    }

    display() {
        this.state.instance.open()
    }
}

export default Modal;