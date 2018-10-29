/**
 * 画正多边形
 * @param  {[type]} ctx  [description]
 * @param  {[type]} conf [description]
 * @return {[type]}      [description]
 */
export const drawPolygon = ( ctx, conf ) => {
  var x = conf && conf.x || 0; //中心点x坐标
  var y = conf && conf.y || 0; //中心点y坐标
  var num = conf && conf.num || 3; //图形边的个数
  var r = conf && conf.r || 100; //图形的半径
  var width = conf && conf.width || 1;
  var strokeStyle = conf && conf.strokeStyle;
  var fillStyle = conf && conf.fillStyle;
  var image = conf && conf.image;

  //开始路径
  ctx.beginPath();
  var startX = x + r * Math.sin( 2 * Math.PI * 0 / num );
  var startY = y + r * Math.cos( 2 * Math.PI * 0 / num ) - r / 2;

  ctx.moveTo( startX, startY );
  for ( var i = 1; i <= num; i++ ) {
    var newX = x + r * Math.sin( 2 * Math.PI * i / num );
    var newY = y + r * Math.cos( 2 * Math.PI * i / num ) - r / 2;
    ctx.lineTo( newX, newY );
  }
  //路径闭合
  if ( strokeStyle ) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }
  if ( fillStyle ) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.closePath();

  ctx.clip();
  ctx.drawImage( image, 0, 0, image.width, image.height, startX - r, startY - 2 * r, r * 2, r * 2 );

}

export const clippingPath = ( pathPoints, img, x, y ) => {

  // save the unclipped context
  ctx.save();

  // define the path that will be clipped to
  ctx.beginPath();
  ctx.moveTo( pathPoints[ 0 ], pathPoints[ 1 ] );
  // this demo has a known number of polygon points
  // but include a loop of "lineTo's" if you have a variable number of points
  ctx.lineTo( pathPoints[ 2 ], pathPoints[ 3 ] );
  ctx.lineTo( pathPoints[ 4 ], pathPoints[ 5 ] );
  ctx.closePath();

  // stroke the path
  // half of the stroke is outside the path
  // the outside part of the stroke will survive the clipping that follows
  ctx.lineWidth = 2;
  ctx.stroke();

  // make the current path a clipping path
  ctx.clip();

  // draw the image which will be clipped except in the clipping path
  ctx.drawImage( img, x, y );

  // restore the unclipped context (==undo the clipping path)
  ctx.restore();
}
/**
 * 图片转base64格式
 */
export const img2base64 = ( url, crossOrigin ) => {
  return new Promise( resolve => {
    const img = new Image();

    img.onload = () => {
      const c = document.createElement( 'canvas' );

      c.width = img.naturalWidth;
      c.height = img.naturalHeight;

      const cxt = c.getContext( '2d' );

      cxt.drawImage( img, 0, 0 );
      // 得到图片的base64编码数据
      resolve( c.toDataURL( 'image/png' ) );
    };

    crossOrigin && img.setAttribute( 'crossOrigin', crossOrigin );
    img.src = url;
  } );
}
