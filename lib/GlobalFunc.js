var GlobalFunc = (function(){
	function GlobalFunc(){
		// 返回当前时间戳
		this.time = new Date().getTime();
	}	
	
	/**
	 * [fn.copy] 深拷贝
	 * @params data
	 * @return anything
	 */
	GlobalFunc.prototype.copy = function(data){
		if(typeof data != 'object'){
			return data;
		}

		var tmpdata;

		if(data instanceof Array){
			tmpdata = [];
			for(var i = 0; i < data.length; i++){
				tmpdata.push(this.copy(data[i]));
			}
		}else{
			tmpdata = {};
			for(var k in data){
				if(data.hasOwnProperty(k)){
					tmpdata[k] = this.copy(data[k]);
				}
			}
		}

		return tmpdata;
	};
	
	/**
	 * [fn.pbnq] 裴波那契数列
	 * @params n 个数
	 * @return 1 1 2 3 5 8
	 */
	GlobalFunc.prototype.pbnq = function(n){
		if(n == 1 || n == 2){
			return 1;
		};
		
		return this.pbnq(n-1) + this.pbnq(n-2);
	}
		
	/**
	 * [fn.yhsj] 杨辉三角
	 * @params n 行数
	 * @params m 列数
	 * @return 1, 1 1,  1 2 1
	 */
	GlobalFunc.prototype.yhsj = function(n,m){
		if(m == 1 || m == n){
			return 1;
		};
		
		return this.yhsj(n-1, m-1) + this.yhsj(n-1, m);
	}
	
	/**
	 * [fn.uniqueArr] 数组去重
	 * @params arr: [{year:2017},{year:2017},{year:2018},{year:2019}]
	 * @params label 函数,false || fn: function(item){ return item.year } 
	 * @return arr
	*/
	GlobalFunc.prototype.uniqueArr = function(arr, label){
		if(!label){
			if(Set){
				return [...new Set(arr)]
			}else{
				return arr.filter(function(v, k, array){
					return array.lastIndexOf(v) == k;
				})
			}		
		};
		
		if(typeof label != 'function'){
			console.log('类型错误');
			return arr;
		}
		
		var labelMap = {};
		
		return arr.map(function(v, k){
			return {value: v, key: label(v, k)}; //添加关系映射
		}).filter(function(v,k){
			return labelMap[v.key] ? false : (labelMap[v.key] = true); //去重
		}).map(function(v){
			return v.value;	//返回去重后的原数组
		})
	}
	
	/**
	 * [fn.queryFilter] 筛选请求参数
	 * @params str: 'user=&name=&pw=123'
	 * @return obj: {pw: 123}
	*/
	GlobalFunc.prototype.queryFilter = function(str){
		var obj = str.split("&").map((v,k)=>( {val:v.split("=")[1],key:v.split("=")[0]} )).filter((v,k)=>( v.val ? true : false )).map((v, k)=>{ 
			var obj = {};
			obj[v['key']] = v['val'];
			return obj;
		});
		return obj;
	}
	
	/**
	 * [fn.animate] 动画效果
	 * @params el: element, obj: attributes, speen: time
	 * @return none;
	*/
	GlobalFunc.prototype.animate = function(el, obj, speed){
		var el = document.getElementById(el);

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				(function(el, obj, speed, key){
					var oldNum = parseFloat(getComputedStyle ? getComputedStyle(el)[key] : el.currentStyle(key)),
						newNum = parseFloat(obj[key]),
						total = newNum - oldNum,
						num = Math.abs(total) / speed,
						order = 0;

					var time = setInterval(function(){
						
						oldNum = parseFloat(getComputedStyle ? getComputedStyle(el)[key] : el.currentStyle(key));

						if(order != speed){
							order++;
							el.style[key] = (total > 0 ?  (oldNum + num) : (oldNum - num)) + 'px';
						}else{
							el.style[key] = newNum + 'px';
							clearInterval(time);
						}        

					}, 1) 
				})(el, obj, speed, key)               

			}
		}
		
	}	

	/**
	 * [fn.queue] 队列
	 * @params name: object name
	 * @return object;
	 */
	GlobalFunc.prototype.queue = function(name){
		if(sessionStorage.getItem(name)){
			return sessionStorage.getItem(name);
		}else{
			return sessionStorage.setItem(name) = {
				arrlist: [],
				flag: true,
				add: function(method){				//添加队列
					var _this = this;

					_this.arrlist.push(method);
				},
				clear: function(){					//清除队列
					_this.flag = true;
					_this.arrlist = [];
				},
				dispatch: function(data){			//队列执行
					var _this = this,
						func = null;

					if(_this.arrlist.length > 0){
                        _this.arrlist.shift()(data);
                    }else{
						_this.flag = true;
					}
				},
				run: function(data){				//队列执行，仅一次
					var _this = this;

					if(_this.arrlist.length > 0 && _this.flag){
						_this.flag = false;
                        _this.arrlist.shift()(data);
                    }
				}
			}
		}
	}
	
	return new GlobalFunc();
}());

module.exports=GlobalFunc;