import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { GroupPostCreate } from './dto/grouppost-create.dto';

@Controller('posts')
export class PostsController {
  
  constructor(private postService : PostsService){}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() {userId , ...createpostDto} : CreatePostDto){
    return this.postService.createPost(userId, createpostDto)
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() {userIds,...createGroupPost} : GroupPostCreate){
    return this.postService.createGroupPost(userIds,createGroupPost)
  }

  @Get('groups')
  getAll(){
    return this.postService.getAllGroupPosts()
  }
}
