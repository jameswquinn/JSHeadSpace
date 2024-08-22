import { HeadSpace } from 'head-space'

export const HeadSpacePlugin = {
  install: (app) => {
    const headSpace = new HeadSpace()
    app.config.globalProperties.$headSpace = headSpace
    app.provide('headSpace', headSpace)
  }
}
