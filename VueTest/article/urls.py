from django.urls import path, include
from django.views.generic import TemplateView
from .views import showArticle

urlpatterns = [
	path('', showArticle, name='showArticle'),
]