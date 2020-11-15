var getElementsByClassName = function (searchClass, node,tag) {
    if(document.getElementsByClassName){
        var nodes =  (node || document).getElementsByClassName(searchClass),result = [];
        for(var i=0 ;node = nodes[i++];){
            if(tag !== "*" && node.tagName === tag.toUpperCase()){
                result.push(node)
            }
        }
        return result
    }else{
        node = node || document;
        tag = tag || "*";
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
            patterns = [],
            current,
            match;
        var i = classes.length;
        while(--i >= 0){
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        }
        var j = elements.length;
        while(--j >= 0){
            current = elements[j];
            match = false;
            for(var k=0, kl=patterns.length; k<kl; k++){
                match = patterns[k].test(current.className);
                if (!match)  break;
            }
            if (match)  result.push(current);
        }
        return result;
    }
}

