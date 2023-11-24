import graphene
from graphene import relay
from graphene_mongo import MongoengineObjectType
from .core.user.models import User
from .core.settings.models import Settings

class UserType(MongoengineObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node, )

class SettingsType(MongoengineObjectType):
    class Meta:
        model = Settings
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    all_users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.String(required=True))
    user_settings = graphene.Field(SettingsType, user_id=graphene.String(required=True))

    def resolve_all_users(self, info):
        return list(User.objects.all())

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

    def resolve_user_settings(self, info, user_id):
        return Settings.objects(user=user_id).first()

class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        name = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, email, name):
        user = User(email=email, name=name)
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
