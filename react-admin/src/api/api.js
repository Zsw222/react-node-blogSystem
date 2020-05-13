
import axios from './http'
// 登录
export  function _login(data){
  return  axios.post('/users/login',data)
}



// 获取分类列表数据
export  function _getCategoryList(data){
  return axios.get('/category/list',data)
}
// 新增分类列表数据
export  function _addCategoryList(data){
  return  axios.post('/category/list',data)
}
// 编辑分类列表数据
export  function _updateCategoryList(data){
  return  axios.put('/category/list',data)
}
// 删除分类列表数据
export  function _deleteCategoryList(data){
  return  axios.delete('/category/list',{data:data})
}




// 获取标签列表数据
export  function _getLabelList(data){
  return axios.get('/labels/list',data)
}
// 新增标签列表数据
export  function _addLabelList(data){
  return  axios.post('/labels/list',data)
}
// 编辑标签列表数据
export  function _updateLabelList(data){
  return  axios.put('/labels/list',data)
}
// 删除标签列表数据
export  function _deleteLabelList(data){
  return  axios.delete('/labels/list',{data:data})
}



// 获取文章列表数据
export  function _getArticleList(data){
  return axios.get('/articles/list',data)
}
// 新增文章数据
export  function _addArticleList(data){
  return  axios.post('/articles/list',data)
}