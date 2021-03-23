import { Observable } from 'rxjs';
import { NestInterceptor, Optional, ExecutionContext, mixin, CallHandler, Inject,} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { save } from './storage';

interface IField {
  name: string;
  options?: any;
}

export function GraphqlFiles(uploadFields: IField[], localOptions?: any ,) {
  class MixinInterceptor implements NestInterceptor {
    options: any = {};

    constructor(@Optional() options: any = {}) {
      this.options = { ...options, ...localOptions };
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      {
        const ctx = GqlExecutionContext.create(context);
        const args = ctx.getArgs() 
        for ( let field of uploadFields ) {
          if (field.options.array)
          await args[this.options.input][field.name].map((file) => save(file).then( (f) => file = f ))
          else
          args[this.options.input][field.name] = save( args[this.options.input][field.name]).then((file) => file )
        }
        return next.handle()
      }
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}