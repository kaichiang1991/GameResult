<template>
  <div id="list">
    <div class="header">
      <h1 class="title">{{ $t('BetHistory') }}</h1>
      <ul class="form-style">
        <li>
          <div class="dataTime">
            <label class="label-title">{{ $t('SearchDate') }}</label>
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
            <label class="label-title">{{ $t('IDSearch') }}</label>
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
          <li v-for="(item, key) in dataList" :key="key" class="item" @click="$emit('detailPage', { view:'Detail', row: item, info: { userName, gameName } })">
            <div :data-label="$t('RoundID')"><span class="txt-underline">{{ item.round_code }}</span></div>
            <div :data-label="$t('DateTime')"><span>{{ item.bet_time }}</span></div>
            <div :data-label="$t('BetTotal')"><span>{{ item.bet }}</span></div>
            <div :data-label="$t('TotalWin')"><span>{{ item.win }}</span></div>
          </li>
        </ol>
      </div>
    </div>
    <div class="footer" v-show="pagination.listTotal > 0">
      <pagination :pagination.sync="pagination" @prevPage="prevPage" @nextPage="nextPage" @changePage="changePage"></pagination>
    </div>
  </div>
</template>

<i18n src="@/lang/list.json"></i18n>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { getList } from '@/api/list'
import { timeFormat, getGameName } from '@/utils/common'
import pagination from '@/components/pagination.vue'

export default {
  name: 'List',
  components:{
    pagination,
  },
  data(){
    return{
      userName: null, // 玩家帳號
      gameName: null, // 遊戲名稱
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
        currPage: 1, // 當前頁數
        listTotal: 0, // 總頁數
        intPerPage: 10, // 一頁幾筆
      },
      /** 資料列表 */
      dataList: {}
    }
  },
  computed: {
    ...mapState({
      gameToken: state => state.gameToken,
      gameID: state => state.gameID,
      language: state => state.language
    }),
  },
  methods: {
    /** 格式化資訊 */
    async dataFormat(res) {

      if(!this.userName){
        this.userName = res.user_name
        this.gameName = await getGameName(this.gameID, this.language)
      }

      this.$store.commit('SET_MULTIPLE', res.bet_base); // 押注乘數基本分

      // 列表資料
      const rowlist = res.spin_summarys.slice(0)
      rowlist.map(v=>{
        v.bet_time = timeFormat(v.bet_time)
        v.end_time = timeFormat(v.end_time)
        // money_fraction_multiple：錢小數轉整數時要乘的倍數; 以整數型態保存, 轉為小數需除以此欄位
        v.bet = v.bet / res.money_fraction_multiple
        v.win = v.win / res.money_fraction_multiple
      })
      
      this.pagination.listTotal = Math.ceil(res.total_count / this.pagination.intPerPage) // 總頁數

      return rowlist
    },
    /** 清除資料 */
    clearData(){
      this.pagination.listTotal = 0
      this.dataList = {}
      this.pagination.currPage = 1
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
      if(!data.spin_summarys){
        this.clearData()
      }else{
        const rowlist = await this.dataFormat(data)
        this.dataList = rowlist
      }

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
      if(!data.spin_summarys){
        this.clearData()
      }else{
        const rowlist = await this.dataFormat(data)
        this.dataList = rowlist
      }
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
/**----- Layout -----*/
#list{
  height: 100%;
  .header{
    height: 200px;
    .title{
      padding: .8em 0 .5em;
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
    .pagination{
      @include gradient-gary;
      justify-content: flex-end;
    }
  }
}

/**----- UI -----*/
// form style
.form-style{
	display: block;
	>li{
		padding: .5em 0;
	}
	// element UI
	.el-button{
		padding: 0 15px;
		// text-transform: uppercase;
		font-size: initial;
	}
}

// data list
.data-list{
  text-align: center;
  ._head{
    font-weight: bold;
    line-height: 2.5em;
	}
  ._list{
    position: relative;
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
      width: 100%;
      text-align: center;
			left: 0;
			top: 20%;
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
  .header{
    .title{
      padding: 20px 0;
    }
    .form-style{
      padding: 2.5% 5%;
      label.label-title{
        display: block;
        padding: .5em 0;
        &::after{
          content: '：';
        }
        &+.el-input{
          margin-left: 0;
        }
      }
      .dataTime{
        .el-input{
          width: 120px;
        }
      }
      /deep/
      .el-input{
        .el-input__icon{
          line-height: 30px;
        }
        .el-input__inner{
          line-height: 30px;
          height: 30px;
        }
      }
      .el-button{
        line-height: 30px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  #list{
    height: auto;
    .header,.content{
      height: auto;
    }
    .betPrompt{
      @include gradient-gary;
      padding: 0 1em;
      line-height: 3em;
      font-size: $fz-tiny;
    }
  }
  .data-list{
    text-align: left;
    padding-bottom: 45px;
    ._head{
      display: none;
    }
    ._list{
      &>.item{
        position: relative;
        padding: 2.5% 5%;
        [data-label]{
          padding: .5em 0;
          &::before{
            content: attr(data-label)'：';
          }
          &:first-child{
            font-size: $fz-min;
            &::before{
              @include elementUI-icon;
              content: "\e78b";
              margin-right: .5em;
            }
          }
        }
        &:nth-child(odd){
          background: #111;
        }
        &::after{
          position: absolute;
          @include elementUI-icon;
          content: "\e6e0";
          display: block;
          position: absolute;
          right: 2.5%;
          top: 50%;
          transform: translateY(-50%);
          font-size: $fz-title;
          opacity: .3;
          font-weight: normal;
        }
      }
      &:empty::before{
        position: relative;
        transform: none;
        left: auto;
        top: auto;
        text-align: center;
        margin: 10% auto;
      }
    }
  }
}
@media only screen and (max-width: 420px){
  .header{
    .form-style{
      .dataTime{
        .el-input{
          width: 105px;
        }
        /deep/.el-input__prefix{
          display: none !important; 
        }
        /deep/.el-input__inner{
          padding: 0 5px;
          text-align: center;
        }
      }
    }
  }
}
</style>