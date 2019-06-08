from flask import Flask
from flask_cors import CORS
import config
app = Flask(__name__)
app.secret_key = config.SECRET_KEY
#TODO remove after dev
cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers=['Content-Type'], expose_headers=['Access-Control-Allow-Origin'], supports_credentials=True)
from service_app import routes