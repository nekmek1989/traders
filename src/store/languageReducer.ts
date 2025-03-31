interface IAction {
    type: string
    payload: any
}

interface state {
    lang: 'russian' | 'english'
}

const defaultState: state = {
    lang: 'russian'
}

const selectLanguage = {
    ru: 'RUSSIAN',
    en: 'ENGLISH'
}

export const languageReducer = (state: state = defaultState, action: IAction)=> {
    switch (action.type) {
        case selectLanguage.ru :
            return {lang: action.payload}
        case selectLanguage.en :
            return {lang: action.payload}
        default:
            return state
    }
}

export const selectRu = (): IAction => ({type: 'RUSSIAN', payload: 'russian'})
export const selectEn = (): IAction => ({type: 'ENGLISH', payload: 'english'})