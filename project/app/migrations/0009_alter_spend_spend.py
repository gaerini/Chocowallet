# Generated by Django 4.2.2 on 2023-07-02 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_spend_author_alter_spend_spend'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spend',
            name='spend',
            field=models.IntegerField(),
        ),
    ]
