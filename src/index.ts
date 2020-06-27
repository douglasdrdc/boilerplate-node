import 'reflect-metadata';
import HttpApplication from './entrypoint/http/app';

const app = new HttpApplication();
app.start();