function getStyle(element){
    if(!element.style){
        element.style = {};
    }

    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;//?
        element.style[prop] = element.computedStyle[prop].value;

        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString.match(/^[0-9\.]$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element){
    if(!element.computedStyle){
        return undefined;
    }

    let elementStyle = getStyle(element);
    
    // now, we only support the flex layout
    if(elementStyle.display !== "flex"){
        return undefined;
    }
    
    // check children for layout, and skip text nodes
    let items = element.children.filter(child => child.type === "element");

    // support the order property
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    })

    let style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === "auto" || style[size] === ''){
            style[size] = null;
        }
    });

    // flexDirection's default value is "row".
    if(!style.flexDirection || style.flexDirection === "auto"){
        style.flexDirection = "row";
    }
    if(!style.alignItems || style.alignItems === "auto"){// alignments?
        style.alignItems = "stretch";
    }
    if(!style.justifyContent || style.justifyContent === "auto"){
        style.justifyContent = "flex-start"; // items are packed toward the start line
    }
    if(!style.flexWrap || style.flexWrap === "auto"){
        style.flexWrap = "nowrap";
    }
    if(!style.alignContent || style.alignContent === "auto"){
        style.alignContent = "stretch";
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase, 
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    
    if(style.flexDirection === "row"){// from left to right
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    } else if (style.flexDirection === "row-reverse"){// from right to left
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    } else if (style.flexDirection === "column"){// from top to down
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    } else if (style.flexDirection === "column-reverse"){// from bottom to top
        mainSize = "height";
        mainStart = "bottom";
        mainEnd = "top";
        mainSign = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if(style.flexWrap === "wrap-reverse"){ // The wrap-reverse value does the opposite 
                                           // - the last item will jump onto the previous line and align over the first item.
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
        // TODO: crossBase is left for computing
    } else {
        crossBase = 0;
        crossSign = +1;
    }
}

module.exports = layout;