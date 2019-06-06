from flask import request
from service_app import app
import gateway

#TODO implement by using session for agent
agent_id = 1

@app.route('/customer', methods=['GET', 'POST', 'DELETE'])
def handle_customer():
    if request.method == 'GET':
        email = request.args.get('email')
        contact_number = request.args.get('contact_number')
        return gateway.get_customer(contact_number=contact_number, email=email)

    elif request.method == 'POST':
        data = request.get_json()
        return gateway.add_customer(data['email'], data['contact_number'], data['first_name'], data['last_name'])

    elif request.method == 'DELETE':
        return 'unimplemented'

@app.route('/subscription', methods=['GET', 'POST', 'DELETE', 'PUT'])
def handle_subscription():
    if request.method == 'GET':
        customer_id = request.args.get('customer_id')
        return gateway.get_subscriptions(customer_id)
    elif request.method == 'POST':
        data = request.get_json()
        return gateway.add_subscription(data['customer_id'], data['service_id'], agent_id)
    elif request.method == 'DELETE': #TODO TEST
        data = request.get_json()
        return gateway.delete_subscription(data['customer_id'], data['servce_id'])
    elif request.method == 'PUT':
        data = request.get_json()
        return gateway.update_subscription(data['customer_id'], data['service_id'], data['status'])

@app.route('/test', methods=['GET'])
def test():
    return gateway.get_services()

@app.route('/service', methods=['GET'])
def handle_service():
    return gateway.get_services()

