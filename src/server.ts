// import 'es5-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory'
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ɵServerRendererFactory2 } from '@angular/platform-server';
import root from 'window-or-global';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const window = root;
const createRenderer = ɵServerRendererFactory2.prototype.createRenderer;

ɵServerRendererFactory2.prototype.createRenderer = function () {
  const result = createRenderer.apply(this, arguments);

  const setProperty = result.setProperty;

  result.setProperty = function () {
    try {
      setProperty.apply(this, arguments);
    } catch (e) {
      if (e.message.indexOf('Found the synthetic') === -1) {
        throw e;
      }
    }
  };
  return result;
}


const PORT = process.env.PORT || 4000;

enableProdMode();

const app = express();

let template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'src')

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
