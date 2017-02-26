import {promise as initPromise} from './promise'

export function state (ctx) {
  if (!ctx.resolve) {
    initPromise(ctx)
  }
  let {prop, resolve} = ctx
  let state = {}
  prop.getter('state', () => state)
  prop('setState', (...args) => {
    switch (args.length) {
      case 0:
        return resolve(state)
      case 1:
        if (Array.isArray(args[0])) {
          args = args[0]
        } else {
          return resolve(state = {...state, ...args[0]})
        }
    }
    args.unshift(state)
    return resolve(state = Object.assign.apply(state, args))
  })
  prop('replaceState', (newState) => {
    return resolve(state = newState || {})
  })
}
