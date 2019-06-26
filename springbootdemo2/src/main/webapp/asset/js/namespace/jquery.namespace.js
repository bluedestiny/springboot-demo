/**
 * Created by liteng on 16/3/25.
 */

$.namespace = function() {
    var arg = arguments, ns=null, i, j, nsArray;
    for (i=0; i<arg.length; i=i+1) {
        nsArray = arg[i].split(".");
        ns = window;
        for (j = 0; j <nsArray.length; j++) {
            ns[nsArray[j]] = ns[nsArray[j]] || {};
            ns = ns[nsArray[j]];
        }
    }
    return ns;
};
