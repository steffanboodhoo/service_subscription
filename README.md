# Service Subscription

This is an application which allows agents to sign up, and manage services of customers. 

### Context and Processes
##### Signing up / Login
An agent has to visit the site at http://167.99.11.34 then select register. After filling out the information (email and password), an unvalidated account is created and an email is sent to the agent for them to validate / invalidate the account (confirming that they created it). Only after validating, the agent can login, they will get a message prompting them to do so otherwise.

##### Searching for customers
An agent can search for customers in two ways, either directly by entering their full contact number or full email address. It is assumed the agent would have the contact_number or email already for this. The second way is searching by name, the agent can enter any part of the customer's name (limited to a minimum of 3 characters for practicality - prevention of user inefficiency). A list of users comes up, the agent can either select the customer if they are within the first fetch or load more.

##### Managing services
The agent is presented with 3 tabs upon selecting a customer. 1 - details, 2 - subscribe a customer to a service, 3 - manage these customer services. 2 - To add/subscribe a customer to a service, the agent selects from a drop down of available services to THAT CUSTOMER, and selects add. 3 - Managing services in this context means either removing/unsubscribing a service from a customer OR activating or suspending a service. Services can be suspended and activated for a variety of reasons. When a customer is subscribed to a service, unsubscribed, or their service is suspended or activated (after being previously suspended), they are sent an email informing them of this change.

##### Adding a customer
An agent can add a customer by clicking the button indicated. They are then given a diaog with the form to do so.

### Setting up the app yourself
##### Code base
Start off by simply cloning this repository

`clone https://github.com/steffanboodhoo/service_subscription.git`

##### Environment
Python version 2.7 is used for this project. Ideally we would like to not pollute the global environment, and to do so we can use a virtual environment; this is provided by python's [virtualenv](https://virtualenv.pypa.io/en/latest/installation/). 

`pip install virtualenv`

We can now create a virtual environment for our application, I usually create mine in the directory of the server application (the same folder that contains wsgi.py). We can create a virtual environment by calling virtualenv and the name of the folder. Here I am naming mine 'env'

`virtualenv env`

We can now activate the virtual environment.

`. env/bin/activate`

You should see the name of the folder in brackets at the start of your prompt like so `(env)`. You can now install the necessary libraries in the environment as indicated by the `requirements.txt` file in the server directory (the same folder that contains wsgi.py)

`pip install -r requirements.txt`

At the point you have almost all the necessary blocks except for the local configurations.

##### Configurations

All configurations are loaded from a single file config.py, this file is missing from the repository, you will have to create this in the service_app directory of the server (same directory that has routes.py). You can use whatever means to fill in the parameters, random generators, text you feel like putting, the only things that actually **need** to be changed are **DB_URI**, the **ADDRESS** and **PASSWORD** fields of the **EMAIL** dict and **SERVER**. 

The following is an example file, you can copy and paste and change to suit.

```python
DB_URI = '' #mysql://<user>:<password>@<host>/<database> e.g. mysql://steffan:stefpass@localhost/subscription

PASSWORD_SALT = 'any sort of salt is fine' #used to hash passwords
JWT_SECRET = 'again some sort of secret man' #used to encode json web token
SECRET_KEY = 'this is another secret boi' #used to sign cookie

EMAIL = {
    'ADDRESS' : 'example@gmail.com',
    'PASSWORD': 'examplePassword'
}
ENCRYPTION_PASSWORD = 'something random to encrypt'

SERVER = 'http://your_server' # used for things like link creation
```

##### Basic Running

At this point you can run the server as is in development mode by calling

`python wsgi.py`

## Production considerations

##### Gateway
As you have may noticed the file we call is called wsgi.py. That is because of course the intention was to use [uwsgi](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html) to run the application. uwsgi should already be installed and if not

`pip install uwsgi`

The (subjectively maybe objectively) best way to use this is with an ini file so all the configurations for the app is there. In the repo there is already included an ini file. Now you can use uwsgi to run the application like so.

`uwsgi --ini service_app.ini`

This, as you can see spawns threads and runs on sock/port configured in the service_app.ini file. This however does not accept web or http requests directly, as it is tailed to handle specificly a specification for the work of python and also there are many other great solutions like the [nginx]https://www.nginx.com/resources/wiki/start/topics/tutorials/install/). Follow the link to install for your distribution.

We need to add a configuration for our application, the location for this can vary depending on your distribution but the following is the configuration I created/am using for this application.

```
upstream service_app{
	server unix:/home/service_subscription/server/service_app.sock max_fails=1 fail_timeout=5s;
}

server {
    listen 80;

    location / {
        include uwsgi_params;
	uwsgi_pass service_app;
    }
}

```

Finally while this links to the uwsgi process that you run in the command line, we need something a bit more robust, for that we can create a service. The service file in the repository uses the virtual environment we created. To set this up you can create a symlink of that file into your services directory for your OS.

`ln -s /home/service_subscription/server/service_app.service /etc/systemd/system`

then enable the service like so

`systemctl enable service_app`

Now we can start and stop this service like any other by using systemctl or service e.g.

`service service_app start`

There ya go :v 







