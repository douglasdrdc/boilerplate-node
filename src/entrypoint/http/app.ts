import 'reflect-metadata';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '../../ioc';
import './controller/health-check-controller';
import './controller/sample-controller';
import errorProcessor from './middleware/error-processor';


export default class HttpApplication {
  private port = Number(process.env.PORT) || 3000;

  start() {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(bodyParser.json( { limit: '5mb' }));
      app.use(compression());      
    });

    server.setErrorConfig((app) => {
      app.use(errorProcessor());
    });
    
    const app = server.build();
    app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}!`);
    });
  }

  
}