# Generated by Django 2.1.7 on 2019-03-13 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('article_id', models.AutoField(primary_key=True, serialize=False)),
                ('article_heading', models.CharField(max_length=250)),
                ('article_author', models.CharField(default='NAME', max_length=50)),
                ('article_body', models.TextField()),
            ],
        ),
    ]
