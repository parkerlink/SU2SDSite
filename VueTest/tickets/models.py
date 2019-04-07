from django.db import models
from django.db.models.signals import post_save
from customUsers.models import Profile

# Ticket model that defines what fields make up a ticket
class Tickets(models.Model):

	# All the possible status options used in the ticket status field
	STATUS = [
		('Active', 'Active'),
		('Resolved', 'Resolved'),
		('On-hold', 'On-hold'),
	]

	# All the fields that make up a ticket
	ticket_id = models.AutoField(primary_key=True)
	ticket_status = models.CharField(max_length=8, choices=STATUS)
	#ticket_tech = models.CharField(max_length=50, default='NONE', blank=True, null=True)
	ticket_tech = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, related_name='ticket_tech', null=True)
	#ticket_customer = models.CharField(max_length=50)
	ticket_customer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='ticket_customer')
	ticket_desc = models.TextField()
# Comment model that defines what fields make up a comment
class Comment(models.Model):

	# All the possible status options used in the ticket status field
	STATUS = [
		('Active', 'Active'),
		('Resolved', 'Resolved'),
		('On-hold', 'On-hold'),
	]

	# All the fields that make up a comment
	comment_text = models.TextField()
	comment_auth = models.CharField(max_length=50, default='NONE')
	#comment_auth = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comment_auth')
	comment_time = models.DateTimeField(auto_now_add=True, blank=True)
	comment_status = models.CharField(max_length=8, choices=STATUS, default='Active')
	# Allows multiple comments to relate to a ticket
	ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE)

# Announcement modal that defines what fields make up a announcement
class Announcement(models.Model):

	# All the fields that make up an announcement
	announcement_title = models.CharField(max_length=50, default='NONE')
	announcement_text = models.TextField()
