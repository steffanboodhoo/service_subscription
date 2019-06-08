from service_db import ServiceAPI
from security import SecureAPI
from service_email import core as smail
import traceback
import json
sdb = ServiceAPI()
sec = SecureAPI()

def authenticate(email, password):
    agent = sdb.get_agent(email)
    authenticated = sec.authenticate_agent(email, password, agent['password'])
    if authenticated and agent['validated']==1:
        return {'status':'success', 'agent_id':agent['agent_id'], 'email':agent['email']}
    elif authenticated:
        return {'status':'failure', 'message':'agent email account not validated'}
    else:
        return {'status':'failure', 'message':'wrong email and or password'}

def register_agent(email, password):
    hashed_password = sec.hash_password(email, password)
    data = {'email':email, 'password':hashed_password, 'validated':0}
    try:
        resp = sdb.add_agent(data)
        [validate_token, invalidate_token] = sec.create_email_tokens(email)
        smail.account_validation_email(email, validate_token, invalidate_token)
        return json.dumps(resp)
    except Exception as e: #the only remaining possibility is the db HIT on email
        traceback.print_exc()
        return json.dumps({'status':'failure', 'message':'Email already exists'}), 409
    
def handle_validation(token):
    [action, email] = sec.read_email_token(token)
    print action, email
    if action == 'VALIDATE':
        return json.dumps(sdb.update_agent_validation(email))
    elif action == 'INVALIDATE':
        return json.dumps(sdb.remove_agent(email))

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