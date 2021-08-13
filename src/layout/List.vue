<template>
  <div id="list">
    <div class="header">
      <h1 class="title">{{ $t('BetHistory') }}</h1>
      <ul class="form-style">
        <li>
          <div class="dataTime">
            <label>{{ $t('SearchDate') }}</label>
            <el-date-picker
              v-model="searchDate[0]"
              type="date"
              :editable="false"
              :clearable="false"
              :picker-options="pickerOptions"
              :placeholder="$t('StartDate')">
            </el-date-picker>
            <label>{{ $t('To') }}</label>
            <el-date-picker
              v-model="searchDate[1]"
              type="date"
              :editable="false"
              :clearable="false"
              :picker-options="pickerOptions"
              :placeholder="$t('EndDate')">
            </el-date-picker>
            <el-button @click.prevent="searchListByDate" class="gary">{{ $t('Search') }}</el-button>
          </div>
        </li>
        <li>
          <div class="inputText">
            <label for="">{{ $t('IDSearch') }}</label>
            <el-input v-model="condition.itemNumber"></el-input>
            <el-button @click.prevent="getListByID" class="gary">{{ $t('Search') }}</el-button>
          </div>
        </li>
      </ul>
      <p class="betPrompt"><i class="el-icon-info"></i>{{ $t('BetPrompt') }}</p>
    </div>
    <div class="content">
      <div class="data-list">
        <ul class="_head">
          <li>{{ $t('RoundID') }}</li>
          <li>{{ $t('DateTime') }}</li>
          <li>{{ $t('BetTotal') }}</li>
          <li>{{ $t('TotalWin') }}</li>
        </ul>
        <ol class="_list" :data-none="$t('nodata')">
          <li v-for="(item, key) in dataList" :key="key" class="item" @click="$emit('changeView', { view:'Detail', data: item })">
            <div :data-label="$t('RoundID')"><span class="txt-underline">{{ item.round_code }}</span></div>
            <div :data-label="$t('DateTime')"><span>{{ item.bet_time }}</span></div>
            <div :data-label="$t('BetTotal')"><span>{{ item.bet }}</span></div>
            <div :data-label="$t('TotalWin')"><span>{{ item.win }}</span></div>
          </li>
        </ol>
      </div>
    </div>
    <div class="footer" v-show="pagination.listTotal > 0">
      <el-button icon="el-icon-arrow-left" class="gary" :disabled="pagination.currPage == 1" @click="prevPage()"></el-button>
      <select @change="changePage" v-model="pagination.currPage">
        <option v-for="(item,index) in pagination.listTotal" :value="index+1" :key="index">{{ index+1 }}</option>
      </select>
      <span class="total">{{ pagination.listTotal }}</span>
      <el-button icon="el-icon-arrow-right" class="gary" :disabled="pagination.currPage == pagination.listTotal" @click="nextPage()"></el-button>
    </div>
  </div>
</template>

<i18n src="@/lang/list.json"></i18n>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { getList } from '@/api/list'

export default {
  name: 'List',
  components:{
  },
  data(){
    return{
      /** 使用者資訊 */
      info:{
        account: null,
      },
      /** 搜尋條件 */
      condition:{
        searchType: 1, // 搜尋模式：單號查詢(0)、日期查詢(1)
        searchStart: null,
        searchEnd: null,
        itemNumber: null // 單號
      },
      /** date picker 設定 */
      searchDate: [],
      maxDate: moment().format('YYYY-MM-DD'),
      minDate: moment().add(-6, 'days').format('YYYY-MM-DD'),
      pickerOptions: {
        disabledDate: (time) => {
          const eachTime = moment(time)
          return eachTime.isBefore(moment(this.minDate)) || eachTime.isAfter(moment(this.maxDate)) ? true : false
        }
      },
      /** 頁碼 */
      pagination:{
        currPage: 1,
        listTotal: 0,
        intPerPage: 10,
      },
      /** 資料列表 */
      dataList: {}
    }
  },
  computed: {
    ...mapState({
      gameID: state => state.gameID,
      language: state => state.language,
      gameToken: state => state.gameToken,
    }),
  },
  methods: {
    /** 格式化資訊 */
    dataFormat(res) {
      if(!res.spin_summarys){
        this.clearData()
        return false
      }
      const data = res.spin_summarys.slice(0)
      data.map(v=>{
        v.bet_time = moment((v.bet_time)*1000).utcOffset(-240).format()
        v.bet = v.bet / res.money_fraction_multiple
        v.win = v.win / res.money_fraction_multiple
      })

      this.pagination.listTotal = Math.ceil(res.total_count / this.pagination.intPerPage)
      this.info.account = data.user_name

      return data
    },
    /** 清除資料 */
    clearData(){
      this.pagination.listTotal = 0
      this.dataList = {}
      this.pagination.currPage = 1
      this.info.account = null
    },
    /** 取得列表(日期) */
    async getListByDate(start, end){
      const { pagination:{ currPage, intPerPage } , condition: { searchStart, searchEnd } } = this

      const startDate = start ? moment(`${start} 00:00:00`).utc().valueOf() / 1000 : searchStart ?  searchStart : moment(`${moment().add(-6,'d').format('YYYY-MM-DD')} 00:00:00`).utc().valueOf() / 1000
      const endDate = end ? moment(`${end} 23:59:59`).utc().valueOf() / 1000 : searchEnd ?  searchEnd : moment(`${moment().format('YYYY-MM-DD')} 23:59:59`).utc().valueOf() / 1000
      
      this.condition.searchStart = startDate
      this.condition.searchEnd = endDate
      this.condition.searchType = 1

      const params = {
        token: this.gameToken,
        query_type: 1,
        begin_time: this.condition.searchStart,
        end_time: this.condition.searchEnd,
        rows: intPerPage,
        page: currPage,
      }

      const data = await getList(params)
      this.dataList = this.dataFormat(data)
    },
    /** 日期搜尋 */
    searchListByDate(){      
      if(!this.searchDate[0] || !this.searchDate[1]) { return false }
      if (moment(this.searchDate[0]).isAfter(moment(this.searchDate[1]))) {
        const _min = this.searchDate[1]
        const _max = this.searchDate[0]
        this.searchDate = [_min, _max]
      }

      this.pagination.currPage = 1
      this.getListByDate(moment(this.searchDate[0]).format('YYYY-MM-DD'), moment(this.searchDate[1]).format('YYYY-MM-DD'))
    },
    /** 取得列表(單號) */
    async getListByID(){
      const { pagination:{ currPage, intPerPage } , condition: { itemNumber } } = this
      this.condition.searchType = 0

      this.pagination.currPage = 1

      const params = {
        token : this.gameToken,
        round_code: itemNumber,
        query_type: 0,
        rows: intPerPage,
        page: currPage,
      }

      const data = await getList(params)
      this.dataList = this.dataFormat(data)
    },
    prevPage() {
      this.pagination.currPage -=1
      this.condition.searchType == 1 ? this.getListByDate() : this.getListByID()
    },
    nextPage() {
      this.pagination.currPage +=1
      this.condition.searchType == 1 ? this.getListByDate() : this.getListByID()
    },
    changePage(){
      this.condition.searchType == 1 ? this.getListByDate() : this.getListByID()
    }
  },
  created(){
    this.getListByDate()
  }
}
</script>

<style lang="scss" scoped>
/** Layout */
#list{
  height: 100%;
  .header{
    height: 200px;
    .title{
      padding: .5em 0;
    }
  }
  .betPrompt{
    text-align: right;
    font-size: $fz-min;
    i:before{
      margin-right: .25em;
    }
  }
  .content{
    height: calc(100vh - 245px);
  }
  .footer{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    height: 45px;
    padding: 0 .5em;
    font-size: 15px;
    @include gradient-gary;
    .el-button{
      line-height: normal;
      padding: 0;
      width: 25px;
      height: 25px;
      margin: 0 .5em;
      &.is-disabled{
        opacity: .5;
      }
    }
    select{
      min-width: 3em;
      height: 25px;
      border: none;
      border-radius: 4px;
      margin: 0 .5em;
      &:focus{ 
        outline: none;
      }
    }
    .total{
      display: inline-block;
      font-weight: bold;
      &::before{
        content: '/';
        margin: 0 .5em 0 .25em;
        vertical-align: top;
      }
    }
  }
}

/** UI */
.data-list{
  text-align: center;
  ._head{
    font-weight: bold;
    line-height: 2.5em;
	}
  ._list{
    position: relative;
    // color: #eee;
    >.item{
      cursor: pointer;
      padding: 1em .5em;
			transition: all .4s;
      &:hover{
        color: darken($color-primary,15%) !important;
			}
      &:not(:first-child){
        border-top: 1px dotted #222;
			}
		}
		&:empty::before{
			content: attr(data-none);
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
      padding: 1em 2em;
      font-size: $fz-min;
		}
	}
  .list-detail-item{
    text-decoration: underline;
    cursor: pointer;
	}
}

@media only screen and (min-width: 1001px){
.data-list{
	position: relative;
	height: 100%;
	._head{
		width: 100%;
		@include gradient-gary;
	}
	._list{
		height: calc(100% - 42px);
		overflow-y: auto;
	}
	._head,._list>.item{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		align-content: stretch;
		>*{
			width: 25%;
		}
		&:nth-child(even){
			background: #060606;
			}
		}
	}
}

@media only screen and (max-width: 1000px){
  
}
</style>