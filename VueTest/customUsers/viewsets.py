from rest_framework import viewsets, filters
from .models import Profile
from .serializers import ProfileSerializer
#from django.contrib.auth.models import User
#from itertools import chain


# Create the viewset that will be used to view a profile over the api
class ProfileViewSet(viewsets.ModelViewSet):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer

	def get_queryset(self):
		queryset = Profile.objects.all()
		current_user_id = self.request.query_params.get('user', None)
		if current_user_id is not None:
			queryset = queryset.filter(user=current_user_id)
		return queryset
