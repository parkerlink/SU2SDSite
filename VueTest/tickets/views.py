from django.shortcuts import render
from .models import Tickets, Comment, Announcement
# MAYBE
from customUsers.models import Profile
from rest_framework import generics, filters
from .serializers import CommentSerializer

# from django.core.mail import send_mail
# from django.conf import settings
# from django.core.mail import EmailMultiAlternatives


# def email(request,user_list):
#     # subject = 'Thank you for registering to our site'
#     # message = 'user_list'
#     # email_from = settings.EMAIL_HOST_USER
#     # recipient_list = ['ibbrcompanyemail@gmail.com']
#     # print(user_list)
#     # send_mail(subject, message, email_from, recipient_list)
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


# Shows the main ticket page where a list of all the tickets can be seen and 
# each ticket can be added, editied, and deleted
def showTickets(request):
	# Get the status options for the tickets 
	status = Tickets.STATUS
	# Get a list of all the users in the database and pass to the page
	user_list = Profile.objects.all()
	# Renders the appropriate html page passing in the status options
	#email(request,user_list)
	return render(request, 'tickets.html', {'status_opt':status, 'user_list':user_list})
	

# Shows the content for each individual ticket including the status, author,
# description and allow comments to be added
def viewTicketContent(request, id):
	# Sets a variable to the ticket object that matches the id specified in the request
	ticket = Tickets.objects.get(ticket_id=id)
	# Collects all comments that are related to the ticket specified in the request
	comments = Comment.objects.filter(ticket=id)
	# Get that status options for a comment
	status = Comment.STATUS

	# Renders the ticket viewing html page passing in all ticket information relating to that ticket
	# as well as all comments relating to the ticket and all status options
	return render(request, 'individualTicket.html', {'ticket_info':ticket, 'ticket_comment':comments, 'status_opt':status})

#Shows all the announcements
def viewAnnouncementContent(request, id):
	# Sets a variable to the ticket object that matches the id specified in the request
	announcements = Announcement.objects.get(id=id)
	# Collects all comments that are related to the ticket specified in the request

	# Renders the ticket viewing html page passing in all ticket information relating to that ticket
	# as well as all comments relating to the ticket and all status options
	return render(request, 'fullAnnouncement.html', {'announcement_info':announcements})
