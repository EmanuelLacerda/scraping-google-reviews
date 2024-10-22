from django.db import models
from django.core.validators import MaxValueValidator

class Base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True

class Business(Base):
    name = models.CharField(max_length=255)
    
    # Address
    zipcode = models.CharField(max_length=14, blank=True)
    address = models.CharField(max_length=200)
    number = models.PositiveIntegerField(blank=True, null=True, validators=[MaxValueValidator(9999999999999)])
    complement = models.CharField(blank=True,  max_length=200)
    area = models.CharField(max_length=200) # area = bairro
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=200)

    # Contact
    phone_number = models.CharField(max_length=15, unique=True, blank=True, null=True, error_messages={'unique': 'Um business com esse celular já foi cadastrado.'})

    # Google Meet Infos
    url = models.URLField(blank=True, null=True, max_length=1000)
    general_rating = models.DecimalField(default=0.0, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(5.0)])
    total_reviews = models.PositiveIntegerField(default=0, blank=True, null=True)

    class Meta:
        verbose_name = 'Business'
        verbose_name_plural = 'BusinessPlural'
    
    def __str__(self):
        return f'{self.name}'

class Review(Base):
    business = models.ForeignKey(Business, related_name='reviews', on_delete=models.CASCADE)

    # Reviewer
    profile_picture = models.URLField(blank=True, null=True, max_length=1000)
    name = models.CharField(max_length=255)

    # Review
    rating = models.DecimalField(default=0.0, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(5.0)])
    approximateDate = models.DateField()
    description = models.TextField()

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return f"{self.name} avaliou o/a {self.business} com a nota {self.rating} em {self.approximateDate}"
