# Generated by Django 3.1.3 on 2022-05-20 04:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0005_cal_inner_caladd_faq_faq_cate_notice_notice_cate_notice_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='caladd',
            name='cal_inner',
        ),
        migrations.AddField(
            model_name='cal_inner',
            name='cal_inner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainApp.caladd'),
        ),
    ]
