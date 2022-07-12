# Generated by Django 3.1.3 on 2022-06-10 00:28

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0014_auto_20220607_1320'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cal_store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField(default=datetime.date.today)),
                ('cal_name', models.CharField(default='', max_length=300)),
                ('cal_sub', models.CharField(default='', max_length=300)),
                ('cal_store', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.store')),
            ],
        ),
    ]
