import * as types from './mutations_type'

export const setGameID = ({commit}, id) => {
	commit(types.SET_GAMEID, id)
}

export const setLanguage = ({commit}, lang) => {
	commit(types.SET_LANGUAGE, lang)
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

export const appInit = ({commit}, obj) => {
	commit(types.APP_INIT, obj)
}

export const setMultiple = ({commit}, multiple) => {
	commit(types.SET_MULTIPLE, multiple)
}