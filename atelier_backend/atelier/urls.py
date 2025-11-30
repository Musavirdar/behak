from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ArtisanViewSet, ConsultationViewSet, TestimonialViewSet

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('artisans', ArtisanViewSet)
router.register('consultations', ConsultationViewSet)
router.register('testimonials', TestimonialViewSet)

urlpatterns = router.urls
