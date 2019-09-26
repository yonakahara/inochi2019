from django.conf.urls import url

from . import views

app_name = 'yagisan'
urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^about$', views.about, name='about'),
  url(r'^column$', views.column, name='column'),
  url(r'^column/(?P<column_id>[0-9]+)$', views.column_view, name='column_view'),
  url(r'^contact$', views.contact, name='contact'),
  url(r'^dialogue/set$', views.dialogue_set, name='dialogue_set'),
  url(r'^dialogue/get_others$', views.dialogue_get_others, name='dialogue_get_others'),
  url(r'^professor$', views.professor, name='professor'),
  url(r'^lesson$', views.lesson, name='lesson'),
  url(r'^lesson/(?P<group_id>[0-9]+)/(?P<page_id>[0-9]+)$', views.lesson_view, name='lesson_view'),
  url(r'^lesson/last_question$', views.lesson_last_question, name='lesson_last_question'),
  url(r'^question/get_first$', views.question_get_first, name='question_get_first'),
  url(r'^question/set_and_get$', views.question_set_and_get, name='question_set_and_get'),
  url(r'^question/result$', views.question_result, name='question_result'),
  url(r'^user/register$', views.user_register, name='user_register'),
  url(r'^user/login$', views.user_login, name='user_login'),
  url(r'^user/logout$', views.user_logout, name='user_logout'),
  url(r'^user/set_sex$', views.user_set_sex, name='user_set_sex'),
  url(r'^user/set_answers$', views.user_set_answers, name='user_set_answers'),
  url(r'^test$', views.test, name="test"),
  url(r'^lesson/set_fifthquestion_answers$', views.lesson_set_fifthquestion_answers, name='lesson_set_fifthquestion_answers'),
  url(r'^lesson/get_fifthquestion_answers$', views.lesson_get_fifthquestion_answers, name='lesson_get_fifthquestion_answers'),
  url(r'^lesson/get_fifthquestions$', views.lesson_get_fifthquestions, name='lesson_get_fifthquestions'),
  url(r'^lesson/set_mails$', views.lesson_set_mails, name='lesson_set_mails'),
  url(r'^lesson/get_questionnaires$', views.lesson_get_questionnaires, name='lesson_get_questionnaires'),
  url(r'^lesson/set_questionnaires$', views.lesson_set_questionnaires, name='lesson_set_questionnaires'),
]
