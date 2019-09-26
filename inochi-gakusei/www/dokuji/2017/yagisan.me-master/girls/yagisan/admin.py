from django.contrib import admin

# Register your models here.
from .models import DialogueUser
from .models import FifthQuestion
from .models import FifthQuestionUser
from .models import PreQuestion
from .models import PreQuestionChoice
from .models import Question
from .models import PreQuestionUser
from .models import QuestionUser
from .models import User
from .models import View
from .models import Mail
from .models import Questionnaire
from .models import QuestionnaireChoice
from .models import QuestionnaireUser

admin.site.register(DialogueUser)
admin.site.register(FifthQuestion)
admin.site.register(FifthQuestionUser)
admin.site.register(PreQuestion)
admin.site.register(PreQuestionChoice)
admin.site.register(Question)
admin.site.register(PreQuestionUser)
admin.site.register(QuestionUser)
admin.site.register(User)
admin.site.register(View)
admin.site.register(Mail)
admin.site.register(Questionnaire)
admin.site.register(QuestionnaireChoice)
admin.site.register(QuestionnaireUser)
