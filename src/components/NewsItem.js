import React from 'react'
// import PropTypes from 'prop-types'

const NewsItem=(props)=>{
// export class NewsItem extends Component {

    // let { title, description, imageurl, newsurl, author, date,source } = this.props
    let { title, description, imageurl, newsurl, author, date,source } = props
    return (
      <div className="container my-3">

        <div className="card" >
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span className="badge badge-light bg-danger">{source}</span>
          </div>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a target="_blanck" href={newsurl} rel="noreff" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem
