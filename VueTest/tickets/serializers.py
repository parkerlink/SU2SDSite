from rest_framework import serializers
from .models import Tickets, Comment, Announcement
from customUsers.models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user']

# Create a serializer for a ticket. It will be based off of the
# Tickets model and will use all the fields
class TicketSerializer(serializers.ModelSerializer):
    ticket_tech = ProfileSerializer(read_only=True) 
    ticket_tech_id = serializers.IntegerField(write_only=True, required = False, allow_null = True)

    # ---- ADD SINCE LAST WORKING VERSION, HAS NOT BEEN TESTED ---- #
    ticket_customer = ProfileSerializer(read_only=True)             #
    ticket_customer_id = serializers.IntegerField(write_only=True)  #
    # ------------------------------------------------------------- #
    
    class Meta:
        model = Tickets
        fields = '__all__'

# Create a serializer for a comment. It will be based off of the
# Comment model and will use all the fields
class CommentSerializer(serializers.ModelSerializer):
	# ---- ADD SINCE LAST WORKING VERSION, HAS NOT BEEN TESTED ---- #
    #comment_auth = ProfileSerializer(read_only=True)                #
    #comment_auth_id = serializers.IntegerField(write_only=True)     #
    # ------------------------------------------------------------- #

    class Meta:
        model = Comment
        fields = '__all__'

# Create a serializer for an announcement. 
class AnnouncementSerializer(serializers.ModelSerializer):
    announcement_title = serializers.CharField(max_length=200) 
    announcement_text = serializers.CharField(max_length=200)

    class Meta:
        model = Announcement
        fields = '__all__'