import { NewsModel, News } from '../models/news.ts';

export const createNews = async (context: any) => {
  try {
    const result = context.request.body({ type: 'json' })
    const body = await result.value

    const newNews = new NewsModel({
      _id: body._id,
      scope: body.scope,
      title: body.title,
      resume: body.resume,
      date: Date.now(),
      source: body.source,
      media: body.media || [],
      img_description: body.img_description || '',
      text: body.text,
      tags: body.tags || [],
      views: body.views || 0,
    })

    await newNews.save()

    context.response.status = 201
    context.response.body = {
      message: 'News created successfully',
      news: newNews,
    }
  } catch (error: any) {
    console.error('Error creating the news :', error)
    context.response.status = 500
    context.response.body = {
      message: 'Error creating the news',
      error: error.message,
    }
  }
}

export const getAllNews = async (context: any) => {
  try {
    const newsList: News[] = await NewsModel.find({})
    context.response.status = 200
    context.response.body = newsList
  } catch (error) {
    context.response.status = 500
    context.response.body = { message: 'Error getting the news', error }
  }
}

export const getNewsById = async (context: any) => {
  try {
    const { id } = context.params
    const news = await NewsModel.findById(id)

    if (news) {
      context.response.status = 200
      context.response.body = news
    } else {
      context.response.status = 404
      context.response.body = { message: 'News not found' }
    }
  } catch (error) {
    context.response.status = 500
    context.response.body = { message: 'Error getting news', error }
  }
}

export const updateNews = async (context: any) => {
  try {
    const newsId = context.params.id
    const body = await context.request.body().value

    const updatedNews = await NewsModel.findByIdAndUpdate(newsId, body, {
      new: true,
    })

    if (!updatedNews) {
      context.response.status = 404
      context.response.body = { message: 'News not found' }
      return
    }

    context.response.status = 200
    context.response.body = {
      message: 'News updated',
      news: updatedNews,
    }
  } catch (error: any) {
    console.error('Error to update the news:', error)
    context.response.status = 500
    context.response.body = {
      message: 'Error to update the news',
      error: error.message,
    }
  }
}

export const deleteNews = async (context: any) => {
  try {
    const { id } = context.params
    const deletedNews = await NewsModel.findByIdAndDelete(id)

    if (deletedNews) {
      context.response.status = 200
      context.response.body = {
        message: 'News deleted successfully.',
        news: deletedNews,
      }
    } else {
      context.response.status = 404
      context.response.body = { message: 'News not found.' }
    }
  } catch (error) {
    context.response.status = 500
    context.response.body = { message: 'Error to delete the news.', error }
  }
}
