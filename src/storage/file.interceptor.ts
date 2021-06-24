import { Observable } from 'rxjs';
import { NestInterceptor, Optional, ExecutionContext, mixin, CallHandler, Inject, } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { save } from './storage';
import { GraphQLUpload } from 'apollo-server-express';


export function GraphqlFiles(inputType) {
  class MixinInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      {
        const ctx = GqlExecutionContext.create(context);
        const input = ctx.getArgs()[inputType]
        Object.keys(input).map(async key => {
          if (input[key] instanceof Promise) {
            await save(input[key]).then((f) => input[key] = f)
          }
          if (input[key] instanceof Array ) {
            for (let file of input[key]) {
              await save(file).then((f) => file = f).catch( e => '')
            }
          }
        })
        return next.handle()
      }
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}