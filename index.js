import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'


const nums = [7,8,9,4,5,6,1,2,3,0]
const ops = ['/', '*', '-', '+']

class App extends React.Component {
  
  state = {
    display: '',
    calculations: '',
    operand: ''
  }
  
  handleOp = (e) => {
    const {display, calculations, operand} = this.state;
    const {innerText} = e.target
    console.log(innerText)
    
    this.setState({
      operand: innerText,
      display: ''
    })
    
    if (!calculations) {
      this.setState({
        calculations: display
      })
    } else if (!display) {
      this.setState({
        calculations: calculations
      })
    } else if (display < 0 && operand === '-') {
      this.setState({
        calculations: Number(calculations) - Number(display)
      })      
    } else {
      this.setState({
        calculations: eval(calculations + operand + display)
      })
    }
    
  } // end handleOp
  
  handleClick = (e) => {
    const {display, calculations, operand} = this.state
    const {innerText} = e.target
    console.log(innerText)
    
    switch(innerText) {
      
      case 'AC': {
        this.setState({
          display: '',
          calculations: '',
          operand: ''
        })
        break
      }
      
      case '=': {
        if (display < 0 && operand === '-') {
          this.setState({
            calculations: Number(calculations) - Number(display),
            display: '',
            operand: ''
          })
        } else {
          this.setState({
            display: '',
            calculations: eval(calculations + operand + display),
            operand: ''
          })
        }
        break
      }
      
      case '+/-': {
        this.setState({
          display: (display * -1).toString()
        })
        break
      }
        
      case '.': {
        if (!display.includes('.')) {
          this.setState({
            display: display + innerText
          })
        }
        break
      }
        
      default: {
        if (display === 0) {
          this.setState({
            display: innerText
          })
        } else {
          this.setState({
            display: display + innerText
          })
        }
        break
      }
        
    } // end switch cases
    
  } // end handleClick
  
  
  render() {
    
    const {display, calculations, operand} = this.state
    
    return (
    <div>
      <div className='calculator'>
        
        <div className='display'>
          <small className='calculations'>{calculations}</small>
          <small className='operand'>{operand}</small>
          {display}
        </div>
        
        <div className='left-grid'>
          <button 
            className='special long'
            onClick={this.handleClick}
          >
            AC
          </button>
          <button 
            className='extras'
            onClick={this.handleClick}
          >
            +/-
          </button>
          
          {nums.map(num => (
            <button
              className={`dark-grey ${num === 0 && 'long'}`}
              key={num}
              onClick={this.handleClick}
            >
              {num}
            </button>
          ))}
          
          <button 
            className='extras'
            onClick={this.handleClick}
          >
            .
          </button>
        </div>
        
        <div className='right-grid'>
          
          {ops.map(op => (
            <button
              className='operations'
              key={op}
              onClick={this.handleOp}
            >
              {op}
            </button>
          ))}
          
          <button 
            className='special'
            onClick={this.handleClick}
          >
            =
          </button>
        </div>
      
      </div>
    </div>
    ) // end return
  } // end render
} // end App

ReactDOM.render(<App/>, document.getElementById('root'))