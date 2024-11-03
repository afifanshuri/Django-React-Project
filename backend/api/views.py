from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post, Comment
from rest_framework.response import Response 
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class GetAllUsers(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class GetCurrentUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class GetUserByPostList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id_list = self.request.query_params.get("ids")
        if user_id_list:
            ids = list(map(int, user_id_list.split(',')))
            return User.objects.filter(id__in=ids)
        return User.objects.none()

class CreatePostView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class GetAllPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class GetUserPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
    
class GetOtherPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Post.objects.exclude(author=user)
        
class PostViewUpdate(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all();
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all();
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
class PostViewComments(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        post_id = self.request.query_params.get("ids")
        if post_id:
            ids = list(map(int, post_id.split(',')))
            return Comment.objects.filter(post__in=ids)
        return Response({"error": "Post does not exist!"}, status=status.HTTP_404_NOT_FOUND)
    
class CreateCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            try:
                post_id = self.request.data.get("id")
                post = Post.objects.get(id=post_id);
                serializer.save(commenter=self.request.user, post=post)
            except Post.DoesNotExist:
                return Response({"error": "Post does not exist!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            print(serializer.errors)

class CommentViewUpdate(generics.RetrieveUpdateAPIView):
    queryset = Comment.objects.all();
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    
    
    


        
    
    
        
    