import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import apiRoutes from "./routes"
import config from "dotenv"
import "./config/database"
import errorHandler from './helpers/error-handler';

config.config();

const app = express();
const port = process.env.PORT || 3000;

console.log('-+-+-REST API');
console.log('-+-+-Powred by RABIA CHERIF BESMA');

const swaggerDefinition = {
  info: {
    title: 'REST API',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: [
    './doc/user.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', express.static('public/api-docs'));
const corsOptions = {
  origin: (origin, callback) => {
    if (['http://localhost:3001', 'http://localhost:3000', 'http://172.28.32.1:3000', 'https://flix-flex.web.app', 'https://flex-flex-web-app.vercel.app'].indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: "GET, HEAD, POST, PUT, DELETE, PATCH",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
apiRoutes(app)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[*] Running on port ${port}`);
  console.log(`[!] Envirenment: ${process.env.NODE_ENV}`);
});
