"""drfProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView,UserDetailsView,
)
from rest_auth.registration.views import(
    RegisterView,
)

urlpatterns = [
    # path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/login/', LoginView.as_view(), name='rest_login'),
    path('rest-auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('rest-auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('rest-auth/password/change', PasswordChangeView.as_view(), name='rest_password_change'),
    path('admin/', admin.site.urls),
    path('', include('mainApp.urls'))

    
    
]
