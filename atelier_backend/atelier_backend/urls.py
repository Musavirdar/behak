"""
URL configuration for atelier_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from atelier.views import ProductViewSet, ArtisanViewSet, ConsultationViewSet, TestimonialViewSet
from atelier.views import UserRegisterView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="Kashmir Atelier API",
      default_version='v1',
      description="API documentation for your project",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="admin@atelier.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# Url patern
urlpatterns = [
    path('admin/', admin.site.urls),
    path('atelier/', include('atelier.urls')),
    path('api/register/', UserRegisterView.as_view()),
    path('api/login/', obtain_auth_token),
   # path('api/' ,include(router.urls)),
     path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

# Serve files during development (DO NOT use this in production!)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('artisans', ArtisanViewSet)
router.register('consultations', ConsultationViewSet)
router.register('testimonials', TestimonialViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]