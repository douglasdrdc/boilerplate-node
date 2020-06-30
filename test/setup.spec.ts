import chai = require('chai');
import 'reflect-metadata';
import sinonChai = require('sinon-chai');

import sinon = require('sinon');

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});
