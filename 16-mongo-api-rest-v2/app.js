var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var user = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();
app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//define los espacios en json
app.set('json spaces', 2);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// ejemplo : https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
swaggerDocument = {
  "swaggerDefinition": {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0", //version of the OpenAPI Specification
    "title": "My User Project CRUD",
    "description": "My User Project Application API",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "host": "localhost:3000",
  "basePath": "/",
  "tags": [
    {
      "name": "Users",
      "description": "API for users in the system"
    }
  ],
  "schemes": ["http"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths": {
    "/api/": {
      "get": {
        "tags": ["Users"],
        "summary": "Get all users in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Users"
            }
          }
        }
      }
    },
    "/api/": {
      "post": {
        "tags": ["Users"],
        "description": "Create new user in system",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User that we want to create",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "New user is created",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        }
      }
    },
    "/user/{id}": {
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "ID of user that we want to find",
        "type": "integer"
      }
    ],
    "put": {
      "summary": "Update user with give ID",
      "tags": ["Users"],
      "parameters": [
        {
          "name": "user",
          "in": "body",
          "description": "User with new values of properties",
          "schema": {
            "$ref": "#/definitions/updateUser"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "User is updated",
          "schema": {
            "$ref": "#/definitions/User"
          }
        }
      }
    },
  "updateUser": {
    "required": ["name", "companies"],
    "properties": {
      "isPublic": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "books": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            }
          }
        }
      },
      "companies": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  },
  "delete": {
   "summary": "Delete user with given ID",
   "tags": ["Users"],
   "responses": {
     "200": {
       "description": "User is deleted",
       "schema": {
         "$ref": "#/definitions/User"
       }
     }
   }
 }
}
  },
  "definitions": {
    "User": {
      "required": ["name", "_id", "companies"],
      "properties": {
        "_id": {
          "type": "integer",
          "uniqueItems": true
        },
        "isPublic": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
      }
    },
    "Users": {
      "type": "array",
      "$ref": "#/definitions/User"
    }
  },
},
  "apis": ['./routes/api.js']
};
const swaggerDocs = swaggerJsdoc(swaggerDocument);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
console.log("Abre http://localhost:3000/ para empezar");
module.exports = app;
