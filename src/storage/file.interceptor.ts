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
        const args = this.options.input ? ctx.getArgs()[this.options.input] : ctx.getArgs() 
        let res = await Promise.all(
          uploadFields.map( field => 
             save(args[field.name]).then( (file) => args[field.name] = file )
          )
        )
        return next.handle()
      }
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}