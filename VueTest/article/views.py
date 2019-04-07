from django.shortcuts import render
from .models import Article

# Displays the main webpage for the articles
def showArticle(request):

	return render(request, 'index.html', {})