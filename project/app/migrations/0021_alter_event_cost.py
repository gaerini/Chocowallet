# Generated by Django 4.2.2 on 2023-07-10 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_alter_event_cost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='cost',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
