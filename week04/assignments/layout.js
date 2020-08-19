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
        return (void 0);
    }

    let elementStyle = getStyle(element);
    
    // now, we only support the flex layout
    if(elementStyle.display !== "flex"){
        return (void 0);
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

    let isAutoMainSize = false;
    if(!style[mainSize]){ // no size set on the main axis, so we do the auto sizing
        elementStyle[mainSize] = 0;
        for(let i = 0; i<items.length; i++){
            let item = items[i];
            let itemStyle = item.style;
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] > 0 ){
                elementStyle[mainSize] += itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    let flexLine = {items: []};
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize]; // the remaining space on the main axis
    let crossSpace = 0; //the size on the cross axis

    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;
        }

        if(style.flex){ //可伸缩的，是flex,而不是display flex?
            flexLine.items.push(item);
        } else if(itemStyle.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize]; // if itemStyle[mainSize] is not defined, then the mainSpace isn't changed.
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSpace]);
            }
            flexLine.items.push(item);
        } else {
            // wrap
            if(itemStyle[mainSize] > style[mainSize]){ // 比父元素的size还要大
                itemStyle[mainSize]  = style[mainSize];
            }

            if(mainSpace < style[mainSize]){//主轴里的剩余空间不足以
                // set the old flexLine
                flexLine.mainSpace = mainSpace;//?
                flexLine.crossSpace = crossSpace;//?
                flexLine.items.push(item);
                flexLines.push(flexLine);

                // reset flexLine;
                flexLine = {items:[]};

                // reset  mainSpace and crossSpace for the next flex line
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.items.push(item); //push an item into the flexLine, as the flexLine's mainSpace is greater than 0.
            }

            // update the crossSpace
            if(itemStyle[crossSize]!==null && itemStyle[crossSize]!== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSpace]);
            }

            // update the mainSpace
            mainSpace -= itemStyle[mainSize];
        }
    }
    // update the last flexLine's info
    flexLine.mainSpace = mainSpace;
    flexLine.crossSpace = crossSpace;

    console.log(flexLines);
}

module.exports = layout;