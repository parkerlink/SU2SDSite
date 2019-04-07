from rest_framework import serializers
from .models import DataEntry, benefitList, climateBenefits
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

# DataEntry model and will use all the fields
class DataEntrySerializer(serializers.ModelSerializer):
    entry_author = ProfileSerializer(read_only=True)
    entry_author_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = DataEntry
        fields = '__all__'

# Benefit model and will use all the fields
class BenefitSerializer(serializers.ModelSerializer):
    benefit_text = serializers.CharField(max_length=2000)

    class Meta:
        model = benefitList
        fields = '__all__'

# Climate Benefits model and will use all the fields
class ClimateSerializer(serializers.ModelSerializer):
    climate_title = serializers.CharField(max_length=200)
    climate_text = serializers.CharField(max_length=2000)

    class Meta:
        model = climateBenefits
        fields = '__all__'