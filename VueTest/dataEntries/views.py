from django.shortcuts import render
from .models import DataEntry, benefitList, climateBenefits
# MAYBE
from customUsers.models import Profile
from rest_framework import generics, filters
from django.contrib.auth.decorators import login_required, user_passes_test


def generateBenefitPage(request):
	# Get a list of all the users in the database and pass to the page
	#Add it so that you add the user to the parameter and you match only send back data of that one person
    benefit_list = benefitList.objects.all()
    climate_list = climateBenefits.object.all()

    # Renders the appropriate html page passing in the status options
	# email(request,user_list)
    return render(request, 'benefitList.html', { 'benefit_list':benefit_list, 'climate_list':climate_list })

@login_required

# Create your views here.
def showEntries(request):
	# Get a list of all the users in the database and pass to the page
	#Add it so that you add the user to the parameter and you match only send back data of that one person
    current_user = request.user
    user_list = Profile.objects.all()
    

    # Renders the appropriate html page passing in the status options
	# email(request,user_list)
    return render(request, 'entries.html', { 'user_list':user_list, 'current_user': current_user})

    
#Requires you to be logged in AND an admin user
@login_required
@user_passes_test(lambda u: u.groups.filter(name='Admin').count() == 1, login_url='/denied/')
def showOneEntry(request, id):
	# Sets a variable to the ticket object that matches the id specified in the request

	# Get that status options for a comment


	# Renders the ticket viewing html page passing in all ticket information relating to that ticket
	# as well as all comments relating to the ticket and all status options
	return render(request, 'individualStudentEntries.html')


#Requires you to be logged in AND an admin user
@login_required
@user_passes_test(lambda u: u.groups.filter(name='Admin').count() == 1, login_url='/denied/')
def showTeacherView(request):
	# Get a list of all the users in the database and pass to the page
	#Add it so that you add the user to the parameter and you match only send back data of that one person
    current_user = request.user
    print(current_user.id)
    user_list = Profile.objects.all()

    # Renders the appropriate html page passing in the status options
	# email(request,user_list)
    return render(request, 'teacherView.html', { 'user_list':user_list, 'current_user': current_user})
    