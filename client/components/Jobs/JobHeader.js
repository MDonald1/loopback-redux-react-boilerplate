import React from 'react'
import Numeral from 'numeral'
import Moment from 'react-moment'

import {connect} from 'react-redux'

import {deleteJob} from '../../actions'
import agent from '../../agent'

const mapStateToProps = (state) => ({
  token: state.common.token,
  userId: state.common.userId
})

const mapDispatchToProps = (dispatch) => ({
  deleteJob: (userId, jobId, token) =>
    dispatch(
      deleteJob(
        jobId,
        agent.jobs.delete(userId, jobId, token)
      )
    )
})

class JobHeader extends React.Component {
  constructor() {
    super()

    this.deleteJob = (userId, jobId, token) => e => {
      e.preventDefault()
      this.props.deleteJob(userId, jobId, token)
    }
  }

  render() {
    const job = this.props.job
    const token = this.props.token
    const userId = this.props.userId

    if (job) {
      return (
        /* <table>
          <tbody>
            <tr className="job-header">
              <td><a href='#' onClick={this.deleteJob(userId, job.id, token)}>X</a></td>
              <td>{job.title}</td>
              <td>{job.subcategory2}</td>
              <td>
                {Numeral(job.budget).format('$0,0')}
              </td>
              <td>
                <Moment fromNow>{job.date_created}</Moment>
              </td>
            </tr>
          </tbody>
        </table>
        */

        /*<ul className="list-inline job-header">
          <li className="list-inline-item">
            <a href='#' onClick={this.deleteJob(userId, job.id, token)}>X</a>
          </li>
          <li className="list-inline-item">
            {job.title}
          </li>
          <li className="list-inline-item">
            {job.subcategory2}
          </li>
          <li className="list-inline-item">
            {Numeral(job.budget).format('$0,0')}
          </li>
          <li className="list-inline-item">
            <Moment fromNow>{job.date_created}</Moment>
          </li>
        </ul>*/

        <div className="job-header">
          <div className="delete-button">
            <a href='#' onClick={this.deleteJob(userId, job.id, token)}>X</a>
          </div>
          <div className="">
            <ul className="header-elements list-inline">
              <li className="list-inline-item">{job.title}</li>
              <li className="list-inline-item">{job.subcategory2}</li>
              <li className="list-inline-item">{Numeral(job.budget).format('$0,0')}</li>
              <li className="list-inline-item"><Moment fromNow>{job.date_created}</Moment></li>
            </ul>
          </div>
        </div> 


      )
    } else return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobHeader)
