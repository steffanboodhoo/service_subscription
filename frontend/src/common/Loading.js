import React, { Component } from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = { instance: null };
    }
    render() {
        return (<div id="loading_modal" className="modal">
            <div className="modal-content">
                <h4>Loading...</h4>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>)
    }
    componentDidMount() {
        let instance = document.getElementById('loading_modal');
        instance = M.Modal.init(instance,{dismissible:false});
        this.setState({ instance })
    }

    display() {
        this.state.instance.open();
    }
    close() {
        this.state.instance.close();
    }
}
export default Loading;