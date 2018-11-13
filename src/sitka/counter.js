import { put, select } from "redux-saga/effects"
import { SitkaModule } from "olio-sitka"

export default class CounterModule extends SitkaModule {
    moduleName = "counter"

    defaultState = {
        counter: 0
    }

    static getCurrentState(state) {
        return state.counter
    }

    *handleIncrement() {
        const currentCounter = yield select(this.getCurrentState())
        yield put(this.setState(currentCounter + 1))
    }

    *handleDecrement() {
        const currentCounter = yield select(this.getCurrentState())
        yield put(this.setState(currentCounter - 1))
    }
}