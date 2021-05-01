from django.test import TestCase
from django.urls import reverse
from messaging.models import Thought, Message, Conversation
from rest_framework.test import APITestCase


class ThoughtViewTest(APITestCase):
    def setUp(self):
        self.conversation = Conversation.objects.create(title="TitleTest", start_date="2020-01-01")
        self.message = Message.objects.create(text="MessageText", time_sent="2020-01-01T12:00:00", conversation=self.conversation)
        for i in range(3):
            Thought.objects.create(text="ThoughtText", time_sent=f"2020-01-01T12:00:0{i}", message=self.message)
        self.url = reverse("messaging:thought_list", kwargs={"conversation_id": self.conversation.id, "message_id": self.message.id})

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data["results"]), Thought.objects.count())

    def test_create(self):
        new_text = "NewText"
        data = {"text": new_text, "timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Thought.objects.filter(text=new_text).count(), 1)

    def test_get_invalid_conversation(self):
        url = reverse("messaging:thought_list", kwargs={"conversation_id": 99, "message_id": self.message.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_get_invalid_message(self):
        url = reverse("messaging:thought_list", kwargs={"conversation_id": self.conversation.id, "message_id": 99})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_create_invalid_conversation(self):
        url = reverse("messaging:thought_list", kwargs={"conversation_id": 99, "message_id": self.message.id})
        data = {"text": "NewText", "timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 404)

    def test_create_invalid_message(self):
        url = reverse("messaging:thought_list", kwargs={"conversation_id": self.conversation.id, "message_id": 99})
        data = {"text": "NewText", "timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 404)

    def test_create_missing_text(self):
        data = {"timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)

    def test_create_missing_time_sent(self):
        data = {"text": "NewText"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)


class MessageViewTest(TestCase):
    def setUp(self):
        self.conversation = Conversation.objects.create(title="TitleTest", start_date="2020-01-01")
        for i in range(3):
            Message.objects.create(text="ThoughtText", time_sent=f"2020-01-01T12:00:0{i}", conversation=self.conversation)
        self.url = reverse("messaging:message_list", kwargs={"conversation_id": self.conversation.id})

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data["results"]), Message.objects.count())

    def test_get_with_search(self):
        text_to_find = "ThoughtToFind"
        Message.objects.create(text=text_to_find, time_sent="2020-01-01T12:00:00", conversation=self.conversation)
        response = self.client.get(f"{self.url}?q=ThoughtTo", format="json")
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["text"], text_to_find)

    def test_create(self):
        new_text = "NewText"
        data = {"text": new_text, "timeSent": "2020-01-01T12:00:00"}
        self.client.post(self.url, data)
        self.assertEqual(Message.objects.filter(text=new_text).count(), 1)

    def test_get_invalid_conversation(self):
        url = reverse("messaging:message_list", kwargs={"conversation_id": 99})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_create_invalid_conversation(self):
        url = reverse("messaging:message_list", kwargs={"conversation_id": 99})
        data = {"text": "NewText", "timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 404)

    def test_create_missing_text(self):
        data = {"timeSent": "2020-01-01T12:00:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)

    def test_create_missing_time_sent(self):
        data = {"text": "NewText"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)


class ConversationViewTest(TestCase):
    def setUp(self):
        for i in range(3):
            self.conversation = Conversation.objects.create(title="TitleTest", start_date=f"2020-01-0{i+1}")
        self.url = reverse("messaging:conversation_list")

    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data["results"]), Conversation.objects.count())

    def test_get_with_search(self):
        title_to_find = "TitleToFind"
        Conversation.objects.create(title=title_to_find, start_date="2020-01-01")
        response = self.client.get(f"{self.url}?q=TitleTo", format="json")
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["title"], title_to_find)

    def test_create(self):
        new_title = "NewTitle"
        data = {"title": new_title, "startDate": "2020-01-01"}
        self.client.post(self.url, data)
        self.assertEqual(Conversation.objects.filter(title=new_title).count(), 1)

    def test_create_missing_title(self):
        data = {"startDate": "2020-01-01"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)

    def test_create_missing_start_date(self):
        data = {"title": "NewTitle"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 400)
