import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dot';
import { PostsRo, PostsService } from './posts.service';

@ApiTags('文章模块')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   *  @description 创建文章
   *  @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   *  @description 获取所有文章
   */
  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   *  @description 获取指定文章
   *  @param id
   */
  @ApiOperation({ summary: '获取单个文章' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  /**
   *  @description 更新文章
   *  @param id
   *  @param post
   */
  @ApiOperation({ summary: '修改文章' })
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  /**
   *  @description 删除文章
   *  @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
