# Generated by Django 4.2.7 on 2024-10-22 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0002_alter_review_approximatedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]