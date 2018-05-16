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
		if(typeof data == 'object'){
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
				if(data.hasOwnPorperty(k)){
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
	
	return new GlobalFunc();
}());

module.exports=GlobalFunc;