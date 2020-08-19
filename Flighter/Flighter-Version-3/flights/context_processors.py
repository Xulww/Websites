
def session_user_id(request):
    return {'user_id': request.user.id}