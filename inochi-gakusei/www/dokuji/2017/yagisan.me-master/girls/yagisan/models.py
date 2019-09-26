from django.db import models

# Create your models here.
class PreQuestion(models.Model):
  sentence = models.CharField(max_length=50)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class PreQuestionChoice(models.Model):
  prequestion = models.ForeignKey(PreQuestion, on_delete=models.CASCADE)
  sentence = models.CharField(max_length=50)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class Question(models.Model):
  sentence = models.CharField(max_length=50)
  group = models.CharField(max_length=50)
  number = models.IntegerField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class User(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  nickname = models.CharField(max_length=50)
  email = models.CharField(max_length=50)
  password = models.CharField(max_length=50)
  sex = models.IntegerField(null=True)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class DialogueUser(models.Model):
  dialogue = models.CharField(max_length=50)
  dialogue_sex = models.IntegerField()
  dialogue_to = models.IntegerField()
  dialogue_type = models.IntegerField()
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class PreQuestionUser(models.Model):
  prequestion = models.ForeignKey(PreQuestion, on_delete=models.CASCADE)
  prequestionchoice = models.ForeignKey(PreQuestionChoice, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class QuestionUser(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  answer = models.IntegerField()
  is_last = models.IntegerField(null=True)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class View(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  lesson = models.IntegerField()
  page = models.IntegerField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class FifthQuestion (models.Model):
  sentence = models.CharField(max_length=50)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class FifthQuestionUser (models.Model):
  fifthquestion = models.ForeignKey(FifthQuestion, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  answer = models.IntegerField()
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class Mail (models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)
  situation =  models.CharField(max_length=150)
  expression_first_text =  models.CharField(max_length=50)
  expression_first_strength = models.IntegerField()
  expression_second_text =  models.CharField(max_length=50)
  expression_second_strength = models.IntegerField()
  expression_third_text =  models.CharField(max_length=50)
  expression_third_strength = models.IntegerField()
  moment_idea_text = models.CharField(max_length=150)
  moment_idea_strength = models.IntegerField()
  reason = models.CharField(max_length=150)
  contradiction = models.CharField(max_length=150)
  adaptive_thinking = models.CharField(max_length=150)
  after_expression_first_strength = models.IntegerField()
  after_expression_second_strength = models.IntegerField()
  after_expression_third_strength = models.IntegerField()

class Questionnaire (models.Model):
  sentence = models.CharField(max_length=50)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class QuestionnaireChoice (models.Model):
  questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
  sentence = models.CharField(max_length=50)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)

class QuestionnaireUser(models.Model):
  questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
  questionnaire_choice = models.ForeignKey(QuestionnaireChoice, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField()
  updated_at = models.DateTimeField()
  deleted_at = models.DateTimeField(null=True, blank=True)
