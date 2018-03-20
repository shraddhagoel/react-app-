import React,{ Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks } from '../api/tasks.js'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import Task from './Task.js'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hideCompleted: false
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

    Tasks.insert({
      text,
      createdAt: new Date()
    })

    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  toggleHideCompleted () {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    })
  }

  renderTasks () {
    let filteredTasks = this.props.tasks
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ))
  }

  render () {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}
export default withTracker(() => {
  Meteor.subscribe('tasks')

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count()

  }
})(Dashboard)
