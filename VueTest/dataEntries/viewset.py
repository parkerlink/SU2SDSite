from rest_framework import viewsets, filters, generics
from rest_framework.decorators import action
from .models import DataEntry, benefitList, climateBenefits
from customUsers.models import Profile
from .serializers import DataEntrySerializer, BenefitSerializer, ClimateSerializer
from customEmail.customEmail import email

class DataEntryViewSet(viewsets.ModelViewSet):
	queryset = DataEntry.objects.all()
	serializer_class = DataEntrySerializer
	filter_backends = (filters.SearchFilter,)
	search_fields = ('entry_id', 'floors_walked', 'calories_burned', 'steps_taken','entry_author')

	# Send an email after a new ticket has been created

class BenefitViewSet(viewsets.ModelViewSet):
	queryset = benefitList.objects.all()
	serializer_class = BenefitSerializer
	filter_backends = (filters.SearchFilter,)
	search_fields = ('benefit_text')

class ClimateViewSet(viewsets.ModelViewSet):
	queryset = climateBenefits.objects.all()
	serializer_class = ClimateSerializer
	filter_backends = (filters.SearchFilter,)
	search_fields = ('climate_title','climate_text')
