from django.db import models

''' Create your models here.
class Product(models.Model):
    COLLECTION_CHOICES = [
        ('heritage', 'Classic Heritage Series'),
        ('artisan', 'Royal Artisan Series'),
        ('maharaja', 'Maharaja Collection'),
        ('limited', 'Limited Edition'),
    ]
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.PositiveIntegerField()
    collection = models.CharField(max_length=20, choices=COLLECTION_CHOICES)
    embroidery_type = models.CharField(max_length=100)
    images = models.ImageField(upload_to='products/')
    is_featured = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

class Artisan(models.Model):
    name = models.CharField(max_length=100)
    profile = models.TextField()
    experience_years = models.PositiveIntegerField()
    region = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='artisans/')
    story = models.TextField()

class Consultation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    query = models.TextField()
    date_submitted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    text = models.TextField()
    country = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    date_received = models.DateTimeField(auto_now_add=True)


class Product(models.Model):
   name = models.CharField(max_length=200)
   # images = models.ImageField(upload_to='products/')
class Document(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')
   name = models.CharField(max_length=200)
   description = models.TextField()
   price = models.PositiveIntegerField()
   collection = models.CharField(max_length=20)
   embroidery_type = models.CharField(max_length=100)
   is_featured = models.BooleanField(default=False)
   created = models.DateTimeField(auto_now_add=True)

class Category(models.Model):
    name = models.CharField(max_length=50)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')

class Product(models.Model):
    # Previous fields...
    categories = models.ManyToManyField(Category)
    stock_status = models.BooleanField(default=True)
    # Remove old 'images' field '''
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    COLLECTION_CHOICES = [
        ('heritage', 'Classic Heritage Series'),
        ('artisan', 'Royal Artisan Series'),
        ('maharaja', 'Maharaja Collection'),
        ('limited', 'Limited Edition'),
    ]
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.PositiveIntegerField()
    collection = models.CharField(max_length=20, choices=COLLECTION_CHOICES)
    embroidery_type = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)
    stock_status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return f"Image for {self.product.name}"

class Artisan(models.Model):
    name = models.CharField(max_length=100)
    profile = models.TextField()
    experience_years = models.PositiveIntegerField()
    region = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='artisans/')
    story = models.TextField()

    def __str__(self):
        return self.name

class Consultation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    query = models.TextField()
    date_submitted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.name} ({self.status})"

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    text = models.TextField()
    country = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    date_received = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.client_name


 