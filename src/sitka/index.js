import { createAppStore, Sitka } from 'olio-sitka'
import CounterModule from './counter'
import { call } from 'redux-saga/effects'

const counterModule = new CounterModule()

const AppModules = {
    counter: counterModule,
    sitka: Sitka
}

const AppState = {
    counter: counterModule,
    sitka: Sitka,
    // __sitka__: Sitka(AppModules)
}

const sitka = new Sitka(AppModules)
sitka.register([new CounterModule()])

const sitkaMeta = sitka.createSitkaMeta()

export const createCoreAppStore = (
    middleware = [],
    reducersToCombine = [],
    sagaRoot = () => {}
) => {

    function * root () {
        if (sagaRoot) {
            yield call(sagaRoot)
        }

        yield call(sitkaMeta.sagaRoot)
    }

    const defaultState = AppState


    const reducers = [
        ...reducersToCombine,
        { ...sitkaMeta.reducersToCombine },
    ]

    const combinedMiddleware = [
        ...middleware,
        ...sitkaMeta.middleware
    ]

    const store = createAppStore(
        defaultState,
        reducers,
        combinedMiddleware,
        root
    )

    debugger

  sitka.setDispatch(store.dispatch)

  return store
}
