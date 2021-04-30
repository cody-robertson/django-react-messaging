from rest_framework import serializers
from .models import Conversation


class ConversationSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(source='start_date')

    class Meta:
        model = Conversation
        fields = ['id', 'title', 'startDate']
