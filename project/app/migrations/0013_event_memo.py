# Generated by Django 4.2.2 on 2023-07-10 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_alter_spend_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='memo',
            field=models.TextField(blank=True),
        ),
    ]