# Generated by Django 3.1.3 on 2022-05-29 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0007_auto_20220520_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='faq',
            name='answer',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='faq',
            name='faq_catego',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
