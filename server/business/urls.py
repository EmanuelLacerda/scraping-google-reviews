from rest_framework.routers import SimpleRouter
from server.business.views import BusinessViewSet, ReviewViewSet

router = SimpleRouter()
router.register('business', BusinessViewSet)
router.register('avaliacoes', ReviewViewSet)

urlpatterns = [
]