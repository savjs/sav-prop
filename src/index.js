export * from './prop'
export * from './promise'
import {state} from './state'

export {state}

export function propPlugin (router) {
  router.use({
    async payload (ctx, next) {
      state(ctx)
      await next()
      if (ctx.body === undefined) {
        ctx.body = ctx.state
      }
    }
  })
}
