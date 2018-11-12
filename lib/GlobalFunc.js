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
	
	/**
	 * [fn.arrTotal] 数组计算
	 * @params arr: array, fn: function
	 * @return object;
	 */
	GlobalFunc.prototype.arrTotal = function(arr, fn){
		/*
		var arr = [
			{
				time: "2018-09-18",
				count: "1",
			},
			{
				time: "2018-09-15",
				count: "1",
			},
			{
				time: "2018-09-18",
				count: "1",
			},
			{
				time: "2018-09-16",
				count: "2",
			},
			{
				time: "2018-09-18",
				count: "3",
			},
			{
				time: "2018-09-15",
				count: "1",
			},
			{
				time: "2018-09-17",
				count: "1",
			},
			{
				time: "2018-09-18",
				count: "1",
			},
		],
		fn = function(){
			var data = {};
			return arr.forEach((v,i,arr) => {
				var time = v.time,
					count = parseInt(v.count);
				if(data[time] === undefined){
					data[time] = count;
				}else{
					data[time] = count + data[time]
				}
			})
		}
		*/
		return fn.call(this, arr);		//{2018-09-18: 6, 2018-09-15: 2, 2018-09-16: 2, 2018-09-17: 1}
	}
	
	/**
	 * [fn.fileToBlob] 图片压缩并转为blob对象
	 * @params file: file对象, type: 图片类型, quality: 压缩质量, callback: 回调函数
	 * @return null
	 */
	GlobalFunc.prototype.fileToBlob(file, type, quality, callback){
        var fr = new FileReader();

        fr.onload = function(e){
            var img = new Image();

            img.onload = function(){
                var cvs = document.createElement("canvas");
                var ctx = cvs.getContext("2d");
                cvs.width = img.width;
                cvs.height = img.height;
                ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
                cvs.toBlob(function(blob){
                    callback(blob);
                }, type, quality)
				cvs = null;
            };

            img.src = this.result;
        };
        fr.readAsDataURL(file);
    }
	
	/**
	 * [fn.addMethod] 函数重载
	 * @params object: 用于保存旧函数, name: 属性名, fn: 函数体
	 * @return null
	 */
	GlobalFunc.prototype.addMethod(object,name,fn){ 
	
		var old=object[name];   //保存上一个原有的函数，如果实参数量与形参数量不匹配则执行次函数；
		
		object[name]=function(){    //创建一个新的匿名函数作为对象的新方法
		
			if(arguments.length == fn.length){
				return fn.apply(this,arguments);    //该匿名函数的实参数量与形参数量匹配则执行此方法
			}else if(typeof old == "function"){
				return old.apply(this,arguments);   //反之，则执行上一个原有的函数
			}else{
				console.log("尚未定义的方法,没有返回值!argumengs.lenth="+arguments.length);     //实参数量所对应的方法没有定义时返回信息
			};
		};
	}
	
	/**
	 * [fn.isEventSupported] 事件兼容性
	 * @params eventName: 事件名
	 * @return isSupported: 布尔值，检测结果
	 */
	GlobalFunc.prototype.isEventSupported(eventName){
		var element = document.createElement("div"),
			isSupported;

			eventName = 'on' + eventName;
			isSupported = (eventName in element);

			if(!isSupported){
				element.setAttribute(eventName,'return;');
				isSupported = typeof element[eventName] == 'function';
			}

			element = null;

			return isSupported;
		} 
	};
	
	/**
	 * [fn.FunctionAddProperty] 修改Function原型
	 * @params name: 函数名, fn: 函数体, bol: 布尔值，是否覆盖
	 * @return null
	 */
	GlobalFunc.prototype.fFunctionAddProperty(name, fn, bol){
		if(bol || !Function.prototype[name]){
			Function.prototype[name] = fn;
		};
		
		//更改函数上下文
		Function.prototype.bind=function(){
			var fn=this,
				args=Array.prototype.slice.call(arguments),
				object=args.shift();

			return function(){
				return fn.apply(object,args.conact(Array.prototype.slice(arguments)));
			};
		};
		
		
		// 利用闭包实现的函数记忆方法
		Function.prototype.memoized = function(key){
			this._value = this._value || {};
			return this._value[key] !== undefined ? this._value[key] : this._value[key] = this.apply(this,arguments);
		};

		Function.prototype.memoize = function(){
			var fn = this;
			return function(){
				return fn.memoized.apply(fn,arguments);
			};
		};
		
		// 偏应用函数
		Function.prototype.partial=function(){
			var fn=this,
				args=Array.prototype.slice.call(arguments);
			return function(){
				var arg=0;
				for(var i=0; i < args.length && arg<arguments.length; i++){
					if(args[i]===undefined){
						args[i]=arguments[arg++];
					};
				};
				return fn.apply(this,args)
			};
		};
	};	
	return new GlobalFunc();
}());

module.exports = GlobalFunc;