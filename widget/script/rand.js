//生成随机数
function NumberRandom(num){
  var charactors="ab1cd2ef3gh4ij5kl6mn7opq8rst9uvw0xyz";
  var value='',i;
  for(var j=1;j<=num;j++){
    i = parseInt(charactors.length*Math.random());
    value = value + charactors.charAt(i);
  }
  return value;
}
