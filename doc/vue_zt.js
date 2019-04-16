module.exports = {
  "getUserInfo": {
    "code": 1,
    "msg": "获取成功",
    "id": 2, // 用户id
    "chance": 1, // 剩余抽奖次数
    "surName": "郭先生", // 姓氏
  },

  "lottery": {
      "code": 1,
      "msg": function () {
        return this.isAward ? '恭喜获奖' : '未中奖'
      },
      "isAward|0-1": 1,			//是否中奖0否1是
      'amountType|0-4': 4,
      "amount": function () {
        return ([10, 20, 30, 0.5, 2])[this.amountType]
      }			//红包金额
  },

  "getCoupon": {
    "code|0-2": 1, // 0 领取失败 1 领取成功 2 已领取过
    "msg": function () {
      return this.code === 1 
        ? '成功领取优惠券'
        : this.code === 0
        ? '领取失败'
        : '已领取过'
        
    }
  }
}