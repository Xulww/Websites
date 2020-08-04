# Generated by Django 3.0.8 on 2020-07-24 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0002_auto_20200724_0748'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='surname',
        ),
        migrations.AlterField(
            model_name='ticket',
            name='name',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='flights.Person'),
        ),
    ]
