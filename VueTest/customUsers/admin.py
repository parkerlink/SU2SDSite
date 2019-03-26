from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Profile

# Define the layout of the additions in the admin console
class ProfileInline(admin.StackedInline):
	model = Profile
	can_delete = False
	verbose_name_plural = 'Profile'
	fk_name = 'user'

# Adds to the admin console that is given by default
class CustomUserAdmin(UserAdmin):
	inlines = (ProfileInline,)
	list_display = ('first_name', 'last_name', 'username', 'email', 'get_calories_burned', 'get_phoneNumber', 'get_stairs_climbed','get_steps_taken')
	list_select_related = ('profile', )

	def get_calories_burned(self, instance):
		return instance.profile.totalCaloriesBurned
	get_calories_burned.short_description = 'Calories Burned'

	def get_stairs_climbed(self, instance):
		return instance.profile.totalStairsStepped
	get_stairs_climbed.short_description = 'Stairs Climbed'

	def get_steps_taken(self, instance):
		return instance.profile.totalStepsTaken
	get_steps_taken.short_description = 'Steps Taken'

	# Allows the phone number to be displayed in the admin console
	def get_phoneNumber(self, instance):
		return instance.profile.phone_number
	get_phoneNumber.short_description = 'Phone Number'

	# Override the get_inline_instances method so that only the inlines
	# in the edit form are displayed
	def get_inline_instances(self, request, obj=None):
		if not obj:
			return list()
		return super(CustomUserAdmin, self).get_inline_instances(request, obj)

# Unregister the default user model first
admin.site.unregister(User)
# Register the new custom user that has been created
admin.site.register(User, CustomUserAdmin)
