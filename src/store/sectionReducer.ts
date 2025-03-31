interface IState {
    section: string
}

interface IAction {
    type: string
    payload: any
}

const selectSection = {
    settings: 'settings',
    balance: 'balance',
    main: 'main'
}

const defaultState: IState = {
    section: 'main'
}

export const sectionReducer = (state: IState = defaultState, action: IAction) => {
    switch (action.type) {
        case selectSection.main:
            return {section: action.payload}
        case selectSection.balance:
            return {section: action.payload}
        case selectSection.settings:
            return {section: action.payload}
        default:
            return state
    }
}

export const selectMain = (): IAction => ({type: 'main', payload: 'main'})
export const selectBalance = (): IAction => ({type: 'balance', payload: 'balance'})
export const selectSettings = (): IAction => ({type: 'settings', payload: 'settings'})