from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Artisan, Consultation, Testimonial
from .serializers import ProductSerializer, ArtisanSerializer, ConsultationSerializer, TestimonialSerializer
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth.models import User
from rest_framework import serializers, generics
from django.core.mail import send_mail

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ArtisanViewSet(viewsets.ModelViewSet):
    queryset = Artisan.objects.all()
    serializer_class = ArtisanSerializer

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
def perform_create(self, serializer):
        consultation = serializer.save()
        send_mail(
            'New Consultation Request',
            f'From: {consultation.name}\nEmail: {consultation.email}\nQuery: {consultation.query}',
            'yourbusiness@gmail.com',
            ['admin@atelier.com'],  # destination email  
        )

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

