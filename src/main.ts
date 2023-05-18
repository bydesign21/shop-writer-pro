import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import awsmobile from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';
import { AppModule } from './app/app.module';
import { persistState } from '@datorama/akita';

const storage = persistState({
  include: ['session']
});

const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

Amplify.configure(awsmobile);
Auth.configure(awsmobile);
