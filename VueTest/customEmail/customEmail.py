from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMultiAlternatives


def email(sub, mes, rep_list):
    subject = sub
    message = mes
    email_from = settings.EMAIL_HOST_USER
    recipient_list = rep_list#['ibbrcompanyemail@gmail.com', 'parkerlink2000@gmail.com']
    send_mail(subject, message, email_from, recipient_list)
#     temp = str()
#     subject, from_email, to = 'hello', 'ibbrcompanyemail@gmail.com', 'ibbrcompanyemail@gmail.com'
#     text_content = 'This is an important message.'
#     for user in user_list:
#     	print(user.user.first_name + " " + user.user.last_name)
#     	temp += str(user.user.first_name + " " + user.user.last_name + ": ")


#     html_content = temp	
#     msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
#     msg.attach_alternative(html_content, "text/html")
#     msg.send()