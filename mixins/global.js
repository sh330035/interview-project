export default {
    methods: {
      formatNumber(num) {
        // 將數字轉換為字串
        let str = num.toString();
  
        // 用正規表達式匹配出小數部分
        const match = str.match(/\.(\d+)/);
  
        // 如果有小數部分，則進行處理
        if (match) {
          let decimal = match[1];
          let integer = str.slice(0, match.index);
  
          // 小數部分不足 2 位，則補零
          if (decimal.length < 2) {
            decimal += '0';
          }
  
          // 使用千分位分隔符號分隔整數部分
          integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
          // 將整數部分與小數部分合併為字串
          str = `${integer}.${decimal}`;
        } else {
          // 沒有小數部分，則直接使用千分位分隔符號分隔整數部分
          str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
  
        // 返回處理後的字串
        return str;
      }
    }
  };