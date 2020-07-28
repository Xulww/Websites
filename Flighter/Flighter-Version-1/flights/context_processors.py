
def session_user_id(request):
    return {'user_id': request.session.get('user_id')}