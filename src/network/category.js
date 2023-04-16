import {request} from './request'

//请求一级分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

//请求二级分类数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//请求分类详情数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
