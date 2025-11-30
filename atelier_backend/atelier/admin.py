from django.contrib import admin
from .models import Product, Artisan, Consultation, Testimonial, Category, ProductImage

admin.site.register([Product, Artisan, Consultation, Testimonial, Category, ProductImage])

# Register your models here.
