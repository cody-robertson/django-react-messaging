from rest_framework import serializers
from .models import Conversation, Message, Thought


class ThoughtSerializer(serializers.ModelSerializer):
    timeSent = serializers.DateTimeField(source='time_sent')

    class Meta:
        model = Thought
        fields = ['id', 'text', 'timeSent', 'message_id']


class MessageSerializer(serializers.ModelSerializer):
    thought_set = ThoughtSerializer(many=True, read_only=True)
    timeSent = serializers.DateTimeField(source='time_sent')

    class Meta:
        model = Message
        fields = ['id', 'text', 'timeSent', 'thought_set', 'conversation_id']


class ConversationSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(source='start_date')

    class Meta:
        model = Conversation
        fields = ['id', 'title', 'startDate']
