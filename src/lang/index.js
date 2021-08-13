import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store from '@/store'
import common from "./common";

Vue.use(VueI18n)

const { en, tw, cn, vi, th, id, ko } = common
const messages = {
	en,
	'zh-tw': tw,
	'zh-cn': cn,
	ko,
	th,
	id,
	vi,
}

const i18n = new VueI18n({
	locale: Store.getters.language,
  silentTranslationWarn: true,
	messages,
})

export default i18n