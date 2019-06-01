from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from models import Base, Agent, Customer, Service, Subscription, Log
import core
from service_app import config
engine = create_engine(config.DB_URI, echo=False)
Base.metadata.create_all(engine)

class ServiceAPI():

    def get_all_services(self):
        session = Session(engine)
        records = self.clean_records(core.get(session, Service))
        session.close()
        return records

    def add_customer(self, data):
        session = Session(engine)
        status = core.insert(session, Customer, data)
        session.close()
        return status

    def get_subscription(self, customer_id):
        session = Session(engine)
        filters = {'customer_id':customer_id}
        records =  self.clean_records(core.get(session, Subscription, filters))
        session.close()
        return records

    def add_subscription(self, data):
        session = Session(engine)
        status = core.insert(session, Subscription, data)
        session.close()
        return status

    def update_subscription(self, customer_id, service_id, status):
        session = Session(engine)
        filters = {'customer_id':customer_id, 'service_id':service_id,}
        update = {'status':status}
        status = core.update(session, Subscription, filters, update)
        session.close()
        return status
    
    def remove_subscription(self, data):
        session = Session(engine)
        filters = {'customer_id':customer_id, 'service_id':service_id}
        status = core.delete(session, Subscription, filters)
        session.close()
        return status

    # def update_subscription(self, customer_id, service_id, )

    def clean_records(self, dirty_records):
        clean_records = []
        for rec in dirty_records:
            rec = rec.__dict__
            rec.pop('_sa_instance_state')
            clean_records.append(rec)
        return clean_records