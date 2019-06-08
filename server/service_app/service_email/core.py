import smtplib, os
from email.mime.text import MIMEText
from service_app import config
path = 'service_app/service_email/templates/'
def format_and_send(raw, subject, receiver_email, body_args=None):
    for arg in body_args:
        raw = raw.replace('{{%s}}'%(arg), body_args[arg])
    msg = MIMEText(raw, 'html')
    msg['Subject'] = subject
    msg['From'] = me = config.EMAIL['ADDRESS']
    msg['To'] = you = receiver_email

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(config.EMAIL['ADDRESS'], config.EMAIL['PASSWORD'])
    server.sendmail(me, you, msg.as_string())
    server.quit()
    

def account_validation_email(receiver_email, validate_token, invalidate_token):
    validate_link = config.SERVER+'/validation?token='+validate_token
    invalidate_link = config.SERVER+'validation?token='+invalidate_token
    agent_email = receiver_email
    args = {'agent_email':agent_email, 'validate_link':validate_link, 'invalidate_link':invalidate_link}
    fp = open(path+'validate_account.html', 'rb')
    raw_body = fp.read()
    fp.close()
    format_and_send(raw_body, 'Account Validation', receiver_email, args)

def service_update_email(receiver_email, customer_name, service_name, status):
    args = {'customer_name':customer_name, 'service_name':service_name, 'status':status}
    fp = open(path+'service_update.html', 'rb')
    raw_body = fp.read()
    fp.close()
    format_and_send(raw_body, 'Service Update', receiver_email, args)
    
# {order_number: 'CLOUD_111_1558030720969068, 'datetime':'12-10-3 12:22:10', reason: '1 more month(s) for instance'}
# def payment_receipt(receiver_email, args=None):
#     print(os.getcwd())
#     fp = open(path+'customer_payment_receipt.html', 'rb')
#     raw_body = fp.read()
#     fp.close()
#     format_and_send(raw_body, 'Payment Receipt', receiver_email, args)


# if __name__ == "__main__":
#     test_args = {'machine_name':'mau-meh-123', 'file':'mau-meh-123.log', 'datetime':'12-10-3 12:22:10'}
#     path = ''
#     etender_init_error(test_args)
# # Create a text/plain message
# msg = MIMEText(fp.read(), 'html')
# fp.close()
