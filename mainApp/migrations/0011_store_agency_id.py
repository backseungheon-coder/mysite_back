# Generated by Django 3.1.3 on 2022-06-05 12:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0010_auto_20220530_0332'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='agency_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
