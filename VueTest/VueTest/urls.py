"""VueTest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .routers import router
from django.views.generic import TemplateView

# Import view functions for pages that will not be rerouted to other apps
from .views import showHome, showDenied, showBenefits
from .views import showDash
from .views import showActivity
from .views import showAboutUs
from core.views import signup

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('article/', include('article.urls')),
    path('tickets/', include('tickets.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', showHome, name='showHome'),
    path('about_us/', showAboutUs, name='showAboutUs'),
    path('activity/', showActivity, name='showActivity'),
    path('user/', include('customUsers.urls')),
    path('denied/', showDenied, name='showDenied'),

    path('entries/', include('dataEntries.urls')),

    path('dashboard/', showDash, name='showDash'),
    path('benefits/', showBenefits, name='showBenefits'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

