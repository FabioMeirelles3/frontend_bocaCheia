export const environment = {
  production: true,
  baseApiUrl: function(){
    if (this.production){
      return "http://localhost:3000/"
    }else{
      return "http://localhost:3000/"
    }
  }
};
