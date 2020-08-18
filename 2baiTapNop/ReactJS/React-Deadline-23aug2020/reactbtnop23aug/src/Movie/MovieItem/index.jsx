import React, { Component } from 'react'

export default class MovieItem extends Component {
	render() {
		return (
			<div className="card my-4">
				<img src={this.props.movie.hinhAnh} alt="" width={350} height={500} />
				<div className="card-body">
					<h3>{this.props.movie.tenPhim}</h3>
          <p>{this.props.movie.moTa}</p>
				</div>
			</div>
		)
	}
}
