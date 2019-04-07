from django.contrib import admin
from tickets.models import Tickets, Comment, Announcement
from dataEntries.models import DataEntry, benefitList, climateBenefits

# Register your models here.
# Adds tickets to a data base
admin.site.register(Tickets)

# Adds comments to a data base
admin.site.register(Comment)

# Adds Announcements to a data base
admin.site.register(Announcement)

# Adds DataEntries to a data base
admin.site.register(DataEntry)

# Adds Benefit List to a data base
admin.site.register(benefitList)

# Adds Benefit List to a data base
admin.site.register(climateBenefits)