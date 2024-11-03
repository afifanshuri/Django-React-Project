from django.urls import path
from . import views

urlpatterns = [
    path("users/",views.CreateUserView.as_view(), name="userAll-view"),
    path("users/view/",views.GetAllUsers.as_view(), name="userAll-view"),
    path("users/view/current/",views.GetCurrentUser.as_view(), name="userAll-view"),
    path("posts/", views.GetAllPosts.as_view(), name="post-list"),
    path("posts/users/", views.GetUserPostList.as_view(), name="postUser-list"),
    path("posts/getAffiliatedUsers/", views.GetUserByPostList.as_view(), name="userCreatedPost-list"),
    path("posts/create/", views.CreatePostView.as_view(), name="post-create"),
    path("posts/update/<int:pk>/", views.PostViewUpdate.as_view(), name="post-update"),
    path("posts/view/<int:pk>/", views.PostViewUpdate.as_view(), name="post-view"),
    path("posts/view/comment/", views.PostViewComments.as_view(), name="post-view"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete"),
    path("comment/create/", views.CreateCommentView.as_view(), name="comment-create"),
    path("comment/update/<int:pk>/", views.CommentViewUpdate.as_view(), name="comment-update"),
    path("comment/view/<int:pk>/", views.CommentViewUpdate.as_view(), name="comment-view"),
    path("comment/delete/<int:pk>/", views.CommentDelete.as_view(), name="comment-delete")
]