import React, { Component } from 'react';

/*params customers:Array<Customer>, load_more:Boolean*/
class CustomerSelect extends Component {
    constructor(props) {
        super(props)
        this.state = { instance: null };
    }
    render() {
        return (<div id='select_customer_modal' className="modal">
            <div className="modal-content">
                <div>
                    {this.props.customers.map((el, i) => {
                        return this.create_customer_item(el, i)
                    })}
                </div>
                <div>
                    <a href="#!" disabled={!this.props.load_more} className="waves-effect waves-green btn-flat" onClick={this.handle_load_more.bind(this)}>{this.props.load_more?'Load More':'No More Records'}</a>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>)
    }
    create_customer_item(el, i) {
        return (<div key={i} onClick={() => this.handle_select_customer(el)} data-cust-id={el.customer_id}>
            <p> {el.first_name} {el.last_name} {el.email} {el.contact_number} </p>
        </div>)
    }
    handle_select_customer(el) {
        this.props.handle_select_customer(el);
    }
    handle_load_more() {
        const name = document.getElementById('input_name_search').value; //TODO put this in customer state, de-couple
        this.props.handle_load_more_customers(name)
    }
    display() {
        this.state.instance.open();
    }
    close() {
        this.state.instance.close();
    }
    componentDidMount() {
        let instance = document.getElementById('select_customer_modal');
        instance = M.Modal.init(instance,{dismissible:false});
        this.setState({ instance })
    }
}
export default (CustomerSelect);