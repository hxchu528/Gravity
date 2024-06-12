function dist(){
	var out = 0;
	for(var i = 0; i<arguments.length/2; i++){
		out+=(arguments[i+3]-arguments[i])**2;
	}
	return out**0.5;
}
function vec(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
	this.add = function(a){
		this.x+=a.x;
		this.y+=a.y;
		this.z+=a.z;
	}
	this.set = function(x,y,z){this.x=x;this.y=y;this.z=z;}
}
function obj(x,y,z,m){
	this.pos = new vec(x,y,z);
	this.vel = new vec((Math.random()-0.5)/5,(Math.random()-0.5)/5,(Math.random()-1)/5);
	this.acc = new vec(0,0,0);
	this.m=m;
	this.draw = function(){ctx.fillStyle = `rgb(0,0,${this.pos.z})`;ctx.fillRect(this.pos.x,this.pos.y,2,2);};

	this.move = function(o){
		var distance = dist(this.pos.x,this.pos.y,this.pos.z,o.pos.x,o.pos.y,o.pos.z);
		var f = 6.67e-2*this.m*o.m/(distance**2);
        
		var angh = Math.atan2(o.pos.z-this.pos.z,o.pos.x-this.pos.x);
		var angv = Math.acos((o.pos.y-this.pos.y)/distance);
		//Math.atan2(o.pos.y-this.pos.y,o.pos.z-this.pos.z);
		var ax = Math.cos(angh)*f/this.m;
		var ay = Math.cos(angv)*f/this.m
		var az = Math.sin(angh)*f/this.m;
		this.acc.set(ax,ay,az);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	};
}
