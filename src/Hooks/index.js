import React from "react";
const now = {
    current:undefined
};
export default function addHook(WrappedComponent){
    
    class Helper extends React.Component{
       
        states = [];
        effects=[];
        init = true;
        statesIndex =0 ;
        effectsIndex = 0;
        
        constructor(props){
            super()
        }
        componentDidMount(){
            this.init = false;
        }
        clear(){
            this.statesIndex =0;
            this.effectsIndex =0;
        }
        
        render(){
            now.current = this;
            this.clear();
            const {forwardedRef, ...rest} = this.props;
            return <WrappedComponent {...rest} ref={forwardedRef} />
        }
    }

    return React.forwardRef((props,ref)=><Helper {...props} forwardedRef={ref}/>)
}   

function addState(initialValue){
    const {states,init,statesIndex} = now.current;
    const nowComponent = now.current;
    let value = initialValue;
    let nowIndex = now.current.statesIndex;
    if(init){
        states.push(initialValue);
    }else{
        value = states[statesIndex];
    }   
    nowComponent.statesIndex++;

    return [value,(v)=>{
        states[nowIndex] = v;
        nowComponent.setState([...states])
    }]
}

function addEffect(callback,args=[]){
    const {effects,init} = now.current;
    const nowComponent = now.current;
    let nowIndex = now.current.effectsIndex;
    if(init){
        effects.push(args);
        nowComponent.effectsIndex++;
        if(args.length===0){
            callback()
        }
    }else{
        const values = effects[nowIndex];
        nowComponent.effectsIndex++;
        if(args.find((item,index)=>item!==values[index])){
            callback();
            effects[nowIndex] = args;
        }
    }
}
function addMemo(callback,args=[]){
    const {effects,init} = now.current;
    const nowComponent = now.current;
    let nowIndex = now.current.effectsIndex;
    if(init){
        effects.push(args);
        nowComponent.effectsIndex++;
        if(args.length===0){
            return callback()
        }
    }else{
        const values = effects[nowIndex];
        nowComponent.effectsIndex++;
        if(args.find((item,index)=>item!==values[index])){
            effects[nowIndex] = args;
            return callback();
        }
    }
}
export {
    addState,
    addEffect
}