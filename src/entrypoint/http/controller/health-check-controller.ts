import * as express from 'express';
import { controller, httpGet, interfaces } from 'inversify-express-utils';

@controller('/health-check')
export class HealthCheck implements interfaces.Controller {
    @httpGet('/')
    public healthCheck(req: express.Request, res: express.Response) {
        res.status(200).json({
            ok: true,
          });
    }
}