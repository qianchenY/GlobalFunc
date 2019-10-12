var GlobalFunc = (function(){
	function GlobalFunc(){
		// 返回当前时间戳
		this.time = new Date().getTime();
	}	
	
	/**
	 * [fn.copy] 深拷贝
	 * @param data
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
	 * @param n 个数
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
	 * @param n 行数
	 * @param m 列数
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
	 * @param arr: [{year:2017},{year:2017},{year:2018},{year:2019}]
	 * @param label 函数,false || fn: function(item){ return item.year } 
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
	 * @param str: 'user=&name=&pw=123'
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
	 * @param el: element, obj: attributes, speen: time
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
	 * @param name: object name
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
	 * @param arr: array, fn: function
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
	 * @param file: file对象, type: 图片类型, quality: 压缩质量, callback: 回调函数
	 * @return null;
	 */
	GlobalFunc.prototype.fileToBlob = function(file, type, quality, callback){
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
	 * [fn.addMethod] 函数重载;
	 * @param object: 用于保存旧函数, name: 属性名, fn: 函数体;
	 * @return null;
	 */
	GlobalFunc.prototype.addMethod = function(object,name,fn){ 
	
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
	 * [fn.progressCurrying] 函数柯理化;
	 * @param fn: 最后执行的回调函数;
	 * @param args: 初始参数
	 * @return Any;
	 */
	GlobalFunc.prototype.progressCurrying = function(fn, args){ 
	
		var _args = args || [];

		return function(){
			for(var i = 0; i < arguments.length; i++){
				_args.push(arguments[i]);
			}
			console.log(_args);
			if(fn.length > _args.length){
				return this.progressCurrying.call(this, fn, _args);
			};

			return fn.apply(this, _args);
		}
	}
	
	/**
	 * [fn.isEventSupported] 事件兼容性
	 * @param eventName: 事件名
	 * @return isSupported: 布尔值，检测结果;
	 */
	GlobalFunc.prototype.isEventSupported = function(eventName){
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
	};
	
	/**
	 * [fn.FunctionAddProperty] 修改Function原型
	 * @param name: 函数名, fn: 函数体, bol: 布尔值，是否覆盖
	 * @return null;
	 */
	GlobalFunc.prototype.FunctionAddProperty = function(name, fn, bol){
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
	
	/**
	 * [fn.ArrayAddproperty] 修改Array原型
	 * @param name: 函数名, fn: 函数体, bol: 布尔值，是否覆盖
	 * @return null;
	 */
	GlobalFunc.prototype.ArrayAddproperty = function(name, fn, bol){
		if(bol || !Array.prototype[name]){
			Array.prototype[name] = fn;
		};
		
		//map方法兼容
		Array.prototype.map = function(callback){
			var carr = [],
				arr = this,
				len = arr.length;
			for(var i = 0; i < len; i++){
				carr.push(callback(arr[i], i, arr));
			};
			return carr;
		}
		
		//filter方法兼容
		Array.prototype.filter = function(callback){
			var carr = [],
				bol = null,
				arr = this,
				len = arr.length;
			for(var i = 0; i < len; i++){
				bol = callback(arr[i], i, arr);
				if(bol){
					carr.push(arr[i]);
				}
				
			};
			return carr.length > 0 ? carr : undefined;
		}
		
		//find方法兼容
		Array.prototype.find = function(callback){
			var cvalue = undefined,
				bol = null,
				arr = this,
				len = arr.length;
			for(var i = 0; i < len; i++){
				bol = callback(arr[i], i, arr);
				if(bol){
					cvalue = arr[i];
					break;
				}
				
			};
			return cvalue;
		}
		
		//every方法兼容
		Array.prototype.every = function(callback){
			var bol = null,
				arr = this,
				len = arr.length;
			for(var i = 0; i < len; i++){
				bol = callback(arr[i], i, arr);
				if(!bol){
					break;
				}
				
			};
			return bol;
		}
		
		//some方法兼容
		Array.prototype.some = function(callback){
			var bol = null,
				arr = this,
				len = arr.length;
			for(var i = 0; i < len; i++){
				bol = callback(arr[i], i, arr);
				if(bol){
					break;
				}
				
			};
			return bol;
		}
		
		//reduce方法兼容
		Array.prototype.reduce = function(callback){
			var total = 0,
				arr = this,
				num = null;
				len = arr.length;
			for(var i = 0; i < len; i++){
				num = parseInt(arr[i]);
				if(typeof num === 'number'){
					total = callback(total, num, arr);
				}else{
					console.log("typeError");
					return;
				}
			};
			return total;
		}

		//flat方法兼容
		Array.prototype.flat = function(arr){
			var narr = [];

			var _flat = arr => {
				arr.forEach(v => {
					if(Array.isArray(v)){
						_flat(v);
					}else{
						narr.push(v)
					}
				})
			}
			_flat(arr);

			return narr;

			// 箭头函数简写
			// var flat = arr => [].concat(...arr.map(v => Array.isArray(v) ? flat(v) : v));
			// return flat(arr);
		}

	};	

	/**
	 * [fn.cookie] 操作cookie函数
	 * @param null;
	 * @return {setCookie: '添加', getCookie: '获取'};
	 */
	GlobalFunc.prototype.cookie = function(){
		function setCookie(cname, cvalue, exdays){
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toGMTString();
			document.cookie = cname + "=" + cvalue + ";" + expires;
		}

		function getCookie(cname){
			var name = cname + "";
			var ca = document.cookie.split(';');

			for(var i = 0; i < ca.length; i++){
				var c = ca[i].trim();
				if(c.indexOf("name") == 0){
					return c.substring(name.length, c.length);
				}
			}

			return "";
		}

		return {setCookie: setCookie, getCookie: getCookie};
	}

	/**
	 * [fn.addEvent] 添加dom事件
	 * @param el: dom对象, event: 事件名称, fn: 响应函数, bol: 是否冒泡执行
	 * @return null;
	 */
	GlobalFunc.prototype.addEvent = function(el, event, fn, bol){
		if(document.addEventListener){
			el.addEventListener(event, fn, bol);
		}else{
			el.attachEvent("on"+event, fn);
		}
	}

	/**
	 * [fn.removeEvent] 移除dom事件
	 * @param el: dom对象, event: 事件名称, fn: 响应函数
	 * @return null;
	 */
	GlobalFunc.prototype.removeEvent = function(el, event, fn){
		if(document.removeEventListener){
			el.removeEventListener(event, fn, bol);
		}else{
			el.detachEvent("on"+event, fn);
		}
	}
	
	/**
	 * [fn.jsonToElement] json转为元素列表
	 * @param data: [{name: 'a', id: '1', children: [{name: 'a1', id: '11'}]}, {name: 'b', id : '2'}], wrap: 父元素, haslink: 是否添加链接
	 * @return Element;
	 */
	GlobalFunc.prototype.jsonToElement = function(data, wrap, haslink){
		var _this = this,
			isArray = Object.prototype.toString.call(data).search("Array") > 0,             //判断是否为数据类型，小技巧
			ul = null,
			li = null;

		if(isArray){
			ul = wrap ? wrap : document.createElement("ul");
			for(var i = 0; i < data.length; i++){
				li = document.createElement("li");

				if(haslink){                //是否添加a标签
					var a = document.createElement("a");
					a.innerHTML = data[i]['name'];
					li.appendChild(a);
				}else{
					li.innerHTML = data[i]['name'];    
				}
				
				if(data[i]['children']){                //是否包含子元素
					var fn = arguments.callee ? arguments.callee : this.jsonToElement;
					li = fn(data[i]['children'], li, haslink);       
				}

				ul.appendChild(li);
			}
		};
		
		return ul;
	};
	
	/**
	 * [fn.algorithm] 算法整合
	 * @param none;
	 * @return none;
	 */
	GlobalFunc.prototype.algorithm = function(){
		/**
		 * [fn.algorithm] 折半算法（二分查找）
		 * @description: 只针对于已经排序好的数组，返回查找值的下标
		 * @param: {arr: [0,1,2,3,4], val: 3}
		 * @return: -1 | index;
		 */
		const zheban = (arr, val)=>{
			let min = 0,
				max = arr.length - 1;
			while(min <= max){
				let mid = Math.floor((min + max) / 2);
				console.log(min, max, mid);
				if(arr[mid] == val){
					return mid;
				}else if(arr[mid] > val){
					max = mid - 1;
				}else if(arr[mid] < val){
					min = mid + 1;
				}
			}		
			return -1;
		}		

		/** 
		 * [fn.bubleSort] 冒泡排序（两两比较，依次往后移动）
		 * @param arr: Array
		 * @return Array
		*/
		const bubleSort = (arr) =>{
			let i = arr.length;
			let	j;	
			let currentVal;

			while(i > 0){
				for(j = 0; j < i - 1; j++){
					if(arr[j] > arr[j + 1]){
						currentVal = arr[j + 1];
						arr[j + 1] = arr[j];
						arr[j] = currentVal;
					}
				}
				i--;
			}

			return arr;
		}

		/** 
		 * [fn.selectSort] 选择排序（遍历自身以后的元素，最小的元素跟自己调换位置）
		 * @param arr: Array
		 * @return Array
		*/
		const selectSort1 = (arr) =>{
			let len = arr.length;

			for(let i = 0; i < len - 1; i++){
				for(let j = i; j < len; j++){
					if(arr[i] > arr[j]){
						[arr[i], arr[j]] = [arr[j], arr[i]]
					}
				}
			}

			return arr;
		}

		/** 
		 * [fn.insertSort] 插入排序（即将元素插入到已排序好的数组中）
		 * @param arr: Array
		 * @return Array
		*/
		const insertSort1 = (arr) =>{

			for(let i = 1; i < arr.length; i++){				//外循环从1开始，默认arr[0]是有序段
				for(let j = i; j > 0; j--){					//j = i,将arr[j]依次插入有序段中
					if(arr[j] < arr[j - 1]){
						[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
					}else{
						break;
					}
				}
			}

			return arr;
		}

		const insertSort2 = (arr) =>{
			let list = [...arr];
			const newList = [];
			
			while(list.length){
				let min = Infinity;
				let minIndex;

				list.forEach((val, index) => {
					if(val < min){
						min = val;
						minIndex = index;
					}
				})

				newList.push(list[minIndex]);
				list.splice(minIndex, 1);
			}

			return newList;
		}
		
		/**
		 * [fn.quickSort] 快速排序算法（快排）
		 * @param: Array
		 * @return: Array
		 */
		const quickSort = (arr) => {
			const sort = (arr, left = 0, right = arr.length - 1) => {
				if(left >= right){				//如果左边的索引大于等于右边的索引说明整理完毕
					return;
				}
	
				let i = left;
				let j = right;
				const baseVal = arr[j];				//取无序数组最后一个值为基准值
				
				while(i < j){				//比基准值大的数放在右边，小的的放在左边
					while(i < j && arr[i] <= baseVal){				//找到一个比基准值大的数做交换
						i++;
					}
					arr[j] = arr[i];				// 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
	
					while(i < j && arr[j] >= baseVal){				//找到一个比基准值小的数做交换
						j--;
					}
					arr[i] = arr[j];				// 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
				}
				arr[j] = baseVal;				//将基准值放至中央位置完成一次循环（这时候 j 等于 i ）

				sort(arr, left, j-1);				// 将左边的无序数组重复上面的操作
				sort(arr, j + 1, right);				//将右边的无序数组重复上面的操作
			}

			const newArr = arr.concat();				// 为了保证这个函数是纯函数拷贝一次数组
			sort(newArr);

			return newArr;
		}
	}

	/**
	 * [fn.IEVersion] IE版本检测
	 * @return Number || String
	 */
	GlobalFunc.prototype.IEVersion = function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
		var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		if(isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if(fIEVersion == 7) {
				return 7;
			} else if(fIEVersion == 8) {
				return 8;
			} else if(fIEVersion == 9) {
				return 9;
			} else if(fIEVersion == 10) {
				return 10;
			} else {
				return 6;//IE版本<=7
			}   
		} else if(isEdge) {
			return 'edge';//edge
		} else if(isIE11) {
			return 11; //IE11  
		}else{
			return -1;//不是ie浏览器
		}
	}

	/** 
	 * [fn.mpromise] 模拟promise
	 * @param: null
	 * @return: null
	*/
	GlobalFunc.prototype.mpromise = function(){

		class MPromise{
			constructor(fn){
		
				this.PENDING = 'pending';
				this.FULFILLED = 'fulfilled';
				this.REJECTED = 'rejected';
				this.state = this.PENDING;
				this.value = null;
				this.reason = null;
				this.resloveFn = [];
				this.rejectFn = [];
				this.callback = fn;
				
				const resolve = (value) =>{
					setTimeout(()=>{
						if(this.state == this.PENDING){
							this.state = this.FULFILLED;
							this.value = value;
		
							this.resloveFn.map((cb,k,arr) => cb(this.value))
						}
					})
				}
		
				const reject = (reason) =>{
					setTimeout(()=>{
						if(this.state == this.PENDING){
							this.state = this.REJECTED;
							this.reason = reason;
		
							this.rejectFn.map((cb,k,arr) => cb(this.reason))
						}                
					})
				}
		
				try{
					fn(resolve, reject);
				}catch(e){
					reject(e);
				}
			}
		
			then(resolve, reject){
				// typeof resolve === 'function' && this.resloveFn.push(resolve);
				// typeof reject === 'function' && this.rejectFn.push(reject);
		
				if(typeof resolve === 'function'){
					this.resloveFn.push(resolve);
		
					setTimeout(()=>{
						this.state == this.FULFILLED && this.resloveFn.map((cb,k,arr) => cb(this.value));
					})
				}
		
				if(typeof reject === 'function'){
					this.rejectFn.push(reject);
		
					setTimeout(()=>{
						this.state == this.REJECTED && this.rejectFn.map((cb,k,arr) => cb(this.reason));
					})
				}
		
				return this;
			}
		}
	}

	/** 
	 * [fn.debounce] 函数防抖：间隔超过一段时间后才会执行
	 * @param fn: function
	 * @param delay: number
	 * @return function
	*/
	GlobalFunc.prototype.debounce = function(fn, delay){
		var timer = null;

		return function(){
			if(timer) clearTimeout(timer);

			timer = setTimeout(() => {
				fn.apply(this, arguments)
			}, delay);
		}
	}

	/** 
	 * [fn.throttle] 函数节流：一定时间内只执行一次
	 * @param fn: function
	 * @param cycle: number
	 * @return function
	*/
	GlobalFunc.prototype.throttle = function(fn, cycle){
		var start = Date.now();
		var timer = null;
		var now = null;

		return function(){
			var now = Date.now();
			clearTimeout(timer);
			
			if(now - start >= cycle){
				fn.apply(this, arguments);
				start = Date.now();
			}else{
				timer = setTimeout(() => {			
					fn.apply(this, arguments);
				}, cycle);					
			}
		
		}
	}

	/** 
	 * [fn.proxyObject] 基于vue3.0的数据侦测
	 * @param target: Object
	 * @param cb: Function
	 * @return Proxy
	*/
	GlobalFunc.prototype.proxyObject = function(target, cb){
		const rawToReactive = new WeakMap()
		const reactiveToRaw = new WeakMap()

		// utils
		function isObject(val) {
		  return typeof val === 'object'
		}

		function hasOwn(val, key) {
		  const hasOwnProperty = Object.prototype.hasOwnProperty
		  return hasOwnProperty.call(val, key)
		}

		// traps
		function createGetter() {
		  return function get(target, key, receiver) {
			const res = Reflect.get(target, key, receiver)
			return isObject(res) ? reactive(res) : res
		  }
		}

		function set(target, key, val, receiver) {
		  const hadKey = hasOwn(target, key)
		  const oldValue = target[key]

		  val = reactiveToRaw.get(val) || val
		  const result = Reflect.set(target, key, val, receiver)

		  if (!hadKey) {
			console.log('trigger ...');
			cb(target, key, val, receiver);
		  } else if(val !== oldValue) {
			console.log('trigger ...')
			cb(target, key, val, receiver);
		  }

		  return result
		}

		// handler
		const mutableHandlers = {
		  get: createGetter(),
		  set: set,
		}

		// entry
		function reactive(target) {
		  return createReactiveObject(
			target,
			rawToReactive,
			reactiveToRaw,
			mutableHandlers,
		  )
		}

		function createReactiveObject(target, toProxy, toRaw, baseHandlers) {
		  let observed = toProxy.get(target)
		  // 原数据已经有相应的可响应数据, 返回可响应数据
		  if (observed !== void 0) {
			return observed
		  }
		  // 原数据已经是可响应数据
		  if (toRaw.has(target)) {
			return target
		  }
		  observed = new Proxy(target, baseHandlers)
		  toProxy.set(target, observed)
		  toRaw.set(observed, target)
		  return observed
		}
		
		return reactive(target);
	}

	/**
	 * [fn.mThunkify] Thnkuify模块源码
	 * @param fn: Function
	 * @return Function
	 */
	GlobalFunc.prototype.mThunkify = function(fn){
		return function(){
			var args = Array.prototype.slice.call(arguments);
			var ctx = this;

			return function(done){
				var called;

				args.push(function(){
					if (called) return;						//防止多次执行
					called = true;
					done.apply(null, arguments);
				})

				try{
					fn.apply(ctx, args);
				}catch(err){
					done(err);
				}
			}
		}
	}

	/**
	 * [fn.generatorRunThunkify] 基于thunkify的generator自动执行器
	 * @param fn: Generator
	 * @return null
	 */
	GlobalFunc.prototype.generatorRunThunkify = function(fn){
		var gen = fn();

		function next(err, data){
			var result = gen.next(data);

			if(result.done) return result.value;

			result.value(data);
		}

		next();
	}

	/**
	 * [fn.mCo] co模块原理, 基于Promise的generator自动执行器
	 * @param gen: Generator
	 * @return Promise
	 */
	GlobalFunc.prototype.mCo = function(gen){
		var ctx = this;

		return new Promise(function(resolve, reject){
			if(typeof gen === 'function') gen = gen.call(ctx);
			if(!gen || typeof gen.next !== 'function') return resolve(gen);

			onFulfilled();

			function onFulfilled(res){
				var ret;

				try{
					ret = gen.next(res);
				}catch(err){
					return reject(err);
				}

				next(ret);
			}

			function next(ret){
				if(ret.done) return resolve(ret.value);
				/* 
				co源代码，缺少一些必要函数
				var value = toPromise.call(ctx, ret.value);
				if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
				return onRejected(
					new TypeError(
					'You may only yield a function, promise, generator, array, or object, '
					+ 'but the following object was passed: "'
					+ String(ret.value)
					+ '"'
					)
				);
				*/
				return Promise.resolve(ret.value).then(onFulfilled, function(...args){
					return reject(args);
				})
			}
		})
	}

	/**
	 * [fn.mAsync] async模块原理
	 * @param fn: Generator
	 * @return Promise
	 */
	GlobalFunc.prototype.mAsync = function(genF){
		return new Promise(function(resolve, reject){
			const gen = genF();

			function step(nextF){
				let next;

				try{
					next = nextF();
				}catch(err){
					return reject(err);
				}

				if(next.done){
					return resolve(next.value);
				}

				Promise.resolve(next.value).then(function(data){
					step(function(){ return gen.next(data); })
				}, function(err){
					step(function(){ return gen.next(err); })
				})
			}

			step(function(){ return gen.next(undefined); })
		})
	}
	
	return new GlobalFunc();
}());

module.exports = GlobalFunc;