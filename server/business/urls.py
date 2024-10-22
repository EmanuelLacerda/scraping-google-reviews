from rest_framework.routers import SimpleRouter
from business.views import BusinessViewSet, ReviewViewSet

router = SimpleRouter()
router.register('business', BusinessViewSet)
router.register('reviews', ReviewViewSet)

urlpatterns = [
]