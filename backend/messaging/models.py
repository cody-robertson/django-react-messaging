from django.db import models


# Create your models here.
class Conversation(models.Model):
    title = models.CharField(max_length=100)
    start_date = models.DateField()

    class Meta:
        ordering = ['-start_date']


class Message(models.Model):
    text = models.TextField()
    time_sent = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)

    class Meta:
        ordering = ['time_sent']


class Thought(models.Model):
    text = models.TextField()
    time_sent = models.DateTimeField()
    message = models.ForeignKey(Message, on_delete=models.CASCADE)

    class Meta:
        ordering = ['time_sent']
