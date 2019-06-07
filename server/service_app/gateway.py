from service_db import ServiceAPI
import json
sdb = ServiceAPI()

def add_customer(email, contact_number, first_name, last_name):
    data = {'email':email, 'contact_number':contact_number, 'first_name':first_name, 'last_name':last_name}
    return json.dumps(sdb.add_customer(data))

def get_customer(contact_number=None, email=None):
    return json.dumps(sdb.get_customer(contact_number, email))

def get_customer_multiple(name, offset=None):
    names = name.split(' ')
    first_name, last_name = names[0], names[0] if len(names)==1 else names[1]
    return json.dumps(sdb.get_customer_multiple(first_name, last_name, offset=offset))

def get_subscriptions(customer_id):
    return json.dumps(sdb.get_subscription(customer_id))

def add_subscription(customer_id, service_id, agent_id):
    data = {'customer_id':customer_id, 'service_id':service_id, 'agent_id':agent_id, 'status':'ACTIVE'}
    return json.dumps(sdb.add_subscription(data))

def update_subscription(customer_id, service_id, status):
    return json.dumps(sdb.update_subscription(customer_id, service_id, status))

def delete_subscription(customer_id, service_id):
    return json.dumps(sdb.remove_subscription(customer_id, service_id))

def get_services():
    return json.dumps(sdb.get_all_services())