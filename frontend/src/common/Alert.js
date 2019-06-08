import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        const custom_id = `alert_modal_${this.props.cid}`;
        this.state = { instance: null, custom_id };
    }
    render() {
        return (
            <div id={this.state.custom_id} className="modal">
                <div className="modal-content">
                    <div className={`row ${this.props.type}`} ><h4>{this.props.header}</h4></div>
                    <div className='row'><p>{this.props.message}</p></div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.handle_okay.bind(this)}>Ok</a>
                </div>
            </div>
        )
    }
    componentDidMount() {
        let instance = document.getElementById(this.state.custom_id);
        instance = M.Modal.init(instance);
        this.setState({ instance })
    }

    display() {
        this.state.instance.open();
    }
    close() {
        this.state.instance.close();
    }
    handle_okay(){
        if(this.props.type == 'alert-success')
            window.location.reload();
    }
}

export default Alert;