"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.cover, name = 'cover'),
    path('registration/signup/', views.signup, name = 'signup'),
    path("registration/logout/", views.logout, name="logout"),
    path('calendar/<int:user_pk>', views.calendar, name='calendar'),
    path('accounts/', include('allauth.urls')),
    path('spend/', views.spend, name='spend'),
    path('delete-event/<int:event_pk>/', views.delete_event, name='delete_event'),
    path('edit/', views.edit, name="edit"),
]
