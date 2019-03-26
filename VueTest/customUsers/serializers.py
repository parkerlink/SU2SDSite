from rest_framework import serializers
from .models import Profile

# Create a serializer for a profile. It will be based off of the
# Profile model and will use all the fields. It will also allow
# for the User models fields to be accessed through the api via
# nested serialization
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1