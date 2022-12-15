export const GlobalVariable = {
  lagToInit: 6000,
  lagToLoad: 600,

  blockHeader: function(route: string){
    var blockRoutes= ['/', ''];
    if (blockRoutes.indexOf(route) === -1){
        return true;
    }
    return false;
  },

  blockFooter: function(route: string){
    var blockRoutes= ['/', ''];
    if (blockRoutes.indexOf(route) === -1){
        return true;
    }
    return false;
  },
};
