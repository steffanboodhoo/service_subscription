import core

class SecureAPI():
    def authenticate_agent(self, email, password, hashed_password):
        return core.authenticate(email, password, hashed_password)

    def hash_password(self, email, password):
        return core.hash_with_email_and_secret(email, password)
    
    def create_email_tokens(self, email):
        validate_token = core.email_token_encrypt('VALIDATE:'+email)
        invalidate_token = core.email_token_encrypt('INVALIDATE:'+email)
        return [validate_token, invalidate_token]

    def read_email_token(self, token):
        message = core.email_token_decrypt(token)
        [action, email] = message.split(':')
        return action, email