import * as types from './mutations_type'

export const setgameID = ({commit}, id) => {
	commit(types.SET_GAMEID, id)
}

export const setLanguage = ({commit}, lang) => {
	commit(types.SET_LANGUAGE, lang)
}

