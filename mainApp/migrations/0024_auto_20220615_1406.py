# Generated by Django 3.1.3 on 2022-06-15 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0023_auto_20220615_1350'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='image_table_id',
        ),
        migrations.AddField(
            model_name='images',
            name='store_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='mainApp.store'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Image_table',
        ),
    ]
