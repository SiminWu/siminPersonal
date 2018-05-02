/* jshint esversion: 6 */
import {
    RegexEnum
} from './regexEnum'; // 正则规则枚举




// 公共工具类
export const CommonUtils = {
    /**
     * 判断字符串是否为空
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isEmptyOrNull(v) { return typeof (v) === 'undefined' || v === '' || v == null ? true : false; },
    /**
     * 判断是否为对象
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isObject(v) {
        if (Object.prototype.toString.call(v) === '[object Array]') {
            return false;
        }
        return typeof (v) === 'object' || v != null ? true : false;
    },
    /**
     * 判断是否为数组
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isArray(v) { return Object.prototype.toString.call(v) === '[object Array]'; },
    /**
     * 判断是否为节点集
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isNodeList(v) { return Object.prototype.toString.call(v) === '[object NodeList]'; },
    /**
     * 判断是否为input元素
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isInputElement(v) { return Object.prototype.toString.call(v) === '[object HTMLInputElement]'; },
    /**
     * 判断是否为函数
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isFunction(v) { return typeof (v) === 'function'; },
    /**
     * 判断是否为整数
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isNumber(v) { return typeof (v) === 'number'; },
    /**
     * 判断是否为字符串
     * @param {String} v 判断的值
     * @returns {Boolean} 是否通过
     */
    isString(v) { return typeof (v) === 'string'; },
    /**
     * 正则统一验证函数
     * @param {Object} els 元素对象
     * @param {Boolean} debug 弹出框
     * @param {String} tips 弹出框提示内容
     * @return {Boolean}
     */
    formIsNull(els, debug, tips) { // 验证表单是否为空聚焦
        let elArray = [];
        if (CommonUtils.isNodeList(els)) {
            elArray = Array.from(els); // 将节点集转换成数组
        }
        if (CommonUtils.isArray(els)) {
            elArray = els;
        }
        function _tips(el, _debug) { // 提示/测试
            let flag = false;
            if (!CommonUtils.isEmptyOrNull(el.value)) {
                flag = true;
                return flag;
            }
            el.focus();
            if (!_debug) {
                return flag;
            }
            if (CommonUtils.isEmptyOrNull(tips)) {
                alert('请填写输入框...');
                return flag;
            }
            alert(tips);
            return flag;
        }
        if (CommonUtils.isInputElement(els)) { // 单个验证
            if (!CommonUtils.isEmptyOrNull(els.value)) {
                return false;
            }
            if (!_tips(els, debug, tips)) {
                return false;
            }
        }
        for (let el of elArray) { // 多个验证
            if (!_tips(el, debug, tips)) {
                return false;
            }
        }
        return true;
    },
    /**
     * 正则统一验证函数
     * @param (regex : regex) 正则规则
     * @param (value : Objext) 值
     * @return {Boolean}
     */
    regValidator(regx, value) {
        if (CommonUtils.isEmptyOrNull(regx) || CommonUtils.isEmptyOrNull(value) || CommonUtils.isArray(value)) {
            // throw new Error('参数有误...');
            return false;
        }
        return regx.test(value);
    },

    /**
     * 默认跳转页面
     * @param {String} path 跳转路径
     */
    getDefaultPath(path = '/login') {
        window.location.href = window.location.origin + '/#/login';
    },
    /**
     * 延时方法
     * @param {Function} callback 回调操作
     * @param {Number} times 延时时间，默认1秒
     */
    delayFunc(callback, times = 1000) {
        if (!this.isFunction(callback)) { throw TypeError('不是一个函数.'); }
        setTimeout(callback, times);
    },

    /**
     * 根据窗口大小变动;
     * @param {Object} that Vue对象
     * @param {Object} proto 元素标签
     * @param {Number} heightCb 计算出的高度
     */
    getTableHeightOnsize(that, proto, heightCb) {
        that.$nextTick(() => {
            that[proto] = CommonUtils.getTableHeightByOrvide(...heightCb());
            let firstOnResizeFire = true;
            window.onresize = (event) => {
                if (!firstOnResizeFire) return;
                firstOnResizeFire = false;
                that[proto] = CommonUtils.getTableHeightByOrvide(...heightCb());
                firstOnResizeFire = true;
            };
        });
    },
    /**
     * 数值取最大值减其他值;
     * @param {Array} heights 相减的高度集
     * @returns {Number} 计算出的高度
     */
    getTableHeightByOrvide(...heights) {
        let sum = 0;
        sum = heights.find(item => sum < item);
        heights.forEach(item => {
            if (sum !== item) sum = sum - item;
        });
        return parseInt(sum);
    },
    /**
     * 这个是监听浏览器缩放响应事件(setResize和resetResize一般要一起使用)
     * 建议是在mounted事件里写
     * @param {Number} which 定时器的data值
     * @param {Function} callback 定时器间隔时间,建议默认200，可以另外设置
     * @param {Number} time 函数节流回调函数
     */
    setResize(which, callback, time) {
        time = time ? time || 0 : 200;
        window.onresize = _ => {
            clearTimeout(which);
            which = setTimeout(_ => { if (callback) callback(); }, time);
        };
    },
    /**
     * 这个是重置监听浏览器缩放响应事件, 建议在beforeDestroy事件里写
     */
    resetResize() { window.onresize = ''; },
    /**
     * 滚动条回到顶部
     * @param {Object} element 滚动条所在的元素
     * @param {Number} speedValue 滚动条的滚动速度，默认是10
     */
    scrollTop(element, speedValue = 10) {
        let speed = element.scrollTop / speedValue;
        function qat() {
            if (element.scrollTop <= 0) return;
            element.scrollTop = element.scrollTop - speed;
            if (!window.requestAnimationFrame) {
                setInterval(qat, 66);
                return;
            }
            window.requestAnimationFrame(qat);
        }
        window.requestAnimationFrame(qat);
    }
};

// 正则工具类
export const RegexUtils = {
    /**
     * 账户格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    accountFormat(v) {
        return CommonUtils.regValidator(RegexEnum.ISACCOUNT, v);
    },
    /**
     * 手机格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    phoneFormat(v) { return CommonUtils.regValidator(RegexEnum.ISMOBILE, v); },
    /**
     * 座机格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    TelFormat(v) { return CommonUtils.regValidator(RegexEnum.TELPHONE, v); },
    /**
     * 邮箱格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    email(v) { return CommonUtils.regValidator(RegexEnum.EMAIL, v); },
    /**
     * 用户名格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    userName(v) { return CommonUtils.regValidator(RegexEnum.USERNAME, v); },
    /**
     * 名称格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isName(v) { return CommonUtils.regValidator(RegexEnum.NAME, v); },
    /**
     * 检测密码格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isPassword(v) { return CommonUtils.regValidator(RegexEnum.ISPWD, v); },
    /**
     * 是否为数字
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isNumber(v) { return CommonUtils.regValidator(RegexEnum.NUMBER, v); },
    /**
     * 弱密码格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    lowLevel(v) { return CommonUtils.regValidator(RegexEnum.LOWPWD, v); },
    /**
     * 强密码格式
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    highLevel(v) { return CommonUtils.regValidator(RegexEnum.HIGHPWD, v); },
    /**
     * Mileage
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isMileage(v) { return CommonUtils.regValidator(RegexEnum.MILEAGE, v); },
    /**
     * COST
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isCost(v) { return CommonUtils.regValidator(RegexEnum.COST, v); },
    /**
     * setError COST
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isErrorCost(v) { return CommonUtils.regValidator(RegexEnum.ERRORCOST, v); },
    /**
     * 匹配url地址
     * @param {String} v 验证的值
     * @returns {Boolean} 验证是否通过
     */
    isUrl(v) { return CommonUtils.regValidator(RegexEnum.URL, v); },

};

// 对Array的扩展
// 添加元素（含重复）
Array.prototype.add = function (val) {
    if (CommonUtils.isEmptyOrNull(val)) return false;
    this.push(val);
    return true;
}

// 添加元素（去除重复）
Array.prototype.addSet = function (val) {
    if (CommonUtils.isEmptyOrNull(val)) return false;
    for (var i = 0; i < this.length; i++) {
        if (typeof (this[i]) === val) break;
        this[i].push(val);
    }
    return true;
};

// 根据角标删除
Array.prototype.removeByIndex = function (index) {
    return !CommonUtils.isEmptyOrNull(this.splice(index, 1));
};

// 根据值删除
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (typeof (this[i]) === val) {
            this.splice(i, 1);
            return true;
        }
        return false;
    }
};

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) return i;
  }
  return -1;
};

Array.prototype.removeArray = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};



// 本地保存父类
class StorageS {
    constructor(storage) {
        if (!storage) {
            return new Error('当前浏览器不支持本地存储...');
        }
        this.storage = storage;
    }
    /**
     * 保存单个字符串
     * @param {String} key 关键字
     * @param {any} value 保存的值
     */
    setItem(key, value) {
        if (this.storage == null || CommonUtils.isEmptyOrNull(key) || CommonUtils.isEmptyOrNull(value) || !CommonUtils.isString(value)) {
            return;
        }
        this.storage.setItem(key, value);
    }
    /**
     * 获取单个字符串
     * @param {String} key 关键字
     * @returns {String} 对应的值
     */
    getItem(key) {
        if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
            return null;
        }
        if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
            return null;
        }
        return this.storage.getItem(key);
    }
    /**
     * 保存json对象
     * @param {String} key 关键字
     * @param {Object} value 保存的对象
     */
    setObj(key, value) {
        if (this.storage == null || CommonUtils.isEmptyOrNull(key) || (CommonUtils.isEmptyOrNull(value) && !CommonUtils.isArray(value))) {
            return;
        }
        if (!CommonUtils.isObject(value) && CommonUtils.isString(value) && !CommonUtils.isArray(value)) {
            this.storage.setItem(key, value);
            return;
        }
        this.storage.setItem(key, JSON.stringify(value));
    }
    /**
     * 获取json对象
     * @param {String} key 关键字
     * @returns {Object} 对应的对象
     */
    getObj(key) {
        if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
            return null;
        }
        if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
            return null;
        }
        return JSON.parse(this.storage.getItem(key));
    }
    /**
     * 删除指定的本地存储
     * @param {Striing} key 关键字
     * @returns {Boolean} 是否删除成功
     */
    remove(key) {
        if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
            return true;
        }
        if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
            return true;
        }
        this.storage.removeItem(key);
        if (!CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
            return false;
        }
        return true;
    }
    /**
     * 清除本地存储
     */
    clear() {
        this.storage.clear();
    }
}

// 本地存储对象
class LocalStorage extends StorageS {
    constructor() {
        super(window.localStorage);
    }
}
export const Storage = new LocalStorage();


// 登录用户信息
class LoginAccount {
  constructor() {
    this.LocalStorage = new LocalStorage();
  }
  /**
   * 登录返回的token
   * @param {String} name 关键字, 默认是account
   * @returns {String} 获取到的token
   */
  getToken(name = 'account') {
    let account = this.LocalStorage.getObj(name);
    if (CommonUtils.isEmptyOrNull(account)) {
      return '';
    }
    return account.token;
  }
  /**
   * 获取登录用户信息
   * @param {String} name 关键字, 默认是account
   * @returns {Object} 用户信息对象
   */
  getUserInfo(name = 'account') {
    let account = this.LocalStorage.getObj(name);
    if (CommonUtils.isEmptyOrNull(account)) {
      CommonUtils.getDefaultPath();
    }
    return account.info;
  }
}
export const Account = new LoginAccount();
// 会话存储对象
class SessionStorage extends StorageS {
    constructor() {
        super(window.sessionStorage);
    }
}
export const SessionLocal = new SessionStorage();



// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format('yyyy-MM-dd HH:mm:ss.S') ==> 2006-07-02 08:09:04.423
// (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'H+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return fmt;
};

Date.prototype.GetTodayBegin = function () {
    return new Date(new Date().Format('yyyy/MM/dd') + ' 00:00:00');
}

Date.prototype.GetTodayEnd = function () {
    return new Date(new Date().Format('yyyy/MM/dd') + ' 23:59:59');
}

// 扩展, 获取当月最后一天
Date.prototype.GetLastDay = function () {
    var has31 = [1, 3, 5, 7, 8, 10, 12];
    var nowYear = this.getFullYear();
    var nowMonth = this.getMonth() + 1;
    nowMonth = nowMonth >= 10 ? nowMonth : '0' + nowMonth;
    var nowDay = 0;
    if (nowMonth === '02') {
        nowDay = nowYear % 4 === 0 && nowYear % 100 !== 0 ? 29 : 28;
    } else if (has31.indexOf(Number(nowMonth)) !== -1) {
        nowDay = 31;
    } else {
        nowDay = 30;
    }
    return `${nowYear}/${nowMonth}/${nowDay}`;
};

// 扩展, 获取上n个月第一天
Date.prototype.GetLastMonthFirstDay = function (n) {
    var nowYear = this.getFullYear();
    var nowMonth = this.getMonth();
    if (nowMonth <= n - 1) {
        nowYear -= 1;
        nowMonth = 12 - (n - 1) + nowMonth;
    } else nowMonth -= (n - 1);
    nowMonth = nowMonth >= 10 ? nowMonth : '0' + nowMonth;
    return `${nowYear}/${nowMonth}/01`;
};

// 扩展, 获取上月最后一天
Date.prototype.GetLastMonthLastDay = function () {
    var has31 = [1, 3, 5, 7, 8, 10, 12];
    var nowYear = this.getFullYear();
    var nowMonth = this.getMonth();
    if (nowMonth === '0') {
        nowYear -= 1;
        nowMonth = 12;
    }
    nowMonth = nowMonth >= 10 ? nowMonth : '0' + nowMonth;
    var nowDay = 0;
    if (nowMonth === '02') {
        nowDay = nowYear % 4 === 0 && nowYear % 100 !== 0 ? 29 : 28;
    } else if (has31.indexOf(Number(nowMonth)) !== -1) {
        nowDay = 31;
    } else {
        nowDay = 30;
    }
    return `${nowYear}/${nowMonth}/${nowDay}`;
};

// 扩展, 获取本周的开始日期
Date.prototype.GetWeekStartDate = function () {
    var nowDayOfWeek = this.getDay() == 0 ? 7 : this.getDay(); // 今天本周的第几天
    var nowDay = this.getDate(); // 当前日
    var nowMonth = this.getMonth(); // 当前月
    var nowYear = this.getFullYear(); // 当前年
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    return weekStartDate.Format('yyyy/MM/dd');
};

// 扩展, 获取本周的结束日期
Date.prototype.GetWeekEndDate = function () {
    var nowDayOfWeek = this.getDay() == 0 ? 7 : this.getDay(); // 今天本周的第几天
    var nowDay = this.getDate(); // 当前日
    var nowMonth = this.getMonth(); // 当前月
    var nowYear = this.getFullYear(); // 当前年
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
    return weekEndDate.Format('yyyy/MM/dd');
};

// 扩展, 获取上周的开始日期
Date.prototype.GetLastWeekStartDate = function () {
  var nowDayOfWeek = this.getDay() == 0 ? 7 : this.getDay(); // 今天本周的第几天
  var nowDay = this.getDate(); // 当前日
  var nowMonth = this.getMonth(); // 当前月
  var nowYear = this.getFullYear(); // 当前年
  var weekLastStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
  return weekLastStartDate.Format('yyyy/MM/dd');
};

// 扩展, 获取上周的结束日期
Date.prototype.GetLastWeekEndDate = function () {
  var nowDayOfWeek = this.getDay() == 0 ? 7 : this.getDay(); // 今天本周的第几天
  var nowDay = this.getDate(); // 当前日
  var nowMonth = this.getMonth(); // 当前月
  var nowYear = this.getFullYear(); // 当前年
  var weekLastEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return weekLastEndDate.Format('yyyy/MM/dd');
};

// 扩展， 获取最近七天
// 2017-04-13 TODO 需完善
// 简化功能
Date.prototype.GetSevenDays = function (type = '') {
    let days = [];
    let nowDay = this.getDate();
    let nowMonth = this.getMonth() + 1;
    let nowYear = this.getFullYear();
    let has31 = [1, 3, 5, 7, 8, 10, 12];

    for (let i = 0; i < 7; ++i) {
        if (nowDay === 0) {
            nowMonth -= 1;
            if (nowMonth === 0) {
                nowYear -= 1;
                nowMonth = 12;
            }
            if (nowMonth === 2) {
                nowDay = nowYear % 4 === 0 && nowYear % 100 !== 0 ? 29 : 28;
            } else {
                nowDay = has31.indexOf(nowMonth) !== -1 ? 31 : 30;
            }
        }

        switch (type) {
            case 'y':
                days.push(`${nowYear}/${nowMonth >= 10 ? nowMonth : '0' + nowMonth}/${nowDay >= 10 ? nowDay : '0' + nowDay}`);
                break;
            case 'm':
                days.push(`${nowMonth >= 10 ? nowMonth : '0' + nowMonth}/${nowDay >= 10 ? nowDay : '0' + nowDay}`);
                break;
            case 'd':
                days.push(`${nowDay >= 10 ? nowDay : '0' + nowDay}`);
                break;
            default:
                days.push(parseInt(nowDay));
                break;
        }
        nowDay -= 1;
    }
    return days.reverse();
};

// 扩展， 按类别获取最近七个
Date.prototype.GetSeven = function (type) {
    let arr = [];
    let nowYear = this.getFullYear();
    let nowMonth = this.getMonth() + 1;
    if (type === 'd') {
        return this.GetSevenDays({ y: true });
    } else if (type === 'm') {
        for (let i = 0; i < 7; ++i) {
            arr.push(`${nowYear}/${nowMonth >= 10 ? nowMonth : '0' + nowMonth}`);
            nowMonth -= 1;
            if (nowMonth === 0) {
                nowMonth = 12;
                nowYear -= 1;
            }
        }
    } else if (type === 'y') {
        for (let i = 0; i < 7; ++i) {
            arr.push(`${nowYear}`);
            nowYear -= 1;
        }
    }
    return arr.reverse();
};

// 扩展， 任意7天
Date.prototype.GetTargetSeven = function (type) {
    let obj = {prevDays: [], nextDays: []};
    let prevDay = this.getDate();
    let nextDay = this.getDate();
    let prevMonth = this.getMonth() + 1;
    let nextMonth = this.getMonth() + 1;
    let prevYear = this.getFullYear();
    let nextYear = this.getFullYear();
    let has31 = [1, 3, 5, 7, 8, 10, 12];

    function isMaxMonth(year, month, hashList) {
        if (month === 2) return year % 4 === 0 && year % 100 !== 0 ? 29 : 28;
        return hashList.indexOf(month) !== -1 ? 31 : 30;
    }

    for (let i = 0; i < 7; ++i) {
        if (prevDay === 0) {
            prevMonth -= 1;
            if (prevMonth === 0) {
                prevYear -= 1;
                prevMonth = 12;
            }
            prevDay = isMaxMonth(prevYear, prevMonth, has31);
        }
        switch (type) {
            case 'y':
                obj.prevDays.push(`${prevYear}/${prevMonth >= 10 ? prevMonth : '0' + prevMonth}/${prevDay >= 10 ? prevDay : '0' + prevDay}`);
                break;
            case 'm':
                obj.prevDays.push(`${prevMonth >= 10 ? prevMonth : '0' + prevMonth}/${prevDay >= 10 ? prevDay : '0' + prevDay}`);
                break;
            case 'd':
                obj.prevDays.push(`${prevDay >= 10 ? prevDay : '0' + prevDay}`);
                break;
            default:
                obj.prevDays.push(parseInt(prevDay));
                break;
        }
        prevDay -= 1;
    }

    for (let i = 0; i < 7; ++i) {
        switch (type) {
            case 'y':
                obj.nextDays.push(`${nextYear}/${nextMonth >= 10 ? nextMonth : '0' + nextMonth}/${nextDay >= 10 ? nextDay : '0' + nextDay}`);
                break;
            case 'm':
                obj.nextDays.push(`${nextMonth >= 10 ? nextMonth : '0' + nextMonth}/${nextDay >= 10 ? nextDay : '0' + nextDay}`);
                break;
            case 'd':
                obj.nextDays.push(`${nextDay >= 10 ? nextDay : '0' + nextDay}`);
                break;
            default:
                obj.nextDays.push(parseInt(nextDay));
                break;
        }
        if (nextDay === isMaxMonth(nextYear, nextMonth, has31)) {
            if (nextMonth === 12) {
                nextYear += 1;
                nextMonth = 1;
            } else { nextMonth += 1; }
            nextDay = 0;
        }
        nextDay += 1;
    }
    obj.prevDays.reverse();
    return obj;
};

/**
 * 转换成时间差
 * @param {Number} nTime  时间差(时间戳)
 */
Date.prototype.subtractTime = function (nTime) {
    // var days = Math.floor(nTime / (24 * 3600))
    // var leave1 = nTime % (24 * 3600)    //计算天数后剩余的毫秒数
    var hours = Math.floor(nTime / (3600));
    var leave2 = nTime % (3600); // 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60));
    var leave3 = leave2 % (60); // 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3);
    return `${hours}时${minutes}分${seconds}秒`;
};




