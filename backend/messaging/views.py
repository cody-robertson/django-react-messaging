from rest_framework import generics
from .models import Conversation
from .serializers import ConversationSerializer


# Create your views here.
class ConversationList(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        queryset = Conversation.objects.all()
        search = self.request.query_params.get('q', '')
        return queryset.filter(title__startswith=search).order_by('-start_date')
