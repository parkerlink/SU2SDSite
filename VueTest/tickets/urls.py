from django.urls import path, include
from django.views.generic import TemplateView
from .views import showTickets, viewTicketContent

# Define the path that are necessary for ticket url rerouting
urlpatterns = [
	path('', showTickets, name='showTickets'),
	path('content/<int:id>/', viewTicketContent, name='viewTicketContent'),
]
