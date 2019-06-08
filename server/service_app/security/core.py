import hashlib, binascii
from service_app import config

def authenticate(email, password, hashed_password):
    return hashed_password == hash_with_email_and_secret(email, password)

def hash_with_email_and_secret(email, password):
    h = hashlib.new('ripemd160')
    h.update(email+password+config.PASSWORD_SALT)
    return h.hexdigest()