module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'aipatn.api',
      script    : './server/dist/index.js',
      watch     : true,
      instances : 4,
      env: {
        NODE_ENV: 'development',
        DEBUG: '*'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    /*
    // Second application
    {
      name      : 'aipatn.web',
      script    : 'ng serve --host 0.0.0.0 --port 8100 --disable-host-check',
      watch     : true
    }
    */
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn2.git',
      path : '/mnt/disk1/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'root',
      host : 'www.aipatn.com',
      ref  : 'origin/master',
      repo : 'https://github.com/gogokoala/aipatn2.git',
      path : '/mnt/disk1/www/development',
      'post-deploy' : 'cd server && npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
