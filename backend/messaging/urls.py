from django.urls import path

from . import views

app_name = 'messaging'
urlpatterns = [
    path('', views.ConversationList.as_view(), name='conversation_list'),
    path('<int:conversation_id>/messages/', views.MessageList.as_view(), name='message_list'),
    path('<int:conversation_id>/messages/<int:message_id>/thoughts/', views.ThoughtList.as_view(), name='thought_list'),
]
