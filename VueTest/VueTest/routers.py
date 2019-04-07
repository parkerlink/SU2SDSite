from rest_framework import routers
from article.viewsets import ArticleViewSet
#ADDED
from tickets.viewset import TicketViewSet, CommentList, AnnouncementViewSet
from dataEntries.viewset import DataEntryViewSet, BenefitViewSet, ClimateViewSet
from customUsers.viewsets import ProfileViewSet

router = routers.DefaultRouter()

# Register all viewsets used for the api
router.register(r'article', ArticleViewSet)
#ADDED
router.register(r'tickets', TicketViewSet)
router.register(r'comment', CommentList, 'comment')
router.register(r'announcements', AnnouncementViewSet)

router.register(r'users', ProfileViewSet)
#New for data entries
router.register(r'entries', DataEntryViewSet)
router.register(r'climateList', ClimateViewSet)
router.register(r'benefitList', BenefitViewSet)