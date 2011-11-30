var RandomURLString = module.exports = function(length){
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var res = "";
  for(x=length; x--;) {
    i = Math.floor(Math.random() * 62);
    res += chars.charAt(i);
  }
  return res;
}
