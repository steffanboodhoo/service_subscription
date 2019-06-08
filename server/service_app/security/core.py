import hashlib, binascii
from simplecrypt import encrypt, decrypt
from service_app import config

def authenticate(email, password, hashed_password):
    return hashed_password == hash_with_email_and_secret(email, password)

def hash_with_email_and_secret(email, password):
    h = hashlib.new('ripemd160')
    h.update(email+password+config.PASSWORD_SALT)
    return h.hexdigest()

def email_token_encrypt(message):
    cipher = encrypt(config.ENCRYPTION_PASSWORD, message)
    token = binascii.hexlify(cipher)
    return token 

def email_token_decrypt(token):
    cipher = binascii.unhexlify(token)
    message = decrypt(config.ENCRYPTION_PASSWORD, cipher)
    return message