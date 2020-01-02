let idReg = /^([0-9]{15}|[0-9]{18}|[0-9]{17}[xX]{1})$/
let nameReg = /^[\u4e00-\u9fa5]{2,10}$/
let phoneReg = /^1[3-9][0-9]{9}$/

export function idCheck(v) {
  if (!v) {
    return { valid: true }
  }
  let result = {
    valid: idReg.test(v)
  }
  if (!result.valid) {
    result.msg = '身份证校验失败'
  }
  return result
}

export function nameCheck(v) {
  if (!v) {
    return { valid: true }
  }
  let result = {
    valid: nameReg.test(v)
  }
  if (!result.valid) {
    result.msg = '姓名校验失败'
  }
  return result
}

export function phoneCheck(v) {
  if (!v) {
    return { valid: true }
  }
  let result = {
    valid: phoneReg.test(v)
  }
  if (!result.valid) {
    result.msg = '手机号校验失败'
  }
  return result
}

//银行卡号Luhn校验算法
//luhn校验规则：16位银行卡号（19位通用）:
//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
//3.将加法和加上校验位能被 10 整除。

//bankno为银行卡号
export function luhnCheck(bankno) {
  if (bankno.toString().length < 20) {
    let lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhn进行比较）

    let first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    let newArr = [];
    for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1));
    }
    let arrJiShu = []; //奇数位*2的积 <9
    let arrJiShu2 = []; //奇数位*2的积 >9

    let arrOuShu = []; // 偶数位数组
    for (let j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 === 1) { //奇数位
        if (parseInt(newArr[j]) * 2 < 9) {
          arrJiShu.push(parseInt(newArr[j]) * 2);
        } else {
          arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
      } else {
        arrOuShu.push(newArr[j]);
      }//偶数位
    }

    let jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
    let jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    let sumJiShu = 0; //奇数位*2 < 9 的数组之和
    let sumOuShu = 0; //偶数位数组之和
    let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    let sumTotal = 0;
    for (let m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (let n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (let p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    let k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10;
    let luhn = 10 - k;
    if (lastNum + '' === luhn + '') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
