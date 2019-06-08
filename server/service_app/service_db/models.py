from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

Base = declarative_base()

class Agent(Base):
    __tablename__ = 'agent'
    agent_id = Column(Integer, primary_key=True)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(41), nullable=False)
    validated = Column(Integer)

class Service(Base):
    __tablename__ = 'service'
    service_id = Column(Integer, primary_key=True)
    name = Column(String(50))
    description = Column(String(200))
    price = Column(Float, nullable=False)

class Customer(Base):
    __tablename__ = 'customer'
    customer_id = Column(Integer, primary_key=True)
    email = Column(String(50), unique=True)
    contact_number = Column(String(10), unique=True, nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    access_code = Column(Integer)

class Subscription(Base):
    __tablename__ = 'subscription'
    customer_id = Column(Integer, primary_key=True)
    service_id = Column(Integer, primary_key=True)
    agent_id = Column(Integer)
    status = Column(String(10))

class Log(Base):
    __tablename__ = 'log'
    log_id = Column(Integer, primary_key=True)
    agent_id = Column(Integer)
    customer_id = Column(Integer)
    service_id = Column(Integer)
    agent_action = Column(String(10))
    timestamp = Column(Integer)