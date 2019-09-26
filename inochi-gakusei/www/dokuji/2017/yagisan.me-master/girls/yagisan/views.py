from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
from django.utils import timezone
from django.core.mail import send_mail

from .models import DialogueUser
from .models import FifthQuestion
from .models import FifthQuestionUser
from .models import PreQuestion
from .models import PreQuestionChoice
from .models import Question
from .models import User
from .models import PreQuestionUser
from .models import QuestionUser
from .models import View
from .models import Mail
from .models import Questionnaire
from .models import QuestionnaireChoice
from .models import QuestionnaireUser

import json
import logging
logger = logging.getLogger('django')

def index(request):
  return render(request, 'yagisan/index.html', {
    'assets': 'index',
    'user_id': request.session.get('user_id', False),
    'user_nickname': request.session.get('user_nickname', False),
  })

def about(request):
  return render(request, 'yagisan/about/index.html', {'assets': 'about/index'})

def column(request):
  return render(request, 'yagisan/column/index.html', {'assets': 'column/index'})

def column_view(request, column_id):
  return render(request, 'yagisan/column/'+ column_id +'.html', {
    'assets': 'column/view',
    'column_id': column_id,
  })

def contact(request):
  return render(request, 'yagisan/contact/index.html', {'assets': 'contact/index'})

def professor(request):
  return render(request, 'yagisan/professor/index.html', {'assets': 'professor/index'})

def lesson(request):
  user_id = request.session.get('user_id', False)
  if not user_id:
    raise Http404
  try:
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    question_users = QuestionUser.objects.filter(user=user).filter(is_last=0)
    if question_users.count() < 57:
      pre_questions = PreQuestion.objects.all()
      for pre_question in pre_questions:
        pre_question.choices = PreQuestionChoice.objects.filter(prequestion=pre_question)
      return render(request, 'yagisan/lesson/pre_question.html', {
        'assets': 'lesson/pre_question',
        'user_id': user.id,
        'user_nickname': user.nickname,
        'group': 'A',
        'number': 1,
        'answers': [1,2,3,4],
        'pre_questions': pre_questions,
        'is_last': 0,
        'user_sex': 0
      })
    views = View.objects.filter(user=user)
    if views.filter(lesson=1).count() < 3:
      lessons = '{"1": "first"}'
    elif views.filter(lesson=2).count() < 5:
      lessons = '{"1": "first", "2": "second"}'
    elif views.filter(lesson=3).count() < 5:
      lessons = '{"1": "first", "2": "second", "3": "third"}'
    elif views.filter(lesson=4).count() < 6:
      lessons = '{"1": "first", "2": "second", "3": "third", "4": "fourth"}'
    elif views.filter(lesson=5).count() < 4:
      lessons = '{"1": "first", "2": "second", "3": "third", "4": "fourth", "5": "fifth"}'
    else:
      lessons = '{"1": "first", "2": "second", "3": "third", "4": "fourth", "5": "fifth", "6": "sixth"}'
    return render(request, 'yagisan/lesson/index.html', {
      'assets': 'lesson/index',
      'user_id': user.id,
      'user_nickname': user.nickname,
      'lessons': lessons
    })
  except Exception as e:
    from django.http import HttpResponse
    return HttpResponse(e)

def lesson_view(request, group_id, page_id):
  user_id = request.session.get('user_id', False)
  try:
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    views = View.objects.filter(user=user).filter(lesson=group_id).filter(page=page_id)
    if views.count() == 0:
      View.objects.create(user=user, lesson=group_id, page=page_id, created_at=timezone.now(), updated_at=timezone.now())
  except Exception as e:
    raise Http404
  return render(request, 'yagisan/lesson/'+group_id+'/'+page_id+'.html', {
    'group_id': group_id,
    'page_id': page_id,
  })

def lesson_last_question(request):
  user_id = request.session.get('user_id', False)
  if not user_id:
    raise Http404
  try:
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    # use pre_question template
    return render(request, 'yagisan/lesson/pre_question.html', {
      'assets': 'lesson/pre_question',
      'user_id': user.id,
      'user_nickname': user.nickname,
      'group': 'A',
      'number': 1,
      'answers': [1,2,3,4],
      'is_last': 1,
      'user_sex': user.sex,
    })
  except Exception as e:
    raise Http404

def user_register(request):
  if request.method != 'POST':
    raise Http404
  try:
    last_name = request.POST['last_name']
    first_name = request.POST['first_name']
    nickname = request.POST['nickname']
    email = request.POST['email']
    password = request.POST['password']
    users = User.objects.filter(email=email).filter(password=password)
    if users.count() > 0:
      raise Http404
    user = User.objects.create(last_name=last_name, first_name=first_name, nickname=nickname, email=email, password=password, created_at=timezone.now(), updated_at=timezone.now())
    request.session['user_id'] = user.id
    request.session['user_nickname'] = user.nickname
    send_mail(
      '【八木さん】新規登録',
      user.nickname + ' さま\n\n『ほぐれて、八木さん』へのアカウント登録が完了しました。\n\nサイトへ戻って、まずは1日1Lessonずつ受講してみてください。\n『ほぐれて、八木さん』： http://yagisan.me \n\n★八木さんスタンプ発売中★\n購入はこちら\n→ https://store.line.me/stickershop/product/1604930 \n',
      'inochi.girls.project@gmail.com',
      [user.email, 'inochi.girls.project@gmail.com'],
      fail_silently=False,
    )
  except Exception as e:
    raise Http404
  return JsonResponse({
    'id': user.id,
    'nickname': user.nickname,
  })

def user_login(request):
  if request.method != 'POST':
    raise Http404
  try:
    email = request.POST['email']
    password = request.POST['password']
    user = User.objects.filter(email=email).filter(password=password)[0:1].get()
    request.session['user_id'] = user.id
    request.session['user_nickname'] = user.nickname
  except Exception as e:
    raise Http404
  return JsonResponse({
    'id': user.id,
    'nickname': user.nickname,
  })

def user_logout(request):
  if request.method != 'POST':
    raise Http404
  try:
    request.session.flush()
  except Exception as e:
    raise Http404
  return JsonResponse({
    'status': 'success',
  })

def user_set_sex(request):
  if request.method != 'POST':
    raise Http404
  try:
    sex = request.POST['sex']
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    user.sex = sex
    user.updated_at = timezone.now()
    user = user.save()
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def user_set_answers(request):
  if request.method != 'POST':
    raise Http404
  try:
    answers = json.loads(request.POST['answers'])
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    for answer in answers:
      question_id = answer['question_id']
      choice_id = answer['choice_id']
      pre_question = PreQuestion.objects.filter(id=question_id).get()
      pre_question_choice = PreQuestionChoice.objects.filter(id=choice_id).get()
      pre_question_users = PreQuestionUser.objects.filter(user=user).filter(prequestion=pre_question)
      if pre_question_users.count() == 0:
        pre_question_user = PreQuestionUser.objects.create(user=user, prequestion=pre_question, prequestionchoice=pre_question_choice, created_at=timezone.now(), updated_at=timezone.now())
      else:
        pre_question_user = pre_question_users[0:1].get()
        pre_question_user.user = user
        pre_question_user.prequestion = pre_question
        pre_question_user.prequestionchoice = pre_question_choice
        pre_question_user.updated_at = timezone.now()
        pre_question_user.save()
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def question_get_first(request):
  if request.method != 'POST':
    raise Http404
  try:
    group = request.POST['group']
    number = request.POST['number']
    questions = Question.objects.filter(group=group).filter(number=number)
    if questions.count() == 0:
      raise Http404
    question = questions[0:1].get()
  except Exception as e:
    raise Http404
  return JsonResponse({
    'sentence': question.sentence,
    'group': question.group,
    'number': question.number,
    'group_desc': 'あなたの仕事についてうかがいます',
    'first': 'そうだ',
    'second': 'ややそうだ',
    'third': 'ややちがう',
    'fourth': 'ちがう',
  })

def question_set_and_get(request):
  if request.method != 'POST':
    raise Http404
  try:
    answer = request.POST['answer']
    group = request.POST['group']
    number = request.POST['number']
    is_last = request.POST['is_last']
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    questions = Question.objects.filter(group=group).filter(number=number)
    if questions.count() == 0:
      raise Http404
    question = questions[0:1].get()
    question_users = QuestionUser.objects.filter(user=user).filter(question=question).filter(is_last=is_last)
    if question_users.count() == 0:
      QuestionUser.objects.create(user=user, question=question, answer=answer, is_last=is_last, created_at=timezone.now(), updated_at=timezone.now())
    else:
      question_user = question_users[0:1].get()
      question_user.answer = answer
      question_user.updated_at = timezone.now()
      question_user.save()
      # get question
    number = int(number) + 1
    questions = Question.objects.filter(group=group).filter(number=number)
    if questions.count() == 0:
      if group == 'A':
        group = 'B'
      elif group == 'B':
        group = 'C1'
      elif group == 'C1':
        group = 'C2'
      elif group == 'C2':
        group = 'C3'
      elif group == 'C3':
        group = 'D'
      else:
        group = ''
        return JsonResponse({
          'result': 'finish',
        })
      number = 1
      questions = Question.objects.filter(group=group).filter(number=number)
    if questions.count() == 0:
      raise Http404
    question = questions[0:1].get()
    if group == 'A':
      group_desc = 'あなたの仕事についてうかがいます'
      first = 'そうだ'
      second = 'ややそうだ'
      third = 'ややちがう'
      fourth = 'ちがう'
    elif group == 'B':
      group_desc = '最近1ヶ月の状態についてうかがいます'
      first = 'ほとんどなかった'
      second = 'ときどきあった'
      third = 'しばしばあった'
      fourth = 'ほとんどいつもあった'
    elif group == 'C1':
      group_desc = '次の人たちはどのくらい気軽に話ができますか？'
      first = '非常に'
      second = 'かなり'
      third = '多少'
      fourth = '全くない'
    elif group == 'C2':
      group_desc = 'あなたが困った時、次の人たちはどのくらい頼りになりますか？'
      first = '非常に'
      second = 'かなり'
      third = '多少'
      fourth = '全くない'
    elif group == 'C3':
      group_desc = 'あなたの個人的な問題を相談したら、次の人たちはどのくらいきいてくれますか？'
      first = '非常に'
      second = 'かなり'
      third = '多少'
      fourth = '全くない'
    else:
      group_desc = '満足度について'
      first = '満足'
      second = 'まあ満足'
      third = 'やや不満足'
      fourth = '不満足'
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'next',
    'sentence': question.sentence,
    'group': question.group,
    'number': question.number,
    'group_desc': group_desc,
    'first': first,
    'second': second,
    'third': third,
    'fourth': fourth,
  })

def question_result(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    is_last = request.POST['is_last']
    question_users = QuestionUser.objects.filter(user=user, is_last=is_last, deleted_at__isnull=True)
    if question_users.count() == 0:
      raise Http404
    question_users = question_users.values('question', 'answer');
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': list(question_users),
  })

def lesson_set_fifthquestion_answers(request):
  if request.method != 'POST':
    raise Http404
  try:
    answers = json.loads(request.POST['answers'])
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    for answer in answers:
      question_id = answer['question_id']
      choice = answer['choice']
      fifthquestion = FifthQuestion.objects.filter(id=question_id).get()
      fifthquestion_users = FifthQuestionUser.objects.filter(user=user).filter(fifthquestion=fifthquestion)
      if fifthquestion_users.count() == 0:
        logger.debug('inif')
        FifthQuestionUser.objects.create(user=user, fifthquestion=fifthquestion, answer=choice, created_at=timezone.now(), updated_at=timezone.now())
      else:
        logger.debug('inelse')
        fifthquestion_user = fifthquestion_users[0:1].get()
        fifthquestion_user.user = user
        fifthquestion_user.fifthquestion = fifthquestion
        fifthquestion_user.answer = choice
        fifthquestion_user.updated_at=timezone.now()
        fifthquestion_user.save()
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def lesson_get_fifthquestion_answers(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    answers = FifthQuestionUser.objects.filter(user=user).values('fifthquestion', 'user', 'answer')
    return JsonResponse({'results': list(answers)})
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def lesson_get_fifthquestions(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    questions = FifthQuestion.objects.all().values('id', 'sentence')
    return JsonResponse({'results': list(questions)})
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def lesson_set_mails(request):
  if request.method != 'POST':
    raise Http404
  try:
    answers = json.loads(request.POST['answers'])
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    logger.debug('------------------')
    logger.debug(answers)
    logger.debug('------------------')
    new_mail = Mail(user=user, created_at=timezone.now(), updated_at=timezone.now(),
                    situation=answers['situation'], expression_first_text=answers['expressions'][0]['expression'],
                    expression_first_strength=answers['expressions'][0]['strength'],
                    expression_second_text=answers['expressions'][1]['expression'], expression_second_strength=answers['expressions'][1]['strength'],
                    expression_third_text=answers['expressions'][2]['expression'], expression_third_strength=answers['expressions'][2]['strength'],
                    moment_idea_text=answers['moment_idea_text'], moment_idea_strength=answers['moment_idea_strength'],
                    reason=answers['reason'], contradiction=answers['contradiction'],
                    adaptive_thinking=answers['adaptive_thinking'],
                    after_expression_first_strength=answers['after_expressions_strength'][0], after_expression_second_strength=answers['after_expressions_strength'][1], after_expression_third_strength=answers['after_expressions_strength'][2])
    new_mail.save()
  except Exception as e:
    logger.debug('=== エラー内容 ===')
    logger.debug('type:' + str(type(e)))
    logger.debug('args:' + str(e.args))
    logger.debug('message:' + e.message)
    logger.debug('e自身:' + str(e))
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def dialogue_set(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    dialogues = json.loads(request.POST['dialogues'])
    dialogue_users = DialogueUser.objects.filter(user=user, deleted_at__isnull=True)
    if dialogue_users.count() > 0:
      dialogue_users.update(updated_at=timezone.now(), deleted_at=timezone.now())
    for dialogue in dialogues:
      dialogue_sex = dialogue['dialogue_sex']
      dialogue_to = dialogue['dialogue_to']
      dialogue_type = dialogue['dialogue_type']
      dialogue = dialogue['dialogue']
      DialogueUser.objects.create(user=user, dialogue=dialogue, dialogue_sex=dialogue_sex, dialogue_to=dialogue_to, dialogue_type=dialogue_type, created_at=timezone.now(), updated_at=timezone.now())
  except Exception as e:
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def dialogue_get_others(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    dialogue_type = 1
    dialogue_sex = request.POST['dialogue_sex']
    dialogue_to = request.POST['dialogue_to']
    dialogue_users = DialogueUser.objects.exclude(user=user).filter(dialogue_type=dialogue_type, dialogue_sex=dialogue_sex, dialogue_to=dialogue_to, deleted_at__isnull=True).order_by('?')[:10].values()
    results = []
    for dialogue_user in dialogue_users:
      dialogues = DialogueUser.objects.filter(user=dialogue_user['user_id'], dialogue_sex=dialogue_sex, dialogue_to=dialogue_to, deleted_at__isnull=True).order_by('dialogue_type')[:3].values()
      dialogues = list(dialogues)
      results.append(dialogues)
  except Exception as e:
    raise Http404
  return JsonResponse({'results': list(results)})

def lesson_get_questionnaires(request):
  if request.method != 'POST':
    raise Http404
  try:
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    questionnaires = Questionnaire.objects.filter(deleted_at__isnull=True).values('id', 'sentence')
    questionnaire_choices = QuestionnaireChoice.objects.filter(deleted_at__isnull=True).values('id', 'questionnaire', 'sentence')
    questionnaire_users = QuestionnaireUser.objects.filter(user=user, deleted_at__isnull=True).values('id', 'questionnaire', 'questionnaire_choice')
    return JsonResponse({'questionnaires': list(questionnaires), 'questionnaire_choices': list(questionnaire_choices), 'questionnaire_users': list(questionnaire_users)})
  except Exception as e:
    logger.debug('=== エラー内容 ===')
    logger.debug('type:' + str(type(e)))
    logger.debug('args:' + str(e.args))
    logger.debug('message:' + e.message)
    logger.debug('e自身:' + str(e))
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def lesson_set_questionnaires(request):
  if request.method != 'POST':
    raise Http404
  try:
    answers = json.loads(request.POST['answers'])
    user_id = request.session.get('user_id', False)
    if not user_id:
      raise Http404
    users = User.objects.filter(id=user_id)
    if users.count() == 0:
      raise Http404
    user = users[0:1].get()
    logger.debug('------------------')
    logger.debug(answers)
    logger.debug('------------------')

    question_ids = [1, 2, 3, 4, 5]
    for question_id in question_ids:
      questionnaire = Questionnaire.objects.filter(id=question_id).get()
      questionnaire_choice = QuestionnaireChoice.objects.filter(questionnaire=questionnaire, id=answers['question_' + str(question_id)]).get()
      logger.debug('------------------')
      logger.debug(questionnaire_choice.id)
      logger.debug('------------------')
      questionnaire_users = QuestionnaireUser.objects.filter(user=user, questionnaire=questionnaire, deleted_at__isnull=True)
      if questionnaire_users.count() == 0:
        questionnaire_user = QuestionnaireUser.objects.create(questionnaire=questionnaire,
                                                              questionnaire_choice=questionnaire_choice,
                                                              user=user, created_at=timezone.now(), updated_at=timezone.now())
      else:
        questionnaire_user = questionnaire_users[0:1].get()
        questionnaire_user.user = user
        questionnaire_user.questionnaire = questionnaire
        questionnaire_user.questionnaire_choice = questionnaire_choice
        questionnaire_user.updated_at = timezone.now()
        questionnaire_user.save()
  except Exception as e:
    logger.debug('========= エラー内容 =========')
    logger.debug('type:' + str(type(e)))
    logger.debug('args:' + str(e.args))
    logger.debug('message:' + e.message)
    logger.debug('e自身:' + str(e))
    raise Http404
  return JsonResponse({
    'result': 'success',
  })

def test(request):
  latest_question_list = User.objects.order_by('-created_at')[:5]
  context = {'latest_question_list': latest_question_list}
  return render(request, 'yagisan/test.html', context)
