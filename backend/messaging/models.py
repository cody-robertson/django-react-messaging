from django.db import models


# Create your models here.
class Conversation(models.Model):
    title = models.CharField(max_length=100)
    start_date = models.DateField()
