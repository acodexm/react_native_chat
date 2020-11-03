import { NodePlopAPI } from 'plop';
import componentGenerator from './generators/component';
import viewGenerator from './generators/view';
import serviceGenerator from './generators/service';
import modelGenerator from './generators/model';
import storeGenerator from './generators/store';
import navigatorGenerator from './generators/navigator';

export default function main(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('model', modelGenerator);
  plop.setGenerator('view', viewGenerator);
  plop.setGenerator('nav', navigatorGenerator);
  plop.setGenerator('service', serviceGenerator);
  plop.setGenerator('store', storeGenerator);
}
