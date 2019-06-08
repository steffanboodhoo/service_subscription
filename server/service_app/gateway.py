from service_db import ServiceAPI
from security import SecureAPI
from service_email import core as smail
import traceback
import json
sdb = ServiceAPI()
sec = SecureAPI()

def authenticate(email, password):
    try:
        agent = sdb.get_agent(email)
        authenticated = sec.authenticate_agent(email, password, agent['password'])
        if authenticated and agent['validated']==1:
            return {'status':'success', 'agent_id':agent['agent_id'], 'email':agent['email']}
        elif authenticated:
            return {'status':'failure', 'message':'agent email account not validated'}
        else:
            return {'status':'failure', 'message':'wrong email and or password'}
    except Exception as e:
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
    resp = sdb.add_customer(data)
    code = 200 if resp['status'] == 'success' else 409
    return json.dumps(resp), code

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
    resp = sdb.add_subscription(data)
    print resp
    if resp['status'] == 'success' : smail.service_update_email(resp['customer']['email'], resp['customer']['first_name']+resp['customer']['last_name'], resp['service']['name'], 'ACTIVE')
    code = 200 if resp['status'] == 'success' else 409
    return json.dumps(resp), code

def update_subscription(customer_id, service_id, status):
    resp = sdb.update_subscription(customer_id, service_id, status)
    if resp['status'] == 'success' : smail.service_update_email(resp['customer']['email'], resp['customer']['first_name']+resp['customer']['last_name'], resp['service']['name'], status)
    code = 200 if resp['status'] == 'success' else 409
    return json.dumps(resp), code

def delete_subscription(customer_id, service_id):
    resp = sdb.remove_subscription(customer_id, service_id)
    print resp
    if resp['status'] == 'success' : smail.service_update_email(resp['customer']['email'], resp['customer']['first_name']+resp['customer']['last_name'], resp['service']['name'], 'TERMINATED')
    code = 200 if resp['status'] == 'success' else 409
    return json.dumps(resp), code

def get_services():
    return json.dumps(sdb.get_all_services())