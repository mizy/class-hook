import React from 'react';
import addHook,{addState,addEffect} from '../Hooks'

// @useHooks
class ClassComponent extends React.Component{
  
    render(){
        const [value,setValue] = addState(1);
        addEffect(()=>{
            setValue(this.props.data)
        },[this.props.data])
        
        return <div>
            <div>
                值：{value}<button onClick={()=>{setValue(value+1)}}>+</button>
            </div>
        </div>
    }
}
export default addHook(ClassComponent);