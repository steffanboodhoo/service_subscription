from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from models import Base, Agent, Customer, Service, Subscription, Log
import core
import traceback
from service_app import config
engine = create_engine(config.DB_URI, echo=False)
Base.metadata.create_all(engine)
LIMIT = 3

class ServiceAPI():
    def get_agent(self, email):
        session = Session(engine)
        filters = {'email': email}
        agent = self.clean_records(core.get(session, Agent, filters))[0]
        session.close()
        return agent
    
    def add_agent(self, data):
        session = Session(engine)
        status = core.insert(session, Agent, data)
        session.close()
        return status

    def update_agent_validation(self, email):
        session = Session(engine)
        filters = {'email': email}
        update = {'validated': 1}
        status = core.update(session, Agent, filters, update)
        session.close()
    
    def remove_agent(self, email):
        session = Session(engine)
        filters = {'emal': email}
        status = core.delete(session, Agent, filters)
        session.close()
        return status

    def get_all_services(self):
        session = Session(engine)
        records = self.clean_records(core.get(session, Service))
        session.close()
        return records

    def add_customer(self, data):
        session = Session(engine)
        try:
            status = core.insert(session, Customer, data)
            session.close()
            return status
        except Exception as e:
            return {'status':'failure'}

    def get_customer(self, contact_number=None, email=None):
        session = Session(engine)
        if email == None and contact_number == None:
            return {'status': 'failure', 'message': 'no filter provided, please send either email or contact number'}
        elif contact_number != None:
            filters = {'contact_number': contact_number}
        else:
            filters = {'email': email}
        customer = self.clean_records(core.get(session, Customer, filters))[0]
        session.close()
        return customer

    def get_customer_multiple(self, first_name, last_name, offset=None):
        session = Session(engine)
        limit = LIMIT
        if offset is None:
            offset = 0
        else:
            offset = int(offset)
            limit = offset + LIMIT
        customers = self.clean_records(core.handle_get_customer_multiple(
            session, Customer, first_name, last_name, limit=limit, offset=offset))
        session.close()
        return customers

    def get_subscription(self, customer_id):
        session = Session(engine)
        filters = {'customer_id': customer_id}
        records = self.clean_records(core.get(session, Subscription, filters))
        session.close()
        return records

    def add_subscription(self, data):
        session = Session(engine)
        try:
            status = core.insert(session, Subscription, data)
            status['customer'] = self.clean_records(core.get(session, Customer, {'customer_id': data['customer_id']}))[0]
            status['service'] = self.clean_records(core.get(session, Service, {'service_id':data['service_id']}))[0]
            session.close()
            return status
        except Exception as e:
            traceback.print_exc()
            return {'status':'failure'}


    def update_subscription(self, customer_id, service_id, status):
        session = Session(engine)
        filters = {'customer_id': customer_id, 'service_id': service_id}
        update = {'status': status}
        try:
            status = core.update(session, Subscription, filters, update)
            status['customer'] = self.clean_records(core.get(session, Customer, {'customer_id': customer_id}))[0]
            status['service'] = self.clean_records(core.get(session, Service, {'service_id':service_id}))[0]
            session.close()
            return status
        except Exception as e:
            return {'status':'failure'}

    def remove_subscription(self, customer_id, service_id):
        session = Session(engine)
        filters = {'customer_id': customer_id, 'service_id': service_id}
        try:
            status = core.delete(session, Subscription, filters)
            status['customer'] = self.clean_records(core.get(session, Customer, {'customer_id': customer_id}))[0]
            status['service'] = self.clean_records(core.get(session, Service, {'service_id':service_id}))[0]
            session.close()
            return status
        except Exception as e:
            return {'status':'failure'}


    def get_service_update_email_data(self, customer_id, service_id):
        session = Session(engine)
        customer_filters = {'customer_id': customer_id}
        service_filters = {'service_id':service_id}
        customer = self.clean_records(core.get(session, Customer, customer_filters))[0]
        service = self.clean_records(core.get(session, Service, service_filters))[0]
        session.close()
        return [Customer, Service]
    # def update_subscription(self, customer_id, service_id, )

    def clean_records(self, dirty_records):
        clean_records = []
        for rec in dirty_records:
            rec = rec.__dict__
            rec.pop('_sa_instance_state')
            clean_records.append(rec)
        return clean_records
