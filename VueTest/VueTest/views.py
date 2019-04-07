from django.shortcuts import render

# Display the homepage for the website. This is defaulted to happen
# when there is no path specified
def showHome(request):
	# Display the main homepage for the site
	return render(request, 'home.html', {})

# Display the dashboard html page when the function is called
def showDash(request):
	# Display the user page for the site
	return render(request, 'dashboard.html', {})

# Display the Activity of an individual when the function is called
def showActivity(request):
	# Display the activity page for the site
	return render(request, 'activity.html', {})

def showAboutUs(request):
	# Display the activity page for the site
	return render(request, 'aboutUs.html', {})

def showDenied(request):
	# Display the activity page for the site
	return render(request, 'denied.html', {})

def showBenefits(request):
	# Display the activity page for the site
	return render(request, 'benefitPage.html', {})