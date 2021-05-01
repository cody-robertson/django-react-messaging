from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer, ThoughtSerializer


# Create your views here.
class ConversationList(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return Conversation.objects.filter(title__startswith=search)


class MessageList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        search = self.request.query_params.get('q', '')
        print("Search", search, conversation_id)
        conversation = get_object_or_404(Conversation, pk=conversation_id)
        return Message.objects.filter(conversation=conversation, text__icontains=search).prefetch_related('thought_set')

    def perform_create(self, serializer):
        conversation_id = self.kwargs['conversation_id']
        conversation = get_object_or_404(Conversation, pk=conversation_id)
        serializer.save(conversation=conversation)


class ThoughtList(generics.ListCreateAPIView):
    serializer_class = ThoughtSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        message_id = self.kwargs['message_id']
        message = get_object_or_404(Message, pk=message_id, conversation_id=conversation_id)
        return message.thought_set.all()

    def perform_create(self, serializer):
        conversation_id = self.kwargs['conversation_id']
        message_id = self.kwargs['message_id']
        message = get_object_or_404(Message, pk=message_id, conversation_id=conversation_id)
        serializer.save(message=message)

