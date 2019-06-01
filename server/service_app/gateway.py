from service_db import ServiceAPI
import json
sdb = ServiceAPI()

def add_customer(email, contact_number, first_name, last_name):
    data = {'email':email, 'contact_number':contact_number, 'first_name':first_name, 'last_name':last_name}
    return json.dumps(sdb.add_customer(data))

def get_customer(email=None, contact_number=None):
    if email==None and contact_number==None:
        return {'status':'failure', 'message':'no filter provided, please send either email or contact number'}
    return 'unimplemented'


def get_subscriptions(customer_id):
    return json.dumps(sdb.get_subscription(customer_id))

def add_subscription(customer_id, service_id, agent_id):
    data = {'customer_id':customer_id, 'service_id':service_id, 'agent_id':agent_id, 'status':'ACTIVE'}
    return json.dumps(sdb.add_subscription(data))

def update_subscription(customer_id, service_id, status):
    return json.dumps(sdb.update_subscription(customer_id, service_id, status))

def delete_subscription(customer_id, service_id):
    filters = {'customer_id':customer_id, 'service_id':service_id}
    return json.dumps(sdb.remove_subscription(filters))

def get_services():
    return json.dumps(sdb.get_all_services())