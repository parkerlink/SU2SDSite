from django.urls import path, include
from .views import showUserInfo, showDirectory, showActivity

# Create the url patterns needed to display different user information
urlpatterns = [
	path('<int:id>/', showUserInfo, name='showUserInfo'),
	path('directory/', showDirectory, name='showDirectory'),
	path('activity/<int:id>/', showActivity, name='showActivity'),
]