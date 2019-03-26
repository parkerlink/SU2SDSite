from rest_framework import viewsets, filters, generics
from rest_framework.decorators import action
from .models import Tickets, Comment, Announcement
from customUsers.models import Profile
from .serializers import TicketSerializer, CommentSerializer, AnnouncementSerializer
from customEmail.customEmail import email

# Creates a viewset for a ticket model
# Queries all ticket objects
class TicketViewSet(viewsets.ModelViewSet):
	queryset = Tickets.objects.all()
	serializer_class = TicketSerializer
	filter_backends = (filters.SearchFilter,)
	search_fields = ('ticket_id', 'ticket_customer__user__first_name', 'ticket_tech__user__first_name', 'ticket_status', 'ticket_desc', 'ticket_customer__user__last_name', 'ticket_tech__user__last_name')

	# Send an email after a new ticket has been created
	def perform_create(self, serializer):
		instance = serializer.save()

		# Find the newest ticket that has been created
		allTickets = Tickets.objects.all()
		allUsers = Profile.objects.all()
		length = len(allTickets)
		temp_ticket = allTickets[length - 1]

		# Build the message for the email
		tech = 'There is no assign tech'
		rep_list = []
		if temp_ticket.ticket_tech:
			tech = 'The tech assigned to this ticket is ' + temp_ticket.ticket_tech.user.first_name
			rep_list.append(temp_ticket.ticket_tech.user.email)

		rep_list.append(temp_ticket.ticket_customer.user.email)
		message = 'Ticket %s has been created.\n%s.'%(temp_ticket.ticket_id, tech)

		# for user in allUsers:
		# 	if user.department == 'IT':
		# 		rep_list.append(user.user.email)


		email('Ticket Created', message, rep_list)

# Creates a viewset for a comment model
# Queries all comment objects
class CommentList(viewsets.ModelViewSet):
	serializer_class = CommentSerializer

	#queryset = Comment.objects.all()
	def get_queryset(self):
		queryset = Comment.objects.all()
		current_ticket_id = self.request.query_params.get('ticket', None)
		if current_ticket_id is not None:
			queryset = queryset.filter(ticket=current_ticket_id)
		return queryset

	filter_backends = (filters.SearchFilter,)
	search_fields = ('comment_auth')

class AnnouncementViewSet(viewsets.ModelViewSet):
	queryset = Announcement.objects.all()
	serializer_class = AnnouncementSerializer
	