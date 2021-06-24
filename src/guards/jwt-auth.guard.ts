import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "./current-user.decorator";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, connection } = ctx.getContext();


    // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
    let subscriptions = (connection && connection.context && connection.context.headers )
      ? connection.context
      : req;
    //subscriptions = req
    //console.log(subscriptions)
    return subscriptions

  }

  handleRequest(err, user, info) {
    if (err || !user || user.banned ) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}