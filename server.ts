import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { enableProdMode } from '@angular/core';
import { readFileSync } from 'fs';
import { createGzip } from 'zlib';
import { environment } from 'src/environments/environment';
import  axios  from 'axios';
import { Readable } from 'stream';
import { writeFile } from "fs";
import { promisify } from "util";
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { createClient } from 'redis';
import { Server } from 'http';

var xmlparser = require('express-xml-bodyparser');
var xml = require('xml');

const writeFileAsync = promisify(writeFile);
// const MockBrowser = require('mock-browser').mocks.MockBrowser;
// const mock = new MockBrowser();

// global['document'] = mock.getDocument();
// global['window'] = mock.getWindow();

const REDIS_URI = 'redis://localhost:6379';
var redisIsReady = false;
async function initRedisClient() {
  try {
      const client = createClient({ url: REDIS_URI });
      client.on("error", (err) => { redisIsReady = false; console.log("Redis Client Connection Error")});
      client.on('ready', function() {
        redisIsReady = true;
        console.log('redis is running');
      });
      await client.connect();
      console.log("Redis cashe app database connected...");
      return client;
  } catch (error) {
      console.log('Redis app connection Error...', error);
      return null;
  }
}


// The Express app is exported so that it can be used by serverless Functions.
const redisMiddleware = async (req: { url: any; cookies: { loggedIn: any; }; }, res: { send: { (arg0: any): void; (body: any): void; bind?: any; }; }, next: () => void) => {
  console.log('Called middleware')
  const client:any = await initRedisClient();
  if (!redisIsReady) {
    next();
    return;
  }

  let entryName = req.url;
  try {
    const result = await client.get(entryName);
    if (result) {
      res.send(result);
    } else {
      let sendReference = res.send.bind(res);
      res.send = (body) => {
        client.SETEX(entryName, 60 * 5, body);
        sendReference(body);
      };
      next();
    } 
  } catch (error) {
    next();
  }
};

const robotsTxt = readFileSync('./robots.txt').toString();
const gzip = createGzip();
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/prameya/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  server.use(express.static(
    join(__dirname,"public")
  ))
   server.use(xmlparser());
  // server.use((req, res, next) => {
  //   res.setHeader('Content-Security-Policy', "default-src ''; frame-src 'none'");
  //   next();
  // });
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  
 
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(__dirname +"/robots.txt");
  });

  server.get('/rss', async (req, res) => {
    let resp = await axios.get('https://moapi.prameyanews.com/prameya/api/rssfeed');
    res.type('text/xml').send(resp.data);
  });

  server.get('/:category/rss', async (req, res) => {
    const { category } = req.params;
    let resp = await axios.get(`https://moapi.prameyanews.com/prameya/api/${category}/rssfeed`);
    res.type('text/xml').send(resp.data);
  });
  
  server.get('/sitemap.xml', async (req, res) => {
    //const sitemap = new SitemapStream({ hostname: environment.POST_URL });
    res.type('text/xml');
    res.setHeader('Content-Encoding', 'utf8');
    try {
      let routes = ['', 'prameya/contact-us', 'prameya/termofuses']; // Add your routes here
      const response = await axios.get('http://localhost:8073/prameya/api/post/get-sitemap-details-odia').then(res => res.data);
      response.body?.forEach((r:any)=>{
        let routeData = JSON.parse(r);
        routes.push(routeData.slug)

      })
      let sitemapItems = [];
      for(let i = 0; i< routes.length ; i++) {
        let route:any = routes[i];
        
        let Item = {
          url: [
            {
              loc:  environment.POST_URL+route,
            },
            { changefreq: "daily" },
            { lastmod: route.post_date },
            { priority: "1.0" },
          ],
        };
        //await sitemap.write({ url: route, changefreq: 'monthly', priority: 0.5 });
        sitemapItems.push(Item);
      }
      const sitemapObject = {
        urlset: [
          {
            _attr: {
              xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
              "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
              "xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
            },
          },
          // indexItem,
          ...sitemapItems,
        ],
      };
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xml(sitemapObject)}`;
      // const stream = await sitemap.pipe(gzip);
      // const smStream = await streamToPromise(stream);
      //sitemap.end();
      await writeFileAsync(__dirname+'/sitemap.xml', sitemap, "utf8");
      res.sendFile(__dirname+'/sitemap.xml');
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });



  
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
 server.get('/',redisMiddleware, (req, res, next) => {
  // res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  next();
});


server.get('*',  (req, res) => {
  res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

  // error handler
  server.use(function(err:any, req:any, res:any, next:any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err.message)
    res.status(err.status || 500);
    res.send(err.message);
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4001;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
