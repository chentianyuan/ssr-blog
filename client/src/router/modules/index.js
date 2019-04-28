
import basis from './basis'
import article from './article'
import about from './about'
import project from './project'
let routes = new Set([
  ...basis,
  ...article,
  ...about,
  ...project
])

export default routes
