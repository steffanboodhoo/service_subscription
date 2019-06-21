from flask import request, session, send_from_directory, redirect
from service_app import app, config
import gateway
from functools import wraps
import jwt, json

#TODO implement by using session for agent

def store_agent_id(session, agent_id):
    token = jwt.encode({'agent_id':agent_id}, config.JWT_SECRET)
    session['SID'] = token

def read_agent_id(session):
    token = session['SID']
    data = jwt.decode(token, config.JWT_SECRET)
    return data['agent_id']

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        agent_id = -1
        try:
            print session['TEST']
            print session['SID']
            agent_id = read_agent_id(session)
        except Exception as e:
            return json.dumps({'message':'Token is invalid/missing'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.get_json()
    resp = gateway.authenticate(data['email'], data['password'])
    if resp['status'] == 'success':
        print resp['agent_id']
        session['TEST'] = 'steffan'
        store_agent_id(session, resp['agent_id'])
        return json.dumps(resp), 200
    return json.dumps(resp), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return gateway.register_agent(data['email'], data['password'])

@app.route('/validation', methods=['GET'])
def handle_validation():
    token = request.args.get('token')
    return gateway.handle_validation(token)

@app.route('/logout', methods=['POST'])
def logout():
    print session['SID']
    session.pop('SID')
    return json.dumps({'status':'success'})

@app.route('/customer', methods=['GET', 'POST', 'DELETE'])
@auth_required
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
@auth_required
def handle_subscription():
    if request.method == 'GET':
        customer_id = request.args.get('customer_id')
        return gateway.get_subscriptions(customer_id)
    elif request.method == 'POST':
        data = request.get_json()
        agent_id = read_agent_id(session)
        return gateway.add_subscription(data['customer_id'], data['service_id'], agent_id)
    elif request.method == 'DELETE': #TODO TEST
        data = request.get_json()
        return gateway.delete_subscription(data['customer_id'], data['service_id'])
    elif request.method == 'PUT':
        data = request.get_json()
        return gateway.update_subscription(data['customer_id'], data['service_id'], data['status'])

@app.route('/customer/multiple', methods=['GET'])
@auth_required
def handle_customer_multiple():
    name = request.args.get('name')
    offset = request.args.get('offset')
    return gateway.get_customer_multiple(name, offset=offset), 200

@app.route('/service', methods=['GET'])
def handle_service():
    return gateway.get_services()

@app.route('/test', methods=['GET'])
def test():
    return gateway.get_services()

@app.route('/', methods=['GET'])
def index():
    return send_from_directory('static','index.html')

@app.errorhandler(404)
def route_not_found(e):
    # note that we set the 404 status explicitly
    return redirect('/')
# @app.route('/home', methods=['GET'])
# def home_to_index():
@app.route('/testmailabcdefg', methods=['GET'])
def test_mail():
    gateway.test_mail()
    return 'test'

# @app.route('/register', methods=['GET'])
# def register_to_index():
# @app.route('/login', methods=['GET'])