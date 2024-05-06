const Hapi = require('@hapi/hapi') // library dalam pembuatan server
const routes = require('./routes')

const init = async () => {
    const server = Hapi.server({ 
        port:9000,
        host:'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
          },
    });
    server.route(routes);
    await server.start();
    console.log(`Server run at ${server.info.uri}\n`)
};
init();