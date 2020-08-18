import React, { Component } from 'react';
import redCar from './img/red-car.jpg';
import blackCar from './img/black-car.jpg';
import silverCar from './img/silver-car.jpg';

export default class CarColor extends Component {
  state = {
    carImg:redCar,
  }

  changeColor = (img) =>{
    this.setState({
      carImg:img,
    })
  }
  render() {
    return (
      <div className="container">
          <h4 className="text-center display-4">Bài tập thay đổi màu sắc xe trang 23</h4>
        <div className="row py-4">
          <div className="col-6">
            <img src={this.state.carImg} alt="car" className="w-100"/>
          </div>
          <div className="col-6">
            <h3>Vui lòng chọn màu sắc xe</h3>
            <button className = "btn btn-danger" onClick={() =>this.changeColor(redCar)}>Màu Đỏ</button>
            <button className = "btn btn-dark mx-4" onClick={() =>this.changeColor(blackCar)}>Màu Đen</button>
            <button className = "btn btn-secondary" onClick={()=>this.changeColor(silverCar)}>Màu Bạc</button>
          </div>
        </div>         
      </div>
    )
  }
}
