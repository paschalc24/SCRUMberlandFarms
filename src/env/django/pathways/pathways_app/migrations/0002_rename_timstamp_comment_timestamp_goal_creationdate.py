# Generated by Django 4.1.2 on 2022-11-17 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pathways_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='timstamp',
            new_name='timestamp',
        ),
        migrations.AddField(
            model_name='goal',
            name='creationDate',
            field=models.DateField(auto_now=True),
        ),
    ]
