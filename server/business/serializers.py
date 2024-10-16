from rest_framework import serializers
from .models import Business, Review

class BusinessSerializer(serializers.ModelSerializer):
    reviews = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Business
        fields = (
            'id',
            'name',
            'zipcode',
            'address',
            'number',
            'complement',
            'area',
            'state',
            'city',
            'phone_number',
            'url',
            'general_rating',
            'total_reviews',
            'created_at',
            'active',
            'reviews'
        )

class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'