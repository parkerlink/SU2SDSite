from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

# Custom User model that contains all the fields that are needed
# for a user on the site
class Profile(models.Model):
	# Link the custom user to the default django user
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	position = models.CharField(max_length=50, blank=True,null=True)
	totalCaloriesBurned = models.IntegerField(default=0,blank=True,null=True)
	totalStairsStepped = models.IntegerField(default=0,blank=True,null=True)
	totalStepsTaken = models.IntegerField(default=0,blank=True,null=True,)
	totalEntries = models.IntegerField(default=0,blank=True,null=True)
	
	# Set the format for the phone number
	phone_regex = RegexValidator(regex=r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
	phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True) # validators should be a list
	image = models.ImageField(upload_to='profile_image', blank=True, null=True)

# When a save occurs, the changes will be made automatically
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
	if created:
		Profile.objects.create(user=instance)
	instance.profile.save()
