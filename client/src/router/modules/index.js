
import basis from './basis'
import article from './article'
import about from './about'
import project from './project'
import board from './board'
let routes = new Set([
  ...basis,
  ...article,
  ...about,
  ...project,
  ...board
])

export default routes
