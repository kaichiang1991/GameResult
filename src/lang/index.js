import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store from '@/store'

import common from './common'

Vue.use(VueI18n)

const messages = {
	'en': common.en,
	'zh-cn': common.cn,
}

const i18n = new VueI18n({
	locale: Store.getters.language,
  silentTranslationWarn: true,
	messages,
})

export default i18n