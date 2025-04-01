export interface ISection {
    section: string
}

interface IAction {
    type: string
    payload: any
}

const selectSection = {
    balance: 'balance',
    main: 'main'
}

const defaultState: ISection = {
    section: 'main'
}

export const sectionReducer = (state: ISection = defaultState, action: IAction) => {
    switch (action.type) {
        case selectSection.main:
            return {section: action.payload}
        case selectSection.balance:
            return {section: action.payload}
        default:
            return state
    }
}

export const selectMain = (): IAction => ({type: 'main', payload: 'main'})
export const selectBalance = (): IAction => ({type: 'balance', payload: 'balance'})