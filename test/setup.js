require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect //explain global, just allowing to be used in all test files?
global.supertest = supertest 