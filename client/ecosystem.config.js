module.exports = {
  apps: [{
    name: 'blog',
    script: './server/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // 远程服务器上的PM2参数配置
    // args: 'one two', // 参数
    instances: 1, // 实例数量
    autorestart: true, // 自动启动
    watch: false, // 监视模式
    max_memory_restart: '1G', // 内存占用超过多少后重启实例
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '129.28.191.26',
      ref: 'origin/master', // 远程git上要部署的分支
      repo: 'git@github.com:chentianyuan/ssr-blog.git',
      path: '/code/blog',
      'post-deploy': 'cd client && pm2 reload ecosystem.config.js --env production && cd ../server && docker-compose build && docker-compose up -d'
    }
  }
}
