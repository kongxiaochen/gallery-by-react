require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
var imageDatas=require('../data/imageDatas.json');

//利用自执行函数，利用图片名信息得到图片路径信息
imageDatas=(function getImageURL(imageDatasArr){

	for (var i = 0; i < imageDatas.length; i++) {
		var imageData=imageDatas[i];
		imageData.imageURL=require('../images/'+imageData.fileName);
		imageDatas[i]=imageData;
	}
	return imageDatasArr;

})(imageDatas);

function getRangeRandom(low,high){
	return Math.floor(Math.random() * (high - low) + low);
}

class ImgFigure extends React.Component{
	render(){

		var styleObj = {};
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}
		return(
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                     style={{
                     	width:'240px',
                     	height:'240px'
                     }}
				/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
};
/*var GalleryByReactApp=React.createClass({
	render:function(){
		return (
			<section className="stage">
			  <section className="img-sec">
			  </section>
			  <nav className="controller-nav"></nav>
			</section>
	    )
	}
})

ReactDOM.render(<GalleryByReactApp/>,document.getElementById('app'));

module.exports=GalleryByReactApp;*/


class AppComponent extends React.Component {


  
  constructor(props){
        super(props);
        this.Constant = {
  	        centerPos:{
  		      left:0,
  		      right:0
  	        },
  	        hPosRange:{            //水平方向的取值范围
  		      leftSecX:[0,0],
  		      rightSecX:[0,0],
  		      y:[0,0]

  	        },
  	        vPosRange:{            //垂直方向的取值范围
  		      x:[0,0],
  		      topY:[0,0]
  	        }
        };
        this.state = {
            imgsArrangeArr:[
             /* {
              	pos:{
              		left:'0',
              		top:'0'
              	}
              }*/
            ]
        };
    }
  /*
  *重新布局所有图片
  *@param centerIndex指定居中排布哪个图片
  */ 
  rearrange(centerIndex){
  	var imgsArrangeArr = this.state.imgsArrangeArr,
  	    Constant = this.Constant,
  	    centerPos = Constant.centerPos,
  	    hPosRange = Constant.hPosRange,
  	    vPosRange = Constant.vPosRange,
  	    hPosRangeLeftSecX = hPosRange.leftSecX,
  	    hPosRangeRightSecX = hPosRange.rightSecX,
  	    hPosRangeY=hPosRange.y,
  	    vPosRangeTopY=vPosRange.topY,
  	    vPosRangeX=vPosRange.x,

  	    imgsArrangeTopArr=[],
  	    topImgNum = Math.floor(Math.random() * 2);  //取一个或者不取
  	    topImgSpliceIndex = 0;

  	    imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);

  	    //首先居中centerIndex的图片

  	    imgsArrangeCenterArr[0].pos=centerPos;
       
  	    //取出要布局上侧的图片状态信息

  	    topImgSpliceIndex=Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
  	    imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

  	    //布局位于上侧的图片
  	    imgsArrangeTopArr.forEach(function(value,index){
           imgsArrangeTopArr[index].pos = {
           	  top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
           	  left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
           }
  	    });

  	    //布局位于两侧的图片
       for (var i = 0, j=imgsArrangeArr.length, k=j/2; i < j; i++) {
          var hPosRangeLorR = null;
       	  if(i<k){
       	  	hPosRangeLorR=hPosRangeLeftSecX;
       	  }else{
       	  	hPosRangeLorR=hPosRangeRightSecX;
       	  }
       	  
       	  imgsArrangeArr[i].pos={
       	  	top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
       	  	left:getRangeRandom(hPosRangeLorR[0],hPosRangeLorR[1])
       	  }

       	}
        
        
        if(imgsArrangeArr&&imgsArrangeTopArr[0]){
        	imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
        	imgsArrangeArr:imgsArrangeArr
        });




  }



  //组件加载后，为每张图片计算其位置的范围
  componentDidMount(){

  	//拿到舞台大小
    var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
        stageW=stageDOM.scrollWidth,
        stageH=stageDOM.scrollHeight,
        halfStageW=Math.floor(stageW/2),
        halfStageH=Math.floor(stageH/2);

    //拿到imgFigure的大小
    var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW=imgFigureDOM.scrollWidth,
        imgH=imgFigureDOM.scrollHeight,
        halfImgW=Math.floor(imgW/2),
        halfImgH=Math.floor(imgH/2);

    this.Constant.centerPos={
    	left: halfStageW - halfImgW ,
    	top: halfStageH - halfImgH

    };

    //计算左侧右侧图片排布的取值范围
    this.Constant.hPosRange.leftSecX[0] = - halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3 ;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片排布的取值范围
    this.Constant.vPosRange.topY[0] = - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    

    this.rearrange(0);

  }



  render() {
  	var controllerUnits=[],
  	    imgFigures=[];

  	imageDatas.forEach(function(value,index){
        
        if(!this.state.imgsArrangeArr[index]){
        	this.state.imgsArrangeArr[index]={
        		pos:{
        		  left:0,
        		  top:0}
        	}
        }

  		imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]}/>);
  	}.bind(this));
    return (
     <section className="stage" ref="stage">
			  <section className="img-sec">
			   {imgFigures}
			  </section>
			  <nav className="controller-nav">
			   {controllerUnits}
			  </nav>
	 </section>
    );
  }

}


AppComponent.defaultProps = {
};

export default AppComponent;

