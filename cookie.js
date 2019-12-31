// 设置cookie
export function set(key, value, expires_day) {
  let time = new Date();
  let expires = time.getTime() + (expires_day * 24 * 60 * 60 * 1000);// 过期时间
  document.cookie = key + '=' + value + ";" + expires;
}

// 获取cookie
export function get(key) {
  let reg = new RegExp('(^|)' + key + '=([^;]*)(;|$)');// URL
  let arr = document.cookie.match(reg);
  if (arr) {
    return arr[2];
  }
  else {
    return null;
  }
}

// 删除cookie
export function remove(key) {
  let time = new Date();
  time.setTime(time.getTime() - 1);
  let value = get(key);
  if (value) {
    document.cookie = key + '=' + value + ';expires=' + time.toUTCString();
  }
}
