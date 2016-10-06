require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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
  render() {
    return (
     <section className="stage">
			  <section className="img-sec"></section>
			  <nav className="controller-nav">lalalal</nav>
	 </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

