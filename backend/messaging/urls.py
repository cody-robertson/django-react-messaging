from django.urls import path

from . import views

app_name = 'messaging'
urlpatterns = [
    path('', views.ConversationList.as_view(), name='conversation_list'),
]
