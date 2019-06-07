import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = { instance: null };
    }
    render() {
        return (
            <div id="alert_modal" className="modal">
                <div className="modal-content">
                    <div className={`row ${this.props.type}`} ><h4>{this.props.header}</h4></div>
                    <div className='row'><p>{this.props.message}</p></div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Ok</a>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let instance = document.getElementById('alert_modal');
        instance = M.Modal.init(instance);
        this.setState({ instance })
    }

    display() {
        this.state.instance.open();
    }
    close() {
        this.state.instance.close();
    }
}

export default Alert;