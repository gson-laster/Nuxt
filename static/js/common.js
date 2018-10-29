// 页面引入js

/**
 * [dateFormat 日期格式化]
 * @Author   Rukic
 * @DateTime 2016-11-25T09:41:41+0800
 * @param    {[type]}                 format    [时间格式 比如yyyy:MM:dd hh:mm:ss y代表年 M代表月 d代表日 h代表时 m代表分 s代表秒 S代表毫秒]
 * @param    {[type]}                 timestamp [description]
 * @return   {[type]}                           [description]
 */
export function dateFormat( timestamp, format ) {
  var dateTime = timestamp ? new Date( timestamp ) : new Date(),
    fullYears = dateTime.getFullYear(),
    month = dateTime.getMonth() + 1,
    day = dateTime.getDate(),
    hours = dateTime.getHours(),
    minute = dateTime.getMinutes(),
    seconds = dateTime.getSeconds();

  //根据格式返回

  var o = {
    "M+": month, //月份
    "d+": day, //日
    "h+": hours, //小时
    "m+": minute, //分
    "s+": seconds, //秒
    "q+": Math.floor( ( month + 3 ) / 3 ), //季度
    "S": dateTime.getMilliseconds() //毫秒
  };
  if ( /(y+)/.test( format ) ) format = format.replace( RegExp.$1, ( fullYears + "" )
    .substr( 4 - RegExp.$1.length ) );
  for ( var k in o )
    if ( new RegExp( "(" + k + ")" )
      .test( format ) ) format = format.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] )
      .substr( ( "" + o[ k ] )
        .length ) ) );
  return format;
}
