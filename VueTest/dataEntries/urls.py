from django.urls import path, include
from django.views.generic import TemplateView
from .views import showEntries, showTeacherView,showOneEntry

# Define the path that are necessary for Data Entry url rerouting
urlpatterns = [
	path('', showEntries, name='showEntries'),
	path('teacher_view/', showTeacherView, name='showTeacherView'),
	path('teacher_view/<int:id>/', showOneEntry, name='showOneEntry'),
	#path('content/<int:id>/', viewTicketContent, name='viewTicketContent'),
]
