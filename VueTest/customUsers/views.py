from django.shortcuts import render
from .models import Profile

# Create your views here.
def showUserInfo(request, id):
	# Get the profile of the user how id matches the id of user in the database
	user_info = Profile.objects.get(user=id)

	# Render the request passing in the specified user
	return render(request, 'userProfile.html', {'user_info':user_info})

def showDirectory(request):
	# Get all the users in the database
	all_users = Profile.objects.all()

	# Render the request passing in a list of all the user
	return render(request, 'directory.html', {'user_list':all_users})

def showActivity(request, id):
	# Get the profile of the user that matches the ID
	user_info = Profile.objects.get(user=id)

	# Render the request passing in the specified user
	return render(request, 'activity.html', {'user_info':user_info}) 