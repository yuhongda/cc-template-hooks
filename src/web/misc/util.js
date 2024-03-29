export function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

export function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

export function leadingZero(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}
export function dateFormat(date, formatString) {
    if (!date.valueOf())
        return '';

    var d = date,
        h = null;

    return formatString.replace(/(yyyy|mm|dd|hh|nn|ss)/gi,
        function ($1) {
            switch ($1.toLowerCase()) {
                case 'yyyy': return d.getFullYear();
                case 'mm': return leadingZero((d.getMonth() + 1), 2);
                case 'dd': return leadingZero(d.getDate(), 2);
                case 'hh': return leadingZero(d.getHours(), 2);
                case 'nn': return leadingZero(d.getMinutes(), 2);
                case 'ss': return leadingZero(d.getSeconds(), 2);
            }
        }
    );
}
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function getCombination(arrays) {
  var r = [], arg = arrays, max = arg.length-1;
  function helper(arr, i) {
      for (var j=0, l=arg[i].length; j<l; j++) {
          var a = arr.slice(0); // clone arr
          a.push(arg[i][j]);
          if (i==max)
              r.push(a);
          else
              helper(a, i+1);
      }
  }
  helper([], 0);
  return r;
}

export function chunkArray(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
  }
  return chunked_arr;
}

/**
 * debounce(fn, 200)
 * 
 * @export
 * @param {any} func 
 * @param {any} wait 
 * @param {any} immediate 
 * @returns 
 */
export function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

export function getGeoCoordMap(isProvince){
  if(isProvince){
    return {
      '北京': [116.4551, 40.2539],
      '天津': [117.4219, 39.4189],
      '上海': [121.4648, 31.2891],
      '重庆': [107.7539, 30.1904],
      '河北': [114.4995, 38.1006],
      '河南': [113.4668, 34.6234],
      '云南': [102.9199, 25.4663],
      '辽宁': [123.1238, 42.1216],
      '黑龙江': [127.9688, 45.368],
      '湖南': [113.0823, 28.2568],
      '安徽': [117.29, 32.0581],
      '山东': [117.1582, 36.8701],
      '新疆': [87.9236, 43.5883],
      '江苏': [118.8062, 31.9208],
      '浙江': [119.5313, 29.8773],
      '江西': [116.0046, 28.6633],
      '湖北': [114.3896, 30.6628],
      '广西': [108.479, 23.1152],
      '甘肃': [103.5901, 36.3043],
      '山西': [112.3352, 37.9413],
      '内蒙古': [111.4124, 40.4901],
      '陕西': [109.1162, 34.2004],
      '吉林': [125.8154, 44.2584],
      '福建': [119.4543, 25.9222],
      '贵州': [106.6992, 26.7682],
      '广东': [113.5107, 23.2196],
      '青海': [101.4038, 36.8207],
      '西藏': [91.1865, 30.1465],
      '四川': [103.9526, 30.7617],
      '宁夏': [106.3586, 38.1775],
      '海南': [110.3893, 19.8516],
      '台湾': [121.509062, 25.044332],
      '香港': [114.171994, 22.281089],
      '澳门': [113.549403, 22.192961]
    }
  }else{
    return {
      '上海': [121.4648,31.2891],
      '东莞': [113.8953,22.901],
      '东营': [118.7073,37.5513],
      '中山': [113.4229,22.478],
      '临汾': [111.4783,36.1615],
      '临沂': [118.3118,35.2936],
      '丹东': [124.541,40.4242],
      '丽水': [119.5642,28.1854],
      '乌鲁木齐': [87.9236,43.5883],
      '佛山': [112.8955,23.1097],
      '保定': [115.0488,39.0948],
      '兰州': [103.5901,36.3043],
      '包头': [110.3467,41.4899],
      '北京': [116.4551,40.2539],
      '北海': [109.314,21.6211],
      '南京': [118.8062,31.9208],
      '南宁': [108.479,23.1152],
      '南昌': [116.0046,28.6633],
      '南通': [121.1023,32.1625],
      '厦门': [118.1689,24.6478],
      '台州': [121.1353,28.6688],
      '合肥': [117.29,32.0581],
      '呼和浩特': [111.4124,40.4901],
      '咸阳': [108.4131,34.8706],
      '哈尔滨': [127.9688,45.368],
      '唐山': [118.4766,39.6826],
      '嘉兴': [120.9155,30.6354],
      '大同': [113.7854,39.8035],
      '大连': [122.2229,39.4409],
      '天津': [117.4219,39.4189],
      '太原': [112.3352,37.9413],
      '威海': [121.9482,37.1393],
      '宁波': [121.5967,29.6466],
      '宝鸡': [107.1826,34.3433],
      '宿迁': [118.5535,33.7775],
      '常州': [119.4543,31.5582],
      '广州': [113.5107,23.2196],
      '廊坊': [116.521,39.0509],
      '延安': [109.1052,36.4252],
      '张家口': [115.1477,40.8527],
      '徐州': [117.5208,34.3268],
      '德州': [116.6858,37.2107],
      '惠州': [114.6204,23.1647],
      '成都': [103.9526,30.7617],
      '扬州': [119.4653,32.8162],
      '承德': [117.5757,41.4075],
      '拉萨': [91.1865,30.1465],
      '无锡': [120.3442,31.5527],
      '日照': [119.2786,35.5023],
      '昆明': [102.9199,25.4663],
      '杭州': [119.5313,29.8773],
      '枣庄': [117.323,34.8926],
      '柳州': [109.3799,24.9774],
      '株洲': [113.5327,27.0319],
      '武汉': [114.3896,30.6628],
      '汕头': [117.1692,23.3405],
      '江门': [112.6318,22.1484],
      '沈阳': [123.1238,42.1216],
      '沧州': [116.8286,38.2104],
      '河源': [114.917,23.9722],
      '泉州': [118.3228,25.1147],
      '泰安': [117.0264,36.0516],
      '泰州': [120.0586,32.5525],
      '济南': [117.1582,36.8701],
      '济宁': [116.8286,35.3375],
      '海口': [110.3893,19.8516],
      '淄博': [118.0371,36.6064],
      '淮安': [118.927,33.4039],
      '深圳': [114.5435,22.5439],
      '清远': [112.9175,24.3292],
      '温州': [120.498,27.8119],
      '渭南': [109.7864,35.0299],
      '湖州': [119.8608,30.7782],
      '湘潭': [112.5439,27.7075],
      '滨州': [117.8174,37.4963],
      '潍坊': [119.0918,36.524],
      '烟台': [120.7397,37.5128],
      '玉溪': [101.9312,23.8898],
      '珠海': [113.7305,22.1155],
      '盐城': [120.2234,33.5577],
      '盘锦': [121.9482,41.0449],
      '石家庄': [114.4995,38.1006],
      '福州': [119.4543,25.9222],
      '秦皇岛': [119.2126,40.0232],
      '绍兴': [120.564,29.7565],
      '聊城': [115.9167,36.4032],
      '肇庆': [112.1265,23.5822],
      '舟山': [122.2559,30.2234],
      '苏州': [120.6519,31.3989],
      '莱芜': [117.6526,36.2714],
      '菏泽': [115.6201,35.2057],
      '营口': [122.4316,40.4297],
      '葫芦岛': [120.1575,40.578],
      '衡水': [115.8838,37.7161],
      '衢州': [118.6853,28.8666],
      '西宁': [101.4038,36.8207],
      '西安': [109.1162,34.2004],
      '贵阳': [106.6992,26.7682],
      '连云港': [119.1248,34.552],
      '邢台': [114.8071,37.2821],
      '邯郸': [114.4775,36.535],
      '郑州': [113.4668,34.6234],
      '鄂尔多斯': [108.9734,39.2487],
      '重庆': [107.7539,30.1904],
      '金华': [120.0037,29.1028],
      '铜川': [109.0393,35.1947],
      '银川': [106.3586,38.1775],
      '镇江': [119.4763,31.9702],
      '长春': [125.8154,44.2584],
      '长沙': [113.0823,28.2568],
      '长治': [112.8625,36.4746],
      '阳泉': [113.4778,38.0951],
      '青岛': [120.4651,36.3373],
      '韶关': [113.7964,24.7028]
    };
  }
}
export const COLOR_LIST = ['#3AA0FF', '#F3DE8C', '#7C82E9','#AC83E5', '#3590FF','#75D893', '#64D3D3'];
export const COLOR_LIST_Attr = ['#73B3EE', '#8DE2A7', '#7AD9D9','#F8E8A3', '#9A9EF2','#C09FEF', '#F8C8A3','#F29AA5','#7483BD','#62687C'];
export const MULTI_COLOR_LIST = ['#5AB3E8', '#FDE8AB', '#949EEC'];

export function getUrlQuery(name){
  let result = null;
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let regResult = window.location.search.substr(1).match(reg);
  if (regResult !== null) {
    result = regResult[2];
  }
  return result;
}

export function calculateNum(str) {
  let sum = 0;
  let len = str.length;
  if (str) {
      for (var i = 0; i < len; i++) {
          if (str.charCodeAt(i) > 255) {
              sum = sum + 2;
          } else {
              sum++;
          }
      }
      return sum;
  } else {
      return 0;
  }
}

export function toThousands(num) {
  var num = (num || 0).toString(), result = '';
  while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}

import React, { useState, useEffect, useRef } from 'react';

export const useDebounce = (value, delay, func) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        func(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
};

export const useThrottle = (value, limit) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    },
    [value, limit]
  );

  return throttledValue;
};


export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function isIphoneX() {
  /* iPhone 机型兼容
  * iPhone X       375x812  @3x
  * iPhone XS      375x812  @3x
  * iPhone XS Max  414x896  @2x
  * iPhone XR      414x896  @2x
  * */
  return (
    /iphone/gi.test(navigator.userAgent) && ( window.screen.height == 812 || window.screen.height == 896 )
  );
}
