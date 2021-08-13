import * as types from './mutations_type'

export const setGameID = ({commit}, id) => {
	commit(types.SET_GAMEID, id)
}

export const setGameToken = ({commit}, token) => {
	commit(types.SET_GAMETOKEN, token)
}

export const setLanguage = ({commit}, lang) => {
	commit(types.SET_LANGUAGE, lang)
}

export const setGameMode = ({commit}, mode) => {
	commit(types.SET_GAMEMODE, mode)
}

export const setContentView = ({commit}, view) => {
	commit(types.SET_CONTENT_VIEW, view)
}

export const setLoading = ({commit}, visible) => {
	commit(types.SET_LOADING, visible)
}

export const setApiURL = ({commit}, url) => {
	commit(types.SET_API_URL, url)
}

