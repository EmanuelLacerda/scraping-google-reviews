from .models import Business, Review
from .serializers import BusinessSerializer, ReviewSerializer
from rest_framework.generics import get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        business = self.get_object()
        serializer = ReviewSerializer(business.reviews.all(), many=True)

        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer