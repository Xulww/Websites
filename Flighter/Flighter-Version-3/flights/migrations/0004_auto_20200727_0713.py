# Generated by Django 3.0.8 on 2020-07-27 07:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0003_auto_20200724_1308'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='datetime',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
