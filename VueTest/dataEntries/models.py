import datetime

from django.db import models
from django.db.models.signals import post_save
from customUsers.models import Profile

# Create your models here.
class DataEntry(models.Model):
	
	# All the fields that make up a ticket
	entry_id = models.AutoField(primary_key=True)
	floors_walked = models.IntegerField(null=True)
	week_number = models.IntegerField(null=True)
	calories_burned = models.IntegerField()
	steps_taken = models.IntegerField(null=True)
	entry_author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='entry_author')
class benefitList(models.Model):

	# All the fields that make up an announcement
	benefit_text = models.TextField()

class climateBenefits(models.Model):
	# All the fields that make up an announcement
	climate_title = models.CharField(max_length=100)
	climate_text = models.TextField()