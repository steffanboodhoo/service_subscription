import core

class SecureAPI():
    def authenticate_agent(self, email, password, hashed_password):
        return core.authenticate(email, password, hashed_password)

    def hash_password(self, email, password):
        return core.hash_with_email_and_secret(email, password)
    